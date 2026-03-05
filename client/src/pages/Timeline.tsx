import { motion } from "framer-motion";

export default function Timeline() {
  const events = [
    {
      year: "2024",
      title: "Lead Electronics Engineer",
      subtitle: "Formula Student Team",
      desc: "Managing a team of 15 to build the electrical architecture for our 4th generation EV."
    },
    {
      year: "2023",
      title: "Embedded Systems Intern",
      subtitle: "Tech Startup Inc.",
      desc: "Developed firmware in C++ for IoT environmental sensors."
    },
    {
      year: "2022",
      title: "Joined Formula Student",
      subtitle: "Low Voltage Team",
      desc: "Started designing custom PCBs for steering wheel dashboards."
    },
    {
      year: "2021",
      title: "Started Computer Engineering",
      subtitle: "University",
      desc: "Wrote my first line of C. Everything broke. It was great."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-3xl mx-auto">
        <div className="bg-white p-6 notebook-border shadow-[6px_6px_0px_rgba(0,0,0,1)] inline-block mb-16 rotate-2">
          <h1 className="font-pixel text-5xl uppercase">Timeline</h1>
        </div>

        <div className="relative border-l-4 border-black ml-4 md:ml-12 space-y-16">
          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[14px] top-2 w-6 h-6 bg-yellow-400 border-4 border-black rounded-full"></div>
              
              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative hover:translate-x-2 transition-transform">
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white font-pixel text-2xl px-4 py-1 border-2 border-black rotate-12">
                  {event.year}
                </div>
                <h3 className="font-pixel text-2xl uppercase mb-1">{event.title}</h3>
                <h4 className="font-hand text-xl text-gray-600 mb-4">{event.subtitle}</h4>
                <p className="font-sans">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center font-hand text-3xl">
          To be continued... <span className="animate-pulse inline-block">_</span>
        </div>
      </main>
    </div>
  );
}
