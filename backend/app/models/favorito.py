from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FavoritoBase(BaseModel):
    ciudad: str
    lat: float
    lon: float

class FavoritoCreate(FavoritoBase):
    id_sesion: str

class FavoritoResponse(FavoritoBase):
    id: int
    id_sesion: str
    ultima_consulta: Optional[datetime]
    fecha_agregado: datetime
    
    class Config:
        from_attributes = True

class FavoritoConClima(FavoritoResponse):
    clima_actual: Optional[dict] = None
