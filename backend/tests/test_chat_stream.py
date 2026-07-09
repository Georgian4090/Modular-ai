from unittest.mock import patch
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_chat_stream_endpoint():
    """
    Test that the chat/stream endpoint successfully returns a mocked SSE stream.
    No actual calls to OpenAI are made.
    """
    mock_tokens = ["Hello", " this", " is", " a", " skeleton", " response."]

    async def mock_stream(*args, **kwargs):
        for token in mock_tokens:
            yield token

    # Patch OpenAIClient.stream to yield our mocked tokens
    with patch("backend.llm.openai_client.OpenAIClient.stream", side_effect=mock_stream):
        response = client.post(
            "/chat/stream",
            json={"message": "Test Message", "session_id": "test-session-123"}
        )
        assert response.status_code == 200
        assert "text/event-stream" in response.headers["content-type"]

        content = response.content.decode("utf-8")
        # Build the expected SSE formatted stream body
        expected_content = "".join([f"data: {token}\n\n" for token in mock_tokens])
        assert content == expected_content
