import { useState } from "react";
import moiImg from "./assets/CodeGenius.jpg";
import angular from "./assets/Angular.png";

export default function App() {
  const [activeTab, setActiveTab] = useState("accueil");

  const Button = ({ children, onClick, type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-gray-900 transition"
    >
      {children}
    </button>
  );

  const Card = ({ children }) => (
    <div className="bg-gray-800 rounded shadow p-4">{children}</div>
  );

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-cyan-400">Ibrahima Sory Soumah</h1>
        <nav className="space-x-4">
          <button onClick={() => setActiveTab("accueil")} className="hover:text-cyan-400 transition">Accueil</button>
          <button onClick={() => setActiveTab("apropos")} className="hover:text-cyan-400 transition">À propos</button>
          <button onClick={() => setActiveTab("projets")} className="hover:text-cyan-400 transition">Projets</button>
          <button onClick={() => setActiveTab("competences")} className="hover:text-cyan-400 transition">Compétences</button>
          <button onClick={() => setActiveTab("contact")} className="hover:text-cyan-400 transition">Contact</button>
        </nav>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-8 flex-grow">
        {activeTab === "accueil" && (
          <section className="text-center">
            <img src={moiImg} alt="Soumah Ibrahima Sory" className="mx-auto rounded-full w-40 h-40 object-cover mb-4" />
            <h2 className="text-4xl font-bold mb-2 text-white">Développeur Full-Stack & Mobile</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Passionné par la technologie, je conçois des applications mobiles, robustes, élégantes et adaptées aux bésoins métiers.
            </p>
            <div className="mt-4 space-x-4">
              <a href="cv.pdf" download className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded inline-block mt-4">Télécharger mon CV</a>
              <a href="https://www.linkedin.com/in/ibrahima-sory-soumah-050986340" className="text-cyan-400 underline" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </section>
        )}

        {activeTab === "apropos" && (
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">À propos</h2>
            <p className="text-gray-300 mb-4">
              Développeur Full-Stack et Mobile Passionné, je transforme des idées en applications puissantes, élégantes et efficaces.
              Grâce à une expertise solide en modélisation (UML, CSI), des bases de données rélationnelles et NoSQL, ansi qu'en frameworks modernes comme React.js, Spring Boot, Angular, Laravel, Node.js, Je conçoois des solutions sur-mesure qui boostent la performance et l'expérience utilisateur.
              <br />
              Toujours curieux et innovant, je me tiens à la pointe des dernières technologies pour relever les défis complexes et propulser chaquee projet vers l'excellence et la réussite.
            </p>
          </section>
        )}

        {activeTab === "projets" && (
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { titre: "Gestion Département", techs: "Spring Boot, MySQL", desc: "Une application de gestion du Départements régroupant les fonctionnalitées suivantes, emplois du temps, matières, personnel..."},
                { titre: "Gestion Assurance", techs: "Laravel, PHP, Bootstrap", desc: "Plateforme de gestion des clients, contrats et sinistres pour l'entreprise Touré et P17"},
                { titre: "Smart Farming", techs: "Node.js, MongoDB, React" , desc: "Solution Intelligente pour le suivi des cultures, alertes météo, capteurs connectés (IoT)"},
                { titre: "Gestion Comptable", techs: "Spring Boot, Oracle, Bootstrap" , desc: "Logiciel de Comptabilité simplifié pour PME avec des états financiers automatisés"},
                { titre: "Gestion de Projets", techs: "Html, Css, JS, Spring Boot, Mysql", desc: "Application collaborative pour planifier, suivre et attribuer des tâches en équipe"},
                { titre: "Bibliothèque", techs: "Java, MySQL", desc: "Systeme de gestion de prêt, rétour, réservation et archivage de livres"},
                { titre: "Gestion des Déchets", techs: "Laravel, React, MongoDB", desc: "Plateforme de signalement, collecte et suivi de traitement des déchets urbaine"},
                { titre: "Application de Quiz", techs: "JavaScript, Node.js", desc: "Jeu interactif de questions-réponses pour évaluer les connaissances avec scoring"},
                { titre: "Chronomètre", techs: "HTML, CSS, JS", desc: "Outil simple de mesure du temps avec démarrage, pause et remise à zéro"},
              ].map((projet, idx) => (
                <Card key={idx}>
                  <h3 className="text-lg font-semibold text-white">{projet.titre}</h3>
                  <p className="text-gray-400">Description : {projet.desc}</p>
                  <p className="text-gray-400">Technologies : {projet.techs}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeTab === "competences" && (
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Compétences</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white">Modélisation</h3>
                <p>CSI, UML <br />
                Analyse des bésoins, conception orientée objet</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Design & UI/UX</h3>
                <p>Photoshop, Canva, Figma <br />
                Maquettage, design d'interfaces intuitive</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Développement Frontend</h3>
                <p>HTML, CSS, JS, Bootstrap, React.js, Angular, Talwind CSS</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Développement Backend</h3>
                <p>Java, PHP, Python, C, C++, Php, JS, API REST, architecture MVC</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Frameworks & Technologies</h3>
                <p>Spring Boot, Laravel, Node.js, Django
                  <br />Express.js Vite, npm
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Bases de données</h3>
                <p>SQL, MySQL, Oracle, MongoDB, POSTGRESQL</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Outils & Environnements</h3>
                <p>Access, WinDev, VB.NET <br />Git, VS Code, Insomnia, Jira</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Contact</h2>
            <form className="space-y-4 max-w-md" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Nom" className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
              <input type="email" placeholder="Email" className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
              <textarea placeholder="Message" rows="4" className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"></textarea>
              <Button type="submit">Envoyer</Button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 border-t border-gray-700">
        &copy; 2025 Ibrahima Sory Soumah - Développeur Full-Stack & Mobile
      </footer>
    </div>
  );
}