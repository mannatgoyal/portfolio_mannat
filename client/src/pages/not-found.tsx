import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { playClickSound } from "@/lib/audio";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
      <div className="console-panel console-panel-warning p-6 max-w-md w-full bg-slate-950/40 border border-slate-800 text-center space-y-4">
        <div className="flex justify-center text-orange-500">
          <AlertTriangle className="h-12 w-12 animate-bounce" />
        </div>
        
        <h1 className="text-xl font-hud font-bold text-white uppercase tracking-wider">
          SIGNAL TIMEOUT: 404
        </h1>
        
        <p className="text-sm font-mono text-slate-400">
          The requested coordinate or subsystem path does not exist on this active telemetry console node.
        </p>

        <div className="pt-4 border-t border-slate-900">
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="hud-btn inline-flex justify-center w-full py-2 text-xs font-bold text-cyan-400 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> RETURN TO MASTER INTERACTION PANEL
          </Link>
        </div>
      </div>
    </div>
  );
}
