from typing import AsyncGenerator

from llm.base import BaseLLMClient
from memory.in_memory_store import InMemoryMemoryStore
from memory.semantic_store import SemanticMemoryStore
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
        memory_store: InMemoryMemoryStore | None = None,
        semantic_store: SemanticMemoryStore | None = None,
    ) -> None:
        self.llm_client = llm_client
        self.personality_engine = personality_engine or PersonalityEngine()
        self.prompt_builder = prompt_builder or PromptBuilder(self.personality_engine)
        self.intent_analyzer = intent_analyzer or IntentAnalyzer()
        self.memory_store = memory_store or InMemoryMemoryStore()
        self.semantic_store = semantic_store or SemanticMemoryStore()

    async def run(self, user_message: str, session_id: str = "default") -> AsyncGenerator[str, None]:
        intent = self.intent_analyzer.analyze(user_message)
        memory_context = self.memory_store.build_context_prompt(session_id)
        rag_knowledge = self.semantic_store.build_context_prompt(user_message)

        self.memory_store.append(session_id, "user", user_message)
        messages = self.prompt_builder.build_messages(
            user_message,
            intent=intent.category,
            memory=memory_context,
            rag_knowledge=rag_knowledge,
        )
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

        self.memory_store.append(session_id, "assistant", "".join(complete_response))