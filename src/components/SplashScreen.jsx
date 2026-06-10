import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading → reveal → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0f1d] transition-opacity duration-700 ${
        phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-600/15 blur-[80px] rounded-full" />

      {/* Logo */}
      <div className="splash-logo relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="splash-letter inline-block" style={{ animationDelay: "0ms" }}>S</span>
          <span className="splash-letter inline-block" style={{ animationDelay: "50ms" }}>o</span>
          <span className="splash-letter inline-block" style={{ animationDelay: "100ms" }}>u</span>
          <span className="splash-letter inline-block" style={{ animationDelay: "150ms" }}>m</span>
          <span className="splash-letter inline-block" style={{ animationDelay: "200ms" }}>a</span>
          <span className="splash-letter inline-block" style={{ animationDelay: "250ms" }}>h</span>
          <span className="splash-dot text-cyan-400 font-black italic inline-block" style={{ animationDelay: "350ms" }}>.</span>
          <span className="splash-letter inline-block text-cyan-400" style={{ animationDelay: "450ms" }}>d</span>
          <span className="splash-letter inline-block text-cyan-400" style={{ animationDelay: "500ms" }}>e</span>
          <span className="splash-letter inline-block text-cyan-400" style={{ animationDelay: "550ms" }}>v</span>
        </h1>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
        <div className="splash-bar h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
      </div>

      <p className="mt-4 text-xs text-slate-600 tracking-[0.3em] uppercase relative z-10 splash-subtitle">
        Full-Stack Developer
      </p>
    </div>
  );
}
