import ReactMarkdown from "react-markdown";

import { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`mb-4 flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm",
          isAssistant
            ? "border-slate-700 bg-slate-800 text-slate-100"
            : "border-sky-700 bg-sky-600/20 text-slate-100",
        ].join(" ")}
      >
        <div className="markdown-body text-sm leading-6">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {message.isStreaming ? <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-full bg-slate-200 align-middle" /> : null}
      </div>
    </div>
  );
}
