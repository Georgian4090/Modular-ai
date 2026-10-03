type MemoryStatusPanelProps = {
  messageCount?: number;
  isStreaming?: boolean;
};

type StatusDotProps = { color: string; glow?: boolean };
function StatusDot({ color, glow }: StatusDotProps) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
      style={{
        background: color,
        boxShadow: glow ? `0 0 5px ${color}` : "none",
      }}
    />
  );
}

type RowProps = { label: string; value: string; color: string; glow?: boolean };
function StatusRow({ label, value, color, glow }: RowProps) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex items-center gap-2">
        <StatusDot color={color} glow={glow} />
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <span className="text-[11px] font-medium" style={{ color }}>{value}</span>
    </div>
  );
}

const PERSONALITY_LAYERS = [
  "Identity",
  "Tone",
  "Behavioral constraints",
  "Conversational structure",
  "Diplomatic framing",
  "Emotional regulation",
];

export function MemoryStatusPanel({ messageCount = 0, isStreaming = false }: MemoryStatusPanelProps) {
  const memoryUsage = Math.min(Math.round((messageCount / 12) * 100), 100);

  return (
    <div className="space-y-4">
      {/* System status */}
      <div
        className="rounded-xl p-4"
        style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="mb-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "#334155" }}
        >
          System Status
        </div>
        <StatusRow label="Backend" value="Online" color="#22c55e" glow />
        <StatusRow label="Redis" value="Ready" color="#eab308" />
        <StatusRow label="ChromaDB" value="Ready" color="#eab308" />
        <StatusRow label="PostgreSQL" value="Prepared" color="#475569" />
      </div>

      {/* Memory */}
      <div
        className="rounded-xl p-4"
        style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="mb-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "#334155" }}
        >
          Session Memory
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">Window usage</span>
          <span className="text-[11px] font-mono" style={{ color: "#6366f1" }}>
            {messageCount}/12
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${memoryUsage}%`,
              background: memoryUsage > 80 ? "#f59e0b" : "#6366f1",
              boxShadow: `0 0 6px ${memoryUsage > 80 ? "rgba(245,158,11,0.4)" : "rgba(99,102,241,0.4)"}`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">RAG context</span>
          <span className="text-[11px] font-medium text-slate-600">In-memory stub</span>
        </div>
      </div>

      {/* Personality layers */}
      <div
        className="rounded-xl p-4"
        style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="mb-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "#334155" }}
        >
          Personality Layers
        </div>
        <div className="space-y-1.5">
          {PERSONALITY_LAYERS.map((layer) => (
            <div key={layer} className="flex items-center gap-2">
              <StatusDot color="#6366f1" glow />
              <span className="text-[11px] text-slate-500">{layer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live indicator */}
      {isStreaming && (
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3"
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "#6366f1", boxShadow: "0 0 6px #6366f1", animation: "cursor-blink 1s step-end infinite" }}
          />
          <span className="text-xs" style={{ color: "#818cf8" }}>Generating response…</span>
        </div>
      )}
    </div>
  );
}
