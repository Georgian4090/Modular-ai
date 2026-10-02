"use client";

import { FormEvent, useEffect, useState } from "react";

import { ChatWindow } from "@/components/ChatWindow";
import { MemoryStatusPanel } from "@/components/MemoryStatusPanel";
import { SidebarHistory } from "@/components/SidebarHistory";
import { StreamingRenderer } from "@/components/StreamingRenderer";
import { VoiceControls } from "@/components/VoiceControls";
import { Message } from "@/types/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "This is an AI assistant inspired by a specific public communication style. I will respond with measured analysis and diplomatic framing.",
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

  useEffect(() => {
    const storedSession = window.sessionStorage.getItem("modular-ai-session");
    if (storedSession) {
      setSessionId(storedSession);
      return;
    }

    const generatedId = crypto.randomUUID();
    window.sessionStorage.setItem("modular-ai-session", generatedId);
    setSessionId(generatedId);
  }, []);

  const handleToken = (assistantId: string, token: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === assistantId
          ? { ...message, content: message.content + token, isStreaming: true }
          : message,
      ),
    );
  };

  const handleStreamDone = (assistantId: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === assistantId ? { ...message, isStreaming: false } : message,
      ),
    );
    setIsStreaming(false);
    setActiveStream(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || !sessionId || isStreaming) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsStreaming(true);
    setActiveStream({ message: trimmedInput, sessionId, assistantId });
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-4 sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
        <SidebarHistory />

        <section className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <div className="text-lg font-semibold text-slate-100">Strategic advisory</div>
              <div className="text-xs text-slate-400">Measured, calm, and structured</div>
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Session: {sessionId.slice(0, 8)}</div>
          </header>

          <div className="flex flex-1 gap-4 p-4">
            <div className="flex-1">
              <ChatWindow messages={messages} isStreaming={isStreaming} />

              <form onSubmit={handleSubmit} className="border-t border-slate-800 px-3 py-4">
                <div className="flex flex-col gap-3">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask a strategic question..."
                    className="min-h-[96px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <VoiceControls />
                    <button
                      type="submit"
                      disabled={!input.trim() || isStreaming || !sessionId}
                      className="rounded-xl border border-slate-700 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="hidden w-72 shrink-0 lg:block">
              <MemoryStatusPanel />
            </div>
          </div>
        </section>
      </div>

      {activeStream ? (
        <StreamingRenderer
          message={activeStream.message}
          sessionId={activeStream.sessionId}
          assistantId={activeStream.assistantId}
          onToken={handleToken}
          onDone={handleStreamDone}
        />
      ) : null}
    </main>
  );
}
