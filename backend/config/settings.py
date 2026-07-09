import json
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = Field("default_key_to_be_replaced", env="OPENAI_API_KEY")
    MODEL_NAME: str = Field("gpt-4o-mini", env="MODEL_NAME")
    CORS_ORIGINS: list[str] = Field(["http://localhost:3000"], env="CORS_ORIGINS")

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            if not value.strip():
                return ["*"]
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    return parsed
            except json.JSONDecodeError:
                pass
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
