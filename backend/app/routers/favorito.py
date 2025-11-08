from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.favorito import FavoritoCreate, FavoritoResponse
from app.services.favorito_service import FavoritoService

router = APIRouter(prefix="/favoritos", tags=["Favoritos"])

@router.post("/", response_model=FavoritoResponse, status_code=status.HTTP_201_CREATED)
async def agregar_favorito(
    favorito: FavoritoCreate,
    db: Session = Depends(get_db)
):
    """Agrega una ciudad a favoritos (máximo 5)"""
    service = FavoritoService(db)
    try:
        return await service.agregar_favorito(favorito)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error al agregar favorito")

@router.get("/{id_sesion}", response_model=List[FavoritoResponse])
def listar_favoritos(
    id_sesion: str,
    db: Session = Depends(get_db)
):
    """Lista todos los favoritos de un usuario"""
    service = FavoritoService(db)
    return service.listar_favoritos(id_sesion)

@router.delete("/{id_sesion}/{favorito_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_favorito(
    id_sesion: str,
    favorito_id: int,
    db: Session = Depends(get_db)
):
    """Elimina un favorito"""
    service = FavoritoService(db)
    if not service.eliminar_favorito(id_sesion, favorito_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorito no encontrado")
    return None
