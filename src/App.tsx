import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HomePage, LessonsPage, TasksPage } from "@/components/pages/LearningPages";
import { ListeningPage, VocabPage, ProgressPage, DictionaryPage } from "@/components/pages/MediaPages";

// ===================== STAR FIELD =====================

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full star-twinkle"
          style={{
            width: i % 5 === 0 ? "3px" : "2px",
            height: i % 5 === 0 ? "3px" : "2px",
            background: i % 4 === 0 ? "#FCD34D" : "white",
            top: `${(i * 37 + 13) % 100}%`,
            left: `${(i * 53 + 7) % 100}%`,
            opacity: 0.4 + (i % 6) * 0.1,
            animationDelay: `${(i % 4) * 0.7}s`,
            animationDuration: `${1.5 + (i % 3) * 0.7}s`,
          }}
        />
      ))}
      <div className="planet float-1" style={{ width: 180, height: 180, background: "radial-gradient(circle at 35% 35%, #F97316, #92400E)", top: "-60px", left: "-60px", opacity: 0.7 }} />
      <div className="planet float-2" style={{ width: 120, height: 120, background: "radial-gradient(circle at 40% 30%, #4ADE80, #166534)", top: "8%", right: "5%", opacity: 0.8 }} />
      <div className="planet float-3" style={{ width: 90, height: 90, background: "radial-gradient(circle at 35% 30%, #F472B6, #9D174D)", bottom: "15%", right: "2%", opacity: 0.7 }} />
      <div className="planet float-1" style={{ width: 100, height: 100, background: "radial-gradient(circle at 40% 30%, #60A5FA, #1E3A8A)", bottom: "10%", left: "3%", opacity: 0.6, animationDelay: "2s" }} />
      <div className="float-2" style={{ position: "absolute", top: "25%", right: "8%", width: 70, height: 70, opacity: 0.7 }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #A78BFA, #5B21B6)" }} />
        <div style={{ position: "absolute", top: "38%", left: "-20%", width: "140%", height: "24%", borderRadius: "50%", border: "3px solid rgba(167,139,250,0.6)", background: "transparent" }} />
      </div>
      {["10% 30%", "85% 50%", "50% 15%", "65% 75%", "30% 80%"].map((pos, i) => (
        <div key={i} className="absolute star-twinkle text-yellow-400" style={{ top: pos.split(" ")[0], left: pos.split(" ")[1], fontSize: "1.2rem", animationDelay: `${i * 0.6}s` }}>✦</div>
      ))}
    </div>
  );
}

// ===================== NAV BAR =====================

function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const tabs = [
    { id: "home", label: "Главная", emoji: "🏠" },
    { id: "lessons", label: "Уроки", emoji: "📖" },
    { id: "tasks", label: "Задания", emoji: "✏️" },
    { id: "listening", label: "Аудирование", emoji: "🎧" },
    { id: "vocab", label: "Лексика", emoji: "💬" },
    { id: "progress", label: "Прогресс", emoji: "📊" },
    { id: "dictionary", label: "Словарь", emoji: "📚" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 pb-2 px-4">
      <div className="glass-card-bright flex items-center gap-1 px-3 py-2 max-w-5xl w-full overflow-x-auto">
        <div className="flex items-center gap-1 mr-3 shrink-0">
          <span className="text-xl">🚀</span>
          <span className="section-title text-xs text-yellow-300 hidden sm:block" style={{ lineHeight: 1.2 }}>SPACE<br/>ENG</span>
        </div>
        <div className="flex gap-1 flex-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`nav-item whitespace-nowrap text-white flex items-center gap-1 ${active === t.id ? "active" : ""}`}
            >
              <span>{t.emoji}</span>
              <span className="hidden md:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ===================== MAIN APP =====================

export default function App() {
  const [page, setPage] = useState("home");

  const pages: Record<string, JSX.Element> = {
    home: <HomePage setActive={setPage} />,
    lessons: <LessonsPage />,
    tasks: <TasksPage />,
    listening: <ListeningPage />,
    vocab: <VocabPage />,
    progress: <ProgressPage />,
    dictionary: <DictionaryPage />,
  };

  return (
    <div className="stars-bg min-h-screen">
      <StarField />
      <NavBar active={page} setActive={setPage} />
      <div style={{ position: "relative", zIndex: 10 }}>
        {pages[page] ?? <HomePage setActive={setPage} />}
      </div>
    </div>
  );
}
