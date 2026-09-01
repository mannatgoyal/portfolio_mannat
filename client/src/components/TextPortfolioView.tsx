import React, { useState } from "react";
import { 
  Gamepad2, 
  Home, 
  GraduationCap, 
  Briefcase, 
  Zap, 
  Trophy, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Star,
  Code
} from "lucide-react";

interface TextPortfolioViewProps {
  onSwitchTo3D: () => void;
  onOpenGate: () => void;
}

export function TextPortfolioView({ onSwitchTo3D, onOpenGate }: TextPortfolioViewProps) {
  const [activeSection, setActiveSection] = useState("about");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#ebd9cc] overflow-y-auto font-sans select-text scroll-smooth text-[#2d2621] flex flex-col items-center w-full">
      
      {/* Background paper texture & ambient desk wash */}
      <div className="fixed inset-0 pointer-events-none paper-grain bg-[#ebd9cc]/70 z-0" />

      {/* Sticky Wooden Desk Navigation Ribbon */}
      <header className="sticky top-0 z-50 w-full bg-[#fcf8f2]/95 backdrop-blur-md border-b-3 border-[#2d2621] px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenGate}
            className="sketch-btn py-1.5 px-3.5 text-xs sm:text-sm font-bold"
          >
            <Home className="w-4 h-4 text-[#d68c45]" />
            <span className="hidden sm:inline font-mono">Diary Cover</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-sm sm:text-base text-[#2d2621] uppercase tracking-wide">
              Mannat's Notebook
            </span>
            <span className="hidden md:inline-block text-[11px] font-mono font-black text-[#685b52] px-2 py-0.5 rounded-full bg-[#fce1e4] border border-[#2d2621]/20">
              VOL. 2026
            </span>
          </div>
        </div>

        {/* Section Jump Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold">
          {[
            { id: "about", label: "About" },
            { id: "academics", label: "Academics" },
            { id: "experience", label: "Experience" },
            { id: "fleet", label: "EV Fleet" },
            { id: "projects", label: "Projects" },
            { id: "honors", label: "Honors" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                activeSection === item.id 
                  ? "bg-[#e8dff5] border-[#2d2621] text-[#2d2621] shadow-[2px_2px_0px_#2d2621]" 
                  : "bg-transparent border-transparent text-[#685b52] hover:text-[#2d2621] hover:bg-[#f5ece0]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Switch to 3D Button */}
        <button
          onClick={onSwitchTo3D}
          className="sketch-btn py-1.5 sm:py-2 px-4 sm:px-5 text-xs sm:text-sm font-serif font-black bg-[#fce1e4] hover:bg-[#ffb3c6] transition-all cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4 text-[#2d2621]" />
          <span>Switch to 3D Game</span>
        </button>
      </header>

      {/* Main Centered Notebook Journal */}
      <main className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto my-8 sm:my-12 px-4 sm:px-6 pb-48 flex flex-col items-center">
        <div className="w-full bg-[#fcf8f2] border-3 sm:border-4 border-[#2d2621] rounded-3xl shadow-[8px_8px_0px_#2d2621] sm:shadow-[12px_12px_0px_#2d2621] p-6 sm:p-10 lg:p-14 space-y-16 sm:space-y-20">

          {/* Section 0: Diary Cover Header */}
          <section id="about" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2d2621]/15 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce1e4] border border-[#2d2621]/20 text-xs sm:text-sm font-mono font-bold text-[#2d2621]">
                <Star className="w-4 h-4 fill-[#d68c45] text-[#d68c45]" />
                <span>OBSERVATION LOGS // ENTRY 01</span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#685b52] font-bold">
                DIARY_ID: MG-2026-NOTEBOOK
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2d2621] tracking-tight uppercase">
                Mannat Goyal
              </h1>
              <p className="text-xl sm:text-2xl font-['Patrick_Hand',cursive] text-[#2d2621] font-bold">
                Student Engineer &amp; Machine Learning Researcher ✎
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#4a3e35] font-sans leading-relaxed">
              I am pursuing dual degrees in <span className="underline decoration-[#d6bdf2] decoration-4 font-bold text-[#2d2621]">Computer Engineering</span> at Thapar Institute of Engineering &amp; Technology and a remote <span className="underline decoration-[#94b0a0] decoration-4 font-bold text-[#2d2621]">B.Sc. (Hons.) in Data Science &amp; AI</span> at IIT Guwahati.
              Serving as the <strong className="text-[#2d2621]">Team Manager</strong> and <strong className="text-[#2d2621]">Electronics &amp; DAQ Engineer</strong> for Team Fateh, I focus on applying machine learning and high-frequency telemetry architectures to electric powertrains, battery safety systems, and vehicle dynamics.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="https://github.com/mannatgoyal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-btn py-1.5 px-3.5 text-xs sm:text-sm bg-white hover:bg-[#fffdfa]"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono font-bold">@mannatgoyal</span>
                <ExternalLink className="w-3 h-3 text-[#685b52]" />
              </a>

              <a 
                href="https://www.linkedin.com/in/mannat-goyal28/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-btn py-1.5 px-3.5 text-xs sm:text-sm bg-white hover:bg-[#fffdfa]"
              >
                <Linkedin className="w-4 h-4 text-[#2d2621]" />
                <span className="font-mono font-bold">in/mannat-goyal28</span>
                <ExternalLink className="w-3 h-3 text-[#685b52]" />
              </a>

              <a 
                href="mailto:gmannat793@gmail.com"
                className="sketch-btn py-1.5 px-3.5 text-xs sm:text-sm bg-white hover:bg-[#fffdfa]"
              >
                <Mail className="w-4 h-4 text-[#2d2621]" />
                <span className="font-mono font-bold">gmannat793@gmail.com</span>
              </a>
            </div>
          </section>

          {/* Section 1: Academics */}
          <section id="academics" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#2d2621]/15 pb-3">
              <div className="flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl text-[#2d2621] uppercase">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2621]" />
                <span>[ENTRY 02: ACADEMIC FOUNDATIONS]</span>
              </div>
              <span className="text-xs font-mono text-[#94b0a0] font-bold">DUAL DEGREES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TIET */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#fce1e4] border border-[#2d2621]/20">
                      2023 – 2027
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#d68c45]">8.04/10 CGPA</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">
                      Thapar Institute of Eng. &amp; Tech.
                    </h3>
                    <p className="text-sm sm:text-base font-['Patrick_Hand',cursive] text-[#2d2621] font-bold mt-0.5">
                      B.E. Computer Engineering
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Deep studies in embedded system architectures, microprocessors and interfacing, computer networks, data structures, and operating system design.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["Algorithms", "Embedded Systems", "Computer Architecture", "Microprocessors", "Operating Systems"].map((c, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* IIT Guwahati */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#daeaf6] border border-[#2d2621]/20">
                      2023 – 2027
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#94b0a0]">REMOTE HONORS</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">
                      IIT Guwahati
                    </h3>
                    <p className="text-sm sm:text-base font-['Patrick_Hand',cursive] text-[#2d2621] font-bold mt-0.5">
                      B.Sc. (Hons.) Data Science &amp; AI
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Rigorous statistical modeling, time-series telemetry analysis, machine learning algorithms, probabilistic theory, and deep neural networks.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["Machine Learning", "Time Series", "Probability & Stats", "Neural Networks", "Data Mining"].map((c, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Experience */}
          <section id="experience" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#2d2621]/15 pb-3">
              <div className="flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl text-[#2d2621] uppercase">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2621]" />
                <span>[ENTRY 03: FORMULA STUDENT EV LOGS]</span>
              </div>
              <span className="text-xs font-mono text-[#d68c45] font-bold">TEAM FATEH</span>
            </div>

            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#2d2621]/10 pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">
                      Team Manager &amp; Electronics / Data Acquisition Engineer — Team Fateh
                    </h3>
                    <p className="text-xs sm:text-sm font-mono font-bold text-[#d68c45] mt-0.5">
                      Formula Student EV Program, Thapar Institute of Engineering &amp; Technology · Oct 2023 – Present (Team Manager since Jan 2026)
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#fce1e4] border border-[#2d2621]">
                    LEADERSHIP &amp; HARDWARE
                  </span>
                </div>

                <ul className="text-xs sm:text-sm text-[#4a3e35] space-y-2.5 list-disc pl-5 leading-relaxed font-sans font-medium">
                  <li>
                    Lead a 40–50 member cross-functional EV engineering organization spanning electronics, mechanical and business functions, driving roadmap, priorities, project scope and delivery against a ₹45L budget.
                  </li>
                  <li>
                    Standardized documentation, timelines and review processes across sub-teams; track risks, issues, blockers and decisions while coordinating 40+ stakeholders across the engineering program.
                  </li>
                  <li>
                    Led a Digital Manufacturing &amp; Industry 4.0 transformation case for Formula Bharat, designing an ISA-95-inspired digital thread across PLM, ERP, MES, edge and cloud systems; developed the architecture, automation workflows, cost model and phased implementation roadmap for 5,000 vehicles/month.
                  </li>
                  <li>
                    Built a digital manufacturing architecture connecting SolidWorks, Infor PLM, Infor CloudSuite ERP, Infor ION, MES and AWS edge/cloud layers; modeled automated BOM synchronization, procurement controls and edge-based quality interlocks to create a single digital thread from design to production.
                  </li>
                  <li>
                    Coordinated technical, business and sponsorship requirements across sub-teams into structured external-facing deliverables, including a 13-section sponsor partnership brochure.
                  </li>
                  <li>
                    Designed and programmed custom STM32F446RE &amp; ESP32 data acquisition nodes capturing high-frequency sensor streams (voltage, cell temperature, vehicle dynamics) over a 500Hz CAN bus with noise isolation.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Machines & Fleet */}
          <section id="fleet" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#2d2621]/15 pb-3">
              <div className="flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl text-[#2d2621] uppercase">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2621]" />
                <span>[ENTRY 04: THE MOTOR SHED FLEET]</span>
              </div>
              <span className="text-xs font-mono text-[#ff8080] font-bold">TUFF 17 / 18 / 19</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* TUFF 17 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f5ece0] border border-[#2d2621]/20">
                      2024-25 BUILD
                    </span>
                    <span className="text-xs font-mono font-bold text-[#685b52]">INAUGURAL</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">TUFF 17</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    First electric vehicle platform. Transitioned the team to EV powertrains, establishing sensor lines and safety shutdown loops.
                  </p>
                </div>
                <div className="space-y-1.5 pt-3 border-t-2 border-[#2d2621]/10 text-xs font-mono text-[#2d2621]">
                  <div className="flex justify-between"><span className="text-[#685b52]">DAQ:</span> <span className="font-bold">ESP32 Core</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Motor:</span> <span>Emrax 228</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Inverter:</span> <span>DTI HV550</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Cells:</span> <span>Molicel P45B</span></div>
                </div>
              </div>

              {/* TUFF 18 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fffdfa] border-2 sm:border-3 border-[#2d2621] shadow-[5px_5px_0px_#2d2621] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#fce1e4] border border-[#2d2621]/20">
                      2025-26 BUILD
                    </span>
                    <span className="text-xs font-mono font-black text-[#d68c45]">P3 SUPRA SAE</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">TUFF 18</h3>
                  <p className="text-xs sm:text-sm text-[#4a3e35] leading-relaxed">
                    Second-generation competition car. 500Hz CAN telemetry logging on custom STM32 hardware. SUPRA SAE Design Winners &amp; P3 Overall.
                  </p>
                </div>
                <div className="space-y-1.5 pt-3 border-t-2 border-[#2d2621]/10 text-xs font-mono text-[#2d2621]">
                  <div className="flex justify-between"><span className="text-[#685b52]">DAQ:</span> <span className="font-bold text-[#d68c45]">STM32F446RE</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Motor:</span> <span>Emrax 228</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Inverter:</span> <span>DTI HV550</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Cells:</span> <span>Molicel P45B</span></div>
                </div>
              </div>

              {/* TUFF 19 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#e2f0cb] border border-[#2d2621]/20">
                      2026-27 BUILD
                    </span>
                    <span className="text-xs font-mono font-bold text-[#94b0a0]">NEXT-GEN</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">TUFF 19</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Next-generation racecar featuring upgraded high-density Molicel P50B cells and integrated edge battery state prediction models.
                  </p>
                </div>
                <div className="space-y-1.5 pt-3 border-t-2 border-[#2d2621]/10 text-xs font-mono text-[#2d2621]">
                  <div className="flex justify-between"><span className="text-[#685b52]">DAQ:</span> <span className="font-bold">Next-Gen STM32</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Motor:</span> <span>Emrax 228</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Inverter:</span> <span>DTI HV550</span></div>
                  <div className="flex justify-between"><span className="text-[#685b52]">Cells:</span> <span>Molicel P50B</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Projects & Research */}
          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#2d2621]/15 pb-3">
              <div className="flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl text-[#2d2621] uppercase">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2621]" />
                <span>[ENTRY 05: EXPERIMENTS &amp; ML SOLVERS]</span>
              </div>
              <span className="text-xs font-mono text-[#d68c45] font-bold">CODE REPOSITORIES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#fce1e4] border border-[#2d2621]/20 text-[#2d2621]">
                      RL &amp; SIMULATION
                    </span>
                    <a href="https://github.com/mannatgoyal/trust-strategy-motorsports" target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg hover:bg-[#f5ece0] text-[#2d2621] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">F1 Strategy Engineer Toolkit</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Decision-support framework combining FastF1 telemetry, physical race simulation, Monte Carlo uncertainty modelling, and Q-learning pit-stop strategy solvers.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["FastF1", "Monte Carlo", "Q-Learning", "Game Theory", "Python"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 2 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#daeaf6] border border-[#2d2621]/20 text-[#2d2621]">
                      QUANTUM &amp; BATTERY ML
                    </span>
                    <span className="text-xs font-mono text-[#685b52] font-bold">RESEARCH</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">VoltNet &amp; HQML-BMS</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Hybrid Quantum Machine Learning framework for predicting lithium-ion battery thermal runaway using Angle Embedding and ZZFeatureMaps (96% simulated accuracy).
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["PyTorch", "Qiskit", "PennyLane", "Physics-Informed ML"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 3 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#e2f0cb] border border-[#2d2621]/20 text-[#2d2621]">
                      QUANTITATIVE OPT
                    </span>
                    <a href="https://github.com/mannatgoyal/EvoQuant" target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg hover:bg-[#f5ece0] text-[#2d2621] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">EvoQuant Strategy Optimizer</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Deterministic backtesting engine comparing Grid Search, Genetic Algorithms, and Particle Swarm Optimization with strict train/test isolation to prevent overfitting.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["Python", "Genetic Algorithms", "PSO", "Backtesting"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 4 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#fce1e4] border border-[#2d2621]/20 text-[#2d2621]">
                      SECURITY &amp; RL
                    </span>
                    <a href="https://github.com/mannatgoyal/cyberattack_detect" target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg hover:bg-[#f5ece0] text-[#2d2621] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">Cyberattack Detection &amp; DQN Shield</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    Real-time network anomaly classification using XGBoost, paired with a Deep Q-Network reinforcement learning agent to automate instant firewall mitigation responses.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["Python", "XGBoost", "PyTorch DQN", "CAN Bus"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 5 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#daeaf6] border border-[#2d2621]/20 text-[#2d2621]">
                      COMPUTER VISION
                    </span>
                    <a href="https://github.com/mannatgoyal/image-forensics" target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg hover:bg-[#f5ece0] text-[#2d2621] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">Compression-Aware Image Forensics</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    6-channel RGB + SRM noise-residual ResNet18 model for authentic/tampered image classification under heavy compression, with Grad-CAM weak localization heatmaps.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["PyTorch", "ResNet18", "Grad-CAM", "SRM Filters"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 6 */}
              <div className="p-6 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[4px_4px_0px_#2d2621] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#e8dff5] border border-[#2d2621]/20 text-[#2d2621]">
                      WEB &amp; TELEMETRY
                    </span>
                    <a href="https://github.com/mannatgoyal/team-fateh-hub" target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg hover:bg-[#f5ece0] text-[#2d2621] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#2d2621]">Team Fateh Telemetry Hub &amp; Web Portal</h3>
                  <p className="text-xs sm:text-sm text-[#5c4f45] leading-relaxed">
                    High-performance web portal communicating vehicle architecture, sub-system milestones, and real-time EV telemetry logging for Team Fateh.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#2d2621]/10">
                  {["Next.js", "React", "TypeScript", "TailwindCSS"].map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#2d2621]/15 font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Honors & Awards */}
          <section id="honors" className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#2d2621]/15 pb-3">
              <div className="flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl text-[#2d2621] uppercase">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2621]" />
                <span>[ENTRY 06: HONORS &amp; COMPETITION AWARDS]</span>
              </div>
              <span className="text-xs font-mono text-[#d68c45] font-bold">AWARDS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  title: "SUPRA SAE 2025",
                  result: "2nd Runner-Up, EV Overall; 1st, Engineering Design",
                  org: "SAE India Formula Student",
                  color: "#fce1e4"
                },
                {
                  title: "Formula Bharat 2025",
                  result: "Top 10 Overall; Engineering Design Finalist",
                  org: "Formula Bharat EV Division",
                  color: "#daeaf6"
                },
                {
                  title: "Pi-EV 2024",
                  result: "Procurement Winner",
                  org: "Pi-EV Engineering Showcase",
                  color: "#e2f0cb"
                },
                {
                  title: "Santander Open Academy",
                  result: "High Performance Leadership: Lessons from Formula 1",
                  org: "Santander & Scuderia Ferrari",
                  color: "#e8dff5"
                },
                {
                  title: "Literary Publications",
                  result: "Poetry published in Carousels Anthology (2024)",
                  org: "Carousels Press",
                  color: "#fcf4dd"
                }
              ].map((award, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border-2 sm:border-3 border-[#2d2621] shadow-[3px_3px_0px_#2d2621] flex items-start gap-3.5">
                  <div className="p-2 sm:p-2.5 rounded-xl border-2 border-[#2d2621] shadow-[1px_1px_0px_#2d2621]" style={{ backgroundColor: award.color }}>
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#2d2621]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2d2621] font-serif uppercase tracking-wide">{award.title}</h3>
                    <p className="text-xs sm:text-sm font-mono font-bold text-[#d68c45] mt-0.5">{award.result}</p>
                    <span className="text-[11px] font-mono text-[#685b52] block mt-0.5">{award.org}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Contact */}
          <section id="contact" className="p-6 sm:p-10 rounded-3xl bg-[#fffdfa] border-3 border-[#2d2621] shadow-[5px_5px_0px_#2d2621] space-y-4 text-center">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#2d2621] uppercase">Let's Connect &amp; Collaborate</h2>
              <p className="text-sm sm:text-base font-['Patrick_Hand',cursive] text-[#5c4f45] font-bold max-w-xl mx-auto">
                Open to embedded firmware, machine learning for physical dynamics &amp; motorsports telemetry!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
              <a 
                href="https://github.com/mannatgoyal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-btn py-2 px-5 text-xs sm:text-sm bg-white"
              >
                <Github className="w-4 h-4 text-[#2d2621]" />
                <span className="font-mono font-bold">@mannatgoyal</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/mannat-goyal28/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-btn py-2 px-5 text-xs sm:text-sm bg-white"
              >
                <Linkedin className="w-4 h-4 text-[#2d2621]" />
                <span className="font-mono font-bold">in/mannat-goyal28</span>
              </a>

              <a 
                href="mailto:gmannat793@gmail.com"
                className="sketch-btn py-2 px-5 text-xs sm:text-sm bg-white"
              >
                <Mail className="w-4 h-4 text-[#2d2621]" />
                <span className="font-mono font-bold">gmannat793@gmail.com</span>
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
