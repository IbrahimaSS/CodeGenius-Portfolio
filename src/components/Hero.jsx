import { useState, useEffect } from "react";
import moiImg from "../assets/CodeGenius.jpg";
import { Icons } from "./Icons";

function useTypewriter(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.substring(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        } else {
          setCharIndex(charIndex + 1);
        }
      } else {
        setDisplay(current.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
          setCharIndex(0);
        } else {
          setCharIndex(charIndex - 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return display;
}

export default function Hero() {
  const typedText = useTypewriter(
    ["Full-Stack Developer", "Mobile Developer", "Software Architect", "Problem Solver"],
    90,
    2200
  );

  return (
    <section
      id="accueil"
      className="section-container min-h-[90vh] flex flex-col items-center justify-center text-center relative"
    >
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-400/30 rounded-full animate-float" />
      <div className="absolute top-40 right-16 w-2 h-2 bg-purple-400/30 rounded-full animate-float-slow" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-float-delayed" />

      <div className="reveal">
        {/* Avatar */}
        <div className="relative mb-8 group mx-auto w-fit">
          <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
          <img
            src={moiImg}
            alt="Ibrahima Sory Soumah"
            loading="eager"
            className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border-4 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
          />
          {/* Status badge */}
          <div className="absolute -bottom-2 -right-2 z-20 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-[#0f172a] flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Disponible
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
          Ibrahima Sory <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Soumah
          </span>
        </h2>

        {/* Typewriter */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <span className="text-lg md:text-xl font-mono text-cyan-400">
            {">"} {typedText}
          </span>
          <span className="w-[2px] h-6 bg-cyan-400 ml-1 animate-blink" />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
          Passionné par l'architecture logicielle et le code de qualité, je
          transforme des idées complexes en expériences utilisateurs{" "}
          <span className="text-white font-medium">
            fluides, intuitives et scalables
          </span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <a href="/cv.pdf" download className="btn-primary w-full sm:w-auto group">
            <Icons.Download /> Télécharger mon CV
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
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

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
