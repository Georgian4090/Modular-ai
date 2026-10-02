from __future__ import annotations

from memory.semantic_store import SemanticMemoryStore


class IngestionService:
    def __init__(self, semantic_store: SemanticMemoryStore | None = None) -> None:
        self.semantic_store = semantic_store or SemanticMemoryStore()

    def ingest(self, text: str, metadata: dict[str, str] | None = None) -> dict[str, object]:
        document = self.semantic_store.add_document(text, metadata=metadata or {})
        return {"text": document.text, "metadata": document.metadata}
