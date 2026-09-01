import React from "react";
import { Gamepad2, BookOpen, ArrowRight, Github, Linkedin, Mail, Compass } from "lucide-react";

interface LandingGateProps {
  onSelect3D: () => void;
  onSelectText: () => void;
}

export function LandingGate({ onSelect3D, onSelectText }: LandingGateProps) {
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#2d2621]/50 backdrop-blur-md font-sans text-[#2d2621] flex justify-center items-start sm:items-center p-4 sm:p-6 md:p-10">
      
      {/* Background ambient desk grain */}
      <div className="fixed inset-0 pointer-events-none bg-[#ebd9cc]/90 paper-grain z-0" />

      {/* Main Diary Desk Card */}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl my-auto bg-[#fcf8f2] border-3 sm:border-4 border-[#2d2621] rounded-3xl shadow-[8px_8px_0px_#2d2621] sm:shadow-[12px_12px_0px_#2d2621] p-6 sm:p-10 lg:p-12 flex flex-col gap-8 sm:gap-10">
        
        {/* Top Washi Tape Sticker */}
        <div className="flex justify-center -mt-9 sm:-mt-14 mb-1">
          <div className="px-6 sm:px-8 py-1.5 sm:py-2 bg-[#fce1e4] border-2 border-[#2d2621] rotate-[-1deg] shadow-[2px_2px_0px_#2d2621] rounded-sm">
            <span className="font-mono text-xs sm:text-sm font-black text-[#2d2621] tracking-widest uppercase">
              ★ MANNAT'S NOTEBOOK ★
            </span>
          </div>
        </div>

        {/* Header Title & Identity */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ebd9cc]/70 border border-[#2d2621]/30 text-xs sm:text-sm font-mono font-bold text-[#685b52]">
            <Compass className="w-4 h-4 text-[#2d2621]" />
            <span>PERSONAL CHRONICLE // VOL. 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[#2d2621] uppercase">
            Mannat Goyal
          </h1>

          <div className="space-y-1.5 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl font-['Patrick_Hand',cursive] text-[#2d2621] leading-relaxed">
              <span className="underline decoration-[#fce1e4] decoration-4 font-bold">Dual Degree Student</span> in Computer Engineering (TIET) &amp; Data Science / AI (IIT Guwahati)
            </p>
            <p className="text-xs sm:text-sm font-mono text-[#685b52] font-semibold">
              Team Manager &amp; DAQ Engineer at <span className="text-[#2d2621] font-bold">Team Fateh Formula Student Electric</span>
            </p>
          </div>
        </div>

        {/* Two Spacious Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: 3D Driving World */}
          <div 
            onClick={onSelect3D}
            className="group relative flex flex-col justify-between p-6 sm:p-8 pb-7 sm:pb-9 rounded-2xl bg-[#fffdfa] border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] hover:shadow-[8px_8px_0px_#2d2621] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {/* Washi tape badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#fce1e4] border border-[#2d2621]/30 text-[10px] font-mono font-black rotate-6 rounded-xs">
              3D SANDBOX
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#fce1e4] border-2 border-[#2d2621] text-[#2d2621] group-hover:rotate-6 transition-transform shadow-[2px_2px_0px_#2d2621]">
                  <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2d2621]">
                    3D Driving World
                  </h3>
                  <span className="text-xs sm:text-sm font-['Patrick_Hand',cursive] text-[#d68c45] font-bold">
                    Take the wheel &amp; drive around!
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed font-sans font-medium">
                Drive the Formula EV racecar around an interactive 3D physics sandbox. Smash into voxel letter blocks, inspect telemetry exhibits with live curves, and explore the EV workshop.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {["🏎️ Driving Physics", "🧱 Voxel Bricks", "📊 Telemetry Curves", "🔧 EV Shed"].map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono bg-[#fcf8f2] border border-[#2d2621]/20 px-2 py-0.5 rounded-md text-[#2d2621] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#2d2621]/15 mt-6 mb-1 flex items-center justify-between font-serif font-black text-xs sm:text-sm text-[#2d2621] group-hover:text-[#d68c45] transition-colors">
              <span className="uppercase tracking-wider">Launch 3D World</span>
              <div className="p-1 rounded-full bg-[#fce1e4] border-2 border-[#2d2621] group-hover:translate-x-1 transition-transform shadow-[1px_1px_0px_#2d2621]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Engineer's Diary / Notebook */}
          <div 
            onClick={onSelectText}
            className="group relative flex flex-col justify-between p-6 sm:p-8 pb-7 sm:pb-9 rounded-2xl bg-[#fffdfa] border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] hover:shadow-[8px_8px_0px_#2d2621] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {/* Washi tape badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#e2f0cb] border border-[#2d2621]/30 text-[10px] font-mono font-black -rotate-6 rounded-xs">
              DOCUMENTATION
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#e2f0cb] border-2 border-[#2d2621] text-[#2d2621] group-hover:-rotate-6 transition-transform shadow-[2px_2px_0px_#2d2621]">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2d2621]">
                    Engineer's Diary
                  </h3>
                  <span className="text-xs sm:text-sm font-['Patrick_Hand',cursive] text-[#94b0a0] font-bold">
                    Flip through notes &amp; telemetry logs!
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed font-sans font-medium">
                Browse handwritten observation logs, battery safety algorithms (VoltNet &amp; HQML-BMS), TUFF 17/18/19 EV racecars, dual-degree coursework, and competition awards.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {["🎓 Dual Degrees", "⚡ TUFF Fleet", "🔬 VoltNet & HQML", "🏆 SUPRA SAE"].map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono bg-[#fcf8f2] border border-[#2d2621]/20 px-2 py-0.5 rounded-md text-[#2d2621] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#2d2621]/15 mt-6 mb-1 flex items-center justify-between font-serif font-black text-xs sm:text-sm text-[#2d2621] group-hover:text-[#94b0a0] transition-colors">
              <span className="uppercase tracking-wider">Open Diary Journal</span>
              <div className="p-1 rounded-full bg-[#e2f0cb] border-2 border-[#2d2621] group-hover:translate-x-1 transition-transform shadow-[1px_1px_0px_#2d2621]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Footer Handwritten Links & Stamps */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs sm:text-sm font-mono text-[#685b52]">
          <a 
            href="https://github.com/mannatgoyal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#2d2621]/30 hover:border-[#2d2621] hover:shadow-[2px_2px_0px_#2d2621] transition-all font-bold text-[#2d2621]"
          >
            <Github className="w-3.5 h-3.5 text-[#2d2621]" />
            <span>@mannatgoyal</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/mannat-goyal28/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#2d2621]/30 hover:border-[#2d2621] hover:shadow-[2px_2px_0px_#2d2621] transition-all font-bold text-[#2d2621]"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#2d2621]" />
            <span>in/mannat-goyal28</span>
          </a>

          <a 
            href="mailto:gmannat793@gmail.com"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#2d2621]/30 hover:border-[#2d2621] hover:shadow-[2px_2px_0px_#2d2621] transition-all font-bold text-[#2d2621]"
          >
            <Mail className="w-3.5 h-3.5 text-[#2d2621]" />
            <span>gmannat793@gmail.com</span>
          </a>
        </div>

      </div>
    </div>
  );
}
