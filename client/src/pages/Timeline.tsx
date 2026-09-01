import { useState } from "react";
import { Award, Cpu, Star, Compass, BookOpen, Calendar, Waves } from "lucide-react";
import { playHoverSound, playClickSound, playPageFlipSound } from "@/lib/audio";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  badge: string;
  colorClass: string;
  desc: string;
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    year: "2026",
    title: "Team Manager & Electronics / DAQ Engineer",
    subtitle: "Formula Student EV Program - Team Fateh (Oct 2023 - Present)",
    badge: "LEADERSHIP SCALE",
    colorClass: "bg-[#e2f0cb]",
    desc: "Leading a 40–50 member cross-functional EV engineering organization spanning electronics, mechanical, and business functions against a ₹45L budget. Spearheaded an ISA-95 digital manufacturing thread for Formula Bharat, standardizing reviews and tracking deliverables across 40+ stakeholders.",
    icon: <Award className="w-3.5 h-3.5 text-[#2d2621]" />
  },
  {
    year: "2025",
    title: "TUFF 17 Vehicle Integration",
    subtitle: "Inaugural EV Accumulator & LV Wiring",
    badge: "VEHICLE INTEGRATION",
    colorClass: "bg-[#daeaf6]",
    desc: "Coordinated the assembly and test integration of our first-generation EV racecar. Implemented low-voltage wiring routing and custom safety shutdown loops, resolving signal noise issues under full battery pack discharge.",
    icon: <Cpu className="w-3.5 h-3.5 text-[#2d2621]" />
  },
  {
    year: "2024",
    title: "CAN Telemetry & Pi-EV Win",
    subtitle: "STM32 Low-Voltage logging board design",
    badge: "COMPETITION WIN",
    colorClass: "bg-[#e2f0cb]",
    desc: "Secured first place in the Procurement Event at Pi-EV. Designed custom STM32 CAN logging boards and verified sensor communications loops under simulated telemetry conditions.",
    icon: <Star className="w-3.5 h-3.5 text-[#2d2621]" />
  },
  {
    year: "2024",
    title: "Eagle CAD PCB Routing (EDP-II)",
    subtitle: "Custom PWM and Infrared sensor circuitry",
    badge: "ACADEMIC PROTO",
    colorClass: "bg-[#ebd9cc]",
    desc: "Routed multi-layered Printed Circuit Boards for high-frequency signal transmitters. Managed trace integrity, safety clearance rules, and optimized board sizes to withstand vibration on physical vehicle chassis.",
    icon: <Cpu className="w-3.5 h-3.5 text-[#2d2621]" />
  },
  {
    year: "2023",
    title: "Dual Degree Foundations",
    subtitle: "TIET Computer Engineering & IIT Guwahati DS & AI",
    badge: "CONCURRENT BOOT",
    colorClass: "bg-[#e2f0cb]",
    desc: "Enrolled in concurrent engineering programs: B.E. Computer Engineering at Thapar and B.Sc. Data Science & Artificial Intelligence at IIT Guwahati. Joined Team Fateh to integrate academic ML studies with real-world cyber-physical hardware.",
    icon: <BookOpen className="w-3.5 h-3.5 text-[#2d2621]" />
  },
  {
    year: "2019",
    title: "Initial Firmware & Microcontroller Lab",
    subtitle: "First firmware compilation and C coding",
    badge: "SOURCE BOOTSTRAP",
    colorClass: "bg-[#ebd9cc]",
    desc: "Wrote the initial C code loops to toggle GPIO pins on 8-bit microcontrollers. Spent hours resolving missing semicolons and debugger driver issues, establishing interest in embedded systems.",
    icon: <Compass className="w-3.5 h-3.5 text-[#2d2621]" />
  },
];

interface TimelinePageProps {
  selectedIdx: number;
  onSelectIdx: (idx: number) => void;
}

