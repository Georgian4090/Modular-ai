'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';
import { Message } from '@/types/chat';
import { streamChat } from '@/lib/api';
import { Send, Globe, Trash2 } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generate or retrieve session ID
  useEffect(() => {
    let sid = sessionStorage.getItem('session_id');
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() : 'session-' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessageText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setStreamingContent('');

    try {
      const stream = await streamChat(userMessageText, sessionId);
      const reader = stream.getReader();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantResponse += value;
        setStreamingContent(assistantResponse);
      }

      // Append completed response to message history
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStreamingContent('');
    } catch (error) {
      console.error('Error during streaming chat:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '**Transmission Interrupt:** Failed to reach the response channels. Please verify connection and retry.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setStreamingContent('');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-950 to-slate-900">
      {/* Header bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-4 md:px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600/10 border border-indigo-500/30 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 tracking-tight text-lg">Jaishankar AI</h1>
            <p className="text-xs text-indigo-400 font-medium">Phase 1 Modular Skeleton</p>
          </div>
        </div>
        
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-red-400 text-xs font-medium transition-all duration-200"
            title="Clear Conversation"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        )}
      </header>

      {/* Main chat window container */}
      <ChatWindow
        messages={messages}
        streamingContent={streamingContent}
        isTyping={isTyping}
      />

      {/* Form prompt controller */}
      <footer className="border-t border-slate-800/80 bg-slate-950/40 px-4 md:px-8 py-4 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "Awaiting response..." : "Transmit message to the diplomat..."}
            className="flex-grow bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3.5 text-sm md:text-base text-slate-100 placeholder-slate-500 outline-none transition-all duration-300 shadow-inner focus:shadow-indigo-500/5 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-500 rounded-2xl px-5 py-3.5 flex items-center justify-center transition-all duration-300 font-medium hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}
