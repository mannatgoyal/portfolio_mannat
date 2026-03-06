import { motion } from "framer-motion";
import { Zap, Battery, Settings, Activity } from "lucide-react";

export default function Machines() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-4xl mx-auto space-y-12">
        <div className="bg-white p-6 md:p-8 notebook-border relative shadow-[8px_8px_0px_rgba(0,0,0,1)] rotate-[1deg] mb-16 pattern-grid-lg">
          <div className="tape"></div>
          <h1 className="font-pixel text-4xl md:text-5xl uppercase mb-4 flex items-center gap-4 text-blue-800 bg-white/80 inline-block p-2 rounded shadow-sm">
            <Zap className="text-yellow-500 animate-pulse" /> The Machines
          </h1>
          <p className="font-hand text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl bg-white/80 p-2 rounded shadow-sm">
            My absolute favorite part of engineering is getting my hands dirty. Here are the electric beasts I've helped build with Team Fateh. 🏎️⚡
          </p>

          {/* Playful annotation */}
          <div className="absolute -bottom-6 -right-4 bg-yellow-100 p-2 border border-yellow-300 transform rotate-12 shadow-sm z-20 font-hand text-sm text-yellow-800">
            * Blood, sweat, & carbon fiber 🛠️
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {/* Machine 1: TUFF 17 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#f0f4f8] p-6 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="tape"></div>
            <div className="bg-white border-2 border-black h-48 mb-6 flex items-center justify-center overflow-hidden photo-frame">
              <img
                src={`${import.meta.env.BASE_URL}tuff_17.png`}
                alt="TUFF 17 Racecar"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="font-pixel text-3xl mb-2">TUFF 17</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-black text-white px-2 py-1 font-pixel text-sm uppercase">Season 2024-25</span>
              <span className="bg-green-400 text-black border border-black px-2 py-1 font-pixel text-sm uppercase">First EV</span>
            </div>

            <p className="font-sans mb-4 min-h-[48px]">
              Team Fateh's very first Electric Vehicle.
            </p>

            <ul className="font-hand text-lg space-y-2 border-t-2 border-dashed border-black pt-4">
              <li className="flex items-center gap-2"><Settings className="w-5 h-5" /> ESP32 Data Acquisition</li>
              <li className="flex items-center gap-2"><Zap className="w-5 h-5 opacity-70" /> Emrax 228 Motor</li>
              <li className="flex items-center gap-2"><Activity className="w-5 h-5 opacity-70" /> DTI HV550 Controller</li>
              <li className="flex items-center gap-2"><Battery className="w-5 h-5 opacity-70" /> Molicel P45B Cells</li>
            </ul>

            <div className="absolute -left-4 top-1/2 bg-pink-100 px-2 py-1 rotate-[-15deg] font-hand text-sm border-b-2 border-pink-300 shadow-sm z-10">
              First build! 🏁
            </div>

            {/* Taylor Swift Getaway Car doodle */}
            <div className="absolute -right-6 top-10 text-gray-500/50 transform rotate-[25deg] font-hand text-sm whitespace-nowrap z-0 pointer-events-none">
              "Nothing good starts in a getaway car" 🚗💨
            </div>
          </motion.div>

          {/* Machine 2: TUFF 18 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#fdf4f0] p-6 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="tape"></div>
            <div className="bg-white border-2 border-black h-48 mb-6 flex items-center justify-center overflow-hidden photo-frame rotate-[-3deg]">
              <img
                src={`${import.meta.env.BASE_URL}tuff_18.png`}
                alt="TUFF 18 Details"
                className="w-full h-full object-cover grayscale-0"
              />
            </div>

            <h2 className="font-pixel text-3xl mb-2">TUFF 18</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-black text-white px-2 py-1 font-pixel text-sm uppercase">Season 2025-26</span>
              <span className="bg-blue-400 text-black border border-black px-2 py-1 font-pixel text-sm uppercase">Evo II</span>
            </div>

            <p className="font-sans mb-4 min-h-[48px]">
              Second generation EV with upgraded control systems.
            </p>

            <ul className="font-hand text-lg space-y-2 border-t-2 border-dashed border-black pt-4">
              <li className="flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" /> STM32F446RE DAS</li>
              <li className="flex items-center gap-2"><Zap className="w-5 h-5 opacity-70" /> Emrax 228 Motor</li>
              <li className="flex items-center gap-2"><Activity className="w-5 h-5 opacity-70" /> DTI HV550 Controller</li>
              <li className="flex items-center gap-2"><Battery className="w-5 h-5 opacity-70" /> Molicel P45B Cells</li>
            </ul>

            <div className="absolute -right-4 top-1/3 bg-blue-100 px-2 py-1 rotate-[10deg] font-hand text-sm border-b-2 border-blue-300 shadow-sm z-10">
              Improved telemetry! 📡
            </div>

            {/* Harry Styles Watermelon Sugar doodle */}
            <div className="absolute -left-8 bottom-4 text-green-500/50 transform rotate-[-20deg] font-hand text-sm whitespace-nowrap z-0 pointer-events-none">
              🍉 Watermelon sugar high voltage!
            </div>
          </motion.div>

          {/* Machine 3: TUFF 19 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#f0fdf4] p-6 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="tape"></div>
            <div className="bg-gray-200 border-2 border-dashed border-black h-48 mb-6 flex items-center justify-center overflow-hidden photo-frame rotate-[2deg]">
              {/* Placeholder diagram since we don't have TUFF 19 photo yet */}
              <div className="flex flex-col items-center justify-center opacity-50">
                <Settings className="w-16 h-16 mb-2 animate-spin-slow" />
                <span className="font-pixel text-xl">Design Phase</span>
              </div>
            </div>

            <h2 className="font-pixel text-3xl mb-2">TUFF 19</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-black text-white px-2 py-1 font-pixel text-sm uppercase">Season 2026-27</span>
              <span className="bg-yellow-400 text-black border border-black px-2 py-1 font-pixel text-sm uppercase">Next Gen</span>
            </div>

            <p className="font-sans mb-4 min-h-[48px]">
              Next generation powertrain and energy systems.
            </p>

            <ul className="font-hand text-lg space-y-2 border-t-2 border-dashed border-black pt-4">
              <li className="flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" /> STM32F446RE DAS</li>
              <li className="flex items-center gap-2"><Zap className="w-5 h-5 opacity-70" /> Emrax 228 Motor</li>
              <li className="flex items-center gap-2"><Activity className="w-5 h-5 opacity-70" /> DTI HV550 Controller</li>
              <li className="flex items-center gap-2"><Battery className="w-5 h-5 text-green-600" /> Molicel P50B Cells</li>
            </ul>

            <div className="absolute -bottom-4 right-10 bg-green-100 px-2 py-1 rotate-[-5deg] font-hand text-sm border-b-2 border-green-300 shadow-sm z-10">
              Currently in CAD 💻
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
