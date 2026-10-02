# Modular AI

Phase 1 provides a backend-only streaming chat pipeline. The frontend, memory,
RAG, database, authentication, and personality engine are intentionally not
included yet.

## Backend

From the project root:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Copy-Item .env.example .env
```

Add your real `OPENAI_API_KEY` to `backend/.env`, then start the API:

```powershell
uvicorn main:app --reload --port 8000
```

The service provides `GET /health` and `POST /chat/stream`. Chat responses are
sent as server-sent events and end with `data: [DONE]`.

## Tests

From the project root:

```powershell
cd backend
pytest tests/ -v
```

The chat test replaces the OpenAI client with a mock and does not require an
API key or network access.