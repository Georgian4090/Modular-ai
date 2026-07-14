"use client";

import { useEffect } from "react";

import { streamChat } from "@/lib/api";

interface StreamingRendererProps {
  message: string;
  sessionId: string;
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

export default function StreamingRenderer({
  message,
  sessionId,
  onToken,
  onDone,
  onError,
}: StreamingRendererProps) {
  useEffect(() => {
    let cancelled = false;

    async function consumeStream() {
      try {
        for await (const token of streamChat(message, sessionId)) {
          if (cancelled) return;
          onToken(token);
        }
        if (!cancelled) onDone();
      } catch (error) {
        if (!cancelled) {
          onError(error instanceof Error ? error : new Error("Stream failed"));
        }
      }
    }

    void consumeStream();

    return () => {
      cancelled = true;
    };
  }, [message, sessionId, onToken, onDone, onError]);

  return null;
}
