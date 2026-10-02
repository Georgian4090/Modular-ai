from __future__ import annotations

from memory.semantic_store import SemanticMemoryStore


class RetrievalService:
    def __init__(self, semantic_store: SemanticMemoryStore | None = None) -> None:
        self.semantic_store = semantic_store or SemanticMemoryStore()

    def retrieve(self, query: str, limit: int = 3) -> list[str]:
        return self.semantic_store.search(query, limit=limit)
