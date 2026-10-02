from fastapi import APIRouter, Query

from memory.in_memory_store import InMemoryMemoryStore

router = APIRouter()
memory_store = InMemoryMemoryStore()


@router.get("/memory")
async def get_memory(session_id: str = Query(..., description="Session identifier")) -> dict[str, object]:
    context = memory_store.get_recent_context(session_id)
    return {
        "session_id": session_id,
        "short_term": context,
        "long_term": [],
        "semantic": [],
    }
