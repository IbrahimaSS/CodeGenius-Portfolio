import { useState, useRef, useCallback } from "react";
import { projects } from "../data/projects";
import { Icons } from "./Icons";

const getTechColor = (techs) => {
  if (!techs || techs.length === 0) return "from-slate-700 to-slate-900";
  const mainTech = techs[0].toLowerCase();
  if (mainTech.includes("react")) return "from-cyan-600 to-blue-900";
  if (mainTech.includes("spring")) return "from-emerald-600 to-teal-900";
  if (mainTech.includes("laravel")) return "from-red-600 to-rose-900";
  if (mainTech.includes("node")) return "from-green-600 to-emerald-900";
  if (mainTech.includes("python") || mainTech.includes("django")) return "from-yellow-600 to-orange-900";
  return "from-slate-700 to-slate-900";
};

function TiltCard({ children, className, onClick, style }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      style={{ ...style, transition: "transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const openProject = (project) => { setSelectedProject(project); setImageIndex(0); };
  const closeProject = () => setSelectedProject(null);

  const scrollToContact = () => {
    closeProject();
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <section id="projets" className="section-container">
      <div className="reveal">
        <h2 className="section-title">
          <span className="section-accent" /> Réalisations Clés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((projet, idx) => (
            <TiltCard
              key={idx}
              onClick={() => openProject(projet)}
              className="glass-card group overflow-hidden p-0 flex flex-col h-full cursor-pointer"
            >
              {projet.image ? (
                <div className="relative h-[180px] w-full overflow-hidden shrink-0 border-b border-white/5 bg-slate-900">
                  <img src={projet.image} alt={projet.titre} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-sm font-semibold bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      Voir le projet →
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`relative h-[180px] w-full overflow-hidden shrink-0 border-b border-white/5 bg-gradient-to-br ${getTechColor(projet.techs)} flex flex-col items-center justify-center p-6 text-center`}>
                  <Icons.Code />
                  <h3 className="text-xl font-bold text-white mt-3 opacity-90">{projet.titre}</h3>
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-sm font-semibold bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      Voir le projet →
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="text-xl font-bold mb-3">{projet.titre}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">{projet.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {projet.techs.map((tech, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-cyan-300 uppercase tracking-widest font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* ===== PROJECT DETAIL MODAL ===== */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-xl animate-fade-in" onClick={closeProject} />
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-800/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-up">
            <button onClick={closeProject} className="absolute top-4 right-4 z-50 p-2 bg-slate-900/50 border border-white/10 rounded-full text-white hover:bg-white/10 transition">
              <Icons.Close />
            </button>

            {/* Gallery */}
            <div className="md:w-1/2 bg-[#0a0f1d] border-r border-white/5 relative flex items-center justify-start overflow-x-auto custom-scrollbar group/gallery h-[50vh] md:h-auto">
              {selectedProject.screenshots?.length > 0 ? (
                <>
                  <img key={imageIndex} src={selectedProject.screenshots[imageIndex]} alt={`${selectedProject.titre} - Vue ${imageIndex + 1}`} className="relative z-10 h-full w-auto max-w-none animate-fade-in shadow-2xl" />
                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setImageIndex((p) => p > 0 ? p - 1 : selectedProject.screenshots.length - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2.5 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition shadow-2xl border border-white/10 opacity-0 group-hover/gallery:opacity-100">
                        <Icons.Left />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setImageIndex((p) => p < selectedProject.screenshots.length - 1 ? p + 1 : 0); }} className="absolute right-4 md:right-auto md:left-[calc(100%-60px)] top-1/2 -translate-y-1/2 z-[110] p-2.5 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition shadow-2xl border border-white/10 opacity-0 group-hover/gallery:opacity-100">
                        <Icons.Right />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-[#0f172a]/60 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
                        {selectedProject.screenshots.map((_, i) => (
                          <button key={i} onClick={() => setImageIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === imageIndex ? "bg-cyan-400 w-6" : "bg-white/40 w-2 hover:bg-white/60"}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${getTechColor(selectedProject.techs)} p-12 min-h-[300px]`}>
                  <Icons.Code />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 opacity-90 text-center">{selectedProject.titre}</h3>
                  <p className="mt-3 text-sm text-white/70 font-medium">Aperçu visuel non disponible</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full">Projet Réalisé</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-4">{selectedProject.titre}</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProject.techs.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 font-bold">{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">À propos du projet</h4>
                  <p className="text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/30 pl-4">{selectedProject.desc}</p>
                </div>
                {selectedProject.details && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Détails Techniques</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{selectedProject.details}</p>
                  </div>
                )}
                {selectedProject.stats && (
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {selectedProject.stats.map((s, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="text-sm font-bold text-white block">{s.split(" ")[0]}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">{s.split(" ").slice(1).join(" ")}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-6 flex flex-col sm:flex-row gap-3">
                  <button className="btn-primary flex-1 text-sm">Voir la démo <Icons.External /></button>
                  <button onClick={scrollToContact} className="btn-outline flex-1 text-sm">Demander conseil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
