from abc import ABC, abstractmethod
from typing import AsyncGenerator

class BaseLLMClient(ABC):
    @abstractmethod
    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        """
        Stream responses from the LLM based on list of input messages.
        
        Args:
            messages: A list of message dictionaries (e.g. [{"role": "user", "content": "..."}]).
            
        Yields:
            str: Next token chunk from the response.
        """
        pass
