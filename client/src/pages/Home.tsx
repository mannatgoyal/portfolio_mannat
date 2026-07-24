import { useState } from "react";
import { ArrowDown, ArrowUpRight, Radio, RotateCcw, Cpu } from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/audio";

const projects = [
  {
    code: "01",
    title: "trust-strategy-motorsports",
    desc: "Simulating trust dynamics in competitive motorsports using game theory and reinforcement learning. Useful for predicting stint lengths, tire wear, and keeping the team strategist from having a breakdown mid-race.",
    href: "https://github.com/mannatgoyal/trust-strategy-motorsports",
    tag: "Motorsports RL"
  },
  {
    code: "02",
    title: "cyberattack_detect",
    desc: "Real-time cyberattack detection using XGBoost and automated mitigation response using Deep Q-Network (DQN) reinforcement learning. A digital bouncer that blocks network threats before they can brick our telemetry consoles.",
    href: "https://github.com/mannatgoyal/cyberattack_detect",
    tag: "Cyber Security"
  },
  {
    code: "03",
    title: "image-forensics",
    desc: "Compression-aware image forgery detection using ResNet18 with Grad-CAM-based weak localization. Great for checking if the mechanical team actually ran FEA stress simulations or if they just colored the brackets red in MS Paint.",
    href: "https://github.com/mannatgoyal/image-forensics",
    tag: "Computer Vision"
  },
  {
    code: "04",
    title: "Team Fateh Digital Platform",
    desc: "The official custom-built website for Thapar Institute's Formula Student Electric racing team. Built from scratch with React and Next.js, including custom blogs covering the team's obsessive work culture.",
    href: "https://teamfateh.com/",
    tag: "Next.js Web"
  }
];

const signals = [
  { name: "Standby Link", code: "STANDBY", line: "First off, let's get one thing clear: this is a LOGBOOK, not a lab report. I know the front cover says 'Diary'." },
  { name: "Linked Node", code: "LINKED", line: "Doing a remote AI degree is great because you can attend lectures in bed, until you have to explain code to a robot TA." },
  { name: "Active Logging", code: "ACTIVE", line: "If you are looking for clean equations, go read a textbook. Otherwise, enjoy the doodles." }
];

