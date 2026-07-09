from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config.settings import settings
from backend.api.routes import health, chat

app = FastAPI(
    title="Jaishankar AI Backend",
    description="Phase 1 skeleton backend supporting SSE streaming and modular architecture.",
    version="1.0.0"
)

# Configure CORS Origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router)
app.include_router(chat.router)
