from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    MODEL_NAME: str = "gpt-4o-mini"
    CORS_ORIGINS: str = "http://localhost:3000"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/modular_ai"
    REDIS_URL: str = "redis://localhost:6379/0"
    CHROMA_HOST: str = "localhost"
    ELEVENLABS_API_KEY: str = ""
    JWT_SECRET: str = "development-secret"
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()