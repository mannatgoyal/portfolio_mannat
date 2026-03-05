import { motion } from "framer-motion";
import { Wrench, Zap, Cpu, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-4xl mx-auto space-y-20">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <div className="relative bg-white p-8 md:p-12 notebook-border rotate-[-1deg] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="tape"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-pixel text-6xl md:text-8xl mb-4 uppercase tracking-tighter hover:text-blue-600 transition-colors cursor-default">
                Engineer's <br /> Notebook
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 flex-1 bg-black"></div>
                <h2 className="font-hand text-3xl text-blue-600 font-bold hover:scale-105 transition-transform cursor-default">👋 Hi, I'm Mannat!</h2>
                <div className="h-1 flex-1 bg-black"></div>
              </div>

              <div className="font-sans text-lg md:text-xl leading-relaxed mb-6 space-y-4">
                <p>
                  Welcome to my digital notebook! I'm an engineer pursuing dual degrees in <strong>B.E. Computer Engineering</strong> at Thapar Institute and <strong>B.Sc. Data Science & AI</strong> from IIT Guwahati.
                </p>
                <p>
                  My work is all about applying <span className="marker-highlight hover:bg-yellow-300 transition-colors">machine learning and data-driven modeling to real-world engineering systems</span>—especially things that move fast, like electrified powertrains, battery safety, and vehicle telemetry.
                </p>
                <p>
                  As part of <strong>Team Fateh</strong>, our incredible Formula Student Electric team, I design embedded data acquisition systems that capture high-frequency telemetry straight from the race track. 🏎️
                </p>
              </div>

              <p className="font-hand-alt text-2xl text-gray-700 bg-blue-50/50 p-4 border-l-4 border-blue-400">
                I love connecting the dots between machine learning, embedded systems, real-world sensors, and the physical engineering that brings it all to life. ✨
              </p>

              {/* Iron Man Doodle */}
              <div className="absolute bottom-10 right-10 text-red-500/30 transform rotate-[15deg] z-0 animate-pulse pointer-events-none">
                <Cpu className="w-24 h-24" />
                <span className="font-hand font-bold text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">ARK</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links / Desk Setup */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Playful sticky note annotation */}
          <div className="absolute -top-6 -right-4 md:-right-10 bg-yellow-100 p-2 border border-yellow-300 transform rotate-12 shadow-sm z-20 font-hand text-sm text-yellow-800">
            * More experiments coming soon...
          </div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="sticky-note sticky-note-pink p-6 flex flex-col items-center text-center group cursor-pointer relative"
          >
            {/* Barbie/Sparkle Doodle */}
            <div className="absolute -top-6 -left-6 text-pink-400 opacity-60 z-10 pointer-events-none animate-spin-slow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4M3 5h4" />
              </svg>
            </div>

            <Link href="/machines">
              <Zap className="w-12 h-12 mb-4 group-hover:animate-bounce" />
              <h3 className="font-pixel text-2xl uppercase mb-2">Machines</h3>
              <p className="font-hand text-lg">Formula Student EV systems & powertrains</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="sticky-note sticky-note-blue p-6 flex flex-col items-center text-center group cursor-pointer"
          >
            <Link href="/experiments">
              <Wrench className="w-12 h-12 mb-4 group-hover:animate-spin" />
              <h3 className="font-pixel text-2xl uppercase mb-2">Experiments</h3>
              <p className="font-hand text-lg">Hardware prototypes & cool hacks</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="sticky-note sticky-note-green p-6 flex flex-col items-center text-center group cursor-pointer"
          >
            <Link href="/research">
              <Cpu className="w-12 h-12 mb-4 group-hover:animate-pulse" />
              <h3 className="font-pixel text-2xl uppercase mb-2">Research</h3>
              <p className="font-hand text-lg">AI/ML models & data analysis logs</p>
            </Link>
          </motion.div>
        </section>

        {/* Education & Experience */}
        <section className="space-y-12">
          <div className="bg-white p-6 notebook-border shadow-[6px_6px_0px_rgba(0,0,0,1)] relative rotate-[1deg]">
            <div className="tape"></div>
            <h3 className="font-pixel text-4xl mb-6 uppercase border-b-2 border-black pb-2">Education</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-sans text-xl font-bold">Thapar Institute of Engineering & Technology</h4>
                <p className="font-hand text-lg text-blue-700">B.E. Computer Engineering (2023 - 2027)</p>
                <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">Algorithms</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Data Structures</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Embedded Systems</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Microprocessors</span>
                </div>
              </div>

              <div>
                <h4 className="font-sans text-xl font-bold">IIT Guwahati (Remote Program)</h4>
                <p className="font-hand text-lg text-blue-700">B.Sc. (Hons.) Data Science & AI (2023 - 2027)</p>
                <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">Machine Learning</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Data Science</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Time Series Analysis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fdfbf7] p-6 border-l-4 border-yellow-400 relative">
            <h3 className="font-pixel text-4xl mb-6 uppercase">Experience: Team Fateh</h3>

            <div className="space-y-8 font-sans">
              <div className="relative pl-6 border-l-2 border-dashed border-gray-300">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2"></div>
                <h4 className="text-xl font-bold">Team Manager</h4>
                <p className="text-gray-500 text-sm mb-2">2026 - Present</p>
                <p>Coordinating engineering execution across electronics, mechanical, and powertrain subsystems. Managing testing milestones and acting as liaison between teams.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-dashed border-gray-300">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2"></div>
                <h4 className="text-xl font-bold">Electronics & Data Acquisition Engineer</h4>
                <p className="text-gray-500 text-sm mb-2">2023 - Present</p>
                <p>Developing STM32-based data acquisition systems for high-frequency telemetry. Building structured telemetry datasets for ML and system validation.</p>
                {/* Playful annotation */}
                <div className="mt-2 text-right">
                  <span className="font-hand text-blue-600 rotate-[-2deg] inline-block bg-blue-50 px-2 py-1 shadow-sm">
                    ~ parsing CAN bus logs daily 📉
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Sticky */}
        <section className="flex justify-center">
          <div className="bg-yellow-200 p-8 w-full max-w-md shadow-[4px_4px_0px_rgba(0,0,0,0.5)] rotate-2 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-inner border border-red-700"></div>
            <h3 className="font-hand text-2xl font-bold mb-4 scribble-underline inline-block">Links & Contact:</h3>
            <ul className="font-sans space-y-4 mt-4">
              <li>
                <a href="https://github.com/mannatgoyal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-500" /> GitHub: @mannatgoyal
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mannat-goyal28" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-500" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:gmannat793@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-500" /> gmannat793@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
