"""
Main FastAPI Entry Point.
Provides the CORS pipeline and stitches all AI module routes.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.deps import engine, Base
from app.core.config import settings

# Import routers
from app.api.routes import brand
from app.api.routes import content
from app.api.routes import repurpose
from app.api.routes import ads
from app.api.routes import sentiment
from app.api.routes import calendar

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, version="1.0.0")

# Configure CORS for local development. Using wildcard * to avoid React/Vite port mismatch issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint for health check
@app.get("/")
def read_root():
    return {"message": f"Welcome to the {settings.app_name}!"}

# Mount AI Engine Modules
app.include_router(brand.router, prefix="/api")
app.include_router(content.router, prefix="/api")
app.include_router(repurpose.router, prefix="/api")
app.include_router(ads.router, prefix="/api")
app.include_router(sentiment.router, prefix="/api")
app.include_router(calendar.router, prefix="/api")
