export function VoiceControls() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
      <button type="button" className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800">
        Listen
      </button>
      <button type="button" className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800">
        Voice input
      </button>
    </div>
  );
}
