from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import cultivos

app = FastAPI()

# CORS para que frontend (Vite) pueda hacer peticiones
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(cultivos.router)
