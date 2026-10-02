"use client";

import { useEffect, useRef } from "react";

import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Message } from "@/types/chat";

type ChatWindowProps = {
  messages: Message[];
  isStreaming: boolean;
};

export function ChatWindow({ messages, isStreaming }: ChatWindowProps) {
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4 sm:px-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isStreaming ? <TypingIndicator /> : null}
      <div ref={scrollAnchorRef} />
    </div>
  );
}
