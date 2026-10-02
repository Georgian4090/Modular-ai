from typing import AsyncGenerator

from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import StreamingResponse

from config.settings import settings
from llm.openai_client import OpenAIClient
from orchestrator.core import Orchestrator

router = APIRouter()
orchestrator = Orchestrator(OpenAIClient(settings))


class ChatRequest(BaseModel):
    message: str
    session_id: str


@router.post("/chat/stream")
async def stream_chat(request: ChatRequest) -> StreamingResponse:
    async def event_stream() -> AsyncGenerator[str, None]:
        async for token in orchestrator.run(request.message, session_id=request.session_id):
            yield f"data: {token}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")