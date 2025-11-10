"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Star, Trash2, History } from "lucide-react"

interface Favorite {
  id: number
  ciudad: string
  lat: number
  lon: number
  fecha_agregado: string
}

interface WeatherData {
  ciudad: string
  pais: string
  temperatura: number
  sensacion_termica: number
  temp_min: number
  temp_max: number
  humedad: number
  descripcion: string
  viento: {
    velocidad: number
    direccion: number
  }
  nubes: string
  lat?: number
  lon?: number
}

interface HistoryItem {
  id: number
  ciudad: string
  fecha_consulta: string
  clima: string
  temperatura: number
}

function getUserId(): string {
  if (typeof window === "undefined") return ""

  let userId = localStorage.getItem("weather_user_id")

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("weather_user_id", userId)
  }

  return userId
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState("")
  const [error, setError] = useState("")
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [userId, setUserId] = useState("")
  const [loadingHistory, setLoadingHistory] = useState(false)

  const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8090"

  useEffect(() => {
    const id = getUserId()
    setUserId(id)
    if (id) {
      loadFavorites(id)
    }
  }, [])

  const loadFavorites = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/favoritos/${id}`)
      if (response.ok) {
        const data = await response.json()
        setFavorites(data)
      }
    } catch (err) {
      console.error("Error loading favorites:", err)
    }
  }

  const addToFavorites = async () => {
    if (!weatherData) return

    const alreadyFavorite = favorites.some(
      (fav) => fav.ciudad.toLowerCase() === weatherData.ciudad.toLowerCase()
    )

    if (alreadyFavorite) {
      setError("Esta ciudad ya está en favoritos")
      return
    }

    if (favorites.length >= 5) {
      setError("Máximo 5 ciudades favoritas permitidas")
      return
    }

    try {
      const response = await fetch(`${BACKEND_URL}/favoritos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_sesion: userId,
          ciudad: weatherData.ciudad,
          lat: weatherData.lat || 0,
          lon: weatherData.lon || 0,
        }),
      })

      if (response.ok) {
        await loadFavorites(userId)
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Error al agregar favorito")
      }
    } catch (err) {
      setError("Error al agregar favorito")
    }
  }

  const removeFavorite = async (favoriteId: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/favoritos/${userId}/${favoriteId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        await loadFavorites(userId)
      }
    } catch (err) {
      console.error("Error removing favorite:", err)
    }
  }

  const loadFavoriteWeather = (cityName: string) => {
    setCity(cityName)
    fetchWeather(cityName)
  }

  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${BACKEND_URL}/clima/actual?ciudad=${encodeURIComponent(cityName)}`)

      if (!response.ok) {
        setError("No se pudo obtener el clima para esa ciudad")
        setWeatherData(null)
        return
      }

      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError("Error al conectar con el servidor")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async () => {
    setLoadingHistory(true)
    try {
      const response = await fetch(`${BACKEND_URL}/clima/historial`)
      if (response.ok) {
        const data: HistoryItem[] = await response.json()
        setHistory(data)
      } else {
        setError("No se pudo cargar el historial")
      }
    } catch (err) {
      setError("Error al conectar con el servidor")
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleWeatherSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city.trim())
    }
  }

  const getWeatherIcon = (description: string) => {
    if (description.includes("sol") || description.includes("despejado")) {
      return <Sun className="h-16 w-16 text-yellow-500" />
    } else if (description.includes("lluvia")) {
      return <CloudRain className="h-16 w-16 text-blue-500" />
    } else {
      return <Cloud className="h-16 w-16 text-gray-500" />
    }
  }

  const isCurrentCityFavorite = weatherData
    ? favorites.some((fav) => fav.ciudad.toLowerCase() === weatherData.ciudad.toLowerCase())
    : false

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-foreground mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Climapp</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clima" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="clima">Clima Actual</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          {/* ================= Clima Actual ================= */}
          <TabsContent value="clima">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Buscar Clima
                    </CardTitle>
                    <CardDescription>Ingresa el nombre de una ciudad para ver el clima actual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleWeatherSearch} className="flex gap-4">
                      <Input
                        type="text"
                        placeholder="Ej: Madrid, Barcelona, Valencia..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? "Buscando..." : "Buscar"}
                      </Button>
                    </form>
                    {error && <p className="text-destructive mt-2">{error}</p>}
                  </CardContent>
                </Card>

                {weatherData && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="md:col-span-2 lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>
                            {weatherData.ciudad}, {weatherData.pais}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-sm">Ahora</Badge>
                            <Button
                              size="sm"
                              variant={isCurrentCityFavorite ? "default" : "outline"}
                              onClick={addToFavorites}
                              disabled={isCurrentCityFavorite}
                            >
                              <Star className={`h-4 w-4 ${isCurrentCityFavorite ? "fill-current" : ""}`} />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-6xl font-bold text-foreground mb-2">
                              {Math.round(weatherData.temperatura)}°C
                            </div>
                            <p className="text-muted-foreground capitalize text-lg">{weatherData.descripcion}</p>
                            <p className="text-sm text-muted-foreground">
                              Sensación: {Math.round(weatherData.sensacion_termica)}°C
                            </p>
                          </div>
                          <div className="text-center">{getWeatherIcon(weatherData.descripcion)}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-sm">Máx: {Math.round(weatherData.temp_max)}°C</span>
                          </div>
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm">Mín: {Math.round(weatherData.temp_min)}°C</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-sm font-medium">Humedad</span>
                            </div>
                            <span className="text-lg font-bold">{weatherData.humedad}%</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Wind className="h-5 w-5 text-gray-500 mr-2" />
                              <span className="text-sm font-medium">Viento</span>
                            </div>
                            <span className="text-lg font-bold">
                              {(weatherData.viento.velocidad * 3.6).toFixed(1)} km/h
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Cloud className="h-5 w-5 text-gray-500 mr-2" />
                              <span className="text-sm font-medium">Nubes</span>
                            </div>
                            <span className="text-lg font-bold">{weatherData.nubes}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {!weatherData && !loading && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Sun className="h-16 w-16 text-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-foreground mb-2">¡Bienvenido!</h2>
                      <p className="text-muted-foreground">
                        Busca una ciudad para ver su clima actual.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Favoritos en columna derecha */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      Favoritos
                    </CardTitle>
                    <CardDescription>{favorites.length}/5 guardadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-8">
                        No tienes favoritos. Usa la estrella para guardar.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {favorites.map((fav) => (
                          <div
                            key={fav.id}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                          >
                            <button
                              onClick={() => loadFavoriteWeather(fav.ciudad)}
                              className="flex-1 text-left"
                            >
                              <p className="font-medium">{fav.ciudad}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(fav.fecha_agregado).toLocaleDateString()}
                              </p>
                            </button>
                            <Button size="sm" variant="ghost" onClick={() => removeFavorite(fav.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================= Historial ================= */}
          <TabsContent value="historial">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Historial de Búsquedas
                </CardTitle>
                <CardDescription>
                  Últimas consultas realizadas en la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={fetchHistory}
                  disabled={loadingHistory}
                  className="mb-4"
                >
                  {loadingHistory ? "Cargando..." : "Cargar Historial"}
                </Button>

                {history.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {loadingHistory ? "" : "No hay historial disponible."}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                      >
                        <div>
                          <p className="font-medium">{item.ciudad}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.fecha_consulta).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground capitalize">{item.clima}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}