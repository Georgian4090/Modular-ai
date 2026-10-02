import re


class StreamingResponseFilter:
    _replacements = (
        (re.compile(r"\b(?:you're wrong|you are wrong)\b", re.IGNORECASE), "I would frame that differently"),
        (re.compile(r"\b(?:idiot|stupid)\b", re.IGNORECASE), "misguided"),
        (re.compile(r"\b gonna\b", re.IGNORECASE), " going to"),
        (re.compile(r"\b wanna\b", re.IGNORECASE), " want to"),
        (re.compile(r"\b gotta\b", re.IGNORECASE), " have to"),
        (re.compile(r"\b(obviously|undoubtedly)\b", re.IGNORECASE), "apparently"),
    )
    _holdback = 64

    def __init__(self) -> None:
        self._buffer = ""

    def feed(self, token: str) -> str:
        self._buffer += token
        if len(self._buffer) <= self._holdback:
            return ""

        safe_limit = len(self._buffer) - self._holdback
        split_at = self._buffer.rfind(" ", 0, safe_limit)
        if split_at < 0:
            return ""

        safe_text = self._buffer[: split_at + 1]
        self._buffer = self._buffer[split_at + 1 :]
        return self._transform(safe_text)

    def finish(self) -> str:
        remaining = self._transform(self._buffer)
        self._buffer = ""
        return remaining

    @classmethod
    def _transform(cls, text: str) -> str:
        for pattern, replacement in cls._replacements:
            text = pattern.sub(replacement, text)
        return text