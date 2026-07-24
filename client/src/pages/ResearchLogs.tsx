import { motion } from "framer-motion";
import { Brain, Battery, Cpu } from "lucide-react";
import { playHoverSound } from "@/lib/audio";

export default function ResearchLogs() {
  const directions = [
    {
      code: "DIR-01",
      title: "Motorsport Strategy & Reinforcement Learning",
      status: "ACTIVE RESEARCH",
      statusClass: "highlighter-blue",
      icon: <Brain className="w-5 h-5 text-blue-600 flex-shrink-0" />,
      manifesto: `Formula Student race strategy is not just about driving fast. It is about understanding compound decay, track temperature, and traffic. If you make a pit stop at the wrong time, you end up stuck behind a slow car that has broad wings and refuses to let you pass.

I am using Reinforcement Learning stint simulators to model competitive motorsport racing. By using game theory to predict trust dynamics, the models simulate when drivers should defend, when to push, and when to conserve tyres.

It is basically like playing chess, but at two hundred miles per hour with actual rubber.`,
      researchAreas: ["Reinforcement Learning", "Game Theory", "Motorsport Strategy Simulation", "Tire Degradation Modeling"],
    },
    {
      code: "DIR-02",
      title: "VoltQuant: Hybrid Quantum Machine Learning",
      status: "CAPSTONE RESEARCH",
      statusClass: "highlighter-yellow",
      icon: <Battery className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      manifesto: `VoltQuant is my capstone project focusing on predicting thermal anomalies and state of health in electric vehicle accumulator packs. Classical neural networks are fine, but quantum circuits can map battery cell feature spaces in higher dimensions.

I feed parameter-embedded cell data (using AngleEmbedding and ZZFeatureMaps) into parameterized quantum circuits (PQCs) built on PennyLane and Qiskit. It is basically using quantum physics to predict when our lithium-ion cells are about to have a temper tantrum.

The seniors think I just put the word 'Quantum' in the title to get more sponsorship funding, but it actually compiles (mostly).`,
      researchAreas: ["Hybrid Quantum ML", "ZZFeatureMaps & Embeddings", "Anomaly Detection", "PennyLane / Qiskit Circuits"],
    },
    {
      code: "DIR-03",
      title: "Intelligent Cyber-Physical Security",
      status: "ACTIVE RESEARCH",
      statusClass: "highlighter-blue",
      icon: <Brain className="w-5 h-5 text-blue-600 flex-shrink-0" />,
      manifesto: `Modern networked systems are highly vulnerable to intrusion. When a server gets hit by a DDoS or brute-force scan, human admins are too slow to respond before systems go down.

My research is in automated threat detection and mitigation on active networks. I use Random Forest and XGBoost classifiers to spot anomalous packet traffic, and train DQN reinforcement learning agents to execute real-time firewall block actions.

It is like having a digital bouncer on the network switch.`,
      researchAreas: ["XGBoost Threat Classifiers", "DQN Automated Shielding", "Intrusion Prevention Systems", "Real-Time Firewall Controls"],
    },
    {
      code: "DIR-04",
      title: "Computer Vision & Digital Forensics",
      status: "HARDWARE VERIFIED",
      statusClass: "highlighter-green",
      icon: <Cpu className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      manifesto: `In computer vision, it is easy to spot a fake image if you have a massive cloud server. But what happens when the image is compressed down to three pixels on an active web database?

My research is in compression-robust digital forensics. I trained ResNet18 pipelines to detect subtle texture manipulations in digital images and output weak localization maps using Grad-CAM.

It is extremely useful for checking if someone cropped a sponsor sticker out of a race photo, or verifying that the mechanical team actually ran physical stress simulations instead of editing the pictures.`,
      researchAreas: ["Digital Image Forgery", "Grad-CAM Weak Localization", "ResNet18 CNN Optimization", "Compression-Robust Analysis"],
    },
  ];

  return (
    <div className="site-shell max-w-4xl mx-auto py-6 px-4">
      {/* Red margin line visual assist */}
      <div className="absolute left-[58px] top-0 bottom-0 w-0.5 bg-red-400 pointer-events-none" />

      <div className="space-y-6">
        {/* Header */}
        <section className="mb-6 border-b-2 border-black pb-4 mt-4 flex items-center justify-between">
          <div>
            <h1 className="font-hud text-2xl font-extrabold text-black uppercase tracking-tight">
              RESEARCH LOGS &amp; BRAINSTORMS
            </h1>
            <span className="text-zinc-500 font-hud text-[11px] block mt-1 uppercase">
              SYS-04 // Active Directions &amp; Engineering Manifestos
            </span>
          </div>
        </section>

        {/* Legal Pad Preamble */}
        <section className="notebook-panel p-5 bg-[#fefce8] relative">
          {/* Tape decoration */}
          <div className="absolute -top-3 left-12 w-16 h-4 bg-yellow-100/50 border border-dashed border-black/10 rotate-[2deg]" />
          
          <div className="border-b border-black/10 pb-3 mb-4 mt-1">
            <h2 className="font-hud text-md font-bold text-black uppercase">
              Orientation: Where ML Meets Hardware
            </h2>
          </div>
          
          <div className="text-[16px] text-zinc-800 space-y-3 leading-relaxed">
            <p>
              These are not random interest areas. They are active problems I am working on,
              driven by the constraints and failures I encounter in real engineering systems -
              specifically electrified racecars, high-frequency embedded telemetry, and battery safety.
            </p>
            <p className="font-bold border-t-2 border-black border-dashed pt-3 mt-3">
              Every research direction listed here has a concrete artifact: code, hardware, or a result.
              For the project implementations behind each direction, see the Experiments log.
            </p>
          </div>
        </section>

        {/* Yellow Legal Pad Sections */}
        <div className="space-y-6">
          {directions.map((dir, idx) => (
            <motion.div
              key={dir.code}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              onMouseEnter={playHoverSound}
              className="notebook-panel p-5 bg-[#fefbeb] relative"
              style={{
                backgroundImage: "linear-gradient(to right, transparent 35px, rgba(239, 68, 68, 0.2) 35px, rgba(239, 68, 68, 0.2) 37px, transparent 37px)",
                paddingLeft: "52px"
              }}
            >
              {/* Paper Clip Decoration at left margin */}
              <div className="absolute top-4 left-3 w-5 h-8 border-2 border-zinc-400 rounded-full rotate-[12deg] opacity-70 pointer-events-none" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  {dir.icon}
                  <div>
                    <h3 className="font-hud text-md font-bold text-black uppercase leading-snug">
                      {dir.title}
                    </h3>
                    <span className="font-mono text-[10px] text-zinc-400 font-bold block">{dir.code}</span>
                  </div>
                </div>
                <span className={`font-hud text-[9px] uppercase font-bold px-2 py-0.5 rounded border border-black/10 ${dir.statusClass}`}>
                  {dir.status}
                </span>
              </div>

              {/* Manifesto text box */}
              <div className="p-4 bg-white border-2 border-black border-dashed rounded relative">
                <pre className="font-sans text-[15px] text-zinc-800 leading-relaxed whitespace-pre-wrap">
                  {dir.manifesto}
                </pre>
              </div>

              {/* Active Research Areas tags */}
              <div className="pt-2">
                <span className="font-hud font-bold text-[10px] text-zinc-400 block uppercase mb-2">
                  ACTIVE RESEARCH AREAS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dir.researchAreas.map((area, i) => (
                    <span
                      key={i}
                      className="font-hud text-xs bg-white border-2 border-black rounded px-2.5 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase font-bold"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
