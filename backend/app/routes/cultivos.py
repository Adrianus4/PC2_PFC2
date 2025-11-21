from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/cultivos", tags=["Cultivos"])

class Cultivo(BaseModel):
    nombre: str
    area: float
    costo: float

cultivos_db = []

@router.post("/")
def crear_cultivo(cultivo: Cultivo):
    cultivos_db.append(cultivo)
    return {"msg": "Cultivo registrado"}

@router.get("/")
def listar_cultivos():
    return cultivos_db
