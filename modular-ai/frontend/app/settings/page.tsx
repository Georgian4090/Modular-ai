export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-12">
      <div className="mb-6 text-2xl font-semibold text-slate-100">Settings</div>
      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
        <div>
          <div className="mb-2 text-sm text-slate-400">Model</div>
          <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">gpt-4o-mini</div>
        </div>
        <div>
          <div className="mb-2 text-sm text-slate-400">Environment</div>
          <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">development</div>
        </div>
      </div>
    </main>
  );
}
