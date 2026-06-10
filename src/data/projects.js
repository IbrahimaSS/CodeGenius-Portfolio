import taka1 from "../assets/TakaTaka1.png";
import taka2 from "../assets/TakaTaka2.png";
import taka3 from "../assets/TakaTaka3.png";
import taka4 from "../assets/TakaTaka4.png";
import taka5 from "../assets/TakaTaka5.png";
import b1 from "../assets/Boutique1.png";
import b2 from "../assets/Boutique2.png";
import b3 from "../assets/Boutique3.png";
import b5 from "../assets/Boutique5.png";
import b6 from "../assets/Boutique6.png";

export const projects = [
  {
    titre: "Taka-Taka (Super-App)",
    techs: ["React Native", "NodeJs", "Real-time"],
    desc: "Conception et développement d'une Super-App modulaire (B2B, Covoiturage, Livraison, Éducation) avec haute disponibilité et atomicité financière.",
    image: taka1,
    details: "Taka-Taka est une solution de mobilité révolutionnaire en Guinée. Elle connecte passagers et chauffeurs en temps réel pour des trajets rapides, sécurisés et abordables. L'application intègre également des modules de livraison et de gestion d'entreprise (B2B/B2C).",
    stats: ["10K+ Utilisateurs", "5K+ Chauffeurs", "4.8/5 Note"],
    screenshots: [taka1, taka2, taka3, taka4, taka5],
  },
  {
    titre: "GuiTech",
    techs: ["Spring Boot", "React", "POS", "Scanner"],
    desc: "Solution complète de gestion commerciale avec scan de produits pour l'optimisation des ventes.",
    image: b1,
    details: "Logiciel de Point de Vente (POS) performant permettant la gestion intégrale d'une boutique : stocks, inventaires, ventes via scan code-barres et reporting financier automatisé.",
    stats: ["Scan QR/BC", "Multi-Boutique", "États financiers"],
    screenshots: [b1, b2, b3, b5, b6],
  },
  {
    titre: "Gestion Département",
    techs: ["Spring Boot", "MySQL"],
    desc: "Système académique complet intégrant emplois du temps et gestion du personnel.",
    details: "Une plateforme robuste pour la gestion des établissements d'enseignement. Inclut la gestion des emplois du temps dynamiques, le suivi des matières et la gestion RH du personnel enseignant.",
  },
  {
    titre: "Gestion Assurance",
    techs: ["Laravel", "Bootstrap"],
    desc: "Espace métier pour l'entreprise Touré et P17 gérant clients, contrats et sinistres.",
    details: "Développement d'un ERP métier dédié aux assurances, permettant le suivi complet des dossiers clients (contrats, sinistres, paiements) pour 'Touré et P17'.",
  },
  {
    titre: "Smart Farming (IoT)",
    techs: ["Node.js", "MongoDB", "IoT"],
    desc: "Solution intelligente de suivi de cultures avec alertes météo en temps réel.",
    details: "Utilisation de capteurs IoT pour le monitoring agricole. Le système analyse l'humidité, la température et propose des alertes automatisées basées sur les prévisions météo.",
  },
  {
    titre: "Gestion Comptable",
    techs: ["Spring Boot", "Oracle"],
    desc: "Logiciel financier automatisé pour PME simplifiant l'édition d'états comptables.",
    details: "Automatisation des bilans comptables et des comptes de résultat. Intégration directe avec les bases de données Oracle pour une sécurité de données maximale.",
  },
  {
    titre: "Projet Collaboratif",
    techs: ["React", "Spring Boot", "MySQL"],
    desc: "Application de type Trello pour la planification et l'attribution de tâches.",
    details: "Outil de gestion de workflow interactif permettant le drag & drop des tâches, l'attribution à des membres de l'équipe et le suivi des deadlines via des notifications.",
  },
  {
    titre: "Gestion des Déchets",
    techs: ["Laravel", "React", "MongoDB"],
    desc: "Cloud platform pour le signalement et le suivi urbain de la collecte des déchets.",
    details: "Plateforme citoyenne permettant de signaler les zones à traiter via géolocalisation et permettant aux services municipaux d'optimiser les tournées de collecte.",
  },
];
