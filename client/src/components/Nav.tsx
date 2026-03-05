import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export function Nav() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/machines", label: "Machines" },
    { href: "/experiments", label: "Experiments" },
    { href: "/research", label: "Research Logs" },
    { href: "/timeline", label: "Timeline" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex justify-center pointer-events-auto">
        <ul className="flex flex-wrap gap-4 p-2 bg-white/80 backdrop-blur-md notebook-border border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <div 
                    className={`px-4 py-2 font-pixel text-xl uppercase tracking-wider cursor-pointer hover:bg-yellow-200 transition-colors ${
                      isActive ? "bg-yellow-300 font-bold border-b-2 border-black" : ""
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
