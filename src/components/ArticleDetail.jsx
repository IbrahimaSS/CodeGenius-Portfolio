import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { articles } from "../data/articles";
import { Icons } from "./Icons";
import SEO from "./SEO";
import LazyImage from "./LazyImage";

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  // Articles récents (sans l'article actuel)
  const recentArticles = articles.filter(a => a.id !== article.id).slice(0, 3);

  const getBadgeColor = (cat) => {
    switch(cat) {
      case "Tutoriel": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Architecture": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Retour d'expérience": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Actualité": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    }
  };

  const shareUrl = `https://soumah.dev/blog/${article.slug}`;

  return (
    <div className="min-h-screen bg-[#0d1117] pt-24 pb-12 animate-fade-in">
      <SEO
        title={`${article.titre} | Ibrahima Sory Soumah`}
        description={article.extrait}
        url={shareUrl}
        image={article.image}
        type="article"
      />
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <article className="lg:w-2/3">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-medium">
            <span className="text-lg">←</span> Retour au portfolio
          </Link>

          <div className="mb-8">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border mb-4 ${getBadgeColor(article.categorie)}`}>
              {article.categorie}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.titre}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><Icons.Calendar /> {article.date}</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span>{article.tempsLecture} de lecture</span>
            </div>
          </div>

          <LazyImage 
            src={article.image} 
            alt={article.titre} 
            className="w-full h-64 md:h-96 rounded-2xl mb-12 shadow-2xl border border-white/5"
          />

          <div className="prose prose-invert prose-cyan max-w-none 
                          prose-headings:font-bold prose-headings:tracking-tight
                          prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                          prose-img:rounded-xl prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/5
                          mb-12">
            <ReactMarkdown>{article.contenu}</ReactMarkdown>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 py-6 border-t border-white/10 mt-12">
            <span className="text-sm font-bold text-slate-400">Partager :</span>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-full transition-colors border border-blue-600/20 flex items-center justify-center w-10 h-10"
            >
              in
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.titre)}`} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-slate-800 text-white hover:bg-black rounded-full transition-colors border border-white/10 flex items-center justify-center w-10 h-10"
            >
              X
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">
          <div className="glass-card p-6 sticky top-28">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-500 rounded-full block"></span> 
              Derniers articles
            </h3>
            <div className="space-y-6">
              {recentArticles.map(recent => (
                <Link to={`/blog/${recent.slug}`} key={recent.id} className="group block">
                  <div className="flex gap-4 items-center">
                    <img src={recent.image} alt={recent.titre} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-1">
                        {recent.titre}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">{recent.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
               <h4 className="font-bold text-white mb-2">Newsletter</h4>
               <p className="text-sm text-slate-400 mb-4">Recevez mes prochains articles directement.</p>
               <div className="flex gap-2">
                 <input type="email" placeholder="Votre email" className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-white" />
                 <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded-lg text-sm font-bold transition-colors">Go</button>
               </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
