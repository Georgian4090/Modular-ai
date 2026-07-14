import { useEffect, useRef } from "react";

import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
  isStreaming: boolean;
}

export default function ChatWindow({ messages, isStreaming }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const streamingMessage = messages.find((message) => message.isStreaming);
  const completedMessages = messages.filter((message) => !message.isStreaming);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="mb-2 text-lg font-medium text-gray-200">
              Modular AI
            </h2>
            <p className="mx-auto max-w-md text-sm text-gray-500">
              A diplomatic conversational assistant inspired by measured public
              communication. Ask a question to begin.
            </p>
          </div>
        )}

        {completedMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {streamingMessage && (
          <MessageBubble key={streamingMessage.id} message={streamingMessage} />
        )}

        {isStreaming && !streamingMessage?.content && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-gray-800 bg-gray-900">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
