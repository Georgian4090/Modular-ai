from collections.abc import AsyncGenerator

from fastapi.testclient import TestClient

from api.routes import chat
from main import app


class MockOpenAIClient:
    async def stream(self, messages: list[dict]) -> AsyncGenerator[str, None]:
        assert messages[-1] == {"role": "user", "content": "Hello"}
        yield "Hello"
        yield " there"


def test_chat_stream_returns_mocked_tokens(monkeypatch) -> None:
    monkeypatch.setattr(chat.orchestrator, "llm_client", MockOpenAIClient())

    with TestClient(app) as client:
        response = client.post(
            "/chat/stream",
            json={"message": "Hello", "session_id": "test-session"},
        )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "Hello" in response.text
    assert "[DONE]" in response.text