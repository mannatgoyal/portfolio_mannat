import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound, playDrawerSlideSound } from "@/lib/audio";
import { ArrowUpRight, Github, FolderOpen, Heart, Info } from "lucide-react";

interface ExhibitItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  objective: string;
  approach: string;
  tech: string;
  href: string;
  artifactName: string;
  svgIcon: React.ReactNode;
}

export function GrandGallery() {
  const [selectedId, setSelectedId] = useState<string>("watch");
  const [hoveredExhibit, setHoveredExhibit] = useState<string | null>(null);

  const exhibits: ExhibitItem[] = [
    {
      id: "watch",
      code: "EX-01",
      title: "F1 Strategy Engineer Toolkit",
      subtitle: "TACTILE STOPWATCH // RL DECISION FRAMEWORK",
      objective: "Built a modular race-strategy decision-support framework combining FastF1 telemetry, physical race simulation, Monte Carlo uncertainty modelling and optimization to evaluate pit-stop strategies under competing race conditions.",
      approach: "Integrated tyre degradation, nonlinear fuel burn, traffic/dirty-air penalties, weather and safety-car probabilities with game-theoretic optimization and Q-learning for strategic decision-making.",
      tech: "Python - Simulation - Reinforcement Learning",
      href: "https://github.com/mannatgoyal/trust-strategy-motorsports",
      artifactName: "F1 STRATEGY TOOLKIT",
      svgIcon: (
        <g id="exhibit-stopwatch" transform="translate(10, 5)">
          {/* Wooden stand base */}
          <path d="M 5 45 L 35 45 L 30 38 L 10 38 Z" fill="#ebd9cc" stroke="#2d2621" strokeWidth="1.5" />
          {/* Velvet pillow */}
          <ellipse cx="20" cy="36" rx="14" ry="4.5" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
          {/* Stopwatch */}
          <circle cx="20" cy="24" r="10" fill="#fffdfa" stroke="#2d2621" strokeWidth="1.8" />
          <circle cx="20" cy="24" r="7" fill="none" stroke="#2d2621" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Crown */}
          <rect x="18" y="11" width="4" height="3" fill="#ebd9cc" stroke="#2d2621" strokeWidth="1.2" />
          {/* Hands */}
          <line x1="20" y1="24" x2="20" y2="18" stroke="#2d2621" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="24" x2="25" y2="24" stroke="#2d2621" strokeWidth="1" strokeLinecap="round" />
          {/* Glass dome outline */}
          <path d="M 2 36 A 18 18 0 0 1 38 36" fill="rgba(218,234,246,0.15)" stroke="#2d2621" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )
    },
    {
      id: "padlock",
      code: "EX-02",
      title: "cyberattack_detect_dqn",
      subtitle: "BRASS PADLOCK // FIREWALL MITIGATION AGENT",
      objective: "Real-time threat detection and mitigation on active network switches to shield core telemetry logs.",
      approach: "Integrates high-throughput XGBoost packet pattern classifiers with deep reinforcement learning DQN agents to dynamically trigger active firewall rules, blocking intrusions under cyber-physical stress.",
      tech: "XGBoost Classifiers - DQN Firewall",
      href: "https://github.com/mannatgoyal/cyberattack_detect",
      artifactName: "CYBER SAFE PADLOCK",
      svgIcon: (
        <g id="exhibit-padlock" transform="translate(10, 5)">
          {/* Metal pedestal pedestal */}
          <rect x="6" y="38" width="28" height="8" rx="2" fill="#daeaf6" stroke="#2d2621" strokeWidth="1.8" />
          {/* Padlock body */}
          <rect x="10" y="22" width="20" height="16" rx="3" fill="#fcf4dd" stroke="#2d2621" strokeWidth="2" />
          {/* Shackle */}
          <path d="M 14 22 V 15 C 14 10 26 10 26 15 V 22" fill="none" stroke="#2d2621" strokeWidth="2" />
          {/* Keyhole */}
          <circle cx="20" cy="28" r="2" fill="#2d2621" />
          <line x1="20" y1="30" x2="20" y2="34" stroke="#2d2621" strokeWidth="1.5" strokeLinecap="round" />
          {/* Sparkles */}
          <path d="M 4 14 L 6 12 M 36 14 L 34 12" stroke="#2d2621" strokeWidth="1" />
        </g>
      )
    },
    {
      id: "jar",
      code: "EX-03",
      title: "EvoQuant Strategy Optimizer",
      subtitle: "GLOWING FILAMENT JAR // STRATEGY BACKTESTING",
      objective: "Building a research-grade framework comparing Grid Search, Genetic Algorithms and Particle Swarm Optimization for quantitative trading strategy optimization, investigating whether optimizer flexibility improves out-of-sample generalization or increases historical overfitting.",
      approach: "Implementing a deterministic backtesting engine with strict train/validation/test isolation, next-bar execution, explicit dividend cash flows and split-boundary indicator warm-up to control look-ahead and accounting errors.",
      tech: "Python - Quantitative Finance - Optimization",
      href: "https://github.com/mannatgoyal/EvoQuant",
      artifactName: "EVOQUANT STRATEGY JAR",
      svgIcon: (
        <g id="exhibit-jar" transform="translate(10, 5)">
          {/* Wood platform */}
          <path d="M 2 44 C 10 40 30 40 38 44 Z" fill="#ebd9cc" stroke="#2d2621" strokeWidth="1.5" />
          {/* Glass jar body */}
          <path d="M 12 12 H 28 V 16 H 26 V 38 H 14 V 16 H 12 Z" fill="rgba(232,223,245,0.2)" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Metal lid */}
          <rect x="15" y="8" width="10" height="4" fill="#94b0a0" stroke="#2d2621" strokeWidth="1.5" />
          {/* Glowing filament */}
          <path d="M 16 34 Q 20 22 20 22 Q 20 22 24 34" fill="none" stroke="#d6bdf2" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="23" r="3" fill="#fffdfa" opacity="0.9" />
        </g>
      )
    },
    {
      id: "lens",
      code: "EX-04",
      title: "Compression-Aware Image Forensics",
      subtitle: "BRASS MAGNIFYING GLASS // RGB-N DUAL-STREAM",
      objective: "Built a 6-channel RGB + SRM noise-residual ResNet18 for authentic/tampered image classification, combining semantic RGB features with high-frequency forensic artifacts.",
      approach: "Implemented source-aware group splitting on CASIA 2.0 to prevent derivatives of the same source image from crossing train/validation boundaries. Designed dynamic JPEG compression augmentation.",
      tech: "PyTorch - Computer Vision - ResNet18",
      href: "https://github.com/mannatgoyal/image-forensics",
      artifactName: "RGB-N FORENSIC GLASS",
      svgIcon: (
        <g id="exhibit-lens" transform="translate(10, 5)">
          {/* Sketch easel base */}
          <line x1="8" y1="46" x2="20" y2="28" stroke="#2d2621" strokeWidth="2" />
          <line x1="32" y1="46" x2="20" y2="28" stroke="#2d2621" strokeWidth="2" />
          <line x1="20" y1="46" x2="20" y2="35" stroke="#2d2621" strokeWidth="1.5" />
          {/* Magnifying glass */}
          <circle cx="16" cy="20" r="10" fill="rgba(148,176,160,0.15)" stroke="#2d2621" strokeWidth="2" />
          {/* Handle */}
          <line x1="23" y1="27" x2="33" y2="37" stroke="#ebd9cc" strokeWidth="3" strokeLinecap="round" />
          <line x1="23" y1="27" x2="33" y2="37" stroke="#2d2621" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )
    },
    {
      id: "car",
      code: "EX-05",
      title: "Team Fateh Digital Hub",
      objective: "Engineered high-performance web telemetry and public digital portal for Thapar Institute's Formula Student electric racecar, communicating vehicle architecture, sub-system milestones, and real-time EV telemetry.",
      approach: "Built the official web platform for Team Fateh using Next.js and TailwindCSS, mapping out technical vehicle specifications across TUFF 17/18/19, team hierarchy, and season testing logs.",
      tech: "React - Next.js - TailwindCSS - Data Viz",
      href: "https://teamfateh.com/",
      artifactName: "MINI EV RACECAR",
      svgIcon: (
        <g id="exhibit-car" transform="translate(10, 5)">
          {/* Pedestal block */}
          <rect x="2" y="38" width="36" height="8" rx="1.5" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.8" />
          {/* Model car outline */}
          <path d="M 6 30 L 10 30 L 16 22 H 24 L 28 30 H 34" stroke="#2d2621" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="14" y="30" width="12" height="4" fill="#94b0a0" stroke="#2d2621" strokeWidth="1.2" />
          {/* Wheels */}
          <circle cx="11" cy="33" r="4.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="1.5" />
          <circle cx="29" cy="33" r="4.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="1.5" />
        </g>
      )
    }
  ];

  const handleExhibitClick = (ex: ExhibitItem) => {
    playClickSound();
    playDrawerSlideSound();
    setSelectedId(ex.id);
  };

  const activeExhibit = exhibits.find(e => e.id === selectedId) || exhibits[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* LEFT SIDE: Whimsical Curio Museum Cross-Section Diorama */}
      <div className="lg:col-span-8 sketch-panel p-6 bg-gradient-to-br from-[#fffdfa] via-[#fcf8f2] to-[#daeaf6]/20 relative overflow-hidden flex flex-col justify-between min-h-[400px] paper-grain">
        
        {/* Gallery sign banner */}
        <div className="border-b-2 border-[#2d2621] pb-3 flex justify-between items-center mb-6 z-10">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4.5 h-4.5 text-[#94b0a0]" />
            <h3 className="font-serif text-sm text-[#2d2621] font-black uppercase tracking-wider">
              GRAND GALLERY // MAIN ROOM
            </h3>
          </div>
          <span className="font-mono text-[9px] text-stone-500 font-bold bg-[#e8dff5] px-2.5 py-0.5 rounded-full border border-[#2d2621]">
            TAP EXHIBITS TO SCAN BLUEPRINTS
          </span>
        </div>

        {/* Diorama room display area */}
        <div className="relative py-12 flex justify-around items-end bg-[#fffdfa] border-2 border-[#2d2621] rounded-2xl min-h-[220px] px-6 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Cozy museum wallpaper vertical stripe lines in background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07] flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-[1.5px] h-full bg-[#2d2621]" />
            ))}
          </div>

          {/* Wooden display table mantel line */}
          <div className="absolute bottom-6 left-3 right-3 h-4 bg-[#ebd9cc] border-2 border-[#2d2621] rounded-lg shadow-[3px_3px_0px_#2d2621] z-0" />

          {/* Curio display stands */}
          {exhibits.map((ex) => {
            const isSelected = selectedId === ex.id;
            const isHovered = hoveredExhibit === ex.id;

            return (
              <div
                key={ex.id}
                onClick={() => handleExhibitClick(ex)}
                onMouseEnter={() => {
                  playHoverSound();
                  setHoveredExhibit(ex.id);
                }}
                onMouseLeave={() => setHoveredExhibit(null)}
                className="relative pb-9 cursor-pointer flex flex-col items-center group z-10"
              >
                {/* Selection halo highlight */}
                <div 
                  className={`absolute -inset-4 rounded-full transition-all duration-300 pointer-events-none opacity-80 ${
                    isSelected || isHovered 
                      ? "bg-[#d6bdf2]/20 blur-md scale-110" 
                      : "bg-transparent"
                  }`} 
                />

                {/* Exhibit Artwork Illustration SVG */}
                <motion.svg
                  width="56"
                  height="56"
                  viewBox="0 0 40 50"
                  className="overflow-visible"
                  animate={isSelected ? { y: -8, scale: 1.1 } : isHovered ? { y: -3 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  {ex.svgIcon}
                </motion.svg>

                {/* Micro identification stamp */}
                <span className={`font-mono text-[9px] border-2 px-2 py-0.2 mt-3 rounded-xl font-bold uppercase transition-all shadow-[1.5px_1.5px_0px_#2d2621] ${
                  isSelected 
                    ? "bg-[#94b0a0] border-[#2d2621] text-[#2d2621] translate-y-[-1px]" 
                    : "bg-white border-[#2d2621] text-stone-600 group-hover:bg-[#daeaf6]"
                }`}>
                  {ex.code}
                </span>
                
                {/* Floating tooltip label inside museum */}
                {isHovered && (
                  <div className="absolute top-[-25px] bg-[#fffdfa] border-2 border-[#2d2621] rounded-xl px-2 py-0.5 shadow-[1.5px_1.5px_0px_#2d2621] text-[8.5px] font-mono font-bold text-[#2d2621] whitespace-nowrap z-20">
                    {ex.artifactName}
                  </div>
                )}
              </div>
            );
          })}

        </div>

      </div>

      {/* RIGHT SIDE: Naturalist Log Inspector Drawer (Lined Notebook Style) */}
      <div className="lg:col-span-4 sketch-panel p-5 bg-[#fffdfa] relative overflow-hidden flex flex-col min-h-[400px] paper-grain">
        
        {/* Red notebook margin line */}
        <div className="absolute left-10 top-0 bottom-0 w-px bg-red-200 pointer-events-none" />

        <div className="pl-8 space-y-4 flex flex-col justify-between h-full">
          
          <div className="space-y-4">
            {/* Header info */}
            <div className="border-b-2 border-[#2d2621] pb-3 flex justify-between items-start">
              <div>
                <span className="font-mono text-[9px] text-[#94b0a0] font-bold tracking-widest uppercase">
                  {activeExhibit.subtitle}
                </span>
                <h4 className="font-serif text-lg font-black text-[#2d2621] uppercase mt-1 leading-tight">
                  {activeExhibit.title}
                </h4>
              </div>
            </div>

            {/* Notebook entry sheets */}
            <div className="space-y-4 text-xs leading-relaxed text-stone-700 font-sans font-medium">
              <div>
                <span className="font-serif text-[10px] text-stone-400 block uppercase mb-1 tracking-wider font-bold">
                  exhibit objective
                </span>
                <p className="text-[#2d2621] bg-[#daeaf6]/30 border-l-2 border-[#94b0a0] pl-2.5 py-1 rounded-r-lg font-medium">
                  {activeExhibit.objective}
                </p>
              </div>

              <div>
                <span className="font-serif text-[10px] text-stone-400 block uppercase mb-1 tracking-wider font-bold">
                  engineering approach
                </span>
                <p className="text-[#2d2621] font-medium leading-relaxed">
                  {activeExhibit.approach}
                </p>
              </div>
            </div>
          </div>

          {/* Details & link block */}
          <div className="pt-4 border-t-2 border-[#2d2621]/10 space-y-3">
            <div className="text-[11px] font-mono text-stone-600 flex flex-wrap items-center gap-1.5 font-bold">
              <span className="text-[9px] text-stone-400 uppercase">SOLVER TYPE:</span>
              <span className="text-[#2d2621] bg-[#e8dff5] border border-[#2d2621]/20 px-2 py-0.5 rounded-full font-bold">
                {activeExhibit.tech}
              </span>
            </div>
            
            <a
              href={activeExhibit.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="sketch-btn justify-center text-[12px] w-full text-center"
            >
              <Github className="w-4 h-4" /> VISIT REPO ARTIFACTS <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
