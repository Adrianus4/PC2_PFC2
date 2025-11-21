from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Cultivo(BaseModel):
    nombre: str
    area: float
    costo: float

# Base de datos temporal en memoria
cultivos_db: List[Cultivo] = []

@router.get("/cultivos", response_model=List[Cultivo])
async def get_cultivos():
    return cultivos_db

@router.post("/cultivos", response_model=Cultivo)
async def add_cultivo(cultivo: Cultivo):
    cultivos_db.append(cultivo)
    return cultivo
