import { Brain, Battery, Cpu, Shield } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface ResearchDir {
  code: string;
  title: string;
  status: string;
  badgeClass: string;
  icon: React.ReactNode;
  manifesto: string;
  researchAreas: string[];
}

const directions: ResearchDir[] = [
  {
    code: "DIR-01",
    title: "Motorsport Reinforcement Learning",
    status: "ACTIVE SOLVER",
    badgeClass: "bg-[#e2f0cb]",
    icon: <Brain className="w-4 h-4 text-[#2d2621]" />,
    manifesto: "Formula Student EV dynamics require real-time strategic modeling. Stint strategy algorithms must resolve tire compound decay patterns, track temp variables, and competitive grid placement. We simulate trust dynamics across multiple vehicles to predict optimal pit stops and battery preservation.",
    researchAreas: ["Reinforcement Learning", "Game Theory", "Decay Modeling"],
  },
  {
    code: "DIR-02",
    title: "VoltQuant: Quantum Battery SOH",
    status: "CALIBRATION",
    badgeClass: "bg-[#ebd9cc]",
    icon: <Battery className="w-4 h-4 text-[#2d2621]" />,
    manifesto: "VoltQuant models lithium State of Health (SOH) at the edge. By mapping parameter-embedded cell inputs (voltage, current, temperature) via ZZFeatureMaps and AngleEmbeddings onto Parameterized Quantum Circuits (PQCs), we prevent thermal runaway.",
    researchAreas: ["Hybrid Quantum ML", "ZZFeatureMaps", "PennyLane / Qiskit"],
  },
  {
    code: "DIR-03",
    title: "Cyber-Physical Network Shielding",
    status: "SHIELD ENABLED",
    badgeClass: "bg-[#daeaf6]",
    icon: <Shield className="w-4 h-4 text-[#2d2621]" />,
    manifesto: "Industrial networks are vulnerable to switch-level injections. Using XGBoost gateway packet classifiers, a Deep Q-Network (DQN) agent evaluates alerts and executes instant firewall mitigation scripts, protecting critical STM32 CAN bus lines.",
    researchAreas: ["XGBoost Classifiers", "DQN Mitigation", "CAN Bus Safeguards"],
  },
  {
    code: "DIR-04",
    title: "Compression-Robust CNN Forensics",
    status: "VERIFIED",
    badgeClass: "bg-[#e8dff5]",
    icon: <Cpu className="w-4 h-4 text-[#2d2621]" />,
    manifesto: "Digital verification models generally require raw pixel streams. This pipeline leverages ResNet18 convolutional backbones trained on compression-resistant textures, mapping features via Grad-CAM to produce weak localization heatmaps.",
    researchAreas: ["ResNet18 CNN", "Grad-CAM Heatmaps", "Image Manipulation"],
  },
];

export function ResearchLogsLeft() {
  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Research logs (Vol. I)
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 05]</span>
        </div>

        {/* First two logs */}
        <div className="space-y-4 pt-1">
          {directions.slice(0, 2).map((dir) => (
            <div 
              key={dir.code}
              className="p-3 bg-white border-2 border-[#2d2621]/30 rounded-xl shadow-[2px_2px_0px_rgba(45,38,33,0.1)] space-y-2 select-none"
            >
              <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-[#fcf8f2] border border-[#2d2621]/20 rounded-full">
                    {dir.icon}
                  </div>
                  <span className="font-serif text-[11px] font-black text-[#2d2621] uppercase leading-none">
                    {dir.title}
                  </span>
                </div>
                <span className={`text-[7.5px] font-mono font-bold px-2 py-0.2 rounded-full border border-[#2d2621]/20 ${dir.badgeClass}`}>
                  {dir.status}
                </span>
              </div>
              
              <p className="text-[10px] text-stone-600 leading-normal font-sans font-medium">
                {dir.manifesto}
              </p>

              <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-100">
                {dir.researchAreas.map((area, i) => (
                  <span key={i} className="text-[8px] font-mono text-stone-400 font-bold uppercase">
                    #{area.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function ResearchLogsRight() {
  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Research logs (Vol. II)
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 06]</span>
        </div>

        {/* Next two logs */}
        <div className="space-y-4 pt-1">
          {directions.slice(2, 4).map((dir) => (
            <div 
              key={dir.code}
              className="p-3 bg-white border-2 border-[#2d2621]/30 rounded-xl shadow-[2px_2px_0px_rgba(45,38,33,0.1)] space-y-2 select-none"
            >
              <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-[#fcf8f2] border border-[#2d2621]/20 rounded-full">
                    {dir.icon}
                  </div>
                  <span className="font-serif text-[11px] font-black text-[#2d2621] uppercase leading-none">
                    {dir.title}
                  </span>
                </div>
                <span className={`text-[7.5px] font-mono font-bold px-2 py-0.2 rounded-full border border-[#2d2621]/20 ${dir.badgeClass}`}>
                  {dir.status}
                </span>
              </div>
              
              <p className="text-[10px] text-stone-600 leading-normal font-sans font-medium">
                {dir.manifesto}
              </p>

              <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-100">
                {dir.researchAreas.map((area, i) => (
                  <span key={i} className="text-[8px] font-mono text-stone-400 font-bold uppercase">
                    #{area.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function ResearchLogs() {
  return null;
}
