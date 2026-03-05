import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Experiments() {
  const projects = [
    {
      title: "Smart Helmet HUD",
      desc: "AR display for motorcycle helmets using a tiny OLED and ESP32.",
      tech: "C++, ESP32, Optics",
      color: "sticky-note-pink",
      rotation: "rotate-2"
    },
    {
      title: "Self-Balancing Robot",
      desc: "PID controller implementation on a custom 3D printed chassis.",
      tech: "Arduino, MPU6050, 3D Printing",
      color: "sticky-note-blue",
      rotation: "-rotate-3"
    },
    {
      title: "Custom Macropad",
      desc: "Hand-wired mechanical keyboard for CAD shortcuts.",
      tech: "QMK, RP2040, Soldering",
      color: "bg-orange-200",
      rotation: "rotate-1"
    },
    {
      title: "LoRa Weather Node",
      desc: "Off-grid weather station that runs on solar power for months.",
      tech: "LoRaWAN, Power Mgmt",
      color: "sticky-note-green",
      rotation: "-rotate-1"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-5xl mx-auto">
        <div className="bg-white p-6 notebook-border shadow-[6px_6px_0px_rgba(0,0,0,1)] inline-block mb-12 rotate-1">
          <h1 className="font-pixel text-5xl uppercase flex items-center gap-4">
            <Wrench className="text-gray-700" /> Experiments
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`sticky-note ${project.color} ${project.rotation} p-6 flex flex-col h-64`}
            >
              <div className="tape"></div>
              <h3 className="font-pixel text-2xl uppercase mb-4 mt-2">{project.title}</h3>
              <p className="font-hand text-lg flex-1 leading-tight">{project.desc}</p>
              <div className="font-sans text-xs uppercase tracking-wider border-t border-black/20 pt-2 mt-4">
                [{project.tech}]
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
