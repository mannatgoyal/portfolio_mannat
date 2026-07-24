import { useState } from "react";
import { Switch, Route, Router as BaseRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Nav } from "@/components/Nav";
import { BootSequence } from "@/components/BootSequence";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import Machines from "@/pages/Machines";
import Experiments from "@/pages/Experiments";
import ResearchLogs from "@/pages/ResearchLogs";
import Timeline from "@/pages/Timeline";
import NotFound from "@/pages/not-found";

function Router() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return <BaseRouter base={base}><Nav /><main className="site-shell"><Switch><Route path="/" component={Home} /><Route path="/machines" component={Machines} /><Route path="/experiments" component={Experiments} /><Route path="/research" component={ResearchLogs} /><Route path="/timeline" component={Timeline} /><Route component={NotFound} /></Switch></main></BaseRouter>;
}

export default function App() {
  const [isCoverOpened, setIsCoverOpened] = useState(false);

  return <QueryClientProvider client={queryClient}><TooltipProvider><AnimatePresence mode="wait">{!isCoverOpened ? <BootSequence key="cover" onComplete={() => setIsCoverOpened(true)} /> : <div key="journal" className="w-full min-h-screen"><Router /><Toaster /></div>}</AnimatePresence></TooltipProvider></QueryClientProvider>;
}
