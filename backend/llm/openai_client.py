from typing import AsyncGenerator
from openai import AsyncOpenAI
from backend.llm.base import BaseLLMClient
from backend.config.settings import settings

class OpenAIClient(BaseLLMClient):
    def __init__(self, api_key: str = None, model_name: str = None):
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model_name = model_name or settings.MODEL_NAME
        self.client = AsyncOpenAI(api_key=self.api_key)

    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        """
        Stream response tokens from OpenAI's Chat Completions API.
        """
        response = await self.client.chat.completions.create(
            model=self.model_name,
            messages=messages,  # type: ignore
            stream=True
        )
        async for chunk in response:
            if chunk.choices and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield delta.content
                    
        # TODO: Phase 2 — personality injection (future hook might go here or in orchestrator)
