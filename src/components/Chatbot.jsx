import { useState, useRef, useEffect } from "react";
import { Icons } from "./Icons";

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
    <path d="M12 8V4H8"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis l'assistant virtuel d'Ibrahima. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
         setMessages(prev => [...prev, { role: "assistant", content: "Erreur : La clé API n'est pas configurée dans .env (VITE_GROQ_API_KEY)" }]);
         setIsLoading(false);
         return;
      }

      const systemMessage = {
        role: "system",
        content: "Tu es l'assistant virtuel d'Ibrahima Sory Soumah, développeur Full-Stack basé en Guinée. Tu réponds uniquement aux questions sur son profil, ses compétences, ses projets, sa disponibilité (immédiate), ses tarifs (à discuter), et son contact (codegenius76@gmail.com). Voici son niveau de maîtrise précis par technologie : Frontend (React 95%, Tailwind 90%, Angular 80%, Next.js 75%, Vue.js 60%), Backend (Node.js 95%, Spring Boot 90%, Laravel 88%, Django 68%), Base de données (MySQL 95%, MongoDB 90%, PostgreSQL 86%, Redis 55%), Outils (Git 93%, Figma 90%, Docker 75%, Adobe XD 70%). Réponds en français, de façon très courte, chaleureuse et professionnelle."
      };

      // On ignore le tout premier message "Bonjour !" pour éviter l'erreur de séquence de Groq
      const historyToSend = messages.filter((m, i) => !(i === 0 && m.role === "assistant"));

      const formattedMessages = historyToSend.map(m => ({
        role: m.role,
        content: m.content
      })).concat([{ role: "user", content: userMessage }]);

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [systemMessage, ...formattedMessages],
          temperature: 0.5,
          max_tokens: 300,
        })
      });

      if (!response.ok) {
         const errText = await response.text();
         console.error("API Error Response:", errText);
         throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Erreur de connexion. Vérifiez la console (F12) pour plus de détails." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Fenêtre de Chat */}
      <div 
        className={`absolute bottom-16 right-0 w-[350px] h-[450px] bg-[#0d1117] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RobotIcon />
            </div>
            <div>
              <h3 className="font-bold text-sm">Assistant d'Ibrahima</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-cyan-50">En ligne</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* Zone de Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === "user" 
                    ? "bg-cyan-600 text-white rounded-br-none" 
                    : "bg-slate-800 text-slate-200 border border-white/5 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-white/5 p-4 rounded-2xl rounded-bl-none">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#0d1117] border-t border-white/5">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 bg-slate-800/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shrink-0 shadow-lg shadow-cyan-900/20"
            >
              <Icons.Send />
            </button>
          </form>
        </div>
      </div>

      {/* Bulle Flottante Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 ${
          isOpen ? "bg-slate-700 rotate-90" : "bg-gradient-to-tr from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 animate-bounce"
        }`}
        style={{ animationDuration: "2.5s" }}
      >
        {isOpen ? <XIcon /> : <RobotIcon />}
      </button>
    </div>
  );
}
