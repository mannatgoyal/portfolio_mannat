import { useState } from "react";
import { BookOpen, Terminal as TermIcon } from "lucide-react";
import { playHoverSound, playClickSound, playPageFlipSound } from "@/lib/audio";
import { GrandGallery } from "@/components/GrandGallery";

export function ProjectsPage() {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      <GrandGallery />
    </div>
  );
}

export function StrategySandboxPage() {
  const [compound, setCompound] = useState<"soft" | "medium" | "hard">("medium");
  const [laps, setLaps] = useState(25);

  const calculateStats = () => {
    let basePace = 90.0;
    let degPerLap = 0.42;
    if (compound === "medium") {
      basePace = 91.2;
      degPerLap = 0.20;
    } else if (compound === "hard") {
      basePace = 92.8;
      degPerLap = 0.08;
    }

    const lapTimes: number[] = [];
    let totalTime = 0;
    for (let i = 0; i < laps; i++) {
      const t = basePace + i * degPerLap + Math.sin(i) * 0.12;
      lapTimes.push(t);
      totalTime += t;
    }
    const minutes = Math.floor(totalTime / 60);
    const seconds = (totalTime % 60).toFixed(2);
    return {
      bestLap: Math.min(...lapTimes).toFixed(2),
      lastLap: lapTimes[lapTimes.length - 1].toFixed(2),
      totalTime: `${minutes}m ${seconds}s`,
      lapTimes,
    };
  };

  const { bestLap, lastLap, totalTime, lapTimes } = calculateStats();
  const maxT = Math.max(...lapTimes);
  const minT = Math.min(...lapTimes);
  const range = maxT - minT || 1;
  const svgW = 280;
  const svgH = 65;
  const points = lapTimes
    .map((t, idx) => {
      const x = (idx / (laps - 1)) * (svgW - 20) + 10;
      const y = svgH - 8 - ((t - minT) / range) * (svgH - 16);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Strategy Simulator
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[EXH SANDBOX]</span>
        </div>

        {/* Strategy desk board content */}
        <div className="space-y-4 font-mono text-[#2d2621]">
          <div className="space-y-3">
            <div>
              <label className="block text-[9.5px] font-serif uppercase tracking-wider text-stone-400 mb-1 font-bold">
                TYRE COMPOUND PROFILE
              </label>
              <div className="flex gap-1">
                {(["soft", "medium", "hard"] as const).map((comp) => (
                  <button
                    key={comp}
                    onClick={() => {
                      setCompound(comp);
                      playClickSound();
                      if (comp === "soft") playPageFlipSound();
                    }}
                    className={`flex-1 py-1 font-serif text-[9.5px] uppercase cursor-pointer border-2 rounded-xl transition-all ${
                      compound === comp
                        ? "bg-[#e8dff5] border-[#2d2621] text-[#2d2621] font-bold shadow-[1.5px_1.5px_0px_rgba(43,38,34,1)]"
                        : "bg-white border-stone-300 text-stone-500 hover:border-stone-400"
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[9.5px] font-serif uppercase tracking-wider text-stone-400 mb-0.5 font-bold">
                STINT VELOCITY: <span className="text-[#2d2621] font-bold">{laps} LAPS</span>
              </label>
              <input
                type="range"
                min="10"
                max="40"
                value={laps}
                onChange={(e) => {
                  setLaps(Number(e.target.value));
                  if (Number(e.target.value) % 5 === 0) playHoverSound();
                }}
                className="w-full cursor-pointer accent-[#94b0a0] mt-1"
              />
            </div>
          </div>

          {/* Readout stats */}
          <div className="p-3 bg-[#fcf8f2] border-2 border-[#2d2621]/30 rounded-xl relative shadow-[2px_2px_0px_rgba(45,38,33,0.1)] space-y-1 text-[10px] text-stone-600 font-bold">
            <div className="flex justify-between">
              <span>BEST LAP:</span>
              <span className="text-[#94b0a0] font-bold">{bestLap}s</span>
            </div>
            <div className="flex justify-between">
              <span>DEGRADED LAP:</span>
              <span className="text-[#d68c45] font-bold">{lastLap}s</span>
            </div>
            <div className="flex justify-between border-t border-stone-250 pt-1 mt-1 font-serif text-[11px] text-[#2d2621]">
              <span>TOTAL STINT TIME:</span>
              <span className="font-bold">{totalTime}</span>
            </div>
          </div>
          
          {/* Sketchy SVG Graph */}
          <div className="border-2 border-stone-200/50 p-2 rounded-xl bg-white w-full flex flex-col items-center">
            <span className="text-[8px] font-serif text-stone-400 block mb-1 uppercase tracking-widest font-bold">
              STINT VELOCITY PROFILE CURVE
            </span>
            <svg width={svgW} height={svgH} className="overflow-visible">
              <line x1="0" y1="15" x2={svgW} y2="15" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="0.8" />
              <line x1="0" y1="30" x2={svgW} y2="30" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="0.8" />
              <line x1="0" y1="45" x2={svgW} y2="45" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="0.8" />
              
              <polyline 
                fill="none" 
                stroke={compound === "soft" ? "#d68c45" : "#94b0a0"} 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                points={points} 
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Experiments() {
  return null;
}
