"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { ChatWindow } from "@/components/ChatWindow";
import { MemoryStatusPanel } from "@/components/MemoryStatusPanel";
import { Sidebar } from "@/components/Sidebar";
import { StreamingRenderer } from "@/components/StreamingRenderer";
import { Message } from "@/types/chat";

// ── icons (inline SVG to keep zero extra deps) ───────────────────────────────
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello. I am an AI assistant designed for measured, strategic dialogue. I will respond with calm analysis and diplomatic framing. How may I assist you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeStream, setActiveStream] = useState<{
    message: string;
    sessionId: string;
    assistantId: string;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Session init
  useEffect(() => {
    const stored = window.sessionStorage.getItem("modular-ai-session");
    if (stored) { setSessionId(stored); return; }
    const id = crypto.randomUUID();
    window.sessionStorage.setItem("modular-ai-session", id);
    setSessionId(id);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [input]);

  const handleToken = useCallback((assistantId: string, token: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, content: m.content + token, isStreaming: true } : m,
      ),
    );
  }, []);

  const handleStreamDone = useCallback((assistantId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === assistantId ? { ...m, isStreaming: false } : m)),
    );
    setIsStreaming(false);
    setActiveStream(null);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, []);

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !sessionId || isStreaming) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = { id: assistantId, role: "assistant", content: "", isStreaming: true };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsStreaming(true);
    setActiveStream({ message: trimmed, sessionId, assistantId });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = !!input.trim() && !!sessionId && !isStreaming;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#08080f" }}>
      {/* Left Sidebar */}
      <Sidebar sessionId={sessionId} />

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex shrink-0 items-center justify-between px-5 py-3"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(8,8,15,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span className="text-sm font-semibold text-slate-100">Strategic Advisory</span>
            <span className="text-xs text-slate-500">— measured, calm, structured</span>
          </div>
          {sessionId && (
            <div
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              Session: {sessionId.slice(0, 8)}
            </div>
          )}
        </header>

        {/* Body: messages + right panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <ChatWindow messages={messages} isStreaming={isStreaming} />

            {/* Input form */}
            <div
              className="shrink-0 px-4 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <form
                onSubmit={handleSubmit}
                className="relative flex items-end gap-2 rounded-2xl p-2"
                style={{
                  border: "1px solid rgba(99,102,241,0.2)",
                  background: "#0d0d18",
                  boxShadow: isStreaming ? "0 0 0 1px rgba(99,102,241,0.12)" : "none",
                  transition: "box-shadow 0.2s",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a strategic question… (Shift+Enter for newline)"
                  disabled={isStreaming}
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none disabled:opacity-50"
                  style={{ lineHeight: "1.6", maxHeight: "180px", overflowY: "auto" }}
                />
                {/* Voice button */}
                <button
                  type="button"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:text-slate-300"
                  title="Voice input"
                >
                  <MicIcon />
                </button>
                {/* Send button */}
                <button
                  type="submit"
                  disabled={!canSend}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white transition disabled:opacity-30"
                  style={{
                    background: canSend ? "#6366f1" : "rgba(99,102,241,0.3)",
                    boxShadow: canSend ? "0 0 12px rgba(99,102,241,0.4)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  <SendIcon />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[10px] text-slate-700">
                AI responses may be inaccurate. This system is not affiliated with any real individual.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <aside
            className="hidden w-72 shrink-0 overflow-y-auto p-4 xl:block"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <MemoryStatusPanel messageCount={messages.length} isStreaming={isStreaming} />
          </aside>
        </div>
      </div>

      {/* Hidden streaming engine */}
      {activeStream ? (
        <StreamingRenderer
          message={activeStream.message}
          sessionId={activeStream.sessionId}
          assistantId={activeStream.assistantId}
          onToken={handleToken}
          onDone={handleStreamDone}
        />
      ) : null}
    </div>
  );
}
