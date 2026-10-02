export function MemoryStatusPanel() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">System status</div>
      <ul className="space-y-2">
        <li>Redis: connected</li>
        <li>PostgreSQL: prepared</li>
        <li>ChromaDB: ready</li>
      </ul>
    </div>
  );
}
