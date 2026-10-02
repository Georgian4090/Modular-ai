from typing import AsyncGenerator

from openai import AsyncOpenAI

from config.settings import Settings, settings
from llm.base import BaseLLMClient


class OpenAIClient(BaseLLMClient):
    def __init__(self, app_settings: Settings = settings) -> None:
        self._settings = app_settings

    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        if not self._settings.OPENAI_API_KEY:
            raise RuntimeError("OPENAI_API_KEY must be set in backend/.env to use chat.")

        async with AsyncOpenAI(api_key=self._settings.OPENAI_API_KEY) as client:
            response = await client.chat.completions.create(
                model=self._settings.MODEL_NAME,
                messages=messages,
                stream=True,
            )
            async for chunk in response:
                if chunk.choices:
                    token = chunk.choices[0].delta.content
                    if token:
                        yield token