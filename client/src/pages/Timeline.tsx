import { motion } from "framer-motion";
import { Calendar, Cpu, Star } from "lucide-react";
import { playHoverSound } from "@/lib/audio";

export default function Timeline() {
  const milestones = [
    {
      year: "2026",
      title: "Team Manager & Digital Lead",
      subtitle: "Leading Team Fateh EV + teamfateh.com",
      badge: "LEADERSHIP ERA",
      badgeClass: "highlighter-blue",
      desc: "Promoted to Team Manager of Team Fateh. Directed operations, budget, and department coordination for the season, leading to Design Winners and Overall P3 in the EV category at SUPRA SAE 2026. Designed and built the team's official Next.js website and technical blogs.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure manager with book */}
          <circle cx="20" cy="12" r="5" stroke="black" strokeWidth="1.5" fill="white" />
          <path d="M20 7 C20 4 17 6 18 6" stroke="black" strokeWidth="1" />
          <line x1="20" y1="17" x2="20" y2="28" stroke="black" strokeWidth="1.5" />
          <path d="M20 20 L12 25 L8 24" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 20 L28 25 L32 24" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 28 L16 38" stroke="black" strokeWidth="1.5" />
          <path d="M20 28 L24 38" stroke="black" strokeWidth="1.5" />
          {/* Tiny book */}
          <rect x="5" y="18" width="6" height="8" rx="0.5" fill="white" stroke="black" strokeWidth="1" />
          <line x1="8" y1="18" x2="8" y2="26" stroke="black" strokeWidth="0.8" />
        </svg>
      )
    },
    {
      year: "2025",
      title: "TUFF 17 Integration & Competitions",
      subtitle: "Formula Student EV Build (TUFF 17) + National Races",
      badge: "TROPHY MILESTONE",
      badgeClass: "highlighter-yellow",
      desc: "Part of the electric design and assembly team for TUFF 17, our inaugural EV build. Handled the low-voltage interfacing and safety circuit integration, laying the foundation for the team's transition to electric racing.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure holding trophy */}
          <circle cx="20" cy="14" r="5" stroke="black" strokeWidth="1.5" fill="white" />
          <line x1="20" y1="19" x2="20" y2="30" stroke="black" strokeWidth="1.5" />
          <path d="M20 22 L11 16 L8 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 22 L29 16 L32 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 30 L15 39" stroke="black" strokeWidth="1.5" />
          <path d="M20 30 L25 39" stroke="black" strokeWidth="1.5" />
          {/* Trophy Cup */}
          <path d="M6 10 H13 V14 C13 16 11 18 9.5 18 C8 18 6 16 6 14 Z" fill="white" stroke="black" strokeWidth="1.2" />
          <line x1="9.5" y1="18" x2="9.5" y2="21" stroke="black" strokeWidth="1.2" />
          <line x1="7" y1="21" x2="12" y2="21" stroke="black" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      year: "2024",
      title: "Embedded DAQ & Pi-EV Win",
      subtitle: "STM32 CAN Bus Systems + Competition",
      badge: "COMPETITION WINNER",
      badgeClass: "highlighter-green",
      desc: "Secured first place in the Procurement Event at Pi-EV. Designed custom low-voltage data logging boards and verified CAN telemetry links under simulated test conditions.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure at computer */}
          <circle cx="15" cy="15" r="4.5" stroke="black" strokeWidth="1.5" fill="white" />
          <line x1="15" y1="19.5" x2="15" y2="30" stroke="black" strokeWidth="1.5" />
          <path d="M15 22 L24 25 L28 29" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 30 L10 39" stroke="black" strokeWidth="1.5" />
          <path d="M15 30 L18 39" stroke="black" strokeWidth="1.5" />
          {/* Monitor desk */}
          <rect x="25" y="20" width="12" height="9" rx="0.5" fill="white" stroke="black" strokeWidth="1" />
          <line x1="31" y1="29" x2="31" y2="33" stroke="black" strokeWidth="1.2" />
          <line x1="28" y1="33" x2="34" y2="33" stroke="black" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      year: "2024",
      title: "Eagle CAD & PCB Design (EDP-II)",
      subtitle: "Thapar Academic Project",
      badge: "ACADEMIC PROTO",
      badgeClass: "highlighter-pink",
      desc: "Designed and routed Printed Circuit Boards (PCBs) for PWM transmitters and IR sensor modules using Eagle CAD for the Engineering Design Project II (EDP-II). Discovered that manual trace routing is a test of human sanity, and that cold soldering smells terrible.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure holding soldering iron */}
          <circle cx="20" cy="12" r="5" stroke="black" strokeWidth="1.5" fill="white" />
          <line x1="20" y1="17" x2="20" y2="28" stroke="black" strokeWidth="1.5" />
          <path d="M20 20 L12 25 L8 24" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 20 L28 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="24" x2="4" y2="22" stroke="black" strokeWidth="1.5" />
          <path d="M20 28 L15 38" stroke="black" strokeWidth="1.5" />
          <path d="M20 28 L25 38" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      year: "2023",
      title: "Dual Degrees & Formula Student",
      subtitle: "Academic Foundation Era",
      badge: "FOUNDATION",
      badgeClass: "highlighter-blue",
      desc: "I decided it would be a great idea to sign up for TWO degrees at the same time: Computer Engineering at Thapar and Data Science & AI at IIT Guwahati. I had zero free time, so I joined the Formula Student team to make sure I had negative free time. Good choice, Mannat.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure walking */}
          <circle cx="20" cy="12" r="5" stroke="black" strokeWidth="1.5" fill="white" />
          <line x1="20" y1="17" x2="20" y2="28" stroke="black" strokeWidth="1.5" />
          <path d="M20 20 L14 26" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 20 L26 23 L28 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 28 L15 38" stroke="black" strokeWidth="1.5" />
          <path d="M20 28 L25 35 L28 38" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      year: "2019",
      title: "First Code & Embedded Experiments",
      subtitle: "Bedroom Microcontroller Lab",
      badge: "ORIGIN",
      badgeClass: "highlighter-pink",
      desc: "I wrote my first line of C code. It printed 'Hello World'. It took me three hours to realize I forgot a semicolon. I should have quit right there, but here we are.",
      doodle: (
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" className="inline-block align-middle ml-2">
          {/* Stick figure coding */}
          <circle cx="16" cy="15" r="4.5" stroke="black" strokeWidth="1.5" fill="white" />
          <line x1="16" y1="19.5" x2="16" y2="30" stroke="black" strokeWidth="1.5" />
          <path d="M16 22 L24 24 L28 27" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 30 L11 39" stroke="black" strokeWidth="1.5" />
          <path d="M16 30 L19 39" stroke="black" strokeWidth="1.5" />
          {/* Tiny keyboard */}
          <rect x="23" y="27" width="10" height="3" fill="white" stroke="black" strokeWidth="1" />
        </svg>
      )
    },
  ];

  const skillCategories = [
    { title: "PROGRAMMING", items: ["Python", "C / C++", "JavaScript / TypeScript", "SQL", "Bash"] },
    { title: "MACHINE LEARNING", items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "Deep Q-Networks", "Reinforcement Learning"] },
    { title: "EMBEDDED HARDWARE", items: ["STM32", "ESP32", "CAN Bus Telemetry", "Firmware Design", "Low-Voltage Systems"] },
    { title: "TOOLS & WEB TECH", items: ["Git / GitHub", "Linux", "Next.js", "React", "TailwindCSS", "NumPy / Pandas"] },
  ];

  return (
    <div className="site-shell max-w-4xl mx-auto py-6 px-4">
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none" />

      <div className="space-y-6">
        {/* Header */}
        <section className="mb-6 border-b-2 border-black pb-4 mt-4 flex items-center justify-between">
          <div>
            <h1 className="font-hud text-2xl font-extrabold text-black uppercase tracking-tight">
              MY ELAPSED TIMELINE
            </h1>
            <span className="text-zinc-500 font-hud text-[11px] block mt-1 uppercase">
              SYS-05 // Chronology Log &amp; Skill Matrix
            </span>
          </div>
        </section>

        {/* MET Timeline */}
        <section className="notebook-panel p-5 bg-[#ffffff] relative">
          {/* Tape decoration */}
          <div className="absolute -top-3 left-10 w-16 h-4 bg-yellow-100/50 border border-dashed border-black/10 rotate-[-1deg]" />

          <div className="border-b border-black/10 pb-3 flex justify-between items-center mb-6 mt-1">
            <div>
              <h2 className="font-hud text-md font-bold text-black uppercase flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-black" /> Career Milestones &amp; Achievements
              </h2>
            </div>
            <span className="font-hud text-[9px] bg-yellow-100 border-2 border-black rounded px-2.5 py-0.5 uppercase font-bold tracking-wider">
              6 log nodes
            </span>
          </div>

          {/* Timeline list */}
          <div className="space-y-6 relative border-l-2 border-black border-dashed ml-3 pl-6">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={playHoverSound}
                className="relative space-y-2 group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-white group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-hud font-extrabold text-black text-[16px]">{m.year}</span>
                    <span className="font-mono text-[10px] text-zinc-400 font-bold">[MET T+{idx * 365}D]</span>
                  </div>
                  <span className={`font-hud text-[9px] uppercase font-bold px-2 py-0.5 rounded border border-black/10 ${m.badgeClass}`}>
                    {m.badge}
                  </span>
                </div>

                <div className="p-4 bg-zinc-50 border-2 border-black border-dashed rounded relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-hud text-sm font-bold text-black uppercase leading-snug">
                        {m.title}
                      </h3>
                      <p className="font-hud text-[10px] text-zinc-500 mt-0.5">{m.subtitle}</p>
                    </div>
                    {m.doodle}
                  </div>
                  <p className="text-[14px] text-zinc-700 leading-relaxed pt-2 border-t border-black/5 mt-2">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Matrix */}
        <section className="notebook-panel p-5 bg-[#ffffff] relative">
          <div className="absolute -top-3 right-8 w-16 h-4.5 bg-yellow-100/55 border border-dashed border-black/15 rotate-[2deg]" />

          <div className="border-b border-black/10 pb-3 flex justify-between items-center mb-4">
            <h2 className="font-hud text-md font-bold text-black uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-black" /> Skills &amp; Toolbox Inventory
            </h2>
            <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">Node registry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, idx) => {
              return (
                <div 
                  key={idx} 
                  className="p-4 bg-zinc-50 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,0.08)] relative"
                >
                  {/* Tape decorator on the skill categories */}
                  <div className="absolute -top-2 left-4 w-10 h-3 bg-yellow-100/30 border border-dashed border-black/5 rotate-[-3deg]" />

                  <div className={`font-hud text-xs font-bold uppercase border-b-2 border-black pb-1.5 mb-2.5 flex items-center justify-between`}>
                    <span>{cat.title}</span>
                    <Star className="w-3 h-3 text-black fill-black" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="font-hud text-xs bg-white border-2 border-black rounded px-2.5 py-0.5 shadow-[1.5px_2px_0px_rgba(0,0,0,1)] uppercase font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
