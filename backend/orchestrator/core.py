from typing import AsyncGenerator
from backend.llm.base import BaseLLMClient
from backend.llm.openai_client import OpenAIClient

class Orchestrator:
    def __init__(self, llm_client: BaseLLMClient = None):
        self.llm_client = llm_client or OpenAIClient()

    async def run(self, user_message: str) -> AsyncGenerator[str, None]:
        """
        Run the orchestration pipeline. Currently a stateless stub calling the LLM directly.
        """
        # TODO: Phase 3 — memory retrieval
        # Retrieve context/chat history from memory modules.

        # TODO: Phase 4 — RAG retrieval
        # Retrieve context from vector search/document database.

        # Build prompt messages (stateless skeleton for now)
        messages = [
            {"role": "user", "content": user_message}
        ]

        # TODO: Phase 2 — personality injection
        # Intercept messages, inject system prompt, modify tone based on Jaishankar persona rules.

        # Stream tokens from the LLM client
        async for token in self.llm_client.stream(messages):
            yield token
