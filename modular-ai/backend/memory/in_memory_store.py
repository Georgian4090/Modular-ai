from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class MemoryRecord:
    role: str
    content: str


class InMemoryMemoryStore:
    def __init__(self, max_entries: int = 12) -> None:
        self.max_entries = max_entries
        self._store: dict[str, list[MemoryRecord]] = {}

    def append(self, session_id: str, role: str, content: str) -> list[MemoryRecord]:
        entries = self._store.setdefault(session_id, [])
        entries.append(MemoryRecord(role=role, content=content))
        if len(entries) > self.max_entries:
            del entries[:-self.max_entries]
        return entries

    def get_recent_context(self, session_id: str, limit: int = 5) -> list[dict[str, str]]:
        entries = self._store.get(session_id, [])
        recent = entries[-limit:]
        return [{"role": entry.role, "content": entry.content} for entry in recent]

    def build_context_prompt(self, session_id: str, limit: int = 5) -> str:
        recent = self.get_recent_context(session_id, limit=limit)
        if not recent:
            return "No recent memory in session."
        return "\n".join(f"{entry['role']}: {entry['content']}" for entry in recent)
