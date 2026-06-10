import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";

// Code splitting — Blog et ArticleDetail chargés uniquement quand nécessaire
const Blog = lazy(() => import("./components/Blog"));
const ArticleDetail = lazy(() => import("./components/ArticleDetail"));

// Spinner de chargement pour le Suspense fallback
function LoadingFallback() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Chargement...</p>
      </div>
    </div>
  );
}

function MainPortfolio({ activeSection }) {
  return (
    <>
      <SEO />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Skills />
        <Suspense fallback={<LoadingFallback />}>
          <Blog />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState("accueil");
  const [splashDone, setSplashDone] = useState(false);
  const location = useLocation();

  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  // IntersectionObserver to track active section for nav highlighting
  useEffect(() => {
    if (!splashDone || location.pathname !== "/") return;
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [splashDone, location.pathname]);

  // Scroll-triggered reveal animations
  useEffect(() => {
    if (!splashDone) return;
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [splashDone, location.pathname]);

  // Hash navigation from Article back to Main
  useEffect(() => {
    if (splashDone && location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location, splashDone]);

  return (
    <>
      <ScrollToTop />

      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <CursorGlow />

      <div className={`min-h-screen ${splashDone ? "animate-fade-in" : "opacity-0"}`}>
        <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/8 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/8 blur-[100px] rounded-full" />
          <div className="absolute top-[40%] left-[50%] w-[25%] h-[25%] bg-blue-600/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <Routes>
          <Route path="/" element={<MainPortfolio activeSection={activeSection} />} />
          <Route path="/blog/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <ArticleDetail />
            </Suspense>
          } />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}