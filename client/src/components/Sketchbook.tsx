import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound, playDrawerSlideSound, playPageFlipSound } from "@/lib/audio";
import { Compass, BookOpen, User, Calendar, Hammer, Waves, ArrowRight, ArrowLeft } from "lucide-react";

interface SketchbookProps {
  activeSpread: number;
  onSpreadChange: (index: number) => void;
  spreads: {
    left: React.ReactNode;
    right: React.ReactNode;
    leftBg?: string; // custom page colors for Y2K style
    rightBg?: string;
  }[];
}

const N = 16; // Number of nested strips for realistic curve bending
const BETA = 0.55; // Peak bend curvature arc in radians

export function Sketchbook({ activeSpread, onSpreadChange, spreads }: SketchbookProps) {
  const [currentSpread, setCurrentSpread] = useState(activeSpread);
  const [turnState, setTurnState] = useState<"next" | "prev" | null>(null);
  const [t, setT] = useState(0); // page turn progress: 0 to 1
  const [targetT, setTargetT] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Loupe (magnifying glass) coordinates
  const [loupe, setLoupe] = useState({ lx: 180, ly: 140, on: false, held: false });
  const sbBookRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  
  // Parallax tilt angles
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Drag variables
  const dragStartRef = useRef({ x: 0, y: 0, t: 0, time: 0 });
  const dragVelRef = useRef(0);

  // Synchronize internal page state with external prop changes (e.g. navigation links)
  useEffect(() => {
    if (activeSpread !== currentSpread && !turnState && !isDragging) {
      const direction = activeSpread > currentSpread ? "next" : "prev";
      setTurnState(direction);
      setT(0);
      setTargetT(1);
      velocityRef.current = 2.5; // push speed
    }
  }, [activeSpread, currentSpread]);

  // Spring physics solver frame loop
  useEffect(() => {
    if (!turnState || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const springTick = () => {
      const k = 195; // spring stiffness
      const c = 24; // spring damping
      const dt = 0.016;

      setT((prevT) => {
        const force = -k * (prevT - targetT) - c * velocityRef.current;
        velocityRef.current += force * dt;
        const nextT = prevT + velocityRef.current * dt;

        if (Math.abs(nextT - targetT) < 0.001 && Math.abs(velocityRef.current) < 0.02) {
          // Turn animation completed, settle values
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
          velocityRef.current = 0;

          if (targetT === 1) {
            const nextSpreadIdx = turnState === "next" ? currentSpread + 1 : currentSpread - 1;
            setCurrentSpread(nextSpreadIdx);
            onSpreadChange(nextSpreadIdx);
          }
          setTurnState(null);
          return 0;
        }

        animationRef.current = requestAnimationFrame(springTick);
        return Math.max(0, Math.min(1, nextT));
      });
    };

    animationRef.current = requestAnimationFrame(springTick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [turnState, targetT, isDragging]);

  // Shove Loupe to the side during page turn
  useEffect(() => {
    if (turnState && t > 0.05 && t < 0.95 && loupe.on) {
      // Rotate loupe away from the center turn fold
      const centerLimit = turnState === "next" ? 0.35 : 0.65;
      const targetLx = turnState === "next" ? 120 : 680;
      setLoupe((prev) => ({
        ...prev,
        lx: prev.lx > 300 && prev.lx < 500 ? targetLx : prev.lx
      }));
    }
  }, [turnState, t]);

  // Pointer Parallax lean handlers
  const handlePointerMoveStage = (e: React.PointerEvent) => {
    if (loupe.held) return;
    const stage = e.currentTarget;
    const rect = stage.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      rx: -my * 5, // rotateX limit
      ry: mx * 5   // rotateY limit
    });
  };

  const handlePointerLeaveStage = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Drag to Turn mechanics
  const handlePointerDownZone = (e: React.PointerEvent, dir: "next" | "prev") => {
    if (turnState || isDragging) return;
    e.preventDefault();
    playClickSound();

    setIsDragging(true);
    setTurnState(dir);
    setT(0);
    setTargetT(0);
    velocityRef.current = 0;
    
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      t: 0,
      time: Date.now()
    };
    dragVelRef.current = 0;
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveZone = (e: React.PointerEvent) => {
    if (!isDragging || !turnState) return;
    e.preventDefault();

    if (!sbBookRef.current) return;
    const bookWidth = sbBookRef.current.offsetWidth;
    const pageHalfWidth = bookWidth / 2;

    const dx = e.clientX - dragStartRef.current.x;
    const dtTime = Date.now() - dragStartRef.current.time;

    let progress = 0;
    if (turnState === "next") {
      progress = Math.max(0, Math.min(1, -dx / pageHalfWidth));
    } else {
      progress = Math.max(0, Math.min(1, dx / pageHalfWidth));
    }

    setT(progress);
    
    if (dtTime > 10) {
      dragVelRef.current = (progress - t) / (dtTime / 1000);
      dragStartRef.current.time = Date.now();
    }
  };

  const handlePointerUpZone = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    const velocity = dragVelRef.current;
    
    // Commit page turn if page is dragged past mid-point or thrown with high velocity
    if (t > 0.42 || velocity > 1.2) {
      setTargetT(1);
      velocityRef.current = Math.max(1.8, velocity);
      playPageFlipSound();
    } else {
      setTargetT(0);
      velocityRef.current = -Math.max(1.2, Math.abs(velocity));
      playClickSound();
    }
  };

  // Magnifying Glass handlers
  const handlePointerDownLoupe = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    
    const ring = e.currentTarget as HTMLElement;
    ring.setPointerCapture(e.pointerId);
    setLoupe((prev) => ({ ...prev, held: true }));
  };

  const handlePointerMoveLoupe = (e: React.PointerEvent) => {
    if (!loupe.held || !sbBookRef.current) return;
    e.preventDefault();

    const bookRect = sbBookRef.current.getBoundingClientRect();
    const lx = e.clientX - bookRect.left;
    const ly = e.clientY - bookRect.top;

    setLoupe((prev) => ({
      ...prev,
      lx: Math.max(0, Math.min(bookRect.width, lx)),
      ly: Math.max(0, Math.min(bookRect.height, ly))
    }));

    if (Math.round(lx) % 15 === 0) playHoverSound();
  };

  const handlePointerUpLoupe = (e: React.PointerEvent) => {
    e.preventDefault();
    const ring = e.currentTarget as HTMLElement;
    ring.releasePointerCapture(e.pointerId);
    setLoupe((prev) => ({ ...prev, held: false }));
    playDrawerSlideSound();
  };

  const toggleLoupe = () => {
    playClickSound();
    setLoupe((prev) => ({ ...prev, on: !prev.on }));
  };

  // Layout math parameters
  const span = 0.45; // span of each page half
  
  // Left and Right page indexes based on current spread
  const leftIdx = currentSpread * 2;
  const rightIdx = currentSpread * 2 + 1;

  // Turning page details
  const showCurl = turnState !== null;
  const curlDir = turnState;

  // Custom function to render strips recursively
  const renderStrips = (i: number, dir: "next" | "prev") => {
    const th_rad = Math.PI * t;
    const beta_rad = BETA * Math.sin(Math.PI * t);
    
    // Root strip tilt swing
    const tt_rad = th_rad + (dir === "next" ? beta_rad : -beta_rad);
    const tt_deg = tt_rad * (180 / Math.PI);
    
    // Nested step bend angles
    const td_rad = (2 * beta_rad) / N;
    const td_deg = td_rad * (180 / Math.PI);

    // Calculate light shading for index i
    const angle1 = tt_rad - i * td_rad;
    const angle2 = tt_rad - (i + 1) * td_rad;
    const l1 = Math.abs(Math.cos(angle1));
    const l2 = Math.abs(Math.cos(angle2));
    const a1 = (1 - l1) * 0.48;
    const a2 = (1 - l2) * 0.48;

    const stripStyle = {
      "--td": `${td_deg}deg`,
      "--lit": l1,
      "--a1": a1,
      "--a2": a2,
    } as React.CSSProperties;

    // Background slice alignment mapping
    // Slices coordinate offset to display continuous page graphics
    const swPercentage = 100 / N;
    const bgOffsetFront = dir === "next" 
      ? `${50 + (i * swPercentage) / 2}%` // slicing front page (from right to left)
      : `${50 - ((N - i) * swPercentage) / 2}%`; // slicing back page

    const bgOffsetBack = dir === "next"
      ? `${50 - ((N - i) * swPercentage) / 2}%`
      : `${50 + (i * swPercentage) / 2}%`;

    const isEdge = i === N - 1;

    return (
      <div className={`strip ${isEdge ? "edge" : ""}`} style={stripStyle}>
        
        {/* Front Face of Strip */}
        <div 
          className="face front paper-grain"
          style={{
            backgroundPosition: dir === "next" 
              ? `${-i * 100}% center` // displays slices of Right page
              : `${-(N - 1 - i) * 100}% center`,
            backgroundColor: dir === "next" ? spreads[currentSpread].rightBg || "#fffdfa" : spreads[currentSpread].leftBg || "#fffdfa"
          }}
        >
          {/* Faint gray scribble doodles during leaf turning */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none">
            <path d={`M 0 ${30 + i * 2} H 50`} stroke="#2d2621" strokeWidth="1" />
            <path d={`M 10 ${40 + i * 3} H 45`} stroke="#2d2621" strokeWidth="1" />
          </svg>
          <div className="sh" />
          <div className="gl" />
        </div>

        {/* Back Face of Strip */}
        <div 
          className="face back paper-grain"
          style={{
            backgroundPosition: dir === "next"
              ? `${-(N - 1 - i) * 100}% center` // displays back face of next page
              : `${-i * 100}% center`,
            backgroundColor: dir === "next" ? spreads[currentSpread + 1]?.leftBg || "#fffdfa" : spreads[currentSpread - 1]?.rightBg || "#fffdfa"
          }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none">
            <path d={`M 0 ${35 + i * 2} H 48`} stroke="#2d2621" strokeWidth="1" />
            <path d={`M 12 ${45 + i * 3} H 42`} stroke="#2d2621" strokeWidth="1" />
          </svg>
          <div className="sh" />
          <div className="gl" />
        </div>

        {/* Nest next strip recursively */}
        {i < N - 1 ? renderStrips(i + 1, dir) : null}
      </div>
    );
  };

  // Helper variables for CSS transform properties
  const t_clamped = Math.max(0, Math.min(1, t));
  const th_deg = t_clamped * 180;
  const beta_deg = BETA * Math.sin(Math.PI * t_clamped) * (180 / Math.PI);
  const tt_deg = th_deg + (curlDir === "next" ? beta_deg : -beta_deg);
  const td_deg = ((2 * BETA * Math.sin(Math.PI * t_clamped)) / N) * (180 / Math.PI);
  const shade = Math.sin(Math.PI * t_clamped);

  const bookStyle = {
    "--rx": `${tilt.rx}deg`,
    "--ry": `${tilt.ry}deg`,
    "--tt": `${tt_deg}deg`,
    "--td": `${td_deg}deg`,
    "--shade": shade,
    "--span": span,
    "--n": N,
    "--bw": sbBookRef.current ? `${sbBookRef.current.offsetWidth}px` : "800px",
    "--lr": "240px"
  } as React.CSSProperties;

  return (
    <div className="sb-wrap">
      
      {/* 3D stage and page indicators */}
      <div 
        className="sb-stage" 
        onPointerMove={handlePointerMoveStage}
        onPointerLeave={handlePointerLeaveStage}
      >
        
        {/* Left Arrow accessibility trigger */}
        <button
          className="sb-arrow mr-4"
          disabled={currentSpread === 0 || showCurl}
          onClick={() => {
            playPageFlipSound();
            setTurnState("prev");
            setT(0);
            setTargetT(1);
            velocityRef.current = 2.4;
          }}
          title="Previous Page"
        >
          <ArrowLeft className="w-5 h-5 text-[#2d2621]" />
        </button>

        {/* 3D Perspective container */}
        <div className="sb-3d" style={bookStyle}>
          
          {/* Tilt container */}
          <div className="sb-tilt">
            
            {/* Soft pool shadows under the book */}
            <div className="sb-cast ambient" />
            <div className="sb-cast contact" />

            {/* Draggable page turn zones (hover edges) */}
            {!showCurl && currentSpread > 0 && (
              <div 
                className="sb-zone sb-prev" 
                onPointerDown={(e) => handlePointerDownZone(e, "prev")}
                onPointerMove={handlePointerMoveZone}
                onPointerUp={handlePointerUpZone}
              />
            )}
            {!showCurl && currentSpread < spreads.length - 1 && (
              <div 
                className="sb-zone sb-next" 
                onPointerDown={(e) => handlePointerDownZone(e, "next")}
                onPointerMove={handlePointerMoveZone}
                onPointerUp={handlePointerUpZone}
              />
            )}

            {/* Main book cover container */}
            <div ref={sbBookRef} className="sb-book relative overflow-visible">
              
              {/* STATIC PAGES SPREAD (Visible when not page turning) */}
              <div className="absolute inset-0 flex justify-between z-5">
                
                {/* Left Page Half */}
                <div 
                  className="sb-half left paper-grain overflow-hidden"
                  style={{ backgroundColor: spreads[currentSpread].leftBg || "#fffdfa" }}
                >
                  {/* Render content on the left page. If closed book cover (spread 0), left side is empty desk */}
                  {currentSpread > 0 ? (
                    spreads[currentSpread].left
                  ) : (
                    <div className="w-full h-full bg-transparent border-none" />
                  )}
                  {/* Gutter crease shading shadow */}
                  <div className="gutter-shade left" style={{ "--shade": 0.55 } as React.CSSProperties} />
                </div>

                {/* Right Page Half */}
                <div 
                  className="sb-half right paper-grain overflow-hidden"
                  style={{ backgroundColor: spreads[currentSpread].rightBg || "#fffdfa" }}
                >
                  {/* Render content on the right page. */}
                  {spreads[currentSpread].right}
                  <div className="gutter-shade right" style={{ "--shade": 0.45 } as React.CSSProperties} />
                </div>
              </div>

              {/* 3D TURNING LEAF LAYER (Visible only during active page turns) */}
              {showCurl && curlDir && (
                <div className={`curl ${curlDir}`}>
                  {renderStrips(0, curlDir)}
                </div>
              )}

              {/* Gutter overlay crease line decoration */}
              <div className="absolute top-0 bottom-0 left-[50%] w-[1.5px] bg-[#2d2621]/15 z-12 transform translate-x-[-50%]" />

            </div>

          </div>

          {/* Draggable Magnifier Glass (Loupe) */}
          <div 
            className={`loupe ${loupe.on ? "on" : ""} ${loupe.held ? "held" : ""}`}
            style={{
              transform: `translate(${loupe.lx - 120}px, ${loupe.ly - 120}px)`
            }}
          >
            {/* The circular grab bezel */}
            <div 
              className="ring"
              onPointerDown={handlePointerDownLoupe}
              onPointerMove={handlePointerMoveLoupe}
              onPointerUp={handlePointerUpLoupe}
            >
              {/* Glass Lens (Clones zoom content underneath) */}
              <div className="lens">
                {/* Magnified zoom content viewport */}
                <div 
                  className="absolute inset-0 bg-white"
                  style={{
                    transform: `scale(2.35) translate(${-loupe.lx + 50}px, ${-loupe.ly + 50}px)`,
                    transformOrigin: "0% 0%",
                    width: sbBookRef.current ? `${sbBookRef.current.offsetWidth}px` : "800px",
                    height: "100%",
                    pointerEvents: "none"
                  }}
                >
                  <div className="w-full h-full flex justify-between">
                    <div className="w-1/2 h-full overflow-hidden relative" style={{ backgroundColor: spreads[currentSpread].leftBg || "#fffdfa" }}>
                      {currentSpread > 0 && spreads[currentSpread].left}
                    </div>
                    <div className="w-1/2 h-full overflow-hidden relative" style={{ backgroundColor: spreads[currentSpread].rightBg || "#fffdfa" }}>
                      {spreads[currentSpread].right}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bezel grab grip handle */}
            <div className="grip" />
          </div>

        </div>

        {/* Right Arrow accessibility trigger */}
        <button
          className="sb-arrow ml-4"
          disabled={currentSpread === spreads.length - 1 || showCurl}
          onClick={() => {
            playPageFlipSound();
            setTurnState("next");
            setT(0);
            setTargetT(1);
            velocityRef.current = 2.4;
          }}
          title="Next Page"
        >
          <ArrowRight className="w-5 h-5 text-[#2d2621]" />
        </button>

      </div>

      {/* Toolbox: Loupe toggle and pagination tabs */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Draggable Magnifier toggle switch */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLoupe}
            className={`sketch-btn py-1.5 text-xs ${loupe.on ? "sketch-btn-active bg-[#ebd9cc]" : ""}`}
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>{loupe.on ? "Put Down Glass" : "Pick Up Magnifying Glass"}</span>
          </button>
        </div>

        {/* Navigation Tabs (Table of Contents stamps) */}
        <div className="book-tabs">
          {["Cover", "About", "Projects", "Electric Cars", "Research", "Timeline"].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => {
                if (idx === currentSpread) return;
                playPageFlipSound();
                const direction = idx > currentSpread ? "next" : "prev";
                setTurnState(direction);
                setT(0);
                setTargetT(1);
                velocityRef.current = 2.5;
                setCurrentSpread(idx);
                onSpreadChange(idx);
              }}
              disabled={showCurl}
              className={`book-tab-btn ${idx === currentSpread ? "is-active" : ""}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