export default function Home() {
  const [signal, setSignal] = useState(0);
  const activeSignal = signals[signal];
  
  const cycleSignal = () => {
    playClickSound();
    setSignal((current) => (current + 1) % signals.length);
  };

  return (
    <div className="site-shell max-w-4xl mx-auto py-6 px-4">
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none" />

      {/* Title block */}
      <section className="mb-8 border-b-2 border-black pb-6 mt-4 relative">
        <div className="flex justify-between items-start">
          <div className="rotate-[-1deg]">
            <h1 className="font-hud text-3xl md:text-4xl text-black font-extrabold uppercase tracking-tight">
              <span className="line-through decoration-red-500 decoration-[2.5px] text-zinc-400 font-normal mr-2">LOGBOOK</span>
              DIARY of an <span className="highlighter-yellow font-extrabold px-2 py-0.5 rounded border border-dashed border-black rotate-[2deg] inline-block">ENGINEERING</span> KID
            </h1>
          </div>
          <div className="bg-[#fefce8] border-2 border-black px-3 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] text-[12px] font-mono text-black font-bold hidden sm:block rotate-[1.5deg]">
            VOL. 2026 / MANNAT
          </div>
        </div>
      </section>

      {/* Diary entry intro */}
      <section className="mb-10 relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-hud text-sm font-bold bg-yellow-100 border border-black px-2 py-0.5 rounded rotate-[-1deg]">
            THURSDAY, JULY 23, 2026
          </span>
        </div>
        
        <div className="space-y-4 text-black text-[18px] leading-relaxed max-w-2xl">
          <p>
            First off, let&apos;s get one thing clear: this is a <span className="highlighter-yellow px-1 py-0.5 font-bold">LOGBOOK</span>, not a lab report. 
            I know the front cover says &quot;Diary&quot;, but that was the only notebook left in the stationery cupboard that wasn&apos;t already covered in gear grease.
          </p>
          <p>
            If you&apos;re here to read about complex formulas or physics proofs, you&apos;re in the wrong place. 
            This is mostly a diary of how many times our custom STM32 boards browned out during testing because someone forgot to ground the chassis.
          </p>
          <p>
            Right now, I am pursuing two degrees: <span className="font-bold border-b-2 border-black border-dashed">B.E. Computer Engineering</span> at Thapar and <span className="font-bold border-b-2 border-black border-dashed">B.Sc. Data Science &amp; AI</span> at IIT Guwahati. 
            Doing a remote degree is great because you can attend lectures while lying in bed, but then you realize you have to explain to a virtual TA why your AI model predicts a battery pack has infinite energy.
          </p>
          <p>
            When I am not doing homework, I am the Team Manager of <span className="highlighter-pink px-1.5 py-0.5 font-bold rounded">Team Fateh</span>, our Formula Student Electric racecar team. 
            Managing fifty engineering students is basically like babysitting, except instead of toys, they have high-voltage batteries and heavy machining tools. 
            Because the DAQ is mounted in the front nose cone and the battery pack is in the back, we route a custom 3-meter low-voltage wiring harness through the sidepods to connect the telemetry links and sensor arrays. 
            My job is to make sure they don&apos;t start a civil war in the workshop. I also designed our entire website and wrote the technical blogs because nobody else wanted to write documentation.
          </p>
        </div>

        {/* Hand-drawn Margin Doodle of Mannat holding a steering wheel */}
        <div className="absolute right-0 top-0 hidden md:block select-none pointer-events-none rotate-[4deg]">
          <svg width="150" height="150" viewBox="0 0 100 100" className="wiggle-hover">
            <circle cx="50" cy="24" r="11" stroke="black" strokeWidth="2" fill="white" />
            {/* Hair */}
            <path d="M47 13 Q43 6 46 8 M50 13 Q50 4 50 6 M53 13 Q57 6 54 8" stroke="black" strokeWidth="1.8" />
            {/* Goggles */}
            <rect x="42" y="18" width="7" height="5" rx="1.5" stroke="black" strokeWidth="1.8" fill="white" />
            <rect x="51" y="18" width="7" height="5" rx="1.5" stroke="black" strokeWidth="1.8" fill="white" />
            <line x1="49" y1="20" x2="51" y2="20" stroke="black" strokeWidth="2" />
            {/* Smile */}
            <path d="M45 28 Q50 32 55 28" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Body */}
            <line x1="50" y1="35" x2="50" y2="70" stroke="black" strokeWidth="2" />
            {/* Arms holding steering wheel */}
            <path d="M50 45 L32 52 L36 60" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M50 45 L68 52 L64 60" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Steering wheel */}
            <circle cx="50" cy="58" r="10" stroke="black" strokeWidth="2" fill="none" />
            <line x1="50" y1="48" x2="50" y2="68" stroke="black" strokeWidth="1.5" />
            <line x1="40" y1="58" x2="60" y2="58" stroke="black" strokeWidth="1.5" />
            {/* Label */}
            <text x="32" y="85" fill="black" fontSize="7" fontFamily="var(--font-hud)" fontWeight="bold">RACE DAY LOG</text>
          </svg>
        </div>
      </section>

      {/* Signal console */}
      <section className="mb-10 p-5 bg-[#ffffff] border-3 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Tape decoration */}
        <div className="absolute -top-2 left-1/3 w-16 h-4 bg-yellow-100/50 border border-dashed border-black/15 rotate-[-2deg]" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-hud text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-black">
              <Cpu className="w-4 h-4 text-black" /> WORKSHOP TRANSMITTER ANTENNA
            </h3>
            <div className="min-h-[48px] mt-2 bg-yellow-50/50 p-2 border-2 border-black border-dashed rounded text-black text-[15px] font-mono leading-snug">
              &quot;{activeSignal.line}&quot;
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-[#fefce8] border-2 border-black p-2 rounded text-center min-w-[100px]">
              <span className="text-[10px] font-mono font-bold block text-zinc-500 uppercase">SYS STATUS</span>
              <span className="font-hud text-xs font-extrabold text-blue-600 animate-pulse">{activeSignal.code}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={cycleSignal}
                onMouseEnter={playHoverSound}
                className="diary-btn flex items-center gap-1 py-1"
              >
                <Radio className="w-3.5 h-3.5" /> Tune Signal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Register */}
      <section className="mb-10">
        <h2 className="font-hud text-lg font-bold uppercase mb-4 border-b-2 border-black pb-1.5 flex justify-between items-center">
          <span>04 / Projects That Actually Worked</span>
          <span className="text-[11px] font-mono text-zinc-500">[SCRAPS FROM THE WORKSHOP]</span>
        </h2>
        
        <div className="space-y-6">
          {projects.map((proj) => (
            <article 
              key={proj.code}
              className="notebook-panel p-5 bg-[#ffffff] relative hover:translate-y-[-2px] hover:shadow-[5px_6px_0px_rgba(0,0,0,1)] transition-all group"
            >
              {/* Tape corner styling */}
              <div className="absolute -top-2.5 right-6 w-12 h-3.5 bg-yellow-100/40 border border-dashed border-black/10 rotate-[4deg]" />
              
              <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-zinc-100 border-2 border-black rounded">
                    {proj.code}
                  </span>
                  <h3 className="font-hud text-md font-bold text-black group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                </div>
                <span className="font-hud text-[10px] px-2 py-0.5 bg-yellow-100 border-2 border-black rounded uppercase font-bold tracking-wider">
                  {proj.tag}
                </span>
              </div>
              
              <p className="text-[16px] text-zinc-800 leading-relaxed mb-4">
                {proj.desc}
              </p>
              
              <div className="flex justify-between items-center text-[12px] font-hud font-bold">
                <a 
                  href={proj.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-600 flex items-center gap-1 group-hover:underline"
                  onClick={() => playClickSound()}
                >
                  Inspect Repository <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Channels Strip */}
      <section className="border-t-2 border-black pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-hud text-sm font-bold uppercase tracking-wider bg-pink-100 border border-black px-2 py-0.5 rounded rotate-[-1deg]">
          05 / Contact Channels
        </span>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/mannatgoyal"
            target="_blank"
            rel="noopener noreferrer"
            className="diary-btn text-xs font-hud flex items-center gap-1"
            onClick={() => playClickSound()}
          >
            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/mannat-goyal28"
            target="_blank"
            rel="noopener noreferrer"
            className="diary-btn text-xs font-hud flex items-center gap-1"
            onClick={() => playClickSound()}
          >
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:gmannat793@gmail.com"
            className="diary-btn text-xs font-hud flex items-center gap-1"
            onClick={() => playClickSound()}
          >
            Email <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
