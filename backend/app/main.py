from fastapi import FastAPI
from app.routers import clima, favorito
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CLIMAPP Backend")

app.include_router(clima.router)
app.include_router(favorito.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a CLIMAPP Backend 🚀"}


