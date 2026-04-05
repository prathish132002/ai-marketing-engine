import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AI Marketing Engine API"
    xai_api_key: str = os.getenv("XAI_API_KEY", "")
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
    # Reads DATABASE_URL from .env — falls back to local SQLite for development
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./marketing_engine.db")

    class Config:
        env_file = ".env"

settings = Settings()
