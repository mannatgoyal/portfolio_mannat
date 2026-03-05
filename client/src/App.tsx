import { Switch, Route, Router as BaseRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Nav } from "@/components/Nav";
import Home from "@/pages/Home";
import Machines from "@/pages/Machines";
import Experiments from "@/pages/Experiments";
import ResearchLogs from "@/pages/ResearchLogs";
import Timeline from "@/pages/Timeline";

function Router() {
  // Use Vite's BASE_URL (which we set to /portfolio_mannat/ in vite.config.ts)
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="w-full relative">
      <BaseRouter base={base}>
        <Nav />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/machines" component={Machines} />
          <Route path="/experiments" component={Experiments} />
          <Route path="/research" component={ResearchLogs} />
          <Route path="/timeline" component={Timeline} />
          <Route component={NotFound} />
        </Switch>
      </BaseRouter>
    </div>
  );
}

import { Photobooth } from "@/components/Photobooth";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Photobooth />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
