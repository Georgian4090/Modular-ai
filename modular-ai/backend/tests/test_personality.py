from personality.engine import PersonalityEngine


def test_personality_prompt_contains_identity_and_six_sub_layers() -> None:
    prompt = PersonalityEngine().compose_system_prompt()

    assert "You are an AI assistant inspired by a specific public communication style." in prompt
    assert "must never claim to be" in prompt
    assert "[Tone]" in prompt
    assert "[Behavioral constraints]" in prompt
    assert "[Conversational structure]" in prompt
    assert "[Diplomatic framing]" in prompt
    assert "[Emotional regulation]" in prompt
    assert "[Safety]" in prompt


def test_personality_prompt_accepts_runtime_context_layers() -> None:
    prompt = PersonalityEngine().compose_system_prompt(
        context="Context notes",
        memory="Remembered preference",
        rag_knowledge="Retrieved source",
        safety="Do not disclose secrets",
    )

    assert "[Context]\nContext notes" in prompt
    assert "[Memory]\nRemembered preference" in prompt
    assert "[RAG knowledge]\nRetrieved source" in prompt
    assert "[Safety]\nDo not disclose secrets" in prompt