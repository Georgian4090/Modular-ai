# Jaishankar AI — Phase 1 Skeleton

Jaishankar AI is a modular AI personality system designed to emulate the public communication style of S. Jaishankar (India's External Affairs Minister). The system is built with strategic autonomy and modularity in mind, allowing independent modules to slot into the orchestrator core.

This repository contains **Phase 1** of the implementation: a working full-stack skeleton with streaming chat, clean project structure, containerized environments, and a robust CI pipeline. No personality engine, memory, or RAG systems are integrated in this phase.

---

## 🗺️ Phase Map

- **Phase 1: Full-Stack Skeleton & CI (Current)**
  - Stateless orchestrator, SSE token streaming, Next.js UI, Docker containers, and GitHub Actions verification.
- **Phase 2: Personality Injection**
  - Injecting diplomatic principles, contextual modifiers, and custom system templates.
- **Phase 3: Session Memory**
  - Local database and Redis session storage integration for long-term memory retrieval.
- **Phase 4: RAG Retrieval**
  - External documentation/speech lookup via a vector database.

---

## 🛠️ Architecture & Structure

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

## 🚀 Getting Started

### 📋 Prerequisites

- **Python 3.11+**
- **Node.js 20+**
- **Docker & Docker Compose**

---

### 💻 Local Development (No Docker)

#### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy environment configuration and fill in the values:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

#### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env.local
   # Ensure NEXT_PUBLIC_API_URL is set to http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🐳 Running with Docker Compose

To spin up all services (backend, frontend, postgres stub, and redis stub) automatically:

1. Copy the `.env.example` in the project root to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Run docker compose:
   ```bash
   docker-compose up --build
   ```
3. The frontend is accessible at [http://localhost:3000](http://localhost:3000), and the backend API is at [http://localhost:8000](http://localhost:8000).

---

## 🧪 Verification & Testing

### Backend Tests
Execute unit and integration tests using pytest (ensures OpenAI calls are completely mocked):
```bash
cd backend
pytest tests/
```

### Linter Checks
Run Ruff checks on Python files:
```bash
ruff check backend/
```

Run ESLint checks on Next.js frontend:
```bash
cd frontend
npm run lint
```
