from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.schemas.clima import Favorito, Usuario
from app.models.favorito import FavoritoCreate, FavoritoResponse
from datetime import datetime
from typing import List, Optional
import httpx
import os

class FavoritoService:
    def __init__(self, db: Session):
        self.db = db
        self.api_key = os.getenv("WEATHER_API_KEY")
    
    async def validar_ciudad(self, ciudad: str, lat: float, lon: float) -> bool:
        """Valida que la ciudad exista consultando la API de clima"""
        try:
            url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={self.api_key}"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=10.0)
                print(f"DEBUG - Validando ciudad: {ciudad}, Status: {response.status_code}")
                if response.status_code == 200:
                    data = response.json()
                    ciudad_api = data.get('name', '').lower()
                    print(f"DEBUG - Ciudad API: {ciudad_api}, Ciudad solicitada: {ciudad.lower()}")
                    return True
                return False
        except Exception as e:
            print(f"DEBUG - Error en validación: {str(e)}")
            return False
    
    async def agregar_favorito(self, favorito_data: FavoritoCreate) -> Optional[FavoritoResponse]:
        """Agrega una ciudad a favoritos"""
        ciudad_valida = await self.validar_ciudad(
            favorito_data.ciudad, 
            favorito_data.lat, 
            favorito_data.lon
        )
        
        if not ciudad_valida:
            raise ValueError("La ciudad no es válida o no se pudo verificar")
        
        usuario = self.db.query(Usuario).filter(Usuario.id_sesion == favorito_data.id_sesion).first()
        if not usuario:
            nuevo_usuario = Usuario(id_sesion=favorito_data.id_sesion)
            self.db.add(nuevo_usuario)
            self.db.commit()
            print(f"DEBUG - Usuario creado: {favorito_data.id_sesion}")
        
        count = self.db.query(Favorito).filter(
            Favorito.id_sesion == favorito_data.id_sesion
        ).count()
        
        if count >= 5:
            raise ValueError("Has alcanzado el límite de 5 ciudades favoritas")
        
        existe = self.db.query(Favorito).filter(
            and_(
                Favorito.id_sesion == favorito_data.id_sesion,
                Favorito.ciudad == favorito_data.ciudad
            )
        ).first()
        
        if existe:
            raise ValueError("Esta ciudad ya está en tus favoritos")
        
        nuevo_favorito = Favorito(
            id_sesion=favorito_data.id_sesion,
            ciudad=favorito_data.ciudad,
            lat=favorito_data.lat,
            lon=favorito_data.lon,
            ultima_consulta=datetime.utcnow()
        )
        
        self.db.add(nuevo_favorito)
        self.db.commit()
        self.db.refresh(nuevo_favorito)
        
        return FavoritoResponse.model_validate(nuevo_favorito)
    
    def listar_favoritos(self, id_sesion: str) -> List[FavoritoResponse]:
        """Lista todos los favoritos de un usuario"""
        favoritos = self.db.query(Favorito).filter(
            Favorito.id_sesion == id_sesion
        ).order_by(Favorito.fecha_agregado.desc()).all()
        
        return [FavoritoResponse.model_validate(fav) for fav in favoritos]
    
    def eliminar_favorito(self, id_sesion: str, favorito_id: int) -> bool:
        """Elimina un favorito"""
        favorito = self.db.query(Favorito).filter(
            and_(
                Favorito.id == favorito_id,
                Favorito.id_sesion == id_sesion
            )
        ).first()
        
        if not favorito:
            return False
        
        self.db.delete(favorito)
        self.db.commit()
        return True
    
    def actualizar_ultima_consulta(self, favorito_id: int):
        """Actualiza la última consulta de clima de un favorito"""
        favorito = self.db.query(Favorito).filter(Favorito.id == favorito_id).first()
        if favorito:
            favorito.ultima_consulta = datetime.utcnow()
            self.db.commit()
