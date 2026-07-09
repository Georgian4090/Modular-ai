from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from backend.orchestrator.core import Orchestrator

router = APIRouter()
orchestrator = Orchestrator()

class ChatRequest(BaseModel):
    message: str
    session_id: str

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Accepts user message and session id, runs through orchestrator, and returns
    an SSE stream of token chunks.
    """
    async def event_generator():
        try:
            async for token in orchestrator.run(request.message):
                # Yield SSE chunk
                yield f"data: {token}\n\n"
        except Exception as e:
            yield f"data: [ERROR] {str(e)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream",
        }
    )
