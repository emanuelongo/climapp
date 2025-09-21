from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.historial import Historial
from app.schemas.clima import ClimaResponse
from app.services import weather_api
import os
import httpx

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

router = APIRouter(prefix="/clima", tags=["Clima"])

@router.get("/actual")
async def clima_actual(ciudad: str = Query(...)):
    url = f"{BASE_URL}?q={ciudad}&appid={API_KEY}&units=metric&lang=es"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    if response.status_code != 200:
        return {"error": "No se pudo obtener el clima actual"}

    data = response.json()

    clima = {
        "ciudad": data.get("name"),
        "pais": data["sys"].get("country"),
        "temperatura": data["main"].get("temp"),
        "sensacion_termica": data["main"].get("feels_like"),
        "temp_min": data["main"].get("temp_min"),
        "temp_max": data["main"].get("temp_max"),
        "humedad": data["main"].get("humidity"),
        "descripcion": data["weather"][0].get("description") if data.get("weather") else None,
        "viento": {
            "velocidad": data["wind"].get("speed"),
            "direccion": data["wind"].get("deg"),
        },
        "nubes": f"{data['clouds'].get('all')}%" if data.get("clouds") else None,
    }

    return clima

@router.get("/pronostico")
def clima_pronostico(ciudad: str = Query(..., description="Nombre de la ciudad"),
                     dias: int = Query(3, ge=1, le=7, description="Número de días (1-7)")):
    return weather_api.get_pronostico(ciudad, dias)

@router.get("/historial")
def historial():
    # Aquí luego conectaremos con la base de datos
    return {"mensaje": "Historial aún no implementado"}
