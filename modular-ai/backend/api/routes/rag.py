from __future__ import annotations

from pydantic import BaseModel
from fastapi import APIRouter

from rag.ingest import IngestionService

router = APIRouter()
ingestion_service = IngestionService()


class IngestDocumentRequest(BaseModel):
    text: str
    metadata: dict[str, str] | None = None


@router.post("/rag/ingest")
async def ingest_document(payload: IngestDocumentRequest) -> dict[str, object]:
    document = ingestion_service.ingest(payload.text, payload.metadata)
    return {"status": "ok", "document": document}
