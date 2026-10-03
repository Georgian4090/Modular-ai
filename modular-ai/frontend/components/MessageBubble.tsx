import ReactMarkdown from "react-markdown";

import { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

function UserAvatar() {
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
      style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}
    >
      U
    </div>
  );
}

function AIAvatar() {
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
    >
      <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L24.39 8V20L14 26L3.61 20V8L14 2Z" fill="#6366f1" opacity="0.8" />
      </svg>
    </div>
  );
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`msg-in mb-5 flex gap-3 ${isAssistant ? "justify-start" : "justify-end flex-row-reverse"}`}>
      {isAssistant ? <AIAvatar /> : <UserAvatar />}

      <div
        className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={
          isAssistant
            ? {
                background: "#0d0d1a",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#cbd5e1",
              }
            : {
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#e2e8f0",
              }
        }
      >
        <div className="markdown-body">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {message.isStreaming ? (
          <span
            className="cursor-blink mt-1 inline-block h-3.5 w-0.5 rounded-full align-middle"
            style={{ background: "#6366f1" }}
          />
        ) : null}
      </div>
    </div>
  );
}
