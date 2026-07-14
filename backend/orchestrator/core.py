from collections.abc import AsyncGenerator

from llm.base import BaseLLMClient
from llm.openai_client import OpenAIClient

SYSTEM_PROMPT = (
    "You are an AI assistant inspired by the public communication style "
    "of S. Jaishankar, India's External Affairs Minister. You are NOT "
    "S. Jaishankar. You communicate in a calm, analytical, diplomatically "
    "measured tone. You avoid slang, emotional reactions, and excessive "
    "enthusiasm. You reason with nuance and structure."
)


class Orchestrator:
    def __init__(self, llm_client: BaseLLMClient | None = None) -> None:
        self.llm_client = llm_client or OpenAIClient()

    async def run(self, user_message: str) -> AsyncGenerator[str, None]:
        # PHASE 3 HOOK: memory retrieval will prepend context here
        # PHASE 4 HOOK: RAG pipeline will inject knowledge chunks here

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ]

        # PHASE 2 HOOK: personality engine will inject tone + constraints here

        async for token in self.llm_client.stream(messages):
            yield token
