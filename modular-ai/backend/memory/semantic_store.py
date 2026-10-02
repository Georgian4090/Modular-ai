from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class SemanticDocument:
    text: str
    metadata: dict[str, str] = field(default_factory=dict)


class SemanticMemoryStore:
    def __init__(self) -> None:
        self.documents: list[SemanticDocument] = []

    def add_document(self, text: str, metadata: dict[str, str] | None = None) -> SemanticDocument:
        document = SemanticDocument(text=text, metadata=metadata or {})
        self.documents.append(document)
        return document

    def search(self, query: str, limit: int = 3) -> list[str]:
        normalized = query.casefold()
        matches = [
            doc.text
            for doc in self.documents
            if normalized in doc.text.casefold()
        ]
        return matches[:limit]

    def build_context_prompt(self, query: str, limit: int = 3) -> str:
        results = self.search(query, limit=limit)
        if not results:
            return "No relevant semantic context found."
        return "\n".join(f"- {result}" for result in results)
