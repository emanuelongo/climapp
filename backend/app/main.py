from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.routers import clima, favorito

# crea tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CLIMAPP Backend")

# Ajusta orígenes en dev. Puedes agregar dominios adicionales si tu front corre en otro puerto.
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8090",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clima.router)
app.include_router(favorito.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a CLIMAPP Backend 🚀"}
