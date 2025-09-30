from pydantic import BaseModel
from datetime import datetime

class ClimaBase(BaseModel):
    ciudad: str
    clima: str

class ClimaResponse(ClimaBase):
    fecha_consulta: datetime

    class Config:
        orm_mode = True


# models.py
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, TIMESTAMP, DECIMAL
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class UnidadEnum(enum.Enum):
    C = "C"
    F = "F"

class Usuario(Base):
    __tablename__ = "USUARIO"
    id_usuario = Column(Integer, primary_key=True, index=True)
    id_sesion = Column(String(100), nullable=False)
    unidad_preferencial = Column(Enum(UnidadEnum), nullable=False, default=UnidadEnum.C)

class Busqueda(Base):
    __tablename__ = "BUSQUEDA"
    id_busqueda = Column(Integer, primary_key=True, index=True)
    fecha_hora = Column(TIMESTAMP, server_default=func.now())
    nombre_ciudad = Column(String(50), nullable=False)
    id_usuario = Column(Integer, ForeignKey("USUARIO.id_usuario"))

class Ubicacion(Base):
    __tablename__ = "UBICACION"
    id_ubicacion = Column(Integer, primary_key=True, index=True)
    nombre_ciudad = Column(String(50), nullable=False)
    latitud = Column(DECIMAL(9,6), nullable=False)
    longitud = Column(DECIMAL(9,6), nullable=False)

class Clima(Base):
    __tablename__ = "CLIMA"
    id_clima = Column(Integer, primary_key=True, index=True)
    temperatura = Column(DECIMAL(5,2), nullable=False)
    humedad = Column(DECIMAL(5,2))
    viento = Column(DECIMAL(5,2))
    estado = Column(String(100))
    fecha_registro = Column(TIMESTAMP, server_default=func.now())
    id_ubicacion = Column(Integer, ForeignKey("UBICACION.id_ubicacion"))
