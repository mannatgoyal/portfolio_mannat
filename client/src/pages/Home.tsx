import { playClickSound, playHoverSound, playPageFlipSound } from "@/lib/audio";
import { ArrowRight, BookOpen, Compass, Star } from "lucide-react";

interface CoverPageProps {
  onOpen: () => void;
}

export function CoverPage({ onOpen }: CoverPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-8 text-center relative overflow-hidden select-none">
      
      {/* Decorative cover borders and doodles */}
      <div className="absolute inset-4 border-4 border-double border-[#2d2621]/40 rounded-lg pointer-events-none" />

      {/* Whimsical Y2K title stamps */}
      <div className="space-y-4 pt-12">
        <span className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase">
          ★ PERSONAL CHRONICLE ★
        </span>
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-black text-[#2d2621] tracking-tight leading-none uppercase">
            Mannat Goyal
          </h1>
          <h2 className="text-[12px] font-mono text-[#94b0a0] font-bold uppercase tracking-widest pt-1.5">
            Systems Engineering &amp; AI Journal
          </h2>
        </div>
      </div>

      {/* Doodle sketch in center cover */}
      <div className="flex justify-center my-6 opacity-80">
        <svg width="120" height="90" viewBox="0 0 100 80" className="overflow-visible">
          {/* Cover central stamp - flower / star design */}
          <circle cx="50" cy="40" r="28" fill="none" stroke="#2d2621" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="40" r="24" fill="none" stroke="#2d2621" strokeWidth="1.5" />
          <path d="M 50 18 Q 50 40 32 32 Q 50 40 50 62 Q 50 40 68 48 Z" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
          <path d="M 50 18 Q 50 40 68 32 Q 50 40 50 62 Q 50 40 32 48 Z" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
          <circle cx="50" cy="40" r="5" fill="#fcf4dd" stroke="#2d2621" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Book title metadata */}
      <div className="space-y-6 pb-12">
        <div className="text-[11px] font-mono text-stone-400 font-bold leading-normal uppercase">
          THAPAR INST COMPUTER ENGINEERING<br />
          IIT GUWAHATI DATA SCIENCE &amp; AI
        </div>
        
        <button
          onClick={() => {
            playPageFlipSound();
            onOpen();
          }}
          onMouseEnter={playHoverSound}
          className="sketch-btn py-2 text-xs"
        >
          Open Journal <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}

export function AboutPage() {
  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Observation Logs
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 01]</span>
        </div>

        {/* Lined notebook text */}
        <div className="text-[12.5px] leading-[24px] text-stone-700 font-sans space-y-4 font-medium">
          <p>
            I study <span className="underline decoration-[#d6bdf2] decoration-2">Computer Engineering</span> at Thapar Institute of Engineering &amp; Technology (2023–2027), where I dive into microprocessors, computer architecture, and embedded interfaces.
          </p>
          <p>
            Concurrently, I pursue a remote <span className="underline decoration-[#d6bdf2] decoration-2">B.Sc. (Hons.) in Data Science &amp; Artificial Intelligence</span> from IIT Guwahati (2023–2027), focusing on probabilistic modeling, machine learning algorithms, and time series data processing.
          </p>
          <p>
            As the **Team Manager of Team Fateh**, the Formula Student Electric team at Thapar Institute, I lead a cross-functional department of over 50 heads in mechanical, powertrain, and electronics systems.
          </p>
          <p>
            Previously, as an Electronics &amp; DAQ engineer, I mapped low-voltage wiring harnesses, routed custom PCBs, and wrote firmware for STM32-based acquisition nodes to stream real-time telemetry over high-frequency CAN networks.
          </p>
        </div>

      </div>
    </div>
  );
}

export function SkillsPage() {
  const skillCategories = [
    { title: "PROGRAMMING", items: ["Python", "C / C++", "TypeScript", "SQL"] },
    { title: "MACHINE LEARNING", items: ["PyTorch", "scikit-learn", "Reinforcement Learning"] },
    { title: "EMBEDDED HARDWARE", items: ["STM32", "ESP32", "CAN Bus Protocol"] },
    { title: "TOOLS & WEB", items: ["Git", "Linux", "Next.js", "React"] },
  ];

  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Specimen Inventory
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 02]</span>
        </div>

        {/* Ink stamps skill grid */}
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-white border-2 border-[#2d2621]/30 rounded-xl relative shadow-[2px_2px_0px_rgba(45,38,33,0.15)] flex flex-col justify-between"
            >
              <div className="font-serif text-[10px] font-extrabold uppercase border-b border-[#2d2621]/15 pb-1 mb-2 text-[#2d2621] flex justify-between items-center leading-none">
                <span>{cat.title}</span>
                <Star className="w-2.5 h-2.5 text-[#d6bdf2] fill-[#e8dff5]" />
              </div>
              
              <div className="flex flex-wrap gap-1">
                {cat.items.map((item, i) => (
                  <span
                    key={i}
                    className="font-mono text-[8.5px] bg-[#fcf8f2] border border-[#2d2621]/20 text-[#2d2621] font-bold px-1.5 py-0.5 rounded-md uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-stone-400 font-mono text-center pt-4 uppercase leading-none">
          ★ Core Competence Matrix stamps ★
        </p>

      </div>
    </div>
  );
}

export default function Home() {
  return null; // app.tsx renders everything directly
}
