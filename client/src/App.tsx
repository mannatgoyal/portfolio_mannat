import { useEffect, useState } from "react";
// @ts-ignore
import Application from "./javascript/Application.js";
import "./style/main.css";
import { LandingGate } from "./components/LandingGate";
import { TextPortfolioView } from "./components/TextPortfolioView";
import { BookOpen, Home, Sparkles } from "lucide-react";

export default function App() {
  const [viewMode, setViewMode] = useState<"landing" | "3d" | "text">("landing");

  useEffect(() => {
    // Find the canvas element defined in index.html
    const canvas = document.querySelector(".js-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    // Instantiate the WebGL application
    const app = new Application({
      $canvas: canvas,
    });

    return () => {
      // Clean up physics, postprocessing, cameras, and window listeners on unmount
      if (app && typeof app.destructor === "function") {
        app.destructor();
      }
    };
  }, []);

  return (
    <>
      {/* 1. Entry Landing Gate (Mode Selector) */}
      {viewMode === "landing" && (
        <LandingGate 
          onSelect3D={() => setViewMode("3d")}
          onSelectText={() => setViewMode("text")}
        />
      )}

      {/* 2. Text / Structured Portfolio View */}
      {viewMode === "text" && (
        <TextPortfolioView 
          onSwitchTo3D={() => setViewMode("3d")}
          onOpenGate={() => setViewMode("landing")}
        />
      )}

      {/* 3. 3D World Top Navigation HUD */}
      {viewMode === "3d" && (
        <div className="fixed top-5 right-5 z-[95] flex items-center gap-3">
          {/* Mode Selector / Home button */}
          <button 
            onClick={() => setViewMode("landing")}
            className="sketch-btn py-1.5 px-4 text-xs font-serif font-black bg-[#fcf8f2] hover:bg-white cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#d68c45]" />
            <span className="hidden sm:inline">Mode Selector</span>
          </button>

          {/* Switch to Text Portfolio */}
          <button 
            onClick={() => setViewMode("text")}
            className="sketch-btn py-1.5 px-4 text-xs font-serif font-black bg-[#fce1e4] hover:bg-[#ffb3c6] text-[#2d2621] cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#2d2621]" />
            <span>📖 Engineer's Diary</span>
          </button>
        </div>
      )}

      {/* 4. 3D World Driving Controls Bar */}
      {viewMode === "3d" && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px',
          background: 'rgba(7, 11, 20, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 179, 198, 0.3)',
          borderRadius: '20px',
          padding: '10px 22px',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '13px',
          pointerEvents: 'none',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          zIndex: 90,
          alignItems: 'center'
        }}>
          <div style={{ marginRight: '4px', fontWeight: 'bold', color: '#ffb3c6' }}>🚗 DRIVE:</div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <kbd style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}>W A S D</kbd>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>
            <kbd style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}>⬆️ ⬇️ ⬅️ ➡️</kbd>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <kbd style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}>SPACE</kbd>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Brake</span>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <kbd style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}>R</kbd>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Reset</span>
          </div>
        </div>
      )}
    </>
  );
}
