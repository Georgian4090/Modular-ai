from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from config.settings import settings
from llm.base import BaseLLMClient


class OpenAIClient(BaseLLMClient):
    def __init__(self, api_key: str | None = None, model_name: str | None = None) -> None:
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model_name = model_name or settings.MODEL_NAME
        self.client = AsyncOpenAI(api_key=self.api_key)

    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        response = await self.client.chat.completions.create(
            model=self.model_name,
            messages=messages,  # type: ignore[arg-type]
            stream=True,
        )

        async for chunk in response:
            if chunk.choices and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
