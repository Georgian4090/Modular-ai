from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from orchestrator.core import Orchestrator

router = APIRouter()
orchestrator = Orchestrator()


class ChatRequest(BaseModel):
    message: str
    session_id: str


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest) -> StreamingResponse:
    async def event_generator():
        try:
            async for token in orchestrator.run(request.message):
                yield f"data: {token}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as exc:
            yield f"data: [ERROR] {str(exc)}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream",
        },
    )
