import React, { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import StreamingRenderer from './StreamingRenderer';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  streamingContent: string;
  isTyping: boolean;
}

export default function ChatWindow({ messages, streamingContent, isTyping }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, isTyping]);

  return (
    <div className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
      <div className="max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-slate-950/20">
              <span className="text-2xl text-indigo-400 animate-pulse">💬</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-200 mb-2">Diplomatic Channels Open</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Ask about international relations, national sovereignty, or strategic autonomy in a style inspired by S. Jaishankar.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}

        {/* Display streaming tokens */}
        {streamingContent && <StreamingRenderer content={streamingContent} />}

        {/* Show typing indicator only when we are loading and stream is starting */}
        {isTyping && !streamingContent && (
          <div className="flex w-full justify-start my-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-slate-900 border-slate-800 text-indigo-400">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              </div>
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
