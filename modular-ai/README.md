# Modular AI

This project is now structured as a backend-first modular AI system with a
personality layer, session memory, and RAG knowledge hooks. The platform is
intentionally designed to remain extensible: the LLM client is abstracted,
conversation orchestration sits in one place, and memory/RAG are injected at
runtime instead of being hard-coded.

## Current backend capabilities

- FastAPI streaming chat endpoint: `POST /chat/stream`
- Health check: `GET /health`
- Session memory endpoint: `GET /memory?session_id=...`
- RAG document ingestion: `POST /rag/ingest`
- Personality prompt composition with layered identity, tone, behavior, and
  diplomatic framing rules
- In-memory memory and semantic stores for the working skeleton

## Quick start

From the project root:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Set your real `OPENAI_API_KEY` in `backend/.env`, then start the API:

```powershell
uvicorn main:app --reload --port 8000
```

## Docker Compose

From the project root:

```powershell
docker compose up --build
```

This starts the backend plus PostgreSQL, Redis, and ChromaDB placeholders used
for the modular architecture.

## Tests

```powershell
cd backend
pytest tests/ -v
```

## Project status

The working implementation is still backend-first, with no frontend yet. The
current phase is the modular conversation skeleton that supports personality,
short-term memory, and ingestion-ready semantic context without requiring
external services at startup.