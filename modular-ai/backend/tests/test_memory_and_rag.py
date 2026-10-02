from fastapi.testclient import TestClient

from main import app


def test_memory_route_returns_session_context() -> None:
    client = TestClient(app)
    response = client.get("/memory", params={"session_id": "abc-123"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["session_id"] == "abc-123"
    assert "short_term" in payload
    assert payload["long_term"] == []


def test_rag_ingest_returns_status_and_document() -> None:
    client = TestClient(app)
    response = client.post(
        "/rag/ingest",
        json={"text": "India and the Indo-Pacific require strategic coordination.", "metadata": {"source": "demo"}},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["document"]["text"].startswith("India")
