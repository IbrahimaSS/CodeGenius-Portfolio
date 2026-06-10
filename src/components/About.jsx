import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = Math.max(1, Math.floor(num / (duration / 16)));
    const interval = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(interval); }
      else setCount(start);
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix = "", label }) {
  const numericPart = value.replace(/[^0-9]/g, "");
  const { count, ref } = useCountUp(numericPart, 1500);
  const displayValue = numericPart ? `${count}${suffix}` : value;

  return (
    <div
      ref={ref}
      className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all group text-center"
    >
      <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 inline-block transition-transform">
        {displayValue}
      </span>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="apropos" className="section-container">
      <div className="reveal">
        <h2 className="section-title">
          <span className="section-accent" /> À propos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Développeur Full-Stack & Architecte Logiciel
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Spécialisé dans la conception d'applications web et mobiles
              robustes, je transforme des problématiques métiers complexes en
              solutions{" "}
              <span className="text-cyan-400 font-semibold">
                scalables et haute performance
              </span>.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Ma maîtrise de la modélisation UML et des architectures
              SQL/NoSQL me permet de bâtir des systèmes d'information fiables
              et évolutifs. Passionné par l'écosystème moderne (React, Spring
              Boot, Laravel, NodeJS), je place la qualité du code et
              l'expérience utilisateur au cœur de chaque projet.
            </p>

            {/* Animated Stats */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard value="20" suffix="+" label="Projets" />
              <StatCard value="5" suffix="+" label="Frameworks" />
              <StatCard value="3" suffix="+" label="Ans d'XP" />
              <StatCard value="100" suffix="%" label="Passion" />
            </div>
          </div>

          {/* Right: Cards */}
          <div className="space-y-6">
            <div className="glass-card bg-cyan-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 text-lg">
                  💡
                </div>
                <h3 className="text-xl font-bold">Ma vision</h3>
              </div>
              <p className="text-slate-400 italic leading-relaxed relative z-10">
                "Le développement n'est pas seulement l'écriture de lignes de
                code, c'est la résolution de problèmes réels par l'innovation
                technique. Je m'engage à propulser chaque projet vers
                l'excellence esthétique et fonctionnelle."
              </p>
            </div>

            <div className="glass-card">
              <h3 className="text-lg font-bold mb-4">Ce que je propose</h3>
              <ul className="space-y-3">
                {[
                  "Applications Web & Mobile sur mesure",
                  "Architecture logicielle & modélisation UML",
                  "API REST robustes & temps réel",
                  "Intégration & déploiement continu (CI/CD)",
                ].map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm group/item">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0 group-hover/item:scale-125 transition-transform">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
