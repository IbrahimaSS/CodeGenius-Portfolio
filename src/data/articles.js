export const articles = [
  {
    id: 1,
    titre: "Comment j'ai optimisé les performances de mon application React",
    slug: "optimiser-performances-react",
    categorie: "Tutoriel",
    date: "10 Juin 2026",
    tempsLecture: "5 min",
    extrait: "Découvrez les techniques avancées pour réduire le temps de chargement et améliorer la fluidité de vos applications React, avec des exemples concrets.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    contenu: `
# Optimiser les performances de React

L'optimisation des performances est une étape cruciale dans le cycle de développement d'une application React. Dans cet article, nous allons explorer plusieurs techniques que j'utilise régulièrement.

## 1. Utilisation de React.memo()

L'un des moyens les plus simples d'éviter des rendus inutiles est d'utiliser \`React.memo\`. Cela permet de mémoriser le rendu d'un composant et de ne le re-rendre que si ses props ont changé.

\`\`\`jsx
const MonComposant = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\`

## 2. Le hook useMemo et useCallback

Pour éviter de recalculer des valeurs coûteuses à chaque rendu, \`useMemo\` est votre meilleur ami. De même, \`useCallback\` empêche la recréation de fonctions, ce qui est particulièrement utile lorsqu'on les passe en props à des composants enfants mémorisés.

## 3. Code Splitting avec React.lazy

Ne chargez que le code dont l'utilisateur a besoin à l'instant T.

\`\`\`jsx
const ComposantLourd = React.lazy(() => import('./ComposantLourd'));
\`\`\`

En appliquant ces simples principes, j'ai pu réduire le temps de chargement interactif (TTI) de 40% sur mon dernier projet !
`
  },
  {
    id: 2,
    titre: "Architecture Microservices avec Spring Boot et Docker",
    slug: "architecture-microservices-spring-boot",
    categorie: "Architecture",
    date: "05 Mai 2026",
    tempsLecture: "8 min",
    extrait: "Plongée au cœur des microservices : comment concevoir, développer et déployer une architecture robuste avec Spring Boot et Docker.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop",
    contenu: `
# Architecture Microservices : Spring Boot et Docker

Le passage d'une architecture monolithique à des microservices peut sembler intimidant, mais avec les bons outils, cela devient un jeu d'enfant.

## Pourquoi Spring Boot ?

Spring Boot simplifie considérablement la création d'applications basées sur Spring. Son approche orientée convention plutôt que configuration permet de démarrer rapidement.

## L'importance de la conteneurisation

Avec Docker, chaque microservice est encapsulé dans son propre conteneur, garantissant qu'il fonctionne de la même manière en développement, en test et en production.

### Exemple de Dockerfile basique :

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/mon-service.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
\`\`\`

L'orchestration de ces conteneurs (via Docker Compose en local ou Kubernetes en production) permet ensuite de gérer le cycle de vie et la scalabilité de chaque service de manière indépendante.
`
  },
  {
    id: 3,
    titre: "Passage de Vue.js à React : Mon retour d'expérience",
    slug: "passage-vuejs-react-retour-experience",
    categorie: "Retour d'expérience",
    date: "22 Avril 2026",
    tempsLecture: "6 min",
    extrait: "Après des années sur Vue.js, j'ai dû plonger dans l'écosystème React. Voici ce qui m'a surpris, ce que j'ai aimé et mes conseils d'adaptation.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    contenu: `
# De Vue.js à React : Mon parcours

Changer de framework frontend n'est jamais simple. Après plusieurs projets majeurs réalisés sous Vue.js, l'opportunité de travailler intensivement avec React s'est présentée.

## Les différences philosophiques

Vue.js propose une séparation claire (HTML, CSS, JS) dans ses fichiers \`.vue\`. React, de son côté, embrasse complètement le JSX, où le JavaScript dicte la structure de l'interface. Cette approche *"Tout est JavaScript"* m'a d'abord dérouté, puis séduit par sa puissance.

## La gestion de l'état

Passer de Vuex/Pinia aux Hooks (comme \`useState\`, \`useReducer\`) et au Context API a demandé un changement de paradigme. La notion de composant pur et la gestion stricte de l'immuabilité en React sont plus rigoureuses.

## Bilan

Aujourd'hui, j'apprécie les deux frameworks pour leurs forces respectives. React offre un écosystème gigantesque et une liberté architecturale, tandis que Vue brille par sa simplicité et sa réactivité fine (surtout avec la Composition API).
`
  },
  {
    id: 4,
    titre: "Tailwind CSS en 2026 : Toujours pertinent ?",
    slug: "tailwind-css-2026-pertinent",
    categorie: "Actualité",
    date: "02 Mars 2026",
    tempsLecture: "4 min",
    extrait: "Analyse de l'évolution de Tailwind CSS face aux nouvelles spécifications CSS natives. Faut-il continuer à l'utiliser ?",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop",
    contenu: `
# Tailwind CSS face au CSS moderne

Avec l'arrivée de CSS Nesting, de \`:has()\`, et des Container Queries de manière native dans tous les navigateurs, beaucoup se demandent si des frameworks utilitaires comme Tailwind ont encore un sens.

## La promesse de Tailwind

Tailwind ne s'est jamais résumé à un simple remplaçant de CSS. C'est un **système de design**. Il impose des contraintes bénéfiques (espacements, couleurs, typographies cohérents) qui accélèrent le développement en équipe.

## Conclusion

Oui, le CSS natif rattrape son retard sur des fonctionnalités complexes. Mais pour la productivité pure, la standardisation et l'expérience développeur au sein de composants React ou Vue, Tailwind reste incontournable en 2026.
`
  }
];
