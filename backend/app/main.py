from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import clima
from app.db.database import Base, engine

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CLIMAPP Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(clima.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a CLIMAPP Backend 🚀"}
