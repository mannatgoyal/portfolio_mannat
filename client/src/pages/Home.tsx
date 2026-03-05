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
              <h1 className="font-pixel text-6xl md:text-8xl mb-4 uppercase tracking-tighter">
                Engineer's <br/> Notebook
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 flex-1 bg-black"></div>
                <h2 className="font-hand text-3xl text-blue-600 font-bold">Mannat Goyal</h2>
                <div className="h-1 flex-1 bg-black"></div>
              </div>

              <p className="font-sans text-lg md:text-xl leading-relaxed mb-6">
                Computer Engineering student working on <span className="marker-highlight">AI, embedded systems, and electric racecars.</span>
              </p>
              
              <p className="font-hand-alt text-2xl text-gray-700">
                "Building intelligent systems for machines."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links / Desk Setup */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="sticky-note sticky-note-pink p-6 flex flex-col items-center text-center group cursor-pointer"
          >
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

        {/* Current Focus Sticky */}
        <section className="flex justify-center">
          <div className="bg-yellow-200 p-8 w-full max-w-md shadow-[4px_4px_0px_rgba(0,0,0,0.5)] rotate-2 relative">
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-inner border border-red-700"></div>
             <h3 className="font-hand text-2xl font-bold mb-4 scribble-underline inline-block">Currently Working On:</h3>
             <ul className="font-sans space-y-3 mt-4 list-disc pl-5">
               <li>Motor controller integration</li>
               <li>Computer vision for autonomous steering</li>
               <li>Learning Rust for embedded systems</li>
             </ul>
             <div className="mt-8 text-right">
               <Link href="/timeline">
                 <button className="y2k-button px-4 py-2 flex items-center gap-2 ml-auto">
                   View Timeline <ArrowRight className="w-4 h-4" />
                 </button>
               </Link>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
