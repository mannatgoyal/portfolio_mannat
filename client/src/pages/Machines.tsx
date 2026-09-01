import { playHoverSound, playClickSound, playDrawerSlideSound } from "@/lib/audio";
import { Cpu, Star, Activity, Zap } from "lucide-react";

interface VehicleData {
  code: string;
  id: string;
  name: string;
  season: string;
  tag: string;
  status: string;
  desc: string;
  note: string;
  highlight?: string;
  specs: { label: string; val: string }[];
  svgProfile: React.ReactNode;
}

const vehicles: VehicleData[] = [
  {
    code: "A1",
    id: "TUFF 17",
    name: "TUFF 17",
    season: "2024-2025 Season 1 Build",
    tag: "INAUGURAL EV",
    status: "DECOMMISSIONED",
    desc: "Our inaugural electric vehicle platform. Acted as the team's transition system from combustion engines to EV powertrains. We mapped out low-voltage sensor lines and resolved early noise issues between the microcontroller and the high-voltage lines.",
    note: "Successfully resolved low-voltage noise decoupling, enabling safe static inspections. Configured the primary low-voltage shutdown loop sequence.",
    highlight: "Pi-EV 2024 - Procurement Winners",
    specs: [
      { label: "DAQ BRAIN", val: "ESP32 Core Module" },
      { label: "TRACTION MOTOR", val: "Emrax 228 (High Output)" },
      { label: "HV INVERTER", val: "DTI HV550 Controller" },
      { label: "ACCUMULATOR STACK", val: "Molicel P45B Lithium-Ion" },
    ],
    svgProfile: (
      <g transform="translate(5, 5)">
        <path d="M 4 28 L 8 26 L 15 16 H 26 L 31 26 L 36 28" stroke="#2d2621" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="12" y="26" width="18" height="6" fill="#daeaf6" stroke="#2d2621" strokeWidth="1.5" />
        <rect x="2" y="16" width="3" height="10" fill="#2d2621" />
        <circle cx="10" cy="30" r="5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2" />
        <circle cx="28" cy="30" r="5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2" />
      </g>
    )
  },
  {
    code: "B2",
    id: "TUFF 18",
    name: "TUFF 18",
    season: "2025-2026 Season 2 Build",
    tag: "COMPETITION ERA",
    status: "CALIBRATED",
    desc: "Refined EV platform retaining Emrax 228 architecture. Achieved Accumulator and Mechanical Technical Inspection clearance.",
    note: "Telemetry validated: Secured clean CAN bus logging under full battery discharge. Low-voltage sensor loops validated at 100% telemetry resolution.",
    highlight: "SUPRA SAE 2025 - Overall P3 (EV) & Design Winners",
    specs: [
      { label: "DAQ BRAIN", val: "STM32F446RE Custom Node" },
      { label: "TRACTION MOTOR", val: "Emrax 228 (Calibrated)" },
      { label: "HV INVERTER", val: "DTI HV550 Controller" },
      { label: "ACCUMULATOR STACK", val: "Molicel P45B Stack" },
    ],
    svgProfile: (
      <g transform="translate(5, 5)">
        <path d="M 3 28 L 8 24 L 16 12 H 28 L 33 24 L 38 28" stroke="#2d2621" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="11" y="24" width="20" height="6" fill="#e2f0cb" stroke="#2d2621" strokeWidth="1.5" />
        <rect x="1" y="10" width="3" height="14" fill="#2d2621" />
        <line x1="1" y1="10" x2="6" y2="10" stroke="#2d2621" strokeWidth="2" />
        <circle cx="10" cy="30" r="5.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2" />
        <circle cx="29" cy="30" r="5.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2" />
      </g>
    )
  },
  {
    code: "C3",
    id: "TUFF 19",
    name: "TUFF 19",
    season: "2026-2027 Season 3 Build",
    tag: "IN ASSEMBLY",
    status: "COMPILING",
    desc: "Next-generation racecar featuring upgraded high-density Molicel P50B cells.",
    note: "Design Phase: Routing low-voltage wiring harnesses through sidepods with advanced shielding. Structuring modular cell telemetry boards.",
    specs: [
      { label: "DAQ BRAIN", val: "Next-Gen STM32 Node" },
      { label: "TRACTION MOTOR", val: "Emrax 228 (High Torque)" },
      { label: "HV INVERTER", val: "DTI HV550 Controller" },
      { label: "ACCUMULATOR STACK", val: "Molicel P50B (Planned)" },
    ],
    svgProfile: (
      <g transform="translate(5, 5)">
        <path d="M 2 28 C 5 24 12 10 26 10 H 30 C 35 20 37 25 39 28" stroke="#2d2621" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="12" y="24" width="20" height="6" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
        <rect x="0" y="8" width="3" height="18" fill="#2d2621" />
        <line x1="0" y1="8" x2="6" y2="8" stroke="#2d2621" strokeWidth="2" />
        <circle cx="9" cy="30" r="5.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2.5" />
        <circle cx="30" cy="30" r="5.5" fill="#fffdfa" stroke="#2d2621" strokeWidth="2.5" />
      </g>
    )
  },
];

