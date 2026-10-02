"use client";

import { useEffect } from "react";

import { streamChat } from "@/lib/api";

type StreamingRendererProps = {
  message: string;
  sessionId: string;
  assistantId: string;
  onToken: (assistantId: string, token: string) => void;
  onDone: (assistantId: string) => void;
};

export function StreamingRenderer({
  message,
  sessionId,
  assistantId,
  onToken,
  onDone,
}: StreamingRendererProps) {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        for await (const token of streamChat(message, sessionId)) {
          if (cancelled) {
            return;
          }
          onToken(assistantId, token);
        }
      } finally {
        if (!cancelled) {
          onDone(assistantId);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [assistantId, message, onDone, onToken, sessionId]);

  return null;
}
