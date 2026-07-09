import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Compass } from 'lucide-react';

interface StreamingRendererProps {
  content: string;
}

export default function StreamingRenderer({ content }: StreamingRendererProps) {
  if (!content) return null;

  return (
    <div className="flex w-full justify-start my-3 animate-fade-in">
      <div className="flex items-start max-w-[85%] md:max-w-[75%] gap-3 flex-row">
        
        {/* Avatar badge */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-slate-900 border-slate-800 text-indigo-400">
          <Compass className="w-4 h-4 animate-spin-slow" />
        </div>

        {/* Content body */}
        <div className="px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-100 rounded-tl-none">
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
              {content}
            </ReactMarkdown>
            {/* Pulsing inline cursor */}
            <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
          </div>
        </div>
      </div>
    </div>
  );
}
