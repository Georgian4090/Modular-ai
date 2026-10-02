from abc import ABC, abstractmethod
from typing import AsyncGenerator


class BaseLLMClient(ABC):
    @abstractmethod
    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        raise NotImplementedError