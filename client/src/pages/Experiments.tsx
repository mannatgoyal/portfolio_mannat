import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Terminal } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

function StrategyCalculator() {
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
      const t = basePace + i * degPerLap + Math.sin(i) * 0.15;
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
  const svgH = 60;
  const points = lapTimes
    .map((t, idx) => {
      const x = (idx / (laps - 1)) * (svgW - 10) + 5;
      const y = svgH - 6 - ((t - minT) / range) * (svgH - 12);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-4 p-4 bg-zinc-50 border-2 border-black border-dashed rounded relative text-black">
      <span className="font-hud text-[9px] uppercase font-bold text-black bg-yellow-100 border border-black px-1.5 py-0.5 rounded rotate-[-2deg] absolute -top-3 left-4">
        interactive calculator doodle
      </span>
      
      <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-3 mt-1">
        <span className="flex items-center gap-1 font-hud font-bold text-xs">
          <Terminal className="w-3.5 h-3.5" /> F1 STRATEGY CALCULATOR
        </span>
        <span className="text-[10px] font-mono text-zinc-500 font-bold">RL STINT PREDICTOR</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-hud uppercase font-bold mb-1">
              Tyre Compound Selection:
            </label>
            <div className="flex gap-1">
              {(["soft", "medium", "hard"] as const).map((comp) => (
                <button
                  key={comp}
                  onClick={() => {
                    setCompound(comp);
                    playClickSound();
                  }}
                  className={`flex-1 py-1 font-hud text-[10px] uppercase cursor-pointer border-2 transition-all ${
                    compound === comp
                      ? "bg-yellow-200 border-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      : "bg-white border-zinc-300 text-zinc-500"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-hud uppercase font-bold mb-1">
              Laps Before Pit Stop: <span className="underline font-bold">{laps} laps</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={laps}
              onChange={(e) => {
                setLaps(Number(e.target.value));
                playHoverSound();
              }}
              className="w-full cursor-pointer accent-black mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between p-3 bg-white border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,0.08)]">
          <div className="space-y-1 font-mono text-[11px] text-zinc-700 font-bold">
            <div>FASTEST LAP: <span className="text-emerald-700">{bestLap}s</span></div>
            <div>DEGRADED LAP: <span className="text-amber-700">{lastLap}s</span></div>
            <div>TOTAL STINT: <span className="text-blue-700">{totalTime}</span></div>
          </div>
          
          {/* Sketchy Graph */}
          <div className="mt-3 border-t border-black/10 pt-2 flex flex-col items-center">
            <span className="text-[8px] font-hud text-zinc-400 block mb-1">DEGRADATION PLOT</span>
            <div className="bg-zinc-50 border border-black p-1 rounded">
              <svg width={svgW} height={svgH} className="overflow-visible">
                {/* Reference lines */}
                <line x1="0" y1="15" x2={svgW} y2="15" stroke="rgba(194, 217, 255, 0.5)" strokeWidth="0.8" />
                <line x1="0" y1="30" x2={svgW} y2="30" stroke="rgba(194, 217, 255, 0.5)" strokeWidth="0.8" />
                <line x1="0" y1="45" x2={svgW} y2="45" stroke="rgba(194, 217, 255, 0.5)" strokeWidth="0.8" />
                
                {/* Line */}
                <polyline fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
                
                {/* Tiny stick figure race car on the plot */}
                <g transform={`translate(${svgW - 25}, ${svgH - 24})`}>
                  <rect x="0" y="4" width="16" height="6" rx="1.5" fill="white" stroke="black" strokeWidth="1.2" />
                  <circle cx="4" cy="11" r="2.5" fill="white" stroke="black" strokeWidth="1.2" />
                  <circle cx="12" cy="11" r="2.5" fill="white" stroke="black" strokeWidth="1.2" />
                  <path d="M12 4 L14 1 L16 1" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experiments() {
  const dossiers = [
    {
      id: "EXP-01",
      title: "Motorsport Race Strategy Engine",
      status: "SIMULATOR READY (FERRARI CALL ME)",
      statusClass: "highlighter-yellow",
      objective: "Figure out how many laps soft tyres survive before sliding around like butter. Pit stop planning using predictive models to avoid a classic Ferrari-style tyre blunder.",
      approach: "Game theory and reinforcement learning stint models. Use the interactive tool below. If you select Soft and set it to 40 laps, you will end up complaining like Lewis Hamilton about your tyres being gone, or get a Toto Wolff radio message saying 'No Mannat no, that was so not right' after crashing into the barriers. (Warning: Lance Stroll mode is enabled by default, causing a DNF in 10 laps).",
      tech: "Reinforcement Learning - Game Theory",
      github: "https://github.com/mannatgoyal/trust-strategy-motorsports",
      hasCalculator: true,
    },
    {
      id: "EXP-02",
      title: "DQN Cyberattack Mitigation Agent",
      status: "SHIELD ACTIVE",
      statusClass: "highlighter-blue",
      objective: "Detect network anomalies and stop malicious cyberattacks in real-time on host networks.",
      approach: "A machine learning XGBoost model identifies malicious traffic patterns, while a DQN reinforcement learning agent automates the firewall block response to defend servers. Basically, a self-learning digital bouncer.",
      tech: "Random Forest - XGBoost - DQN Agent",
      github: "https://github.com/mannatgoyal/cyberattack_detect",
      hasCalculator: false,
    },
    {
      id: "EXP-03",
      title: "VoltQuant: Quantum Battery Predictor",
      status: "CAPSTONE RESEARCH",
      statusClass: "highlighter-yellow",
      objective: "Predict cell State of Health and spot anomalies before the battery pack does a Haas-style smoke show.",
      approach: "AngleEmbedding and ZZFeatureMaps feeding into parameterized quantum circuits (PQCs). Highly needed because the mechanical guys designed a sidepod cooling duct that looks cool but has zero airflow, almost causing a Haas-style smoke show during tests.",
      tech: "PennyLane - Qiskit - Hybrid Quantum ML",
      github: "https://github.com/mannatgoyal",
      hasCalculator: false,
    },
    {
      id: "EXP-04",
      title: "Image Forgery Localization Pipeline",
      status: "PHOTOSHOP DETECTOR",
      statusClass: "highlighter-pink",
      objective: "Find out if someone edited a photo to make themselves look cool, or if the mechanics photoshopped more clearance for the battery.",
      approach: "Compression-aware image forgery detection using ResNet18 and Grad-CAM weak localization. Great for checking if the mechanical team actually ran FEA stress simulations or if they just colored the brackets red in MS Paint.",
      tech: "ResNet18 - PyTorch - Computer Vision",
      github: "https://github.com/mannatgoyal/image-forensics",
      hasCalculator: false,
    },
    {
      id: "EXP-05",
      title: "Team Fateh Digital Platform & Blogs",
      status: "LIVE (DONT CRASH IT)",
      statusClass: "highlighter-green",
      objective: "Make a high-performance website so the team looks professional to corporate sponsors who have actual money.",
      approach: "React and Next.js. Displays vehicle data logs, team timelines, and sponsor slides. Also hosts our engineering blogs. The database is held together by hope, because the database admin keeps changing the password and forgetting it.",
      tech: "React - Next.js - TailwindCSS",
      github: "https://teamfateh.com/",
      hasCalculator: false,
    },
  ];

  return (
    <div className="site-shell max-w-4xl mx-auto py-6 px-4">
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none" />

      {/* Header section */}
      <section className="mb-6 border-b-2 border-black pb-4 mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-hud text-2xl font-extrabold text-black uppercase tracking-tight">
            ENGINEERING EXPERIMENTS
          </h1>
          <span className="text-zinc-500 font-hud text-[11px] block mt-1 uppercase">
            Active Dossiers // Prototypes &amp; Software Systems
          </span>
        </div>
      </section>

      {/* Dossiers Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dossiers.map((d, idx) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            onMouseEnter={playHoverSound}
            className="notebook-panel p-5 bg-white flex flex-col justify-between relative hover:translate-y-[-1px] transition-all group"
          >
            {/* Corner tape decor */}
            <div className="absolute -top-2.5 right-6 w-12 h-3.5 bg-yellow-100/40 border border-dashed border-black/10 rotate-[-3deg]" />

            <div className="space-y-3">
              {/* Dossier ID & Status */}
              <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                <span className="font-mono text-[10px] text-zinc-400 font-bold">{d.id}</span>
                <span className={`font-hud text-[9px] uppercase font-bold px-2 py-0.5 rounded ${d.statusClass} border border-black/10`}>
                  {d.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-hud text-md font-bold text-black group-hover:text-blue-600 transition-colors leading-snug">
                {d.title}
              </h3>

              {/* Description body */}
              <div className="space-y-3 text-[14px] text-zinc-700 leading-relaxed font-sans">
                <div>
                  <strong className="font-hud text-[9px] text-zinc-400 block uppercase mb-0.5">
                    Objective:
                  </strong>
                  <p>{d.objective}</p>
                </div>
                <div>
                  <strong className="font-hud text-[9px] text-zinc-400 block uppercase mb-0.5">
                    Approach:
                  </strong>
                  <p>{d.approach}</p>
                </div>
              </div>
            </div>

            {/* Footer with links and embeds */}
            <div className="pt-3 border-t border-black/10 mt-4 space-y-3">
              <div className="text-[12px] text-zinc-600">
                <span className="font-hud font-bold text-[9px] text-zinc-400 uppercase">TECH: </span>
                <span className="font-mono font-bold text-[11px] text-black bg-zinc-50 border border-black/10 px-1 rounded">{d.tech}</span>
              </div>

              <a
                href={d.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="diary-btn flex items-center justify-center gap-1.5 py-1.5 w-full text-center"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Inspect Repository</span>
              </a>

              {d.hasCalculator && <StrategyCalculator />}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
