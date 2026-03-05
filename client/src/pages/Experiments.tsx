import { motion } from "framer-motion";
import { Wrench, Settings, SearchCode, Zap } from "lucide-react";

export default function Experiments() {
  const projects = [
    {
      title: "VoltNet",
      problem: "Accurately predicting battery performance and degradation in complex electrified powertrains where standard models fail to capture dynamic loads.",
      approach: "Built Physics-Informed Machine Learning (PIML) models leveraging live telemetry to understand and predict battery state over time, essentially teaching the model the laws of thermodynamics alongside the data.",
      tech: "Python, PyTorch, Telemetry Analysis",
      status: "Ongoing Research",
      tapeColor: "bg-pink-300/60"
    },
    {
      title: "HQML-BMS",
      problem: "Lithium-ion battery thermal runaway is catastrophic and extremely hard to predict preemptively using classical computing.",
      approach: "Developed a Hybrid Quantum Machine Learning framework utilizing Quantum Feature Maps (like Angle Embedding) to dramatically improve anomaly detection accuracy (achieved 96% accuracy on simulated datasets).",
      tech: "Qiskit, Machine Learning, Quantum Circuits",
      status: "Prototype",
      tapeColor: "bg-blue-300/60"
    },
    {
      title: "Robust Image Forensics",
      problem: "Adversaries manipulate images (deepfakes, edits), but standard detection fails when the images are subjected to heavy noise and compression.",
      approach: "Exploring transformer-based architectures for robust feature extraction to identify manipulation artifacts that survive standard compression algorithms.",
      tech: "Transformers, Computer Vision",
      status: "Research",
      tapeColor: "bg-orange-300/60"
    },
    {
      title: "Trust Strategy Motorsports",
      problem: "Motorsport race strategy often relies on human intuition rather than rigorous, predictive data analysis, leading to suboptimal pit and pacing decisions.",
      approach: "Modeling data-driven motorsport decision systems using localized telemetry analysis, game theory, and reinforcement learning.",
      tech: "Game Theory, Reinforcement Learning",
      status: "Ongoing",
      tapeColor: "bg-green-300/60"
    },
    {
      title: "Cyberattack Detection & Response",
      problem: "Network threats are evolving faster than static, rule-based firewall systems can respond to them.",
      approach: "Detect cyberattacks in network traffic using Machine Learning (XGBoost) for classification, and automate response actions (isolation, blocking) using a Reinforcement Learning agent (DQN).",
      tech: "XGBoost, DQN, Network Security",
      status: "Prototype",
      tapeColor: "bg-purple-300/60"
    },
    {
      title: "Team Fateh Website",
      problem: "The Formula Student team needed a modern, engaging digital presence to showcase our electric vehicles and engineering data to sponsors and fans.",
      approach: "Built a fully-featured interactive website with integrated data visualizations to present complex vehicle specs and team history in an engaging, 'notebook' way.",
      tech: "React, Tailwind, Data Viz",
      status: "Live",
      tapeColor: "bg-yellow-300/60"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute top-40 right-10 opacity-10 animate-pulse hidden md:block">
        <Settings className="w-64 h-64 text-orange-400" />
      </div>

      <main className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 rotate-[-1deg] relative">
          <h1 className="font-pixel text-4xl md:text-5xl uppercase flex items-center gap-4 text-black drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            <Wrench className="animate-bounce text-orange-500" /> The Lab
          </h1>
          <p className="font-hand text-xl mt-4 max-w-xl text-gray-800 bg-white/70 p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Welcome to my project logbook! 🧪 Here's a deeper dive into the specific engineering problems I'm tackling, my methodologies, and current progress.
          </p>

          {/* Lightning McQueen Doodle */}
          <div className="absolute top-0 right-4 md:right-20 text-red-500/40 transform rotate-[15deg] z-0 pointer-events-none">
            <Zap className="w-20 h-20" />
            <span className="font-pixel font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]">95</span>
          </div>
        </div>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border-2 border-black p-6 md:p-10 notebook-border relative shadow-[8px_8px_0px_rgba(0,0,0,1)] group hover:-translate-y-1 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              {/* Notebook Tape */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 ${project.tapeColor} rotate-[-1deg] mix-blend-multiply opacity-80 backdrop-blur-sm z-10 border border-black/10`}></div>

              <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-4 mb-6">
                <h2 className="font-pixel text-3xl md:text-4xl text-blue-900 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <SearchCode className="w-8 h-8 opacity-50" /> {project.title}
                </h2>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block border-2 border-red-600 text-red-600 font-pixel uppercase tracking-wider text-xs px-3 py-1 rotate-[-2deg] shadow-[2px_2px_0px_rgba(255,0,0,0.2)] bg-red-50">
                    STATUS: {project.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-bold text-lg inline-block px-2 mb-2 bg-yellow-200 border border-yellow-400 rounded-sm">
                      🤔 The Problem
                    </h4>
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg inline-block px-2 mb-2 bg-green-200 border border-green-400 rounded-sm">
                      💡 The Approach
                    </h4>
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {project.approach}
                    </p>
                  </div>
                </div>

                <div className="md:border-l-2 md:border-dashed md:border-gray-300 md:pl-8 space-y-6 pt-4 md:pt-0">
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full -z-10 opacity-50"></div>
                    <h4 className="font-hand text-2xl text-blue-700 font-bold mb-3 border-b border-gray-200 pb-2">
                      Tools Used
                    </h4>
                    <div className="flex flex-col gap-2">
                      {project.tech.split(", ").map((tool, idx) => (
                        <span key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spiderman Doodle */}
          <div className="flex justify-end mt-12 relative h-32">
            <div className="absolute right-10 top-0 text-blue-900/30 transform rotate-[-10deg] z-0 pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m12 12-8.5-4" />
                <path d="m12 12 8.5-4" />
                <path d="M12 12v10" />
                <path d="m12 12 8.5 4" />
                <path d="m12 12-8.5 4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="7" />
              </svg>
              <div className="absolute top-full right-0 mt-2 font-hand text-sm bg-white/50 px-2 rounded -rotate-3 text-blue-800/60">
                Great telemetry... 🕸️
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
