import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/chat';
import { User, Compass } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-3 animate-fade-in`}>
      <div className={`flex items-start max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar badge */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
          isUser 
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20' 
            : 'bg-slate-900 border-slate-800 text-indigo-400'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4 animate-spin-slow" />}
        </div>

        {/* Content body */}
        <div className={`px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10'
            : 'bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-100 rounded-tl-none'
        }`}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                strong: ({ children }) => <strong className="font-semibold text-indigo-300">{children}</strong>,
                code: ({ children }) => <code className="bg-slate-950 px-1 py-0.5 rounded text-indigo-400 font-mono text-xs">{children}</code>
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
