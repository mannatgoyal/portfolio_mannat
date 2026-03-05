import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export default function Timeline() {
  const events = [
    {
      year: "2026",
      title: "AI in Engineering",
      subtitle: "Research & Development",
      desc: "Exploring AI-driven approaches for engineering systems, including HQML-BMS and VoltNet. ⚡"
    },
    {
      year: "2025",
      title: "SUPRA SAE & Formula Bharat",
      subtitle: "Team Fateh",
      desc: "Competed nationally. Achieved Overall P3, Statics P2 (EV Category) at SUPRA SAE. Engineering Design Finalists at Formula Bharat. 🏆"
    },
    {
      year: "2024",
      title: "First FS Competition",
      subtitle: "Team Fateh",
      desc: "Participated in my first Formula Student competitions. Won Procurement Event at Pi-EV 2024. 🏎️"
    },
    {
      year: "2023",
      title: "Started Engineering & Team Fateh",
      subtitle: "Thapar Institute",
      desc: "Started B.E. Computer Engineering and B.Sc. Data Science. Joined Team Fateh Formula Student EV. 🎓"
    },
    {
      year: "2019",
      title: "Hello World",
      subtitle: "Early Days",
      desc: "Began exploring computing and engineering systems. 🐣"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <main className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white p-6 md:p-8 notebook-border shadow-[6px_6px_0px_rgba(255,182,193,0.8)] inline-block mb-16 rotate-2 relative rounded-xl border-pink-200">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-300/40 rotate-[-3deg] mix-blend-multiply opacity-80 backdrop-blur-sm z-10"></div>
          <h1 className="font-pixel text-4xl md:text-5xl uppercase flex items-center gap-4 text-pink-600">
            <Sparkles className="text-yellow-400 w-8 h-8 md:w-10 md:h-10 animate-pulse" /> My Journey
          </h1>
          <p className="font-hand text-xl text-gray-600 mt-2">A timeline of late nights, broken code, and racing cars.</p>

          {/* Taylor Swift Eras Tour doodle */}
          <div className="absolute -right-16 -top-6 text-pink-400/50 transform rotate-[15deg] font-hand text-xl whitespace-nowrap z-0 pointer-events-none">
            (In my engineering era 🪩)
          </div>
        </div>

        <div className="relative border-l-4 border-pink-300 ml-4 md:ml-12 space-y-16">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[14px] top-4 w-6 h-6 bg-white border-4 border-pink-400 rounded-full group-hover:scale-125 group-hover:bg-yellow-200 transition-all duration-300 shadow-sm"></div>

              <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl border-2 border-pink-100 shadow-[4px_4px_0px_rgba(255,182,193,0.5)] relative hover:-translate-y-2 hover:shadow-[6px_8px_0px_rgba(255,182,193,0.6)] transition-all duration-300">

                <div className="absolute -top-5 -right-2 md:-right-6 bg-gradient-to-br from-pink-400 to-rose-400 text-white font-pixel text-xl md:text-2xl px-4 py-2 rounded-xl shadow-md rotate-3 group-hover:rotate-6 transition-transform">
                  {event.year}
                </div>

                <h3 className="font-pixel text-xl md:text-2xl uppercase mb-2 text-gray-800">{event.title}</h3>
                <h4 className="font-hand text-xl text-pink-500 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4" /> {event.subtitle}
                </h4>
                <p className="font-sans text-gray-700 leading-relaxed text-lg">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center relative">
          <div className="inline-block bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border border-pink-200 shadow-sm relative z-10">
            <p className="font-hand text-3xl text-gray-600">
              To be continued... <span className="animate-pulse inline-block text-pink-500">✨</span>
            </p>
          </div>

          {/* Harry Styles As It Was doodle */}
          <div className="absolute right-10 bottom-0 text-red-500/40 transform rotate-[-10deg] font-hand text-lg whitespace-nowrap z-0 pointer-events-none">
            🎸 "You know it's not the same as it was..."
          </div>
        </div>
      </main>
    </div>
  );
}
