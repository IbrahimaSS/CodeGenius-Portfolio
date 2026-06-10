export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="py-12 border-t border-white/5 mt-12 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-white mb-1">
            Soumah<span className="text-cyan-400">.</span>dev
          </h2>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} - Créé avec passion par Ibrahima Sory Soumah
          </p>
        </div>
        <p className="text-slate-600 text-xs italic">
          Développé avec React, Tailwind CSS & Vite
        </p>
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
