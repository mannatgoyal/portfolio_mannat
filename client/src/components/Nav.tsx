import { useState } from "react";
import { Link, useLocation } from "wouter";
import { playClickSound, setSoundEnabled, getSoundEnabled, playPageFlipSound, playHoverSound } from "@/lib/audio";
import { Volume2, VolumeX, Compass, Map, X, Menu, BookOpen, Compass as CompassIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/about", label: "Observation Gate", desc: "The naturalist gate & core skill specimens stamps", code: "BIO" },
  { href: "/experiments", label: "Projects Playground", desc: "Interactive pedestals to active software & ML exhibits", code: "EXH" },
  { href: "/machines", label: "EV Motor Shed", desc: "Workshop garage fleet housing TUFF 17, 18, and 19 EVs", code: "MCH" },
  { href: "/research", label: "Research Archives", desc: "Technical manuscript logs detailing RL stint strategy & VoltQuant SOH", code: "LIB" },
  { href: "/timeline", label: "Milestones Tidepool", desc: "Tidepool stepping stones mapping years 2019 to 2027", code: "TDE" },
];

export function Nav() {
  const [location] = useLocation();
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playPageFlipSound(), 100);
    } else {
      playClickSound();
    }
  };

  const handleLinkClick = () => {
    playClickSound();
    playPageFlipSound();
    setMenuOpen(false);
  };

  const currentLabel = links.find(l => l.href === location)?.label || "Exploration Map";

  return (
    <>
      {/* Floating Pocket Compass HUD Button */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        
        {/* Current Location Badge (Translucent & Minimal) */}
        <div className="hidden sm:flex flex-col items-end bg-white/80 backdrop-blur-md border-2 border-[#2d2621] rounded-xl px-3 py-1 text-right shadow-[2px_2px_0px_#2d2621]">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#94b0a0]">
            CURRENT LOCATION
          </span>
          <span className="text-[12px] font-serif font-bold text-[#2d2621]">
            {currentLabel.toUpperCase()}
          </span>
        </div>

        {/* Pocket Compass explorer toggle */}
        <button
          onClick={() => {
            playClickSound();
            setMenuOpen(!menuOpen);
          }}
          onMouseEnter={playHoverSound}
          className="w-12 h-12 bg-white border-2 border-[#2d2621] rounded-full flex items-center justify-center shadow-[3px_3px_0px_#2d2621] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2d2621] active:translate-y-[1px] active:shadow-[1px_1px_0px_#2d2621] transition-all cursor-pointer group"
          title="Open pocket compass legend"
        >
          <motion.div
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-[#94b0a0] group-hover:text-[#d6bdf2]"
          >
            {menuOpen ? <X className="w-6 h-6 text-[#2d2621]" /> : <Compass className="w-6 h-6 animate-spin-slow" />}
          </motion.div>
        </button>
      </div>

      {/* Floating Travel Guide / Sitemap Legend overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-45 bg-[#2d2621]/30 backdrop-blur-sm flex items-center justify-center p-4">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => { playClickSound(); setMenuOpen(false); }} />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="sketch-panel max-w-lg w-full bg-[#fcf8f2] p-6 relative z-10 space-y-6 overflow-hidden paper-grain"
            >
              {/* Header Title */}
              <div className="border-b-2 border-[#2d2621] pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-serif font-black uppercase text-[#2d2621] leading-none">
                    POCKET TRAVEL COMPASS
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans mt-1.5 uppercase font-semibold">
                    Interactive Island Guide Legend
                  </p>
                </div>
                
                {/* Acoustics brass toggle switch */}
                <button
                  onClick={toggleSound}
                  onMouseEnter={playHoverSound}
                  className={`p-2 bg-white border-2 border-[#2d2621] rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_#2d2621] active:translate-y-[1px] active:shadow-[0px_0px_0px_#2d2621] ${
                    soundOn ? "text-[#94b0a0]" : "text-stone-400"
                  }`}
                  title={soundOn ? "Mute paper acoustics" : "Activate paper acoustics"}
                >
                  {soundOn ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Bio signature inside sitemap */}
              <div className="p-3 bg-[#e8dff5]/30 border-2 border-[#2d2621] rounded-xl">
                <span className="font-serif font-extrabold text-sm text-[#2d2621] block">
                  Mannat Goyal
                </span>
                <span className="text-[11px] font-sans text-stone-600 block mt-0.5">
                  Pursuing Computer Engineering at Thapar + Data Science &amp; AI at IIT Guwahati. 
                  Building intelligent systems connecting ML with physical engineering hardware.
                </span>
              </div>

              {/* Sitemap Links */}
              <nav aria-label="Explorer Sitemap" className="space-y-2">
                {links.map(({ href, label, desc, code }) => {
                  const isActive = location === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleLinkClick}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer group select-none ${
                        isActive
                          ? "bg-[#ddedea] border-[#2d2621] shadow-[2.5px_2.5px_0px_#2d2621] translate-y-[-1px]"
                          : "bg-white border-transparent hover:border-[#2d2621] hover:shadow-[2.5px_2.5px_0px_#2d2621]"
                      }`}
                    >
                      <div className={`p-1.5 border-2 border-[#2d2621] rounded-lg mt-0.5 ${
                        isActive ? "bg-white text-[#94b0a0]" : "bg-stone-50 text-stone-400 group-hover:bg-[#e8dff5] group-hover:text-[#2d2621]"
                      }`}>
                        <CompassIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-[#2d2621] group-hover:underline">
                            {label}
                          </span>
                          <span className="font-mono text-[9px] text-stone-400 font-bold uppercase">
                            [{code}]
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 leading-tight mt-0.5 font-sans">
                          {desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
