import { useState, useEffect } from "react";

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "projets", label: "Projets" },
    { id: "competences", label: "Compétences" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollTo("accueil")}
          >
            Soumah<span className="text-cyan-400 font-black italic">.</span>dev
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium ${
                  activeSection === item.id ? "nav-active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:block text-xs font-semibold px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition backdrop-blur-sm"
            >
              Travaillons ensemble
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 z-[60]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu de navigation"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ease-out overflow-hidden ${
            mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-6 space-y-2">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: mobileOpen ? 1 : 0,
                }}
                className={`text-left text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-cyan-400 bg-cyan-400/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-cyan-500 mr-3 text-sm font-mono">0{i + 1}.</span>
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary w-full text-sm"
              >
                Travaillons ensemble
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
