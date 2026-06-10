import { useState, useEffect } from "react";
import { Icons } from "./Icons";

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Contact() {
  const [formStatus, setFormStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    if (isCalendlyOpen) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isCalendlyOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 4000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className="section-container relative">
      <div className="reveal">
        <h2 className="section-title">
          <span className="section-accent" /> Contact
        </h2>

        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Left: Info */}
          <div className="p-8 md:p-12 md:w-1/3 bg-gradient-to-b from-cyan-600/10 to-purple-600/5 border-r border-white/5">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Parlons de votre projet
            </h3>
            <p className="text-slate-400 mb-8">
              Disponible pour des opportunités en freelance ou en CDI.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:codegenius76@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icons.Send />
                </span>
                <span className="text-sm break-all">codegenius76@gmail.com</span>
              </a>
              <a
                href="tel:+224620000000"
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icons.Phone />
                </span>
                <span className="text-sm">Appelez-moi direct</span>
              </a>
              <a
                href="https://wa.me/224620000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icons.WhatsApp />
                </span>
                <span className="text-sm">Discutons sur WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-12 md:flex-1">
            {formStatus === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-up min-h-[300px]">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                  <Icons.Check />
                </div>
                <h3 className="text-2xl font-bold">Message Envoyé !</h3>
                <p className="text-slate-400">
                  Merci, je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            ) : formStatus === "error" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-up min-h-[300px]">
                <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-2xl">
                  ✕
                </div>
                <h3 className="text-2xl font-bold">Erreur d'envoi</h3>
                <p className="text-slate-400">
                  Veuillez réessayer ou me contacter directement par email.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Nom complet
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ibrahima Soumah"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email professionnel
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@exemple.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre besoin..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      <>
                        Lancer la discussion <Icons.Send />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCalendlyOpen(true)}
                    className="flex-1 px-6 py-2.5 bg-[#8b5cf6] hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-violet-900/40 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <CalendarIcon />
                    Réserver un appel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ===== CALENDLY MODAL ===== */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div 
            className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-xl animate-fade-in" 
            onClick={() => setIsCalendlyOpen(false)} 
          />
          <div className="relative w-full max-w-4xl bg-[#1e293b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-up">
            <button 
              onClick={() => setIsCalendlyOpen(false)} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-slate-900/50 border border-white/10 rounded-full text-white hover:bg-white/10 transition"
            >
              <CloseIcon />
            </button>
            <div className="w-full bg-[#1e293b] pt-8">
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/codegenius76" 
                style={{ minWidth: "320px", height: "600px" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
