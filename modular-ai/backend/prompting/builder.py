from personality.engine import PersonalityEngine


class PromptBuilder:
    def __init__(self, personality_engine: PersonalityEngine) -> None:
        self.personality_engine = personality_engine

    def build_messages(
        self,
        user_message: str,
        *,
        history: list[dict[str, str]] | None = None,
        intent: str = "general conversation",
        memory: str = "",
        rag_knowledge: str = "",
    ) -> list[dict[str, str]]:
        system_prompt = self.personality_engine.compose_system_prompt(
            context=f"Detected conversational intent: {intent}.",
            memory=memory,
            rag_knowledge=rag_knowledge,
        )
        return [
            {"role": "system", "content": system_prompt},
            *(history or []),
            {"role": "user", "content": user_message},
        ]