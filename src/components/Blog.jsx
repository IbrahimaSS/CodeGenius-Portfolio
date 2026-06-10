import { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import { Icons } from "./Icons";
import LazyImage from "./LazyImage";

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  
  const categories = ["Tous", ...new Set(articles.map((a) => a.categorie))];

  const filteredArticles = activeFilter === "Tous" 
    ? articles 
    : articles.filter(a => a.categorie === activeFilter);

  const getBadgeColor = (cat) => {
    switch(cat) {
      case "Tutoriel": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Architecture": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Retour d'expérience": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Actualité": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    }
  };

  return (
    <section id="blog" className="section-container">
      <div className="reveal">
        <h2 className="section-title">
          <span className="section-accent" /> Blog & Publications
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <div key={article.id} className="glass-card p-0 flex flex-col h-full overflow-hidden group animate-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="relative h-48 overflow-hidden">
                <LazyImage 
                  src={article.image} 
                  alt={article.titre} 
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-md ${getBadgeColor(article.categorie)}`}>
                    {article.categorie}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.titre}
                </h3>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span>{article.tempsLecture} de lecture</span>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
                  {article.extrait}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    to={`/blog/${article.slug}`} 
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors"
                  >
                    Lire l'article <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
