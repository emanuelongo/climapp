from sqlalchemy import Column, Integer, String, DateTime, func
from app.db.database import Base

class Historial(Base):
    __tablename__ = "historial"

    id = Column(Integer, primary_key=True, index=True)
    ciudad = Column(String, index=True, nullable=False)
    clima = Column(String, nullable=False)
    fecha_consulta = Column(DateTime(timezone=True), server_default=func.now())
