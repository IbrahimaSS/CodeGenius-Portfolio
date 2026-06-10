export default function TechMarquee() {
  const techs = [
    "React", "Next.js", "Angular", "Vue.js", "React Native",
    "Spring Boot", "Laravel", "Node.js", "Django", "Express",
    "PostgreSQL", "MongoDB", "MySQL", "Oracle", "Redis",
    "Docker", "Git", "Figma", "Tailwind CSS", "TypeScript",
  ];

  // Double the list for seamless looping
  const doubled = [...techs, ...techs];

  return (
    <div className="w-full py-12 overflow-hidden border-y border-white/5 bg-white/[0.01]">
      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((tech, i) => (
            <span key={i} className="marquee-item">
              <span className="text-cyan-500/60 mr-3">◆</span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
