"use client";

import { useCallback, useEffect, useState } from "react";

import ChatWindow from "@/components/ChatWindow";
import StreamingRenderer from "@/components/StreamingRenderer";
import { Message } from "@/types/chat";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("session_id");
    if (stored) {
      setSessionId(stored);
      return;
    }

    const id = crypto.randomUUID();
    sessionStorage.setItem("session_id", id);
    setSessionId(id);
  }, []);

  const handleToken = useCallback(
    (token: string) => {
      if (!assistantId) return;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? { ...message, content: message.content + token }
            : message,
        ),
      );
    },
    [assistantId],
  );

  const handleDone = useCallback(() => {
    if (assistantId) {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? { ...message, isStreaming: false }
            : message,
        ),
      );
    }
    setIsStreaming(false);
    setPendingMessage(null);
    setAssistantId(null);
  }, [assistantId]);

  const handleError = useCallback(
    (error: Error) => {
      console.error("Streaming error:", error);
      if (assistantId) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content:
                    "Unable to complete the response. Please verify the backend is running and try again.",
                  isStreaming: false,
                }
              : message,
          ),
        );
      }
      setIsStreaming(false);
      setPendingMessage(null);
      setAssistantId(null);
    },
    [assistantId],
  );

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isStreaming || !sessionId) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: text,
    };

    const newAssistantId = createId();
    const assistantMessage: Message = {
      id: newAssistantId,
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setAssistantId(newAssistantId);
    setInput("");
    setIsStreaming(true);
    setPendingMessage(text);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-950">
      <header className="border-b border-gray-800 px-4 py-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-base font-medium text-gray-100">Modular AI</h1>
          <p className="text-xs text-gray-500">Phase 1 — NLP Pipeline</p>
        </div>
      </header>

      <ChatWindow messages={messages} isStreaming={isStreaming} />

      {pendingMessage && sessionId && (
        <StreamingRenderer
          message={pendingMessage}
          sessionId={sessionId}
          onToken={handleToken}
          onDone={handleDone}
          onError={handleError}
        />
      )}

      <footer className="border-t border-gray-800 px-4 py-4 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder={isStreaming ? "Awaiting response..." : "Enter your message"}
            className="flex-1 rounded-md border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-gray-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-gray-100 transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
