# Modular AI

A full-stack NLP conversational pipeline with a personality-driven persona inspired by the public communication style of S. Jaishankar. The system never claims to be the real person — it always identifies itself as an AI assistant inspired by that communication style.

**Phase 1** delivers a clean, extensible foundation: end-to-end streaming chat, modular backend hooks, and a minimal frontend. No memory, RAG, or personality engine yet — only the pipeline skeleton.

---

## Architecture

```
User Input
    ↓
Frontend (Next.js) — SSE client
    ↓
POST /chat/stream
    ↓
Orchestrator — message assembly + phase hooks
    ↓
OpenAIClient — token streaming
    ↓
SSE response → UI render
```

### Extension Hooks (Orchestrator)

| Phase | Hook | Future Module |
|-------|------|---------------|
| 2 | Personality engine | Tone rules, diplomatic constraints |
| 3 | Memory retrieval | Session context, conversation history |
| 4 | RAG pipeline | Knowledge chunks from documents |

---

## Project Structure

```
modular-ai/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/settings.py
│   ├── api/routes/
│   │   ├── chat.py
│   │   └── health.py
│   ├── llm/
│   │   ├── base.py
│   │   └── openai_client.py
│   ├── orchestrator/core.py
│   └── tests/
│       ├── test_health.py
│       └── test_chat.py
└── frontend/
    ├── app/
    ├── components/
    ├── lib/api.ts
    └── types/chat.ts
```

---

## Prerequisites

- Python 3.11+
- Node.js 20+
- OpenAI API key

---

## Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- macOS/Linux: `source venv/bin/activate`
- Windows: `venv\Scripts\activate`

```bash
pip install -r requirements.txt
cp .env.example .env        # Windows: copy .env.example .env
```

Add your real `OPENAI_API_KEY` to `.env`, then start the server:

```bash
uvicorn main:app --reload --port 8000
```

Health check: [http://localhost:8000/health](http://localhost:8000/health)

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to `/chat`.

Optional: set `NEXT_PUBLIC_API_URL` in `frontend/.env.local` if the backend is not on `http://localhost:8000`.

---

## Test Backend

```bash
cd backend
pytest tests/ -v
```

Tests mock the OpenAI client — no real API calls are made.

---

## API

### `GET /health`

```json
{ "status": "ok", "service": "modular-ai-backend" }
```

### `POST /chat/stream`

Request:

```json
{ "message": "Your question", "session_id": "uuid" }
```

Response: Server-Sent Events stream

```
data: token\n\n
data: [DONE]\n\n
```

---

## Constraints (Phase 1)

- Raw OpenAI SDK only — no LangChain or LlamaIndex
- No database or authentication
- All secrets via `.env`
- Persona disclaimer always visible in the UI
- Async/await throughout the backend
- TypeScript strict mode on the frontend
