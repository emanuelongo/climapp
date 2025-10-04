"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye } from "lucide-react"

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
}

export default function WeatherApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState("")
  const [error, setError] = useState("")
  const [forecast, setForecast] = useState<any[]>([]); // pronóstico
  const [history, setHistory] = useState<any[]>([]);   // historial

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  // Mock signup function
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }
  // Fetch weather data from backend
  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_URL}/clima/actual?ciudad=${cityName}`)
      if (!response.ok) {
        throw new Error("No se pudo obtener el clima")
      }

      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (err) {
      console.error(err)
      setError("Error al obtener el clima. Intenta de nuevo.")
    } finally {
      setLoading(false)
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

  const fetchForecast = async (cityName: string, days: number = 3) => {
    const response = await fetch(`${API_URL}/clima/pronostico?ciudad=${cityName}&dias=${days}`);
    const data = await response.json();
    setForecast(data);
  };

  const fetchHistory = async () => {
    console.log("API_URL =>", API_URL);
    const response = await fetch(`${API_URL}/clima/historial`);
    const data = await response.json();
    setHistory(data);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sun className="h-12 w-12 text-foreground mr-2" />
              <h1 className="text-4xl font-bold text-foreground">Climapp</h1>
            </div>
            <p className="text-muted-foreground text-lg">Tu aplicación de clima favorita</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input id="password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Iniciar Sesión
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Cuenta</CardTitle>
                  <CardDescription>Regístrate para comenzar a usar Climapp</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" type="text" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Contraseña</Label>
                      <Input id="signup-password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Crear Cuenta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-foreground mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Climapp</h1>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="actual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="actual">Clima Actual</TabsTrigger>
            <TabsTrigger value="pronostico">Pronóstico</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          {/* ================= Clima Actual ================= */}
          <TabsContent value="actual">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Buscar Clima
                </CardTitle>
                <CardDescription>
                  Ingresa el nombre de una ciudad para ver el clima actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWeatherSearch} className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Ej: Medellín, Bogotá, Cali..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="className= hover:bg-orange-500" type="submit" disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                  </Button>
                </form>
                {error && <p className="text-destructive mt-2">{error}</p>}
              </CardContent>
            </Card>

            {weatherData && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Main Weather Card */}
                <Card className="md:col-span-2 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>
                        {weatherData.ciudad}, {weatherData.pais}
                      </span>
                      <Badge variant="secondary" className="text-sm">
                        Ahora
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-6xl font-bold text-foreground mb-2">
                          {Math.round(weatherData.temperatura)}°C
                        </div>
                        <p className="text-muted-foreground capitalize text-lg">
                          {weatherData.descripcion}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sensación térmica:{" "}
                          {Math.round(weatherData.sensacion_termica)}°C
                        </p>
                      </div>
                      <div className="text-center">
                        {getWeatherIcon(weatherData.descripcion)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm">
                          Máx: {Math.round(weatherData.temp_max)}°C
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">
                          Mín: {Math.round(weatherData.temp_min)}°C
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Details */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-sm font-medium">Humedad</span>
                        </div>
                        <span className="text-lg font-bold">
                          {weatherData.humedad}%
                        </span>
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
                        <span className="text-lg font-bold">
                          {weatherData.nubes || "Sin datos"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ================= Pronóstico ================= */}
          <TabsContent value="pronostico">
            <Button className="className= hover:bg-orange-500" onClick={() => fetchForecast(city || "Bogotá", 3)}>
              Ver pronóstico
            </Button>

            {forecast.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                {forecast.map((day, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 text-center">
                      <p className="font-bold">{day.fecha}</p>
                      <p>{Math.round(day.temperatura)}°C</p>
                      <p className="text-muted-foreground">{day.descripcion}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ================= Historial ================= */}
          <TabsContent value="historial">
            <Button className="className= hover:bg-orange-500" onClick={fetchHistory}>Cargar historial</Button>

            {history.length > 0 && (
              <Card className="mt-6">
                <CardContent>
                  <ul className="space-y-2">
                    {history.map((h) => (
                      <li
                        key={h.id}
                        className="flex justify-between border-b pb-1"
                      >
                        <span>{h.ciudad}</span>
                        <span className="text-muted-foreground">
                          <p>{new Date(h.fecha_consulta).toLocaleDateString()}</p>
                        </span>
                        <span className="text-muted-foreground">{h.clima}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )

}
