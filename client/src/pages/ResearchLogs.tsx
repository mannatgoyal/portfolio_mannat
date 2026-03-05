import { motion } from "framer-motion";
import { Cpu, Terminal, FileCode2 } from "lucide-react";

export default function ResearchLogs() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <main className="max-w-4xl mx-auto space-y-12">
        <div className="bg-black text-green-400 p-6 shadow-[8px_8px_0px_rgba(0,0,255,0.5)] border-2 border-blue-600 mb-12">
          <h1 className="font-pixel text-5xl uppercase flex items-center gap-4">
            <Cpu /> ~/research_logs
          </h1>
        </div>

        <div className="space-y-8">
          {/* Log 1 */}
          <div className="bg-white border-2 border-black p-6 notebook-border relative">
            <div className="absolute top-0 right-0 bg-black text-white font-pixel px-3 py-1 text-xl">LOG_042</div>
            <h2 className="font-pixel text-3xl mb-4 text-blue-700">Autonomous Steering Model</h2>
            <div className="flex gap-4 mb-6">
              <span className="flex items-center gap-1 font-sans text-sm bg-gray-100 px-2 py-1 rounded"><Terminal className="w-4 h-4"/> PyTorch</span>
              <span className="flex items-center gap-1 font-sans text-sm bg-gray-100 px-2 py-1 rounded"><FileCode2 className="w-4 h-4"/> OpenCV</span>
            </div>
            
            <div className="font-sans space-y-4">
              <p>
                <strong className="bg-yellow-200 px-1">Hypothesis:</strong> Can we use a lightweight CNN to predict steering angles based on monocular vision in track conditions?
              </p>
              <div className="bg-gray-100 p-4 border-l-4 border-blue-500 font-mono text-sm">
                > Epoch 50/50<br/>
                > Loss: 0.0421<br/>
                > Validation Accuracy: 92.4%<br/>
                > Inference Time: 12ms (Jetson Nano)
              </div>
              <p className="font-hand text-xl text-gray-700 pt-4">
                Notes: The model struggles with harsh shadows. Need to augment dataset with more lighting variations.
              </p>
            </div>
          </div>

          {/* Log 2 */}
          <div className="bg-white border-2 border-black p-6 notebook-border relative">
            <div className="absolute top-0 right-0 bg-black text-white font-pixel px-3 py-1 text-xl">LOG_038</div>
            <h2 className="font-pixel text-3xl mb-4 text-blue-700">Battery Thermal Prediction</h2>
            <div className="flex gap-4 mb-6">
              <span className="flex items-center gap-1 font-sans text-sm bg-gray-100 px-2 py-1 rounded"><Terminal className="w-4 h-4"/> Scikit-Learn</span>
            </div>
            
            <div className="font-sans space-y-4">
              <p>
                <strong className="bg-yellow-200 px-1">Goal:</strong> Predict cell temperatures 5 minutes into the future to preemptively adjust cooling fans.
              </p>
              <p className="font-hand text-xl text-gray-700 pt-4">
                Notes: Simple linear regression is too noisy. Random Forest works better but might be too heavy for the MCU. Looking into optimized inference.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
