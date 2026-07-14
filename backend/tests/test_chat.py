from unittest.mock import patch

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_chat_stream_endpoint() -> None:
    mock_tokens = ["Hello", " world", "."]

    async def mock_stream(*_args, **_kwargs):
        for token in mock_tokens:
            yield token

    with patch("llm.openai_client.OpenAIClient.stream", side_effect=mock_stream):
        response = client.post(
            "/chat/stream",
            json={"message": "Test message", "session_id": "test-session-123"},
        )

    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]

    content = response.content.decode("utf-8")
    expected = "".join(f"data: {token}\n\n" for token in mock_tokens) + "data: [DONE]\n\n"
    assert content == expected
