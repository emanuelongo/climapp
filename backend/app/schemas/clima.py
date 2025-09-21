from pydantic import BaseModel
from datetime import datetime

class ClimaBase(BaseModel):
    ciudad: str
    clima: str

class ClimaResponse(ClimaBase):
    fecha_consulta: datetime

    class Config:
        orm_mode = True
