export function TypingIndicator() {
  return (
    <div className="msg-in mb-5 flex items-center gap-3">
      {/* AI avatar */}
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
      >
        <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
          <path d="M14 2L24.39 8V20L14 26L3.61 20V8L14 2Z" fill="#6366f1" opacity="0.8" />
        </svg>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
        style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