export function TidepoolTimelinePage({ selectedIdx, onSelectIdx }: TimelinePageProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="notebook-page-content lined select-none bg-[#daeaf6]/20">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Tidepool Stepping Path
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 07]</span>
        </div>

        {/* Stepping pool illustration */}
        <div className="relative py-14 bg-white/70 border-2 border-[#2d2621] rounded-2xl min-h-[220px] px-8 flex justify-center items-center shadow-[inset_1px_1px_6px_rgba(0,0,0,0.05)] select-none overflow-hidden">
          
          {/* Water ripples */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full">
              <ellipse cx="50%" cy="50%" rx="130" ry="60" fill="none" stroke="#2d2621" strokeWidth="1" strokeDasharray="3 5" className="wave-ripple-1" />
              <ellipse cx="48%" cy="52%" rx="90" ry="40" fill="none" stroke="#2d2621" strokeWidth="1" strokeDasharray="2 3" className="wave-ripple-2" />
            </svg>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
            <path d="M 30 130 C 100 80 180 140 280 110 T 380 120" fill="none" stroke="#2d2621" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* Stepping Stones */}
          <div className="absolute inset-0 flex justify-around items-center px-4">
            {milestones.map((m, idx) => {
              const isSelected = selectedIdx === idx;
              const isHovered = hoveredIdx === idx;
              
              const coords = [
                { x: "12%", y: "45%" },
                { x: "28%", y: "25%" },
                { x: "42%", y: "65%" },
                { x: "58%", y: "30%" },
                { x: "72%", y: "60%" },
                { x: "88%", y: "40%" }
              ];
              
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectIdx(idx);
                    playClickSound();
                    playPageFlipSound();
                  }}
                  onMouseEnter={() => {
                    playHoverSound();
                    setHoveredIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ left: coords[idx].x, top: coords[idx].y }}
                  className="absolute cursor-pointer flex flex-col items-center group transform translate-x-[-50%] translate-y-[-50%]"
                >
                  <div className={`absolute -inset-2.5 rounded-full transition-all duration-300 pointer-events-none ${
                    isSelected || isHovered 
                      ? "bg-[#94b0a0]/35 blur-sm" 
                      : "bg-transparent"
                  }`} />

                  <motion.svg
                    width="36"
                    height="26"
                    viewBox="0 0 40 30"
                    className="overflow-visible"
                    animate={isSelected ? { scale: 1.1, y: -3 } : isHovered ? { y: -1 } : { y: 0 }}
                  >
                    <ellipse cx="20" cy="15" rx="16" ry="10" fill={isSelected ? "#ebd9cc" : "#fffdfa"} stroke="#2d2621" strokeWidth="1.8" />
                    <text
                      x="20"
                      y="18"
                      fontFamily="serif"
                      fontSize="9"
                      fontWeight="black"
                      fill="#2d2621"
                      textAnchor="middle"
                    >
                      {m.year.slice(2)}
                    </text>
                  </motion.svg>
                  
                  {isHovered && (
                    <div className="absolute top-[-24px] bg-white border border-[#2d2621] rounded-lg px-1.5 py-0.2 shadow-[1px_1px_0px_#2d2621] text-[8px] font-mono font-bold text-[#2d2621] whitespace-nowrap z-20">
                      {m.year}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

interface ShelfPageProps {
  selectedIdx: number;
}

export function AchievementsShelfPage({ selectedIdx }: ShelfPageProps) {
  const activeMilestone = milestones[selectedIdx];

  const honors = [
    "SUPRA SAE 2025 — Overall P3, Statics P2 (EV Category)",
    "Formula Bharat 2025 — Engineering Design Finalists",
    "Pi-EV 2024 — Procurement Event Winners",
    "Santander Open Academy — High Performance Leadership: Lessons from Formula 1",
    "Poetry published in Carousels Anthology (2024)"
  ];

  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Milestone Details
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 08]</span>
        </div>

        {/* Milestone Detail card */}
        <div className="p-3 bg-[#fcf8f2] border-2 border-[#2d2621]/30 rounded-xl relative shadow-[2px_2px_0px_rgba(45,38,33,0.1)] space-y-2">
          <div className="flex justify-between items-center border-b border-[#2d2621]/15 pb-1">
            <span className="font-serif font-extrabold text-xs text-[#2d2621]">
              {activeMilestone.year} Entry: {activeMilestone.title}
            </span>
            <div className="p-1 bg-white border border-[#2d2621]/20 rounded-full">
              {activeMilestone.icon}
            </div>
          </div>
          <p className="text-[10px] text-stone-600 leading-relaxed font-sans font-medium">
            {activeMilestone.desc}
          </p>
        </div>

        {/* Achievements list */}
        <div className="pt-2">
          <span className="font-serif text-[10px] text-stone-400 block uppercase mb-1.5 tracking-wider font-bold">
            HONORS &amp; ACHIEVEMENTS INDEX:
          </span>
          <div className="space-y-1.5 font-mono text-[9px] text-stone-600">
            {honors.map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <Star className="w-2.5 h-2.5 text-[#d68c45] fill-[#ebd9cc] flex-shrink-0 mt-0.5" />
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Timeline() {
  return null;
}