interface ShedPageProps {
  selectedCar: string;
  onSelectCar: (code: string) => void;
}

export function ShedSpecsPage({ selectedCar, onSelectCar }: ShedPageProps) {
  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            The Motor Shed Fleet
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 03]</span>
        </div>

        {/* 3 bays selection */}
        <div className="space-y-3 pt-2">
          {vehicles.map((v) => {
            const isSelected = selectedCar === v.code;
            return (
              <div
                key={v.code}
                onClick={() => {
                  onSelectCar(v.code);
                  playClickSound();
                  playDrawerSlideSound();
                }}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between relative ${
                  isSelected
                    ? "bg-white border-[#2d2621] shadow-[2.5px_2.5px_0px_#2d2621]"
                    : "bg-[#fffdfa] border-stone-150 text-stone-500 hover:border-[#2d2621] hover:shadow-[2px_2px_0px_#2d2621]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg width="40" height="25" viewBox="0 0 40 35" className="overflow-visible opacity-90">
                    {v.svgProfile}
                  </svg>
                  <div>
                    <h3 className="font-serif text-[12px] font-extrabold text-[#2d2621]">{v.id}</h3>
                    <p className="text-[9px] text-stone-400 font-mono font-bold uppercase">{v.tag}</p>
                  </div>
                </div>
                
                <span className={`text-[8px] font-mono px-2 py-0.2 rounded-full border-2 font-bold ${
                  isSelected ? "bg-[#e2f0cb] border-[#2d2621] text-[#2d2621]" : "bg-stone-50 border-stone-200 text-stone-400"
                }`}>
                  {v.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface CANPageProps {
  selectedCar: string;
}

export function CANSchematicPage({ selectedCar }: CANPageProps) {
  const activeVehicle = vehicles.find((v) => v.code === selectedCar) || vehicles[1];

  return (
    <div className="notebook-page-content lined select-none">
      <div className="margin-line" />
      <div className="margin-padding space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between border-b-2 border-stone-200/50 pb-2 mb-2 mt-1">
          <span className="font-serif font-black text-sm text-[#2d2621] uppercase">
            Specification Readout
          </span>
          <span className="font-mono text-[9px] text-[#94b0a0] font-bold">[ENTRY 04]</span>
        </div>

        {/* Spec details readout */}
        <div className="space-y-4 font-mono text-[11px] text-stone-700">
          
          {/* Spec rows */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-[#fcf8f2] border-2 border-[#2d2621]/30 rounded-xl relative shadow-[2px_2px_0px_rgba(45,38,33,0.1)]">
            {activeVehicle.specs.map((spec, idx) => (
              <div key={idx} className="border-b border-[#2d2621]/10 pb-1.5 last:border-0 last:pb-0">
                <span className="text-[8.5px] text-stone-400 block uppercase leading-none mb-1 font-bold">
                  {spec.label}
                </span>
                <span className="text-[9.5px] text-[#2d2621] font-bold">
                  {spec.val}
                </span>
              </div>
            ))}
          </div>

          {/* CRT Hand-drawn trace schematic */}
          <div className="border-2 border-stone-200/50 p-2 rounded-xl bg-white flex flex-col items-center">
            <span className="text-[8.5px] font-serif text-stone-400 block mb-1 uppercase tracking-widest font-bold">
              CAN-BUS LOGGING CHANNELS
            </span>
            <svg width="100%" height="52" viewBox="0 0 160 52" className="overflow-visible select-none">
              <rect x="5" y="5" width="150" height="42" rx="4" fill="none" stroke="#2d2621" strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="15" y="13" width="34" height="22" rx="2" fill="#daeaf6" stroke="#2d2621" strokeWidth="1.5" />
              <text x="21" y="26" fill="#2d2621" fontSize="5" fontFamily="serif" fontWeight="black">BATTERY</text>
              <path d="M 49 24 L 78 24" stroke="#d6bdf2" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="63" cy="24" r="2" fill="#2d2621" />
              <rect x="78" y="13" width="34" height="22" rx="2" fill="#e2f0cb" stroke="#2d2621" strokeWidth="1.5" />
              <text x="84" y="26" fill="#2d2621" fontSize="5" fontFamily="serif" fontWeight="black">STM32 DAQ</text>
              <path d="M 112 24 L 140 24" stroke="#94b0a0" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="140" cy="24" r="3.5" fill="#fce1e4" stroke="#2d2621" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Highlights */}
          {activeVehicle.highlight && (
            <div className="flex items-center gap-1.5 p-2 bg-[#ebd9cc]/35 border border-[#2d2621]/30 rounded-lg">
              <Star className="w-3 h-3 text-[#d68c45] fill-[#d68c45] flex-shrink-0" />
              <span className="font-serif text-[9px] font-bold text-[#2d2621] uppercase tracking-wide">
                {activeVehicle.highlight}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function Machines() {
  return null;
}
