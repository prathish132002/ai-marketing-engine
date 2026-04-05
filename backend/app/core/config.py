import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AI Marketing Engine API"
    # Try both possible names to be extra safe
    xai_api_key: str = os.getenv("XAI_API_KEY") or os.getenv("GROQ_API_KEY") or ""
    groq_api_key: str = os.getenv("GROQ_API_KEY") or os.getenv("XAI_API_KEY") or ""
    
    # Reads DATABASE_URL from .env or environment — falls back to local SQLite
    database_url: str = os.getenv("DATABASE_URL") or "sqlite:///./marketing_engine.db"

    class Config:
        env_file = ".env"
        extra = "ignore" # Ignore extra env vars

settings = Settings()
