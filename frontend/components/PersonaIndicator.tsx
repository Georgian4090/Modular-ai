import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function PersonaIndicator() {
  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-4 py-3 text-center transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2.5 text-xs md:text-sm text-slate-300">
        <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
        <span className="font-medium tracking-wide">
          This is an AI assistant inspired by the public communication style of S. Jaishankar. It is not affiliated with or representative of the real individual.
        </span>
      </div>
    </div>
  );
}
