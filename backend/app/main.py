from fastapi import FastAPI
from routes import cultivos

app = FastAPI(title="AgroLink API")

app.include_router(cultivos.router)
