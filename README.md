# Modular AI — Phase 1 Skeleton

Modular AI is personality system designed to emulate the public communication style. The system is built with strategic autonomy and modularity in mind, allowing independent modules to slot into the orchestrator core.

This repository contains **Phase 1** of the implementation: a working full-stack skeleton with streaming chat, clean project structure, containerized environments, and a robust CI pipeline. No personality engine, memory, or RAG systems are integrated in this phase.


##  Architecture & Structure

The repository is divided into two primary subdirectories:

```
├── backend/
│   ├── api/
│   │   └── routes/
│   │       ├── chat.py          # POST /chat/stream (SSE stream)
│   │       └── health.py        # GET /health check
│   ├── config/
│   │   └── settings.py          # Pydantic BaseSettings config loader
│   ├── llm/
│   │   ├── base.py              # BaseLLMClient interface definition
│   │   └── openai_client.py     # OpenAI Client implementation (async)
│   ├── orchestrator/
│   │   └── core.py              # Main pipeline core (stateless stub)
│   ├── main.py                  # FastAPI server configuration
│   └── tests/                   # Pytest suite with mocked LLM streaming
├── frontend/
│   ├── app/                     # Next.js 14 App Router
│   ├── components/              # Chat layout and render components
│   ├── lib/                     # Client streaming API connection helper
│   ├── types/                   # TypeScript definitions
│   └── tailwind.config.js       # Styling configuration
├── docker-compose.yml           # Local multi-service environment
└── .github/workflows/ci.yml     # Continuous Integration pipeline
```

---

### 📋 Prerequisites

- **Python 3.11+**
- **Node.js 20+**
- **Docker & Docker Compose**

---

