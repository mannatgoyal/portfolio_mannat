import { motion } from "framer-motion";
import { Zap, Battery, Settings, Activity } from "lucide-react";

export default function Machines() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-4xl mx-auto space-y-12">
        <div className="bg-white p-6 notebook-border shadow-[6px_6px_0px_rgba(0,0,0,1)] inline-block mb-8 rotate-[-1deg]">
          <h1 className="font-pixel text-5xl uppercase flex items-center gap-4">
            <Zap className="text-yellow-500" /> Machines
          </h1>
        </div>

        <p className="font-hand text-2xl bg-white/50 p-4 border-l-4 border-black">
          Documentation and specs for Formula Student EV systems I've helped build.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Machine 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#f0f4f8] p-6 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="tape"></div>
            <div className="bg-white border-2 border-black h-48 mb-6 flex items-center justify-center overflow-hidden photo-frame">
               <img 
                 src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop" 
                 alt="Racecar"
                 className="w-full h-full object-cover"
               />
            </div>
            
            <h2 className="font-pixel text-3xl mb-2">EV-04 Powertrain</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-black text-white px-2 py-1 font-pixel text-sm uppercase">Formula SAE</span>
              <span className="bg-green-400 text-black border border-black px-2 py-1 font-pixel text-sm uppercase">Active</span>
            </div>
            
            <p className="font-sans mb-4">
              Designed and integrated the high-voltage accumulator management system. Improved overall efficiency by 15%.
            </p>
            
            <ul className="font-hand text-lg space-y-2 border-t-2 border-dashed border-black pt-4">
              <li className="flex items-center gap-2"><Battery className="w-5 h-5"/> 400V Accumulator</li>
              <li className="flex items-center gap-2"><Activity className="w-5 h-5"/> Custom BMS</li>
            </ul>
          </motion.div>

          {/* Machine 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#fdf4f0] p-6 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="tape"></div>
            <div className="bg-white border-2 border-black h-48 mb-6 flex items-center justify-center overflow-hidden photo-frame rotate-[-3deg]">
               <img 
                 src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop" 
                 alt="Telemetry"
                 className="w-full h-full object-cover grayscale"
               />
            </div>
            
            <h2 className="font-pixel text-3xl mb-2">Telemetry V2</h2>
            <div className="flex gap-2 mb-4">
              <span className="bg-black text-white px-2 py-1 font-pixel text-sm uppercase">Systems</span>
              <span className="bg-blue-400 text-black border border-black px-2 py-1 font-pixel text-sm uppercase">Deployed</span>
            </div>
            
            <p className="font-sans mb-4">
              Real-time data acquisition system over LoRa. Transmits 50+ channels of CAN bus data to pit wall.
            </p>
            
            <ul className="font-hand text-lg space-y-2 border-t-2 border-dashed border-black pt-4">
              <li className="flex items-center gap-2"><Settings className="w-5 h-5"/> CAN Bus Integration</li>
              <li className="flex items-center gap-2"><Activity className="w-5 h-5"/> 10Hz Update Rate</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
