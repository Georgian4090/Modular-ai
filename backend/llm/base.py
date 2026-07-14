from abc import ABC, abstractmethod
from collections.abc import AsyncGenerator


class BaseLLMClient(ABC):
    @abstractmethod
    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        pass
