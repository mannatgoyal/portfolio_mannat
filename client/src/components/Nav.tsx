import { Link, useLocation } from "wouter";

const links = [
  { href: "/", label: "Diary entries", code: "01" },
  { href: "/machines", label: "My machines", code: "02" },
  { href: "/experiments", label: "Experiments", code: "03" },
  { href: "/research", label: "Brainstorms", code: "04" },
  { href: "/timeline", label: "My timeline", code: "05" },
];

export function Nav() {
  const [location] = useLocation();
  return (
    <header className="site-nav">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex flex-col items-center md:items-start group select-none cursor-pointer">
          <div className="flex items-center gap-1 font-hud">
            <span className="text-[20px] font-extrabold text-black tracking-tight">
              <span className="line-through decoration-red-500 decoration-[2.5px] text-zinc-400 mr-2 font-normal select-none">HAIL MARY</span>
              <span className="bg-yellow-200/90 border-2 border-black border-dashed px-1.5 py-0.5 rounded rotate-[1deg] inline-block font-extrabold text-[14px]">
                MANNAT'S JOURNAL
              </span>
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mt-1">
            Mannat Goyal - Engineering Kid
          </span>
        </Link>
        
        <nav aria-label="Primary navigation">
          <ul className="nav-tab-list">
            {links.map(({ href, label, code }) => {
              const isActive = location === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-tab-btn ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="font-mono text-[9px] block text-zinc-400 mb-0.5 leading-none">
                      [{code}]
                    </span>
                    <span className="font-hud text-xs">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
