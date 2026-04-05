import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AI Marketing Engine API"
    xai_api_key: str = os.getenv("XAI_API_KEY", "")
    database_url: str = "sqlite:///./marketing_engine.db"

    class Config:
        env_file = ".env"

settings = Settings()
