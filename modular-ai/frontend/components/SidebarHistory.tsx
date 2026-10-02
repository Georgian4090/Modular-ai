const history = [
  "Strategic overview",
  "Regional outlook",
  "Policy framing",
  "Decision memo",
];

export function SidebarHistory() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900/60 p-4 md:block">
      <div className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">History</div>
      <div className="space-y-2 text-sm text-slate-300">
        {history.map((item) => (
          <div key={item} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
            {item}
          </div>
        ))}
      </div>
    </aside>
  );
}
