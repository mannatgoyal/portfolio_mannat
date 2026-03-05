import { motion } from "framer-motion";
import { Cpu, Terminal, FileCode2, Search, Brain, Car, Zap, Battery, LineChart } from "lucide-react";

export default function ResearchLogs() {
  const interests = [
    {
      title: "Machine Learning for Physical Systems",
      icon: <Brain className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "Bridging the gap between pure data and physical reality. I'm fascinated by modeling complex thermodynamics and dynamics using physics-informed neural networks so we don't just fit curves, but actually understand the underlying mechanics.",
      color: "bg-white",
      rotation: "rotate-1",
      tapeColor: "bg-pink-300/50"
    },
    {
      title: "AI for Electric Vehicles",
      icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-4 group-hover:translate-x-2 transition-transform" />,
      desc: "EVs are essentially computers on wheels. I'm exploring how AI can optimize power delivery, dynamic handling, and energy efficiency on the fly, making vehicles smarter and more responsive.",
      color: "bg-blue-50",
      rotation: "-rotate-1",
      tapeColor: "bg-blue-300/50"
    },
    {
      title: "Intelligent Battery Safety Systems",
      icon: <Battery className="w-8 h-8 md:w-10 md:h-10 text-green-500 mb-4 group-hover:-translate-y-1 transition-transform" />,
      desc: "Predicting the unpredictable. A major focus of my work is detecting anomalies and preventing catastrophic failures like thermal runaway in lithium-ion cells before they occur, using techniques from edge AI to Quantum ML.",
      color: "bg-green-50",
      rotation: "rotate-2",
      tapeColor: "bg-green-300/50"
    },
    {
      title: "Robotics & Embedded Intelligence",
      icon: <Cpu className="w-8 h-8 md:w-10 md:h-10 text-purple-500 mb-4 group-hover:rotate-12 transition-transform" />,
      desc: "Bringing intelligence to the edge. I love the challenge of taking heavy, computationally expensive models and optimizing them to run efficiently on resource-constrained microcontrollers like STM32s.",
      color: "bg-purple-50",
      rotation: "-rotate-2",
      tapeColor: "bg-purple-300/50"
    },
    {
      title: "Motorsport Telemetry Analytics",
      icon: <LineChart className="w-8 h-8 md:w-10 md:h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "Racing is a data problem! I'm interested in applying Reinforcement Learning and Game Theory to noisy sensor data to dictate race strategy and optimize decisions in high-speed, dynamic environments.",
      color: "bg-orange-50",
      rotation: "rotate-1",
      tapeColor: "bg-orange-300/50"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Decorative background elements to add warmth */}
      <div className="absolute top-20 right-10 opacity-20 hidden md:block animate-pulse">
        <Search className="w-64 h-64 text-blue-300" />
      </div>

      <main className="max-w-5xl mx-auto space-y-16 relative z-10">
        <div className="bg-black text-white p-6 md:p-8 shadow-[8px_8px_0px_rgba(30,144,255,0.7)] border-4 border-blue-400 mb-12 rotate-[-1deg] inline-block relative">
          <h1 className="font-pixel text-4xl md:text-5xl uppercase flex items-center gap-4">
            <Search className="text-yellow-400" /> ~/research_interests
          </h1>
          <p className="font-hand text-xl md:text-2xl mt-4 text-blue-200">
            A look into the topics that keep me up at night 💭
          </p>

          {/* Taylor Swift - Mastermind doodle */}
          <div className="absolute -bottom-8 md:-right-24 text-purple-400/60 transform rotate-[10deg] font-hand text-lg whitespace-nowrap z-0 pointer-events-none">
            "What if I told you none of it was accidental?" 🪩✨
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-10">
          {interests.map((interest, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, type: "spring" }}
              whileHover={{ scale: 1.02, zIndex: 20 }}
              key={idx}
              className={`${interest.color} border-2 border-black p-6 md:p-8 notebook-border relative ${interest.rotation} group hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-300`}
            >
              {/* Custom Tape */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 ${interest.tapeColor} rotate-[-2deg] mix-blend-multiply opacity-80 backdrop-blur-sm z-10`}></div>

              <div className="flex flex-col items-center text-center">
                {interest.icon}
                <h2 className="font-pixel text-2xl md:text-3xl mb-4 text-blue-800 tracking-tight leading-snug">
                  {interest.title}
                </h2>
                <div className="w-16 h-1 bg-black/20 mb-6 rounded-full group-hover:w-24 transition-all duration-300"></div>
                <p className="font-sans text-lg text-gray-800 leading-relaxed">
                  {interest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
