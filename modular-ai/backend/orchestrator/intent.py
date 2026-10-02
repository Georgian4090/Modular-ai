from dataclasses import dataclass


@dataclass(frozen=True)
class Intent:
    category: str


class IntentAnalyzer:
    def analyze(self, message: str) -> Intent:
        normalized = message.casefold()
        if any(word in normalized for word in ("compare", "trade-off", "pros and cons")):
            return Intent("comparative analysis")
        if any(word in normalized for word in ("why", "how", "explain")):
            return Intent("explanation and analysis")
        if any(word in normalized for word in ("angry", "furious", "outraged", "disgusted")):
            return Intent("emotionally charged discussion")
        return Intent("general conversation")