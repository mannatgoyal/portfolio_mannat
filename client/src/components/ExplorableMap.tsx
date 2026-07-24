import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Sparkles, Heart, BookOpen, Cpu, FlaskConical, Radio, Database } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface ExplorableMapProps {
  onSelectZone: (zone: string) => void;
  activeZone: string | null;
}

function RockySticker({ onClick }: { onClick: () => void }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bounce, setBounce] = useState(false);

  const quotes = [
    "Physics is constant across star systems.",
    "5 arms = 5 parallel processing threads.",
    "Good telemetry makes happy engineers.",
    "Fewer bugs than a 500Hz CAN bus stream.",
    "Got a question? Inspect the notebook!",
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setBounce(true);
    setTimeout(() => setBounce(false), 450);
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    onClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={playHoverSound}
      whileHover={{ scale: 1.10, rotate: [0, -3, 3, 0] }}
      animate={bounce ? { y: [-8, 0, -6, 0] } : { y: [0, -4, 0] }}
      transition={bounce ? { duration: 0.4 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative cursor-pointer select-none group z-40"
    >
      {/* Speech Bubble */}
      <motion.div
        key={quoteIndex}
        initial={{ opacity: 0, scale: 0.85, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-white border-2 border-black text-black font-hud text-[11px] rounded-full shadow-[2px_3px_0px_rgba(0,0,0,1)] z-50"
      >
        <span>{quotes[quoteIndex]}</span>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-black rotate-45" />
      </motion.div>

      {/* Hand-drawn Paper Sticker Body */}
      <div className="relative p-2.5 bg-white border-2 border-black rounded-2xl shadow-[4px_5px_0px_rgba(0,0,0,1)] flex flex-col items-center">
        <svg width="86" height="86" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Carapace shape (wobbly) */}
          <path
            d="M50 22 C32 24 24 38 28 58 C32 74 42 84 50 84 C58 84 68 74 72 58 C76 38 68 24 50 22 Z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Surface texture */}
          <path d="M40 32 L48 45" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M58 36 L54 50" stroke="black" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left raised arms */}
          <path d="M30 38 L14 20 M14 20 L8 28" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 46 L16 34" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Right raised arms */}
          <path d="M70 38 L86 20 M86 20 L92 28" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M68 46 L84 34" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Base legs */}
          <path d="M34 76 L22 92" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 82 L36 96" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M58 82 L64 96" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 76 L78 92" stroke="black" strokeWidth="2.5" strokeLinecap="round" />

          {/* Eyes */}
          <circle cx="44" cy="46" r="3.5" fill="white" stroke="black" strokeWidth="1.8" />
          <circle cx="56" cy="46" r="3.5" fill="white" stroke="black" strokeWidth="1.8" />
          <circle cx="44" cy="46" r="1" fill="black" />
          <circle cx="56" cy="46" r="1" fill="black" />
        </svg>

        <span className="font-hud text-[9px] font-bold text-black uppercase tracking-wider mt-0.5">
          ROCKY - COMPANION
        </span>
      </div>
    </motion.div>
  );
}

interface PaperZone {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  paperBg: string;
  tapeColor: string;
  x: number;
  y: number;
  rotation: number;
  bullets: string[];
}

export function ExplorableMap({ onSelectZone, activeZone }: ExplorableMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const springX = useSpring(0, { stiffness: 50, damping: 16 });
  const springY = useSpring(0, { stiffness: 50, damping: 16 });

  const paperZones: PaperZone[] = [
    {
      id: "hq",
      code: "SYS-01",
      title: "THE FLIGHT DECK",
      subtitle: "PILOT DIRECTIVE & CREDENTIALS",
      icon: <BookOpen className="w-5 h-5 text-black" />,
      accentColor: "#000000",
      paperBg: "#ffffff",
      tapeColor: "rgba(220, 210, 180, 0.5)",
      x: 50,
      y: 26,
      rotation: -1.2,
      bullets: ["TIET B.E. CompEng", "IIT Guwahati B.Sc. AI", "Team Fateh Manager"],
    },
    {
      id: "garage",
      code: "SYS-02",
      title: "THE EV WORKSHOP",
      subtitle: "FORMULA STUDENT FLEET & HARDWARE",
      icon: <Cpu className="w-5 h-5 text-black" />,
      accentColor: "#000000",
      paperBg: "#ffffff",
      tapeColor: "rgba(220, 210, 180, 0.5)",
      x: 78,
      y: 44,
      rotation: 2.2,
      bullets: ["TUFF 17 / 18 / 19 EV", "STM32 CAN Bus DAQ", "P45B / P50B Cells"],
    },
    {
      id: "lab",
      code: "SYS-03",
      title: "THE PHYSICS LAB",
      subtitle: "PHYSICS ML & PROJECT DOSSIERS",
      icon: <FlaskConical className="w-5 h-5 text-black" />,
      accentColor: "#000000",
      paperBg: "#ffffff",
      tapeColor: "rgba(220, 210, 180, 0.5)",
      x: 22,
      y: 44,
      rotation: -2.0,
      bullets: ["VoltNet PINN Battery", "HQML-BMS Thermal Model", "Strategy Simulator"],
    },
    {
      id: "archives",
      code: "SYS-04",
      title: "THE WHITEBOARD",
      subtitle: "RESEARCH DIRECTIONS & IDEAS",
      icon: <Radio className="w-5 h-5 text-black" />,
      accentColor: "#000000",
      paperBg: "#ffffff",
      tapeColor: "rgba(220, 210, 180, 0.5)",
      x: 79,
      y: 76,
      rotation: -1.8,
      bullets: ["Physical ML Systems", "AI Electrified Powertrains", "Edge Intelligence"],
    },
    {
      id: "capsule",
      code: "SYS-05",
      title: "THE CHRONOLOGY VAULT",
      subtitle: "MET TIMELINE & TROPHIES",
      icon: <Database className="w-5 h-5 text-black" />,
      accentColor: "#000000",
      paperBg: "#ffffff",
      tapeColor: "rgba(220, 210, 180, 0.5)",
      x: 21,
      y: 76,
      rotation: 1.6,
      bullets: ["SUPRA SAE P3 Winner", "Pi-EV 2024 Winner", "Formula Bharat Finalist"],
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      springX.set(normX * 10);
      springY.set(normY * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  const layer1X = useTransform(springX, (v) => v * 0.4);
  const layer1Y = useTransform(springY, (v) => v * 0.4);

  const layer2X = useTransform(springX, (v) => v * 0.8);
  const layer2Y = useTransform(springY, (v) => v * 0.8);

  return (
    <div
      ref={containerRef}
      className="map-viewport relative overflow-hidden select-none font-sans bg-[#fdfaf2]"
      style={{
        backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(194, 217, 255, 0.3) 27px, rgba(194, 217, 255, 0.3) 28px)",
        backgroundSize: "100% 28px",
      }}
    >
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none z-10" />

      {/* Layer 1: Sketchy Blueprint arrows */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-[-20px] pointer-events-none flex items-center justify-center z-10"
      >
        <svg className="w-full h-full max-w-6xl opacity-20" viewBox="0 0 1000 650" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sketchy dotted boxes */}
          <rect x="80" y="70" width="840" height="510" rx="20" stroke="black" strokeWidth="2.5" strokeDasharray="8 6" />
          {/* Sketchy link arrows */}
          <path d="M500,180 L780,280 M780,280 L790,490" stroke="black" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M500,180 L220,280 M220,280 L210,490" stroke="black" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </motion.div>

      {/* Layer 2: 2D Mind Map cards & mascot */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 max-w-6xl mx-auto flex items-center justify-center p-6 z-20"
      >
        <div className="relative w-full h-[620px] max-w-5xl">
          {/* Mascot in center */}
          <div className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40">
            <RockySticker onClick={() => onSelectZone("hq")} />
          </div>

          {/* Cards */}
          {paperZones.map((zone) => {
            const isSelected = activeZone === zone.id;

            return (
              <motion.div
                key={zone.id}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20"
                whileHover={{ scale: 1.05, rotate: 0, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  onClick={() => {
                    playClickSound();
                    onSelectZone(zone.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`notebook-panel p-4 w-60 bg-white hover:bg-zinc-50 transition-all cursor-pointer relative ${
                    isSelected ? "border-2 border-red-500 scale-103 shadow-[5px_6px_0px_rgba(239,68,68,1)]" : ""
                  }`}
                  style={{
                    transform: `rotate(${zone.rotation}deg)`,
                  }}
                >
                  {/* Tape decoration */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-yellow-100/50 border border-dashed border-black/10"
                    style={{ transform: "rotate(-2deg)" }}
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {zone.icon}
                      <span className="font-hud font-extrabold text-[11px] text-black uppercase">
                        {zone.title}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] border-2 border-black rounded px-1 font-bold">
                      {zone.code}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-hud mb-2 leading-tight">
                    {zone.subtitle}
                  </p>

                  <div className="space-y-1 mb-3">
                    {zone.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-zinc-700 font-bold">
                        <span className="w-1 h-1 rounded-full bg-black" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[9px] font-hud font-bold text-zinc-400">
                    <span className="group-hover:text-black uppercase">
                      [ Inspect Node ]
                    </span>
                    <span>-&gt;</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Layer 3: Margins and Overlays */}
      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-50">
        <div className="flex justify-between items-start">
          <div className="bg-white border-2 border-black text-black rounded-lg p-2.5 text-[11px] font-hud shadow-[2px_3px_0px_rgba(0,0,0,1)] hidden md:block">
            <div className="flex items-center gap-1.5 highlighter-yellow font-extrabold">
              <Sparkles className="w-3.5 h-3.5" /> MANNAT GOYAL
            </div>
            <div className="mt-0.5">ENGINEERING - MACHINE LEARNING</div>
          </div>
        </div>

        <div className="flex justify-between items-end text-[11px] font-hud font-bold text-black/60">
          <div>MANNAT GOYAL PORTFOLIO // SKETCHPAD MAP</div>
          <div className="flex items-center gap-1">
            <span>BUILT WITH SCIENCE</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
