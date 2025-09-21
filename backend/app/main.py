from fastapi import FastAPI
from app.routers import clima
from app.db.database import Base, engine

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CLIMAPP Backend")

app.include_router(clima.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a CLIMAPP Backend 🚀"}


