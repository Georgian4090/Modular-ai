import ReactMarkdown from "react-markdown";

import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed md:max-w-[75%] md:text-base ${
          isUser
            ? "bg-gray-700 text-gray-100"
            : "border border-gray-800 bg-gray-900 text-gray-100"
        }`}
      >
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-200">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="rounded bg-gray-950 px-1 py-0.5 font-mono text-xs text-gray-300">
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          {message.isStreaming && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-gray-400 align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
