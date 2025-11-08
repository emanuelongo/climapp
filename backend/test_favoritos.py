import requests
import json

BASE_URL = "http://localhost:8090"
ID_SESION = "test_session_123"

print("=" * 60)
print("PRUEBAS DE ENDPOINTS DE FAVORITOS")
print("=" * 60)

print("\n1️  Agregando Buenos Aires a favoritos...")
favorito_data = {
    "id_sesion": ID_SESION,
    "ciudad": "Buenos Aires",
    "lat": -34.6037,
    "lon": -58.3816
}

response = requests.post(f"{BASE_URL}/favoritos/", json=favorito_data)
print(f"Status: {response.status_code}")
if response.status_code == 201:
    print(f" Favorito agregado: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
else:
    print(f" Error: {response.text}")

print("\n  Agregando Madrid a favoritos...")
favorito_data2 = {
    "id_sesion": ID_SESION,
    "ciudad": "Madrid",
    "lat": 40.4168,
    "lon": -3.7038
}

response = requests.post(f"{BASE_URL}/favoritos/", json=favorito_data2)
print(f"Status: {response.status_code}")
if response.status_code == 201:
    print(f" Favorito agregado: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
else:
    print(f" Error: {response.text}")

print("\n3️  Agregando Nueva York a favoritos...")
favorito_data3 = {
    "id_sesion": ID_SESION,
    "ciudad": "New York",
    "lat": 40.7128,
    "lon": -74.0060
}

response = requests.post(f"{BASE_URL}/favoritos/", json=favorito_data3)
print(f"Status: {response.status_code}")
if response.status_code == 201:
    print(f" Favorito agregado: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
else:
    print(f" Error: {response.text}")

print("\n4️  Intentando agregar Buenos Aires nuevamente (debe fallar)...")
response = requests.post(f"{BASE_URL}/favoritos/", json=favorito_data)
print(f"Status: {response.status_code}")
if response.status_code == 400:
    print(f" Validación correcta: {response.json()['detail']}")
else:
    print(f" Error inesperado: {response.text}")

# 5. Listar todos los favoritos
print(f"\n5️  Listando todos los favoritos de la sesión {ID_SESION}...")
response = requests.get(f"{BASE_URL}/favoritos/{ID_SESION}")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    favoritos = response.json()
    print(f" Total de favoritos: {len(favoritos)}")
    for i, fav in enumerate(favoritos, 1):
        print(f"   {i}. {fav['ciudad']} (ID: {fav['id']})")
        print(f"      Coordenadas: ({fav['lat']}, {fav['lon']})")
        print(f"      Agregado: {fav['fecha_agregado']}")
else:
    print(f" Error: {response.text}")


if response.status_code == 200 and len(favoritos) > 0:
    favorito_id = favoritos[0]['id']
    print(f"\n6️  Eliminando favorito con ID {favorito_id}...")
    response = requests.delete(f"{BASE_URL}/favoritos/{ID_SESION}/{favorito_id}")
    print(f"Status: {response.status_code}")
    if response.status_code == 204:
        print(f" Favorito eliminado correctamente")
    else:
        print(f" Error: {response.text}")

    # 7. Verificar que se eliminó
    print(f"\n7️  Verificando la lista actualizada...")
    response = requests.get(f"{BASE_URL}/favoritos/{ID_SESION}")
    if response.status_code == 200:
        favoritos_actualizados = response.json()
        print(f" Total de favoritos ahora: {len(favoritos_actualizados)}")
        for i, fav in enumerate(favoritos_actualizados, 1):
            print(f"   {i}. {fav['ciudad']} (ID: {fav['id']})")
    else:
        print(f" Error: {response.text}")

# 8. Probar el límite de 5 favoritos
print("\n8️ Probando límite de 5 favoritos...")
ciudades_extra = [
    {"ciudad": "Tokyo", "lat": 35.6762, "lon": 139.6503},
    {"ciudad": "London", "lat": 51.5074, "lon": -0.1278},
    {"ciudad": "Paris", "lat": 48.8566, "lon": 2.3522},
    {"ciudad": "Berlin", "lat": 52.5200, "lon": 13.4050},
]

for ciudad in ciudades_extra:
    ciudad["id_sesion"] = ID_SESION
    response = requests.post(f"{BASE_URL}/favoritos/", json=ciudad)
    if response.status_code == 201:
        print(f" {ciudad['ciudad']} agregada")
    elif response.status_code == 400:
        print(f"  No se pudo agregar {ciudad['ciudad']}: {response.json()['detail']}")
    else:
        print(f" Error con {ciudad['ciudad']}: {response.text}")

print(f"\n9️  Lista final de favoritos...")
response = requests.get(f"{BASE_URL}/favoritos/{ID_SESION}")
if response.status_code == 200:
    favoritos_final = response.json()
    print(f" Total de favoritos: {len(favoritos_final)}/5")
    for i, fav in enumerate(favoritos_final, 1):
        print(f"   {i}. {fav['ciudad']}")

print("\n" + "=" * 60)
print("PRUEBAS COMPLETADAS")
print("=" * 60)
