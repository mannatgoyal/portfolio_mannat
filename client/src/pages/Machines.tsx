import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Star } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface VehicleData {
  code: string;
  id: string;
  name: string;
  season: string;
  tag: string;
  desc: string;
  note: string;
  highlight?: string;
  specs: { label: string; val: string }[];
}

export default function Machines() {
  const [selectedCode, setSelectedCode] = useState<string>("B2");

  const vehicles: VehicleData[] = [
    {
      code: "A1",
      id: "TUFF 17",
      name: "TUFF 17",
      season: "2025 Build (Season 2024-25)",
      tag: "INAUGURAL",
      desc: "This was our first electric car, marking our transition to electric vehicles (EV). Powered by an Emrax 228 motor and a 285.6V accumulator, it served as our primary integration platform. We focused on mapping out low-voltage sensor interfaces and resolving early noise issues between the microcontroller and the high-voltage lines.",
      note: "Integration log: Successfully completed the low-voltage electronics integration and safety shutdown loops. Spent testing cycles debugging noise interference in the workshop to prepare for static design presentation.",
      highlight: "Pi-EV 2025 - Procurement Winners",
      specs: [
        { label: "DAQ / BRAIN", val: "ESP32 Custom Board" },
        { label: "MOTOR", val: "Emrax 228 (High Pitch Whine)" },
        { label: "INVERTER", val: "DTI HV550" },
        { label: "CELL STACK", val: "Molicel P45B (Extremely Heavy)" },
      ],
    },
    {
      code: "B2",
      id: "TUFF 18",
      name: "TUFF 18",
      season: "2026 Build (Season 2025-26)",
      tag: "COMPETITION",
      desc: "Our second-generation electric vehicle platform. Upgraded to an STM32F446RE custom microcontroller board for advanced low-voltage telemetry logging. At SUPRA SAE, we cleared Technical Inspection, successfully ran all dynamic events, and secured Design Winners and Overall 3rd in the EV Category.",
      note: "Telemetry log: Debugged the custom CAN links and low-voltage logging system. Recorded clean telemetry data during track testing, validating our sensor arrays under real dynamic discharge rates.",
      highlight: "SUPRA SAE 2026 - Overall P3 (EV), Design Winners, Statics P2 / Formula Bharat 2026 - Design Finalists!",
      specs: [
        { label: "DAQ / BRAIN", val: "STM32F446RE Custom Board" },
        { label: "MOTOR", val: "Emrax 228 (Still Muted)" },
        { label: "INVERTER", val: "DTI HV550" },
        { label: "CELL STACK", val: "Molicel P45B (Still Heavy)" },
      ],
    },
    {
      code: "C3",
      id: "TUFF 19",
      name: "TUFF 19",
      season: "Upcoming Build (Season 2026-27)",
      tag: "IN PROGRESS",
      desc: "Our upcoming build for the next competition season. Upgrading to Molicel P50B cells for the accumulator pack. We are integrating advanced temperature estimation and real-time state monitoring algorithms directly into the low-voltage control loop to safeguard cell health.",
      note: "Design brief: Designing the cell telemetry board layouts and low-voltage cable routing paths. Focused on structural shielding and noise isolation to protect data integrity on the CAN bus.",
      specs: [
        { label: "DAQ / BRAIN", val: "Next-Gen STM32 Node" },
        { label: "MOTOR", val: "Emrax 228 (High Torque)" },
        { label: "INVERTER", val: "DTI HV550" },
        { label: "CELL STACK", val: "Molicel P50B (Planned)" },
      ],
    },
  ];

  const activeVehicle = vehicles.find((v) => v.code === selectedCode) || vehicles[1];

  return (
    <div className="site-shell max-w-4xl mx-auto py-6 px-4">
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none" />

      {/* Header section */}
      <section className="mb-6 border-b-2 border-black pb-4 mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-hud text-2xl font-extrabold text-black uppercase tracking-tight">
            MY MACHINES &amp; FLEET
          </h1>
          <span className="text-zinc-500 font-hud text-[11px] block mt-1 uppercase">
            Formula Student Electric Racecars // 3 Generations
          </span>
        </div>
      </section>

      {/* Vehicle Registry Selection */}
      <section className="notebook-panel p-5 bg-[#ffffff] mb-8 relative">
        {/* Tape decoration */}
        <div className="absolute -top-3 left-10 w-20 h-4.5 bg-yellow-100/50 border border-dashed border-black/10 rotate-[-1deg]" />
        
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
          <span className="flex items-center gap-1.5 font-hud text-xs font-bold text-black uppercase">
            <Cpu className="w-4 h-4 text-black" /> Fleet Selector index
          </span>
          <span className="text-[11px] font-mono text-zinc-500 font-bold">3 ACTIVE VEHICLES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map((v) => {
            const isSelected = selectedCode === v.code;
            return (
              <button
                key={v.code}
                onClick={() => {
                  playClickSound();
                  setSelectedCode(v.code);
                }}
                onMouseEnter={playHoverSound}
                className={`text-left p-4 rounded border-2 border-black transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[#fffbeb] shadow-[3px_4px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                    : "bg-white hover:bg-zinc-50 shadow-[1px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[-0.5px]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-zinc-400 font-bold">[{v.code}]</span>
                  {isSelected && (
                    <span className="font-hud text-[8px] px-1.5 py-0.5 bg-yellow-200 border border-black rounded uppercase font-bold tracking-wider rotate-[2deg]">
                      selected
                    </span>
                  )}
                </div>
                <h3 className="font-hud text-md font-bold text-black leading-snug">{v.id}</h3>
                <p className="text-[13px] text-zinc-500 font-hud mt-0.5">{v.season}</p>
                
                <span className="font-hud text-[9px] border border-black px-1.5 py-0.5 bg-zinc-50 rounded uppercase font-bold inline-block mt-3">
                  {v.tag}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Vehicle details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {/* Main Description */}
          <div className="md:col-span-3 notebook-panel p-5 bg-white relative">
            {/* Washi tape at corner */}
            <div className="absolute -top-2 left-6 w-14 h-4 bg-yellow-100/50 border border-dashed border-black/10 rotate-[-4deg]" />

            <div className="flex items-start justify-between border-b border-black/10 pb-3 mb-4">
              <div>
                <h2 className="font-hud text-lg font-bold text-black uppercase">{activeVehicle.name}</h2>
                <p className="font-hud text-[11px] text-zinc-500 mt-0.5">{activeVehicle.season}</p>
              </div>
              <Zap className="w-5 h-5 text-black" />
            </div>

            <p className="text-[16px] text-zinc-800 leading-relaxed mb-5">
              {activeVehicle.desc}
            </p>

            {/* Engineering Field Notes (highlighted) */}
            <div className="p-4 bg-[#fffbeb] border-2 border-black border-dashed rounded relative">
              <span className="font-hud text-[10px] uppercase font-bold text-amber-800 bg-amber-100 border border-amber-800 px-2 py-0.5 rounded rotate-[-1.5deg] absolute -top-3.5 left-4">
                field log snippet
              </span>
              <p className="text-[15px] text-zinc-800 italic leading-relaxed pt-1.5">
                &quot;{activeVehicle.note}&quot;
              </p>
            </div>

            {/* Competition wins / badge */}
            {activeVehicle.highlight && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-pink-50 border-2 border-black rounded">
                <Star className="w-4 h-4 text-pink-600 fill-pink-600 flex-shrink-0" />
                <span className="font-hud text-xs font-bold text-pink-800 tracking-wide">
                  {activeVehicle.highlight}
                </span>
              </div>
            )}
          </div>

          {/* Blueprint and specifications column */}
          <div className="md:col-span-2 space-y-4">
            {/* Specifications card */}
            <div className="notebook-panel p-5 bg-white relative">
              <div className="absolute -top-3 right-6 w-14 h-4 bg-yellow-100/50 border border-dashed border-black/10 rotate-[2deg]" />
              
              <h3 className="font-hud text-xs font-bold text-black uppercase border-b border-black/10 pb-2.5 mb-3">
                BUILD SPECIFICATIONS SHEET
              </h3>

              <div className="space-y-3">
                {activeVehicle.specs.map((spec, idx) => (
                  <div key={idx} className="border-b border-black/5 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-hud text-[10px] text-zinc-400 block uppercase leading-none mb-1">
                      {spec.label}
                    </span>
                    <span className="text-[15px] font-mono text-black font-bold">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sketch / Blueprint Doodle */}
            <div className="notebook-panel p-4 bg-white flex flex-col items-center">
              <h3 className="font-hud text-[11px] font-bold text-black uppercase mb-2">
                2D CHASSIS &amp; DAQ SKETCH
              </h3>
              
              <svg width="100%" height="100" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wobbly chassis frame */}
                <path d="M10 50 L35 50 L55 25 L115 25 L135 50 L150 50" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M35 50 L115 50" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Wheels */}
                <circle cx="35" cy="55" r="12" stroke="black" strokeWidth="2.5" fill="white" />
                <circle cx="35" cy="55" r="4" fill="black" />
                <circle cx="115" cy="55" r="12" stroke="black" strokeWidth="2.5" fill="white" />
                <circle cx="115" cy="55" r="4" fill="black" />
                
                {/* Battery Accumulator pack doodle */}
                <rect x="58" y="32" width="22" height="15" fill="white" stroke="black" strokeWidth="1.8" />
                <line x1="62" y1="36" x2="76" y2="36" stroke="black" strokeWidth="1" />
                <line x1="62" y1="40" x2="76" y2="40" stroke="black" strokeWidth="1" />
                <line x1="62" y1="44" x2="76" y2="44" stroke="black" strokeWidth="1" />
                
                {/* STM32 Telemetry module doodle */}
                <rect x="86" y="34" width="14" height="12" fill="white" stroke="black" strokeWidth="1.8" />
                <circle cx="93" cy="40" r="2.5" fill="black" />
                
                {/* Arrow tags */}
                <path d="M69 32 L69 15 M69 15 L66 18 M69 15 L72 18" stroke="black" strokeWidth="1" />
                <text x="54" y="11" fill="black" fontSize="6" fontFamily="var(--font-hud)" fontWeight="bold">BATTERIES (HEAVY)</text>
                
                <path d="M93 34 L93 18 M93 18 L90 21 M93 18 L96 21" stroke="black" strokeWidth="1" />
                <text x="86" y="14" fill="black" fontSize="6" fontFamily="var(--font-hud)" fontWeight="bold">DAQ (MICRO)</text>
              </svg>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
