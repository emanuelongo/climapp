import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_clima_actual(ciudad: str):
    url = f"{BASE_URL}?q={ciudad}&appid={API_KEY}&units=metric&lang=es"
    print("DEBUG URL:", url)  # 👈 imprime la URL exacta
    response = requests.get(url)
    print("DEBUG STATUS:", response.status_code)
    print("DEBUG RESPONSE:", response.text)

    if response.status_code == 200:
        return response.json()
    return {"error": "No se pudo obtener el clima actual"}

def get_pronostico(ciudad: str, dias: int = 3):
    url = f"{BASE_URL}/forecast.json"
    params = {"key": API_KEY, "q": ciudad, "days": dias, "lang": "es"}
    response = requests.get(url, params=params)

    print("DEBUG URL:", response.url)
    print("DEBUG STATUS:", response.status_code)
    print("DEBUG RESPONSE:", response.text)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "No se pudo obtener el pronóstico"}

