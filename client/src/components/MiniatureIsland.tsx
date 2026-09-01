import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound } from "@/lib/audio";
import { Compass, BookOpen, User, Calendar, Map, Hammer } from "lucide-react";

interface IslandHotspot {
  id: string;
  name: string;
  sub: string;
  desc: string;
  x: number; // Percent position on layout container
  y: number;
  path: string; // Redirection route or custom action
  icon: React.ReactNode;
  svgMarkup: React.ReactNode;
}

interface MiniatureIslandProps {
  onSelectLookout: () => void;
}

export function MiniatureIsland({ onSelectLookout }: MiniatureIslandProps) {
  const [, setLocation] = useLocation();
  const [hoveredSpot, setHoveredSpot] = useState<IslandHotspot | null>(null);

  const hotspots: IslandHotspot[] = [
    {
      id: "lookout",
      name: "Cliffside Lookout",
      sub: "ABOUT ME & DUAL DEGREES",
      desc: "Meet Mannat Goyal, a dual-degree student at Thapar (Computer Eng) & IIT Guwahati (Data Science/AI).",
      x: 18,
      y: 35,
      path: "lookout", // Triggers bio drawer
      icon: <User className="w-4 h-4 text-[#ebd5c8]" />,
      svgMarkup: (
        <g id="lookout-diorama">
          {/* Rocky cliff base */}
          <path d="M 5 45 Q 18 36 28 42 T 40 45 Z" fill="#ebd9cc" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 8 45 L 8 55 L 36 55 L 36 44 Z" fill="#ebd9cc" stroke="#2d2621" strokeWidth="2" />
          {/* Lighthouse tower */}
          <path d="M 14 42 L 17 12 L 27 12 L 30 42 Z" fill="#ffffff" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Red stripes (Y2K color blush) */}
          <path d="M 16 30 L 17 20 H 27 L 28 30 Z" fill="#fce1e4" stroke="#2d2621" strokeWidth="2" />
          {/* Balcony deck */}
          <rect x="13" y="10" width="18" height="3" fill="#2d2621" rx="1" />
          {/* Lantern room */}
          <rect x="16" y="4" width="12" height="6" fill="#fcf4dd" stroke="#2d2621" strokeWidth="2" />
          {/* Dome roof */}
          <path d="M 15 4 Q 22 -3 29 4 Z" fill="#94b0a0" stroke="#2d2621" strokeWidth="2" />
          {/* Glowing rotating lighthouse beam */}
          <g className="light-rotate">
            <path d="M 22 7 L -100 -30 L -120 15 Z" fill="url(#lighthouse-beam-left)" opacity="0.45" pointerEvents="none" />
            <path d="M 22 7 L 140 -30 L 160 15 Z" fill="url(#lighthouse-beam-right)" opacity="0.45" pointerEvents="none" />
          </g>
        </g>
      ),
    },
    {
      id: "museum",
      name: "The Grand Gallery",
      sub: "PROJECT MUSEUM",
      desc: "An exhibition hall showing software developments, Formula EV web hubs, and ML solvers.",
      x: 52,
      y: 22,
      path: "/experiments",
      icon: <BookOpen className="w-4 h-4 text-[#daeaf6]" />,
      svgMarkup: (
        <g id="museum-diorama">
          {/* Pediment top */}
          <path d="M 4 22 L 24 10 L 44 22 Z" fill="#ebd9cc" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Museum structure columns */}
          <rect x="6" y="22" width="36" height="24" fill="#ffffff" stroke="#2d2621" strokeWidth="2" />
          <rect x="10" y="24" width="4" height="22" fill="#daeaf6" stroke="#2d2621" strokeWidth="2" />
          <rect x="22" y="24" width="4" height="22" fill="#daeaf6" stroke="#2d2621" strokeWidth="2" />
          <rect x="34" y="24" width="4" height="22" fill="#daeaf6" stroke="#2d2621" strokeWidth="2" />
          {/* Entrance door */}
          <path d="M 17 34 A 5 5 0 0 1 27 34 V 46 H 17 Z" fill="#fcf4dd" stroke="#2d2621" strokeWidth="2" />
          {/* Glass dome roof */}
          <path d="M 8 10 C 8 -10 40 -10 40 10 Z" fill="rgba(218,234,246,0.3)" stroke="#2d2621" strokeWidth="2" strokeDasharray="3 2" />
          {/* Base steps */}
          <rect x="2" y="46" width="44" height="4" fill="#f5ece0" stroke="#2d2621" strokeWidth="2" />
        </g>
      ),
    },
    {
      id: "workshop",
      name: "The Motor Shed",
      sub: "EV WORKSHOP GARAGE",
      desc: "Peek into the garage of Team Fateh to inspect three generations of EV racecars.",
      x: 82,
      y: 44,
      path: "/machines",
      icon: <Hammer className="w-4 h-4 text-[#e2f0cb]" />,
      svgMarkup: (
        <g id="workshop-diorama">
          {/* Brick garage wall */}
          <rect x="6" y="16" width="34" height="30" rx="3" fill="#ebd9cc" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Corrugated metal roof */}
          <path d="M 2 16 L 22 4 L 42 16 Z" fill="#94b0a0" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Wavy lines on roof */}
          <path d="M 8 12 L 22 6 L 36 12" stroke="#2d2621" strokeWidth="1.5" fill="none" />
          {/* Garage roll-up door */}
          <rect x="12" y="28" width="22" height="18" fill="#fffdfa" stroke="#2d2621" strokeWidth="2" />
          <line x1="12" y1="34" x2="34" y2="34" stroke="#2d2621" strokeWidth="1" />
          <line x1="12" y1="40" x2="34" y2="40" stroke="#2d2621" strokeWidth="1" />
          {/* Chimney puffing smoke */}
          <line x1="34" y1="4" x2="34" y2="12" stroke="#2d2621" strokeWidth="2" />
          <g>
            <circle cx="34" cy="0" r="3.5" fill="#eae0d5" className="smoke-puff" />
            <circle cx="37" cy="-6" r="5" fill="#eae0d5" className="smoke-puff" style={{ animationDelay: "1.2s" }} />
          </g>
          {/* Logo sign */}
          <circle cx="22" cy="11" r="3" fill="#fce1e4" stroke="#2d2621" strokeWidth="1" />
        </g>
      ),
    },
    {
      id: "library",
      name: "The Archival Tower",
      sub: "THE LIBRARY & LOGS",
      desc: "Handwritten records detailing motorsports reinforcement learning and battery state algorithms.",
      x: 32,
      y: 66,
      path: "/research",
      icon: <BookOpen className="w-4 h-4 text-[#e8dff5]" />,
      svgMarkup: (
        <g id="library-diorama">
          {/* Castle-like tower building */}
          <rect x="10" y="10" width="24" height="42" fill="#ffffff" stroke="#2d2621" strokeWidth="2" strokeLinejoin="round" />
          {/* Battlements tower roof */}
          <path d="M 8 10 H 36 M 12 10 V 5 H 16 V 10 M 20 10 V 5 H 24 V 10 M 28 10 V 5 H 32 V 10" stroke="#2d2621" strokeWidth="2" fill="none" />
          {/* Soft pastel banner window */}
          <path d="M 16 18 A 4 4 0 0 1 28 18 V 26 H 16 Z" fill="#e8dff5" stroke="#2d2621" strokeWidth="2" />
          <path d="M 16 34 A 4 4 0 0 1 28 34 V 42 H 16 Z" fill="#fcf4dd" stroke="#2d2621" strokeWidth="2" />
          {/* Climbing vines (whimsical girly leaf sketches) */}
          <path d="M 8 50 Q 12 40 9 30 T 13 18" stroke="#94b0a0" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="45" r="2.5" fill="#e2f0cb" stroke="#2d2621" strokeWidth="0.8" />
          <circle cx="11" cy="38" r="2" fill="#e2f0cb" stroke="#2d2621" strokeWidth="0.8" />
          <circle cx="8" cy="28" r="2.5" fill="#e2f0cb" stroke="#2d2621" strokeWidth="0.8" />
        </g>
      ),
    },
    {
      id: "tidepool",
      name: "The Uncharted Tidepool",
      sub: "TIMELINE & SKILLS",
      desc: "Water lily milestones from 2019 to 2027 and float-shelf skills inventory.",
      x: 64,
      y: 72,
      path: "/timeline",
      icon: <Calendar className="w-4 h-4 text-[#e2f0cb]" />,
      svgMarkup: (
        <g id="tidepool-diorama">
          {/* Water pool */}
          <path d="M 5 25 C 10 15 35 15 42 22 C 48 30 38 42 25 44 C 12 45 2 34 5 25 Z" fill="#daeaf6" stroke="#2d2621" strokeWidth="2" />
          {/* Water ripples */}
          <path d="M 14 26 C 18 24 24 24 28 26 M 10 32 C 16 34 22 34 26 31" stroke="rgba(45,38,33,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Water lilies */}
          <circle cx="12" cy="22" r="3" fill="#e2f0cb" stroke="#2d2621" strokeWidth="1" />
          <circle cx="34" cy="34" r="3.5" fill="#fce1e4" stroke="#2d2621" strokeWidth="1" />
          <path d="M 31 34 L 37 34" stroke="#2d2621" strokeWidth="1" />
        </g>
      ),
    },
  ];

  const handleHotspotClick = (spot: IslandHotspot) => {
    playClickSound();
    if (spot.path === "lookout") {
      onSelectLookout();
    } else {
      setLocation(spot.path);
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#daeaf6]/40 via-[#fcf8f2]/90 to-[#f5ece0]/30 rounded-3xl border-2 border-[#2d2621] shadow-[6px_6px_0px_#2d2621] overflow-hidden p-4 select-none">
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-30" />

      {/* Decorative travel icons */}
      <div className="absolute top-4 left-4 flex items-center gap-2 font-serif text-[11px] font-bold text-stone-500 opacity-85">
        <Compass className="w-5 h-5 animate-spin-slow text-[#94b0a0]" />
        <span>MAP DIRECTORY // MANNAT'S DIORAMA</span>
      </div>

      {/* Drifting background clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <svg className="absolute top-8 left-0 w-[200vw] h-16 overflow-visible">
          <path d="M 10 20 Q 20 10 35 15 T 60 20 T 80 15 T 100 20 H 10 Z" fill="#ffffff" stroke="#2d2621" strokeWidth="1.5" className="cloud-drift-1" />
          <path d="M 200 30 Q 215 15 230 22 T 260 30 T 290 22 T 320 30 H 200 Z" fill="#ffffff" stroke="#2d2621" strokeWidth="1.5" className="cloud-drift-2" />
        </svg>
      </div>

      {/* Dynamic Hover HUD overlay */}
      <div className="absolute top-4 right-4 text-right max-w-xs h-24 hidden md:flex flex-col justify-between z-30">
        <AnimatePresence mode="wait">
          {hoveredSpot ? (
            <motion.div
              key={hoveredSpot.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="space-y-1 bg-white/95 border-2 border-[#2d2621] rounded-xl p-3 shadow-[2.5px_2.5px_0px_#2d2621]"
            >
              <div className="font-mono text-[#d6bdf2] text-[9px] tracking-wider uppercase font-bold">
                {hoveredSpot.sub}
              </div>
              <h4 className="font-serif text-sm text-[#2d2621] font-black">
                {hoveredSpot.name}
              </h4>
              <p className="text-[11px] text-stone-600 leading-snug font-sans font-medium">
                {hoveredSpot.desc}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="default-hud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-[11px] text-stone-500 font-serif italic pt-8 font-semibold"
            >
              Hover objects around the island to explore.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THE ISLAND CANVAS */}
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="relative w-[95%] aspect-[16/9] max-w-3xl">
          
          {/* Main Watercolor Island landmass (Top-down isometric base sketch) */}
          <svg viewBox="0 0 800 450" width="100%" height="100%" className="overflow-visible float-island">
            
            {/* Definitions for Lighthouse beam gradients */}
            <defs>
              <linearGradient id="lighthouse-beam-left" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stopColor="#fcf4dd" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#daeaf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lighthouse-beam-right" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="#fcf4dd" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#daeaf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sea wave ripples under island */}
            <ellipse cx="400" cy="300" rx="350" ry="120" fill="none" stroke="rgba(148,176,160,0.2)" strokeWidth="2" strokeDasharray="15 10" className="wave-ripple-1" />
            <ellipse cx="410" cy="305" rx="370" ry="130" fill="none" stroke="rgba(148,176,160,0.15)" strokeWidth="1.5" strokeDasharray="6 12" className="wave-ripple-2" />

            {/* Sandy Shoreline Layer */}
            <path 
              d="M 120 280 C 180 160 620 160 680 280 C 730 350 590 420 400 420 C 210 420 80 350 120 280 Z" 
              fill="#ebd9cc" 
              stroke="#2d2621" 
              strokeWidth="2.5" 
              strokeLinejoin="round" 
            />

            {/* Grass Cap Layer */}
            <path 
              d="M 150 270 C 200 180 600 180 650 270 C 690 330 570 390 400 390 C 230 390 120 330 150 270 Z" 
              fill="#cde0d4" 
              stroke="#2d2621" 
              strokeWidth="2.5" 
              strokeLinejoin="round" 
            />

            {/* Clay soil steps */}
            <path d="M 280 220 Q 400 190 520 220" fill="none" stroke="#2d2621" strokeWidth="2.5" strokeDasharray="4 2" />
            <path d="M 220 290 Q 400 270 580 290" fill="none" stroke="#2d2621" strokeWidth="1.5" />

            {/* Island paths */}
            <path 
              id="island-track"
              d="M 200 280 Q 280 250 400 260 T 620 280 M 400 260 Q 320 330 280 370 M 410 260 Q 480 310 520 370" 
              fill="none" 
              stroke="#fffdfa" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeDasharray="2 6"
              opacity="0.85"
            />
            <path 
              d="M 200 280 Q 280 250 400 260 T 620 280 M 400 260 Q 320 330 280 370 M 410 260 Q 480 310 520 370" 
              fill="none" 
              stroke="#2d2621" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeDasharray="2 6"
            />

            {/* Swaying Trees / Vegetation */}
            <g id="trees-group" className="sway-slow">
              {/* Tree 1 near museum */}
              <path d="M 330 200 L 330 215" stroke="#2d2621" strokeWidth="3" />
              <path d="M 315 200 C 310 180 350 180 345 200 Z" fill="#94b0a0" stroke="#2d2621" strokeWidth="2" />
              
              {/* Tree 2 near library */}
              <path d="M 230 310 L 230 325" stroke="#2d2621" strokeWidth="3" />
              <path d="M 215 310 C 210 290 250 290 245 310 Z" fill="#94b0a0" stroke="#2d2621" strokeWidth="2" />
            </g>
            <g id="trees-group-2" className="sway-medium">
              {/* Tree 3 right side */}
              <path d="M 590 220 L 590 235" stroke="#2d2621" strokeWidth="3" />
              <path d="M 575 220 C 570 205 610 205 605 220 Z" fill="#94b0a0" stroke="#2d2621" strokeWidth="2" />
            </g>

            {/* Little jetty and boat (Easter Egg) */}
            <g id="jetty" transform="translate(90, 310)">
              {/* Wooden planks */}
              <rect x="0" y="0" width="30" height="6" fill="#ebd9cc" stroke="#2d2621" strokeWidth="1.5" />
              <line x1="8" y1="0" x2="8" y2="12" stroke="#2d2621" strokeWidth="2" />
              <line x1="20" y1="0" x2="20" y2="12" stroke="#2d2621" strokeWidth="2" />
              {/* Sailboat */}
              <g className="float-boat" transform="translate(-15, 10)">
                <path d="M 2 8 L 18 8 L 22 14 L -2 14 Z" fill="#fffdfa" stroke="#2d2621" strokeWidth="1.5" />
                <line x1="10" y1="8" x2="10" y2="0" stroke="#2d2621" strokeWidth="1.5" />
                <path d="M 10 0 L 16 5 H 10 Z" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
              </g>
            </g>
            
            {/* Floating text labels inside diorama */}
            <text x="140" y="235" fontFamily="serif" fontSize="10" fill="#2d2621" fontWeight="bold">CLIFF LOOKOUT</text>
            <text x="350" y="170" fontFamily="serif" fontSize="10" fill="#2d2621" fontWeight="bold">GRAND GALLERY</text>
            <text x="640" y="275" fontFamily="serif" fontSize="10" fill="#2d2621" fontWeight="bold">MOTOR SHED</text>
            <text x="205" y="380" fontFamily="serif" fontSize="10" fill="#2d2621" fontWeight="bold">ARCHIVAL TOWER</text>
            <text x="590" y="395" fontFamily="serif" fontSize="10" fill="#2d2621" fontWeight="bold">TIDEPOOL</text>

            {/* Cruising Formula Racecar (Animated overlay along track) */}
            <motion.g
              initial={{ x: 620, y: 280, scale: 0.8 }}
              animate={{
                x: [620, 400, 200, 280, 400, 520, 620],
                y: [280, 260, 280, 370, 260, 370, 280],
                rotate: [0, -10, 15, -45, 15, 45, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Formula Student miniature chassis */}
              <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#94b0a0" stroke="#2d2621" strokeWidth="1.5" />
              {/* Wing */}
              <rect x="-11" y="-5" width="3" height="10" fill="#2d2621" />
              {/* Wheels */}
              <circle cx="-5" cy="-5" r="2" fill="#2d2621" />
              <circle cx="-5" cy="5" r="2" fill="#2d2621" />
              <circle cx="5" cy="-5" r="2" fill="#2d2621" />
              <circle cx="5" cy="5" r="2" fill="#2d2621" />
              {/* Driver helmet (girly pink touch) */}
              <circle cx="0" cy="0" r="2.5" fill="#fce1e4" stroke="#2d2621" strokeWidth="1" />
            </motion.g>

          </svg>

          {/* Interactive Clickable Hotspots overlayed in DOM relative positions */}
          {hotspots.map((spot) => {
            const isHovered = hoveredSpot?.id === spot.id;
            
            return (
              <div
                key={spot.id}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 cursor-pointer"
              >
                <motion.div
                  onMouseEnter={() => {
                    playHoverSound();
                    setHoveredSpot(spot);
                  }}
                  onMouseLeave={() => setHoveredSpot(null)}
                  onClick={() => handleHotspotClick(spot)}
                  className="relative flex flex-col items-center"
                  animate={isHovered ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                >
                  {/* Glowing wash color highlight overlay */}
                  <div 
                    className={`absolute -inset-6 rounded-full transition-all duration-300 pointer-events-none opacity-70 ${
                      isHovered 
                        ? spot.id === "lookout" 
                          ? "bg-[#ebd5c8]/30 blur-md"
                          : spot.id === "museum"
                          ? "bg-[#daeaf6]/40 blur-md"
                          : spot.id === "workshop"
                          ? "bg-[#e2f0cb]/40 blur-md"
                          : spot.id === "library"
                          ? "bg-[#e8dff5]/40 blur-md"
                          : "bg-[#daeaf6]/40 blur-md" 
                        : "bg-transparent"
                    }`} 
                  />

                  {/* Hotspot Landmark SVG Group wrapper */}
                  <svg 
                    width="60" 
                    height="70" 
                    viewBox="0 0 50 60" 
                    className="overflow-visible transition-transform duration-200"
                  >
                    {spot.svgMarkup}
                  </svg>

                  {/* Hotspot tag text banner */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 6 }}
                        className="absolute top-16 bg-white border-2 border-[#2d2621] rounded-xl px-2.5 py-0.5 shadow-[2px_2px_0px_#2d2621] whitespace-nowrap text-[9px] font-mono text-[#2d2621] font-bold flex items-center gap-1 z-35"
                      >
                        {spot.icon}
                        <span>{spot.name.toUpperCase()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Mobile bottom HUD reader */}
      <div className="md:hidden border-t-2 border-[#2d2621] pt-2 flex items-center justify-between text-[11px] font-mono font-bold mt-2">
        {hoveredSpot ? (
          <div>
            <span className="text-[#94b0a0]">{hoveredSpot.sub}</span>
            <span className="text-stone-500 font-sans ml-2 font-normal">{hoveredSpot.desc}</span>
          </div>
        ) : (
          <span className="text-stone-400 italic">Tap landmarks on the island to walk inside.</span>
        )}
      </div>

    </div>
  );
}
