"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const history = [
  { id: "1", title: "Strategic overview", time: "2h ago" },
  { id: "2", title: "Regional outlook", time: "Yesterday" },
  { id: "3", title: "Policy framing memo", time: "3d ago" },
  { id: "4", title: "Decision analysis", time: "1w ago" },
];

function HexIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 2L24.39 8V20L14 26L3.61 20V8L14 2Z"
        fill="rgba(99,102,241,0.18)"
        stroke="#6366f1"
        strokeWidth="1.5"
      />
      <path
        d="M14 7L19.5 10.25V16.75L14 20L8.5 16.75V10.25L14 7Z"
        fill="#6366f1"
        opacity="0.7"
      />
    </svg>
  );
}

function ChatNavIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SettingsNavIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

type SidebarProps = { sessionId?: string };

export function Sidebar({ sessionId }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/chat", label: "Chat", icon: <ChatNavIcon /> },
    { href: "/settings", label: "Settings", icon: <SettingsNavIcon /> },
  ];

  return (
    <aside
      className="flex w-60 shrink-0 flex-col"
      style={{
        borderRight: "1px solid rgba(255,255,255,0.06)",
        background: "#09090f",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <HexIcon />
        <span className="text-sm font-semibold tracking-tight text-slate-100">Modular AI</span>
      </div>

      {/* Nav */}
      <nav className="px-2 pt-3">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition"
              style={{
                background: active ? "rgba(99,102,241,0.12)" : "transparent",
                color: active ? "#818cf8" : "#64748b",
                border: active ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
              }}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* New chat button */}
      <div className="px-2 pt-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5"
          style={{ color: "#475569", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <PlusIcon />
          New conversation
        </button>
      </div>

      {/* History */}
      <div className="mt-4 flex-1 overflow-y-auto px-2">
        <div
          className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "#334155" }}
        >
          Recent
        </div>
        <div className="space-y-0.5">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex w-full flex-col rounded-lg px-3 py-2 text-left transition hover:bg-white/5"
            >
              <span className="truncate text-xs font-medium text-slate-400">{item.title}</span>
              <span className="text-[10px]" style={{ color: "#334155" }}>{item.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Session badge */}
      {sessionId && (
        <div
          className="mx-2 mb-3 rounded-lg px-3 py-2.5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#334155" }}>
            Session
          </div>
          <div className="mt-0.5 font-mono text-[11px]" style={{ color: "#475569" }}>
            {sessionId.slice(0, 18)}…
          </div>
        </div>
      )}
    </aside>
  );
}
