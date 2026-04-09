from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Healthcare Helper API"
    ENVIRONMENT: str = "dev"
    DATABASE_URL: str = "sqlite:///../app.db"  # Running in backend/, root is ../
    REVIEWER_SECRET_TOKEN: str = "your-reviewer-secret-token"
    FRONTEND_URL: str = "http://localhost:5173"
    OPENAI_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file="../.env", case_sensitive=True, extra="ignore"
    )

settings = Settings()
