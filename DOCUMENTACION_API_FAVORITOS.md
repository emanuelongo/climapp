## API de Favoritos - Documentación para Frontend

### Base URL
```
http://localhost:8090
```

### Endpoints Disponibles

#### 1. Agregar Ciudad a Favoritos
**POST** `/favoritos/`

**Request Body:**
```json
{
  "id_sesion": "string",
  "ciudad": "string",
  "lat": number,
  "lon": number
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "id_sesion": "test_session_123",
  "ciudad": "Buenos Aires",
  "lat": -34.6037,
  "lon": -58.3816,
  "ultima_consulta": "2025-11-08T01:03:43.622070",
  "fecha_agregado": "2025-11-08T01:03:43.623643"
}
```

**Errores:**
- `400 Bad Request`: "Has alcanzado el límite de 5 ciudades favoritas"
- `400 Bad Request`: "Esta ciudad ya está en tus favoritos"
- `400 Bad Request`: "La ciudad no es válida o no se pudo verificar"
- `500 Internal Server Error`: "Error al agregar favorito"

---

#### 2. Listar Favoritos de un Usuario
**GET** `/favoritos/{id_sesion}`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "id_sesion": "test_session_123",
    "ciudad": "Buenos Aires",
    "lat": -34.6037,
    "lon": -58.3816,
    "ultima_consulta": "2025-11-08T01:03:43.622070",
    "fecha_agregado": "2025-11-08T01:03:43.623643"
  },
  {
    "id": 2,
    "id_sesion": "test_session_123",
    "ciudad": "Madrid",
    "lat": 40.4168,
    "lon": -3.7038,
    "ultima_consulta": "2025-11-08T01:04:00.736501",
    "fecha_agregado": "2025-11-08T01:04:00.736855"
  }
]
```

---

#### 3. Eliminar Favorito
**DELETE** `/favoritos/{id_sesion}/{favorito_id}`

**Response:**
- `204 No Content`: Favorito eliminado correctamente
- `404 Not Found`: "Favorito no encontrado"

---

### Reglas de Negocio

1. Límite máximo de 5 ciudades favoritas por usuario
2. No se permiten ciudades duplicadas por usuario
3. Se valida que las coordenadas correspondan a una ubicación válida antes de agregar
4. Si el usuario no existe, se crea automáticamente al agregar el primer favorito
5. Los favoritos se ordenan por fecha de agregado (más recientes primero)

---

### Ejemplos de Uso

**Agregar favorito:**
```javascript
fetch('http://localhost:8090/favoritos/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id_sesion: "user_123",
    ciudad: "Buenos Aires",
    lat: -34.6037,
    lon: -58.3816
  })
})
```

**Listar favoritos:**
```javascript
fetch('http://localhost:8090/favoritos/user_123')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Eliminar favorito:**
```javascript
fetch('http://localhost:8090/favoritos/user_123/1', {
  method: 'DELETE'
})
```

---

### Notas Importantes

- El `id_sesion` debe ser único por usuario y consistente en todas las peticiones
- Las coordenadas (lat/lon) deben corresponder a la ciudad que se está agregando
- El backend valida automáticamente contra la API de OpenWeatherMap
- Todos los timestamps están en formato ISO 8601 UTC
- La respuesta del GET está ordenada por `fecha_agregado` descendente

---

### Documentación Interactiva

Pueden ver la documentación completa en:
```
http://localhost:8090/docs
```
