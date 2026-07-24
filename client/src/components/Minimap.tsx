import { Radio } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface MinimapProps {
  onSelectZone: (zone: string) => void;
  activeZone: string | null;
}

interface RadarNode {
  id: string;
  label: string;
  code: string;
  x: number;
  z: number;
  color: string;
  dotColor: string;
}

export function Minimap({ onSelectZone, activeZone }: MinimapProps) {
  const radarSize = 138;
  const center = radarSize / 2;
  const scale = 2.1;

  const nodes: RadarNode[] = [
    { id: "hq",       label: "BRIDGE",   code: "SYS-01", x: -4, z: -5, color: "text-cyan-400",   dotColor: "#38bdf8" },
    { id: "garage",   label: "HARDWARE", code: "SYS-02", x:  5, z: -8, color: "text-blue-400",   dotColor: "#3b82f6" },
    { id: "lab",      label: "RESEARCH", code: "SYS-03", x: -9, z:  5, color: "text-amber-400",  dotColor: "#f59e0b" },
    { id: "archives", label: "DOSSIERS", code: "SYS-04", x:  8, z:  6, color: "text-emerald-400",dotColor: "#10b981" },
    { id: "capsule",  label: "ARCHIVE",  code: "SYS-05", x: -9, z: -2, color: "text-indigo-400", dotColor: "#818cf8" },
  ];

  return (
    <div
      className="fixed bottom-5 right-5 font-mono z-30 pointer-events-auto w-52 select-none shadow-2xl"
      style={{
        background: "#080c14",
        border: "1px solid #1a2235",
        borderRadius: "3px",
        padding: "12px 14px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b pb-1.5 mb-2.5"
        style={{ borderColor: "#111826", fontSize: "11px" }}
      >
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>ORBITAL RADAR</span>
        </div>
        <span className="text-zinc-600">TAU CETI</span>
      </div>

      {/* Radar scope */}
      <div
        style={{
          width: `${radarSize}px`,
          height: `${radarSize}px`,
          background: "#050810",
          border: "1px solid #111826",
          borderRadius: "50%",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto 10px",
        }}
      >
        {/* Rotating sweep */}
        <div
          className="absolute inset-0 rounded-full origin-center animate-radar-sweep pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 65%, rgba(56,189,248,0.15))",
          }}
        />

        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: "100%", height: "1px", background: "#0d1620", position: "absolute" }} />
          <div style={{ width: "1px", height: "100%", background: "#0d1620", position: "absolute" }} />
        </div>

        {/* Concentric range rings */}
        {[40, 80].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              width: `${r}px`,
              height: `${r}px`,
              border: "1px solid #0f1825",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Radar nodes */}
        {nodes.map((node) => {
          const sx = center + node.x * scale;
          const sy = center + node.z * scale;
          const isActive = activeZone === node.id;
          return (
            <div
              key={node.id}
              onClick={() => { playClickSound(); onSelectZone(node.id); }}
              onMouseEnter={playHoverSound}
              title={`${node.code}: ${node.label}`}
              style={{
                position: "absolute",
                left: `${sx}px`,
                top: `${sy}px`,
                width: isActive ? "10px" : "8px",
                height: isActive ? "10px" : "8px",
                borderRadius: "50%",
                background: isActive ? "#ffffff" : node.dotColor,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: isActive
                  ? `0 0 0 3px rgba(56,189,248,0.35)`
                  : `0 0 4px ${node.dotColor}66`,
              }}
            />
          );
        })}
      </div>

      {/* Zone list */}
      <div style={{ borderTop: "1px solid #111826", paddingTop: "8px" }}>
        <div
          className="flex justify-between uppercase tracking-widest mb-1.5"
          style={{ fontSize: "10px", color: "#37455a" }}
        >
          <span>SUBSYSTEMS</span>
          <span className="text-emerald-400 font-bold">5 ONLINE</span>
        </div>
        <div className="space-y-1">
          {nodes.map((node) => {
            const isActive = activeZone === node.id;
            return (
              <button
                key={node.id}
                onMouseEnter={playHoverSound}
                onClick={() => { playClickSound(); onSelectZone(node.id); }}
                className="w-full flex items-center justify-between cursor-pointer transition-all"
                style={{
                  fontSize: "11px",
                  padding: "4px 8px",
                  background: isActive ? "rgba(56,189,248,0.06)" : "#060910",
                  border: `1px solid ${isActive ? "#2d4a6a" : "#111826"}`,
                  borderRadius: "2px",
                  color: isActive ? "#38bdf8" : "#5a6a7e",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: node.dotColor,
                      display: "inline-block",
                      flexShrink: 0,
                      boxShadow: `0 0 4px ${node.dotColor}66`,
                    }}
                  />
                  {node.label}
                </span>
                <span style={{ fontSize: "10px", color: "#37455a" }}>{node.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
