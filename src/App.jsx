import { useState, useEffect } from "react";
import moiImg from "./assets/CodeGenius.jpg";
import taka1 from "./assets/TakaTaka1.png";
import taka2 from "./assets/TakaTaka2.png";
import taka3 from "./assets/TakaTaka3.png";
import taka4 from "./assets/TakaTaka4.png";
import taka5 from "./assets/TakaTaka5.png";
import b1 from "./assets/Boutique1.png";
import b2 from "./assets/Boutique2.png";
import b3 from "./assets/Boutique3.png";
import b5 from "./assets/Boutique5.png";
import b6 from "./assets/Boutique6.png";

// Multi-Recherche Icons (SVG format for premium look)
const Icons = {
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>,
  Figma: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z" /><path d="M12 16h3.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5H12v-7z" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  External: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
  Left: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  Right: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sent");
    setTimeout(() => setFormStatus(null), 3000);
  };

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "projets", label: "Projets" },
    { id: "competences", label: "Compétences" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Modern Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Soumah<span className="text-cyan-400 font-black italic">.</span>dev
          </h1>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link text-sm font-medium ${activeTab === item.id ? "nav-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@codegenius.gm" className="hidden sm:block text-xs font-semibold px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition backdrop-blur-sm">Travaillons ensemble</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        {/* HERO SECTION */}
        {activeTab === "accueil" && (
          <section className="section-container min-h-[80vh] flex flex-col items-center justify-center text-center animate-up">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={moiImg}
                alt="Ibrahima Sory Soumah"
                className="relative z-10 w-44 h-44 rounded-2xl object-cover border-4 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Ibrahima Sory <br />
              <span className="text-cyan-400">Soumah</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Développeur Full-Stack & Mobile passionné par l’architecture logicielle et le code de qualité, je conçois et développe des solutions performantes en transformant des idées complexes en expériences utilisateurs <span className="text-white font-medium">fluides, intuitives et scalables</span>.
            </p>
            <div className="flex flex-col sm:row gap-4 justify-center items-center">
              <a href="cv.pdf" download className="btn-primary w-full sm:w-auto">
                <Icons.Download /> Télécharger mon CV
              </a>
              <a
                href="https://www.linkedin.com/in/ibrahima-sory-soumah-050986340"
                className="btn-outline w-full sm:w-auto"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Linkedin /> Mon Profil LinkedIn
              </a>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        {activeTab === "apropos" && (
          <section className="section-container animate-up">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="bg-cyan-500 w-12 h-1 rounded-full"></span> À propos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Développeur Full-Stack & Architecte Logiciel</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Spécialisé dans la conception d'applications web et mobiles robustes, je transforme des problématiques métiers complexes en solutions <span className="text-cyan-400 font-semibold">scalables et haute performance</span>.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Ma maîtrise de la modélisation UML et des architectures SQL/NoSQL me permet de bâtir des systèmes d’information fiables et évolutifs. Passionné par l'écosystème moderne (React, Spring Boot, Laravel, NodeJS), je place la qualité du code et l'expérience utilisateur au cœur de chaque projet pour garantir des produits maintenables et prêts pour la croissance.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-2xl font-bold text-cyan-400">20+</span>
                    <p className="text-sm text-slate-400">Projets réalisés</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-2xl font-bold text-cyan-400">5+</span>
                    <p className="text-sm text-slate-400">Frameworks maîtrisés</p>
                  </div>
                </div>
              </div>
              <div className="glass-card bg-cyan-900/10">
                <h3 className="text-xl font-bold mb-4">Ma vision</h3>
                <p className="text-slate-400 italic">
                  "Le développement n'est pas seulement l'écriture de lignes de code, c'est la résolution de problèmes réels par l'innovation technique. Je m'engage à propulser chaque projet vers l'excellence esthétique et fonctionnelle."
                </p>
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {activeTab === "projets" && (
          <section className="section-container animate-up">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="bg-cyan-500 w-12 h-1 rounded-full"></span> Réalisations Clés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  titre: "Taka-Taka (Super-App)",
                  techs: ["React Native", "NodeJs", "Real-time"],
                  desc: "Conception et développement d'une Super-App modulaire (B2B, Covoiturage, Livraison, Éducation) avec haute disponibilité et atomicité financière.",
                  image: taka1,
                  details: "Taka-Taka est une solution de mobilité révolutionnaire en Guinée. Elle connecte passagers et chauffeurs en temps réel pour des trajets rapides, sécurisés et abordables. L'application intègre également des modules de livraison et de gestion d'entreprise (B2B/B2C).",
                  stats: ["10K+ Utilisateurs", "5K+ Chauffeurs", "4.8/5 Note"],
                  screenshots: [taka1, taka2, taka3, taka4, taka5]
                },
                {
                  titre: "GuiTech",
                  techs: ["Spring Boot", "React", "POS", "Scanner"],
                  desc: "Solution complète de gestion commerciale avec scan de produits pour l'optimisation des ventes.",
                  image: b1,
                  details: "Logiciel de Point de Vente (POS) performant permettant la gestion intégrale d'une boutique : stocks, inventaires, ventes via scan code-barres et reporting financier automatisé.",
                  stats: ["Scan QR/BC", "Multi-Boutique", "États financiers"],
                  screenshots: [b1, b2, b3, b5, b6]
                },
                {
                  titre: "Gestion Département",
                  techs: ["Spring Boot", "MySQL"],
                  desc: "Système académique complet intégrant emplois du temps et gestion du personnel.",
                  details: "Une plateforme robuste pour la gestion des établissements d'enseignement. Inclut la gestion des emplois du temps dynamiques, le suivi des matières et la gestion RH du personnel enseignant."
                },
                {
                  titre: "Gestion Assurance",
                  techs: ["Laravel", "Bootstrap"],
                  desc: "Espace métier pour l'entreprise Touré et P17 gérant clients, contrats et sinistres.",
                  details: "Développement d'un ERP métier dédié aux assurances, permettant le suivi complet des dossiers clients (contrats, sinistres, paiements) pour 'Touré et P17'."
                },
                {
                  titre: "Smart Farming (IoT)",
                  techs: ["Node.js", "MongoDB", "IoT"],
                  desc: "Solution intelligente de suivi de cultures avec alertes météo en temps réel.",
                  details: "Utilisation de capteurs IoT pour le monitoring agricole. Le système analyse l'humidité, la température et propose des alertes automatisées basées sur les prévisions météo."
                },
                {
                  titre: "Gestion Comptable",
                  techs: ["Spring Boot", "Oracle"],
                  desc: "Logiciel financier automatisé pour PME simplifiant l'édition d'états comptables.",
                  details: "Automatisation des bilans comptables et des comptes de résultat. Intégration directe avec les bases de données Oracle pour une sécurité de données maximale."
                },
                {
                  titre: "Projet Collaboratif",
                  techs: ["React", "Spring Boot", "MySQL"],
                  desc: "Application de type Trello pour la planification et l'attribution de tâches.",
                  details: "Outil de gestion de workflow interactif permettant le drag & drop des tâches, l'attribution à des membres de l'équipe et le suivi des deadlines via des notifications."
                },
                {
                  titre: "Gestion des Déchets",
                  techs: ["Laravel", "React", "MongoDB"],
                  desc: "Cloud platform pour le signalement et le suivi urbain de la collecte des déchets.",
                  details: "Plateforme citoyenne permettant de signaler les zones à traiter via géolocalisation et permettant aux services municipaux d'optimiser les tournées de collecte."
                },
              ].map((projet, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelectedProject(projet); setImageIndex(0); }}
                  className="glass-card group hover:-translate-y-2 overflow-hidden p-0 flex flex-col h-full cursor-pointer"
                >
                  {projet.image && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                      <img src={projet.image} alt={projet.titre} className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-2 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="h-1 w-12 bg-cyan-500 rounded-full mb-6 group-hover:w-full transition-all duration-500"></div>
                    <h3 className="text-xl font-bold mb-3">{projet.titre}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                      {projet.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {projet.techs.map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-cyan-300 uppercase tracking-widest font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button onClick={() => setActiveTab("contact")} className="btn-outline inline-flex mx-auto">Voir plus de projets</button>
            </div>
          </section>
        )}

        {/* SKILLS SECTION */}
        {activeTab === "competences" && (
          <section className="section-container animate-up">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="bg-cyan-500 w-12 h-1 rounded-full"></span> Expertise Technique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  <Icons.Code />
                </div>
                <h3 className="font-bold text-lg mb-4">Frontend</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>React.js & Next.js</li>
                  <li>Angular & Vue</li>
                  <li>Tailwind CSS & SCSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>
              <div className="glass-card">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  <Icons.Database />
                </div>
                <h3 className="font-bold text-lg mb-4">Backend</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Java (Spring Boot)</li>
                  <li>PHP (Laravel)</li>
                  <li>Node.js (Express)</li>
                  <li>Python (Django)</li>
                </ul>
              </div>
              <div className="glass-card">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  <Icons.Check />
                </div>
                <h3 className="font-bold text-lg mb-4">Database</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>PostgreSQL & MySQL</li>
                  <li>MongoDB (NoSQL)</li>
                  <li>Oracle DB</li>
                  <li>Redis & Caching</li>
                </ul>
              </div>
              <div className="glass-card">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  <Icons.Figma />
                </div>
                <h3 className="font-bold text-lg mb-4">Design & Modélisation</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Figma / Adobe XD</li>
                  <li>Modélisation UML / CSI</li>
                  <li>Git & CI/CD</li>
                  <li>Docker Basics</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {activeTab === "contact" && (
          <section className="section-container animate-up">
            <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/3 bg-cyan-600/10 border-r border-white/5">
                <h2 className="text-3xl font-bold mb-6">Parlons de votre projet</h2>
                <p className="text-slate-400 mb-8">Disponible pour des opportunités en freelance ou en CDI.</p>
                <div className="space-y-4">
                  <a href="mailto:codegenius76@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                    <span className="text-cyan-400 group-hover:scale-110 transition-transform"><Icons.Send /></span>
                    <span>codegenius76@gmail.com</span>
                  </a>
                  <a href="tel:+224620000000" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                    <span className="text-cyan-400 group-hover:scale-110 transition-transform"><Icons.Phone /></span>
                    <span>Appelez-moi direct</span>
                  </a>
                  <a href="https://wa.me/224620000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                    <span className="text-cyan-400 group-hover:scale-110 transition-transform"><Icons.WhatsApp /></span>
                    <span>Discutons sur WhatsApp</span>
                  </a>
                </div>
              </div>
              <div className="p-8 md:p-12 md:flex-1">
                {formStatus === "sent" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-up">
                    <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center scale-110">
                      <Icons.Check />
                    </div>
                    <h3 className="text-2xl font-bold">Message Envoyé !</h3>
                    <p className="text-slate-400">Merci, je vous répondrai dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nom complet</label>
                        <input required type="text" placeholder="Ibrahima Soumah" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email professionnel</label>
                        <input required type="email" placeholder="email@exemple.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                      <textarea required rows="5" placeholder="Décrivez votre besoin..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      Lancer la discussion <Icons.Send />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-white mb-1">Soumah<span className="text-cyan-400">.</span>dev</h2>
            <p className="text-sm text-slate-500">© 2025 - Créé avec passion par Ibrahima Sory Soumah</p>
          </div>
          <p className="text-slate-600 text-xs italic">
            Développé avec React, Tailwind CSS & Vite
          </p>
          <div className="flex gap-4">
            <button onClick={() => window.scrollTo(0, 0)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 transition">↑</button>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedProject(null)}></div>

          <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-800/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-up">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-slate-900/50 border border-white/10 rounded-full text-white hover:bg-white/10 transition"
            >
              <Icons.Close />
            </button>

            {/* Left: Image/Gallery */}
            <div className="md:w-1/2 bg-[#0a0f1d] border-r border-white/5 relative flex items-center justify-start overflow-x-auto custom-scrollbar group/gallery h-[50vh] md:h-auto">
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                <>
                  <img
                    key={imageIndex}
                    src={selectedProject.screenshots[imageIndex]}
                    alt={`${selectedProject.titre} - View ${imageIndex + 1}`}
                    className="relative z-10 h-full w-auto max-w-none animate-fade-in shadow-2xl"
                  />

                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.screenshots.length - 1)); }}
                        className="fixed left-8 top-1/2 -translate-y-1/2 z-[110] p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition shadow-2xl border border-white/10 opacity-0 group-hover/gallery:opacity-100"
                      >
                        <Icons.Left />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setImageIndex((prev) => (prev < selectedProject.screenshots.length - 1 ? prev + 1 : 0)); }}
                        className="fixed right-[52%] top-1/2 -translate-y-1/2 z-[110] p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition shadow-2xl border border-white/10 opacity-0 group-hover/gallery:opacity-100"
                      >
                        <Icons.Right />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-[#0f172a]/60 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
                        {selectedProject.screenshots.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imageIndex ? "bg-cyan-400 w-6" : "bg-white/40"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-900/50 p-12">
                  <Icons.Code />
                  <p className="mt-4 text-sm font-medium">Pas de visuel disponible</p>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full">Projet Réalisé</span>
                <h2 className="text-3xl font-bold mt-4">{selectedProject.titre}</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProject.techs.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 font-bold">{t}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">À propos du projet</h4>
                  <p className="text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/30 pl-4">
                    {selectedProject.desc}
                  </p>
                </div>

                {selectedProject.details && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Détails Techniques</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>
                )}

                {selectedProject.stats && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {selectedProject.stats.map((s, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="text-sm font-bold text-white block">{s.split(' ')[0]}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">{s.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-8 flex gap-4">
                  <button className="btn-primary flex-1">
                    Voir la démo <Icons.External />
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="btn-outline flex-1"
                  >
                    Demander conseil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}