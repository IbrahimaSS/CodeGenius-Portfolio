import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";

function SkillItem({ skill, inView, delay }) {
  return (
    <div className="mb-4 group/skill">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2.5">
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-5 h-5 group-hover/skill:scale-110 transition-transform duration-300" 
            loading="lazy"
          />
          <span className="text-slate-300 text-sm font-medium group-hover/skill:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-cyan-400 text-xs font-bold opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        >
          {/* Animated shine effect on the progress bar */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[shine_2s_infinite] -translate-x-full skew-x-[-20deg]" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      icon: <Icons.Code />,
      title: "Frontend",
      skills: [
        { name: "React.js", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Next.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "Angular", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
        { name: "Vue.js", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
        { name: "Tailwind CSS", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      ],
    },
    {
      icon: <Icons.Database />,
      title: "Backend",
      skills: [
        { name: "Spring Boot", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
        { name: "Laravel", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
        { name: "Node.js", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Python (Django)", level: 68, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
      ],
    },
    {
      icon: <Icons.Check />,
      title: "Database",
      skills: [
        { name: "PostgreSQL", level: 86, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "MongoDB", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Redis", level: 55, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      ],
    },
    {
      icon: <Icons.Figma />,
      title: "Design & Modélisation",
      skills: [
        { name: "Figma", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "Adobe XD", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg" },
        { name: "Git", level: 93, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "Docker", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      ],
    },
  ];

  return (
    <section id="competences" className="section-container" ref={ref}>
      <div className="reveal">
        <h2 className="section-title">
          <span className="section-accent" /> Expertise Technique
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(6,182,212,0.15)] hover:border-cyan-400/50"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg mb-6 group-hover:text-cyan-100 transition-colors">
                  {cat.title}
                </h3>
                <div className="space-y-4">
                  {cat.skills.map((skill, i) => (
                    <SkillItem
                      key={i}
                      skill={skill}
                      inView={inView}
                      delay={idx * 100 + i * 150} // Staggered animation delay
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
