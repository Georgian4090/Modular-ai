import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 px-4 py-3 bg-slate-900/50 rounded-2xl border border-slate-800/80 w-fit max-w-[100px]">
      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
    </div>
  );
}
