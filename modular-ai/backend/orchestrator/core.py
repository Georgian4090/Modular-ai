from typing import AsyncGenerator

from llm.base import BaseLLMClient
from orchestrator.intent import IntentAnalyzer
from personality.engine import PersonalityEngine
from postprocessing.filter import StreamingResponseFilter
from prompting.builder import PromptBuilder


class Orchestrator:
    def __init__(
        self,
        llm_client: BaseLLMClient,
        personality_engine: PersonalityEngine | None = None,
        prompt_builder: PromptBuilder | None = None,
        intent_analyzer: IntentAnalyzer | None = None,
    ) -> None:
        self.llm_client = llm_client
        self.personality_engine = personality_engine or PersonalityEngine()
        self.prompt_builder = prompt_builder or PromptBuilder(self.personality_engine)
        self.intent_analyzer = intent_analyzer or IntentAnalyzer()

    async def run(self, user_message: str) -> AsyncGenerator[str, None]:
        intent = self.intent_analyzer.analyze(user_message)
        messages = self.prompt_builder.build_messages(user_message, intent=intent.category)
        response_filter = StreamingResponseFilter()
        complete_response: list[str] = []

        # PHASE 2 HOOK: personality engine will inject tone + constraints here
        # PHASE 3 HOOK: memory retrieval will prepend context here
        # PHASE 4 HOOK: RAG pipeline will inject knowledge chunks here
        async for token in self.llm_client.stream(messages):
            filtered_token = response_filter.feed(token)
            if filtered_token:
                complete_response.append(filtered_token)
                yield filtered_token

        final_token = response_filter.finish()
        if final_token:
            complete_response.append(final_token)
            yield final_token