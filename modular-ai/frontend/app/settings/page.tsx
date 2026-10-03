import Link from "next/link";

export default function SettingsPage() {
  const rows = [
    { label: "Model", value: "gpt-4o-mini" },
    { label: "Environment", value: "development" },
    { label: "LLM provider", value: "OpenAI" },
    { label: "Memory backend", value: "In-memory (dev)" },
    { label: "Vector store", value: "Semantic stub (dev)" },
    { label: "CORS origin", value: "http://localhost:3000" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#08080f" }}>
      {/* Minimal left nav */}
      <aside
        className="flex w-60 shrink-0 flex-col"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "#09090f" }}
      >
        <div className="flex items-center gap-2.5 px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L24.39 8V20L14 26L3.61 20V8L14 2Z" fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M14 7L19.5 10.25V16.75L14 20L8.5 16.75V10.25L14 7Z" fill="#6366f1" opacity="0.7" />
          </svg>
          <span className="text-sm font-semibold tracking-tight text-slate-100">Modular AI</span>
        </div>
        <nav className="px-2 pt-3">
          <Link
            href="/chat"
            className="mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition"
            style={{ color: "#64748b" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </Link>
          <Link
            href="/settings"
            className="mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition"
            style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-1 text-lg font-semibold text-slate-100">Settings</h1>
          <p className="mb-8 text-sm text-slate-500">Runtime configuration for the Modular AI backend.</p>

          <div
            className="divide-y rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0d1a" }}
          >
            {rows.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-sm text-slate-400">{label}</span>
                <span
                  className="rounded-md px-2.5 py-1 font-mono text-xs"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.18)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl p-5"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
          >
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "#6366f1" }}>
              Note
            </div>
            <p className="text-sm text-slate-500">
              These values are currently read from <code className="text-xs" style={{ color: "#818cf8" }}>backend/.env</code>.
              Persistent DB and vector store connections will be available in a future release.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
