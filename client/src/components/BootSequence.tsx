import React, { useState } from "react";
import { motion } from "framer-motion";
import { playClickSound, setSoundEnabled, getSoundEnabled } from "@/lib/audio";
import { Volume2, VolumeX, BookOpen } from "lucide-react";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  const handleOpenDiary = () => {
    playClickSound();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#1e1e24] flex items-center justify-center p-4 select-none font-mono"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.15) 15%, transparent 16%)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Sound Toggle (Margin / Desk background) */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-50 p-2.5 bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#fff8e5] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer"
        title={soundOn ? "Mute sounds" : "Unmute sounds"}
      >
        {soundOn ? (
          <Volume2 className="w-5 h-5 text-black" />
        ) : (
          <VolumeX className="w-5 h-5 text-red-500" />
        )}
      </button>

      {/* Book Wrapper */}
      <motion.div
        initial={{ y: 20, rotate: -1.5 }}
        animate={{ y: 0, rotate: -0.5 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative max-w-md w-full aspect-[3/4] bg-[#b91c1c] border-[6px] border-black rounded-[24px] shadow-[12px_16px_0px_rgba(0,0,0,0.9)] p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Spine lines */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/15 flex flex-col justify-around py-8 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-0.5 w-full bg-black/40" />
          ))}
        </div>

        {/* Paper Sticker on the Cover */}
        <div className="w-full bg-[#fcf9f2] border-[4px] border-black rounded-lg p-5 flex flex-col items-center text-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)] mt-2">
          {/* Main Title */}
          <div className="relative mb-4">
            <h2 className="font-hud text-[28px] text-black leading-none mb-1 uppercase font-bold tracking-tight">ENGINEERING</h2>
            
            {/* crossed out "LOGBOOK" replaced with "DIARY" */}
            <div className="relative inline-block mt-2">
              <span className="font-hud text-[22px] text-zinc-400 select-none opacity-50 relative line-through decoration-red-500 decoration-[3px] rotate-[-4deg] inline-block mr-2 px-1">
                LOGBOOK
              </span>
              <span className="font-hud text-[26px] text-black font-extrabold tracking-wider bg-yellow-200/90 border-2 border-black border-dashed px-2 py-0.5 rounded rotate-[2deg] inline-block">
                DIARY
              </span>
            </div>
            
            <h2 className="font-sans text-[20px] text-black leading-none mt-3 italic">
              of an Engineering Kid
            </h2>
          </div>

          {/* Doodles Showcase */}
          <div className="w-full py-4 border-y-2 border-black border-dashed my-3 flex items-center justify-center min-h-[140px] bg-white rounded-md">
            <svg width="220" height="130" viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stick figure Mannat (Greg style) */}
              <g transform="translate(45, 10)">
                {/* Head */}
                <circle cx="40" cy="22" r="10" stroke="black" strokeWidth="2.5" fill="white" />
                {/* Hair */}
                <path d="M40 12 C39 4 33 8 35 10 M40 12 C41 4 47 8 45 10" stroke="black" strokeWidth="2" strokeLinecap="round" />
                {/* Face details */}
                <circle cx="37" cy="20" r="1.2" fill="black" />
                <circle cx="43" cy="20" r="1.2" fill="black" />
                <path d="M37 26 Q40 29 43 26" stroke="black" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                
                {/* Body */}
                <line x1="40" y1="32" x2="40" y2="68" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Left arm holding soldering iron */}
                <path d="M40 42 L24 50 L14 48" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Soldering Iron sketch */}
                <path d="M14 48 L6 49 L2 45" stroke="red" strokeWidth="2" strokeLinecap="round" />
                
                {/* Right arm holding microcontroller */}
                <path d="M40 42 L56 50 L64 45" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Tiny chip */}
                <rect x="62" y="38" width="10" height="10" rx="1" fill="white" stroke="black" strokeWidth="1.8" />
                <line x1="62" y1="41" x2="60" y2="41" stroke="black" strokeWidth="1" />
                <line x1="62" y1="45" x2="60" y2="45" stroke="black" strokeWidth="1" />
                <line x1="72" y1="41" x2="74" y2="41" stroke="black" strokeWidth="1" />
                <line x1="72" y1="45" x2="74" y2="45" stroke="black" strokeWidth="1" />

                {/* Left leg */}
                <path d="M40 68 L32 94 L24 95" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Right leg */}
                <path d="M40 68 L48 94 L56 95" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>

              {/* Rocky the Eridian Mascot (5-legged spider doodle) */}
              <g transform="translate(130, 25)">
                {/* Body */}
                <path
                  d="M20 22 C12 20 5 30 7 42 C9 50 18 55 24 53 C30 52 35 44 33 34 C31 24 26 22 20 22 Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Five spider legs */}
                <path d="M9 30 Q-2 22 -6 26" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M7 40 Q-4 44 -8 54" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M15 50 Q10 65 4 72" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M26 49 Q34 62 40 68" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M31 36 Q42 38 46 28" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                {/* Eyes */}
                <circle cx="17" cy="33" r="2.5" fill="white" stroke="black" strokeWidth="1.5" />
                <circle cx="25" cy="33" r="2.5" fill="white" stroke="black" strokeWidth="1.5" />
                <circle cx="17" cy="33" r="0.8" fill="black" />
                <circle cx="25" cy="33" r="0.8" fill="black" />

                {/* Speech Bubble */}
                <path d="M30 18 Q40 5 60 10 Q70 15 50 24 Z" fill="white" stroke="black" strokeWidth="1.5" />
                <text x="36" y="16" fill="black" fontSize="8" fontFamily="var(--font-hud)" fontWeight="bold">AMAZE!</text>
              </g>
            </svg>
          </div>

          {/* Warning stamp */}
          <span className="font-hud text-xs text-red-600 border-2 border-red-600 border-dashed rounded px-2.5 py-0.5 tracking-wider font-extrabold uppercase rotate-[-3deg] select-none my-1">
            MANNATION LOG - DO NOT READ!
          </span>
        </div>

        {/* Enter Button (Taped Paper Scrap look) */}
        <button
          onClick={handleOpenDiary}
          className="relative group w-2/3 max-w-[200px] py-3.5 mb-2 bg-[#fcf9f2] hover:bg-white text-black font-hud text-[15px] font-extrabold tracking-wide uppercase border-3 border-black shadow-[5px_6px_0px_rgba(0,0,0,1)] hover:shadow-[7px_8px_0px_rgba(0,0,0,1)] transition-all hover:scale-[1.03] active:translate-x-1 active:translate-y-1 active:shadow-[1px_2px_0px_rgba(0,0,0,1)] cursor-pointer select-none text-center"
        >
          {/* Piece of washi tape at top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-yellow-100/60 border border-dashed border-black/15 rotate-[-2deg]" />
          
          <span className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" /> Open Diary
          </span>
        </button>

        {/* Footnote */}
        <p className="text-[10px] text-white/50 tracking-widest font-mono uppercase text-center mt-2">
          Mannat Goyal Portfolio Log // Vol. 2026
        </p>
      </motion.div>
    </motion.div>
  );
}
