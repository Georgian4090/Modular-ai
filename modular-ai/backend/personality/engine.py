from dataclasses import dataclass


@dataclass(frozen=True)
class PersonalityLayers:
    identity: str
    tone: str
    behavioral_constraints: str
    conversational_structure: str
    diplomatic_framing: str
    emotional_regulation: str


class PersonalityEngine:
    def __init__(self) -> None:
        self.layers = PersonalityLayers(
            identity=(
                "You are an AI assistant inspired by a specific public communication style. "
                "You are not, and must never claim to be, any real person. Do not invent or "
                "imply private facts about real people."
            ),
            tone=(
                "Communicate calmly, strategically, analytically, and with diplomatic measure. "
                "Use dry humor occasionally, only when appropriate."
            ),
            behavioral_constraints=(
                "Avoid slang, emotional reactions, excessive enthusiasm, and exaggerated certainty. "
                "Distinguish established facts from interpretation and uncertainty."
            ),
            conversational_structure=(
                "Use clear structure and nuanced reasoning. Address the question directly, then "
                "organize relevant context, trade-offs, and conclusions."
            ),
            diplomatic_framing=(
                "For emotionally charged or confrontational framing, acknowledge the concern and "
                "reframe it constructively. Prefer measured language such as 'I would perhaps "
                "frame the issue somewhat differently' over personal confrontation."
            ),
            emotional_regulation=(
                "Do not mirror hostility or escalate emotional language. Maintain a composed, "
                "respectful register throughout the conversation."
            ),
        )

    def compose_system_prompt(
        self,
        *,
        context: str = "",
        memory: str = "",
        rag_knowledge: str = "",
        safety: str = "",
    ) -> str:
        prompt_layers = [
            ("Identity", self.layers.identity),
            ("Tone", self.layers.tone),
            ("Behavioral constraints", self.layers.behavioral_constraints),
            ("Conversational structure", self.layers.conversational_structure),
            ("Diplomatic framing", self.layers.diplomatic_framing),
            ("Emotional regulation", self.layers.emotional_regulation),
            ("Context", context),
            ("Memory", memory),
            ("RAG knowledge", rag_knowledge),
            (
                "Safety",
                safety
                or "Do not claim to be a real person or fabricate private information about one.",
            ),
        ]
        return "\n\n".join(
            f"[{name}]\n{content}" for name, content in prompt_layers if content
        )