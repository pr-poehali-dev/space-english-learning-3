import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SpeakBtn } from "@/lib/tts";
import { LESSONS, TASKS } from "@/data/content";

// ===================== TWord =====================

function TWord({ word, trans }: { word: string; trans: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="translate-word inline"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative" }}
    >
      {word}
      {show && (
        <span className="tooltip-translate" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>{trans}</span>
          <span
            onClick={e => { e.stopPropagation(); }}
            style={{ cursor: "pointer" }}
            title="Произнести"
          >
            <Icon name="Volume2" size={13} style={{ color: "#67E8F9", display: "inline" }} />
          </span>
        </span>
      )}
    </span>
  );
}

// ===================== HOME PAGE =====================

export function HomePage({ setActive }: { setActive: (s: string) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn.poehali.dev/projects/bb7a7666-ad26-42fa-b578-e0cc8742a2b7/files/226d2786-7552-46b9-af8b-092fdef6dcae.jpg"
              alt="rocket"
              className="w-28 h-28 object-contain float-1"
              style={{ filter: "drop-shadow(0 0 20px rgba(249,115,22,0.5))" }}
            />
          </div>
          <h1 className="section-title text-4xl sm:text-5xl text-white mb-2" style={{ textShadow: "0 0 20px rgba(255,255,255,0.4)" }}>
            SPACE <span style={{ color: "#F59E0B" }}>ENGLISH</span>
          </h1>
          <p className="text-cyan-300 text-lg font-semibold mb-1">Космический английский для инженеров будущего</p>
          <p className="text-white/50 text-sm mb-6">Классы 6–9 · Средний уровень · Специализированная лексика и грамматика</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-yellow shine" onClick={() => setActive("lessons")}>🚀 Начать урок</button>
            <button className="btn-space" onClick={() => setActive("tasks")}>✏️ Задания</button>
            <button className="btn-outline" onClick={() => setActive("listening")}>🎧 Аудирование</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: "📖", val: "3", label: "Урока" },
            { icon: "✏️", val: "5", label: "Заданий" },
            { icon: "🎧", val: "2", label: "Аудио" },
            { icon: "📚", val: "12", label: "Слов" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="section-title text-2xl text-yellow-300">{s.val}</div>
              <div className="text-white/50 text-xs font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { emoji: "🌍", title: "Космическая лексика", color: "from-blue-900/60 to-cyan-900/60", border: "border-cyan-500/30", desc: "Специализированные термины: orbit, propulsion, EVA, payload — с контекстом и переводом" },
            { emoji: "🎯", title: "Грамматика в контексте", color: "from-purple-900/60 to-pink-900/60", border: "border-purple-500/30", desc: "Present Simple, Continuous, Future — через реальные ситуации на борту МКС и в ЦУП" },
            { emoji: "📡", title: "Настоящее аудирование", color: "from-orange-900/60 to-red-900/60", border: "border-orange-500/30", desc: "Короткие аутентичные диалоги: переговоры с МКС, обратный отсчёт, доклады командира" },
          ].map((c, i) => (
            <div key={i} className={`glass-card p-5 bg-gradient-to-br ${c.color} border ${c.border}`}>
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 border border-purple-500/30">
          <h2 className="section-title text-base text-white mb-4">📍 Следующий урок</h2>
          <div className="flex items-center gap-4">
            <div className="text-5xl">🛸</div>
            <div className="flex-1">
              <div className="text-yellow-300 font-bold text-lg">Life on the ISS</div>
              <div className="text-white/50 text-sm mb-2">Жизнь на МКС · Present Continuous</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "35%" }} />
              </div>
              <div className="text-white/30 text-xs mt-1">35% завершено</div>
            </div>
            <button className="btn-space" onClick={() => setActive("lessons")}>Продолжить →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== LESSONS PAGE =====================

export function LessonsPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showTrans, setShowTrans] = useState(false);

  const lesson = activeIdx !== null ? LESSONS[activeIdx] : null;

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title text-2xl text-white text-center mb-6">📖 УРОКИ</h1>

        {!lesson ? (
          <div className="grid gap-4">
            {LESSONS.map((l, i) => (
              <div
                key={l.id}
                className="glass-card p-5 cursor-pointer border border-white/10 hover:border-purple-400/50 transition-all duration-200 hover:scale-[1.01]"
                onClick={() => { setActiveIdx(i); setShowTrans(false); }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-3xl shrink-0`}>{l.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-lg">{l.title}</span>
                      <span className="badge-lesson" style={{ background: "rgba(245,158,11,0.2)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.3)" }}>{l.level}</span>
                    </div>
                    <div className="text-white/50 text-sm">{l.titleRu}</div>
                    <div className="text-purple-300 text-xs mt-1 font-semibold">🔤 {l.grammarRu}</div>
                  </div>
                  <Icon name="ChevronRight" className="text-white/40" size={24} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <button className="btn-outline mb-4 text-sm px-3 py-2" onClick={() => setActiveIdx(null)}>← Все уроки</button>
            <div className="glass-card p-6 mb-4 border border-white/15">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-2xl`}>{lesson.emoji}</div>
                <div>
                  <h2 className="text-white font-bold text-xl">{lesson.title}</h2>
                  <div className="text-white/50 text-sm">{lesson.titleRu}</div>
                </div>
              </div>
              <div className="p-3 mb-4 rounded-xl" style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(147,51,234,0.25)" }}>
                <div className="text-purple-300 text-xs font-bold mb-0.5">🔤 ГРАММАТИКА</div>
                <div className="text-white text-sm font-semibold">{lesson.grammar}</div>
                <div className="text-white/50 text-xs">{lesson.grammarRu}</div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-white/40">👇 Наведи на слова для перевода</span>
                <SpeakBtn
                  text={lesson.text.map(p => p.en).join("")}
                  id={`lesson-${lesson.id}`}
                  size={14}
                />
                <span className="text-white/30 text-xs">Прочитать вслух</span>
              </div>
              <div className="text-white text-base leading-8 mb-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                {lesson.text.map((part, i) =>
                  part.key
                    ? <TWord key={i} word={part.en} trans={part.ru} />
                    : <span key={i}>{part.en}</span>
                )}
              </div>
              <button className={`btn-outline text-sm ${showTrans ? "border-green-400/50 text-green-300" : ""}`} onClick={() => setShowTrans(!showTrans)}>
                {showTrans ? "🙈 Скрыть перевод" : "👁️ Показать перевод"}
              </button>
              {showTrans && (
                <div className="mt-3 p-4 rounded-xl text-white/70 text-sm leading-relaxed" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  {lesson.translation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== TASKS PAGE =====================

export function TasksPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [matchState, setMatchState] = useState<{ left: number | null; right: number | null; matched: number[] }>({ left: null, right: null, matched: [] });
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const task = TASKS[current];

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setRevealed(true);
    if (task.type !== "match" && idx === task.correct) setScore(s => s + 1);
  }

  function nextTask() {
    if (current + 1 >= TASKS.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setRevealed(false);
    setMatchState({ left: null, right: null, matched: [] });
  }

  function restart() {
    setCurrent(0); setSelected(null); setRevealed(false); setScore(0); setDone(false);
    setMatchState({ left: null, right: null, matched: [] });
  }

  function handleMatch(side: "left" | "right", idx: number) {
    if (task.type !== "match") return;
    const ns = { ...matchState };
    if (side === "left") ns.left = idx;
    else ns.right = idx;
    if (ns.left !== null && ns.right !== null) {
      if (ns.left === ns.right) {
        ns.matched = [...ns.matched, ns.left];
        if (ns.matched.length === task.pairs.length) { setScore(s => s + 1); setRevealed(true); }
      }
      ns.left = null; ns.right = null;
    }
    setMatchState(ns);
  }

  if (done) {
    return (
      <div className="min-h-screen pt-24 pb-10 px-4 relative z-10 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md w-full animate-fade-in-up">
          <div className="text-6xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "⭐" : "🚀"}</div>
          <h2 className="section-title text-2xl text-yellow-300 mb-2">Результат</h2>
          <div className="text-5xl font-black text-white mb-2">{score}/{TASKS.length}</div>
          <p className="text-white/60 mb-6">{score >= 4 ? "Отличная работа, настоящий астронавт!" : score >= 2 ? "Хороший результат! Продолжай изучать." : "Повтори материал и попробуй снова!"}</p>
          <button className="btn-yellow w-full" onClick={restart}>🔄 Попробовать снова</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title text-xl text-white">✏️ ЗАДАНИЯ</h1>
          <span className="text-white/50 text-sm">{current + 1} / {TASKS.length}</span>
        </div>
        <div className="progress-bar mb-6">
          <div className="progress-fill" style={{ width: `${((current + 1) / TASKS.length) * 100}%` }} />
        </div>

        <div className="glass-card p-6 animate-fade-in-up border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-lesson" style={{ background: "rgba(147,51,234,0.25)", color: "#C084FC", border: "1px solid rgba(147,51,234,0.4)" }}>
              Урок {task.lesson}
            </span>
            <span className="text-white/40 text-xs">{task.type === "choice" ? "Выбор ответа" : task.type === "match" ? "Соответствие" : "Вставь слово"}</span>
          </div>
          <h2 className="text-white font-bold text-lg mb-4">{task.title}</h2>

          {task.type === "match" ? (
            <div>
              <p className="text-white/60 text-sm mb-4">Нажми слово на английском, затем его перевод:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  {task.pairs.map((p, i) => (
                    <button
                      key={i}
                      className={`answer-option ${matchState.matched.includes(i) ? "correct" : matchState.left === i ? "selected" : ""}`}
                      onClick={() => handleMatch("left", i)}
                      disabled={matchState.matched.includes(i)}
                    >
                      {p.en}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {task.pairs.map((p, i) => (
                    <button
                      key={i}
                      className={`answer-option ${matchState.matched.includes(i) ? "correct" : matchState.right === i ? "selected" : ""}`}
                      onClick={() => handleMatch("right", i)}
                      disabled={matchState.matched.includes(i)}
                    >
                      {p.ru}
                    </button>
                  ))}
                </div>
              </div>
              {revealed && (
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                  <p className="text-green-300 font-bold text-sm">✅ Все пары найдены! Отлично!</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-white text-base mb-2 leading-relaxed">{task.question}</p>
              {task.hint && (
                <div className="mb-4 flex items-start gap-2 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <span>💡</span>
                  <span className="text-yellow-300/80 text-sm">{task.hint}</span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                {task.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`answer-option ${selected !== null ? (i === task.correct ? "correct" : selected === i ? "wrong" : "") : ""}`}
                    onClick={() => handleAnswer(i)}
                  >
                    <span className="text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {revealed && task.explanation && (
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.3)" }}>
                  <p className="text-purple-200 text-sm">📚 {task.explanation}</p>
                </div>
              )}
            </div>
          )}

          {(revealed || (task.type === "match" && matchState.matched.length === task.pairs.length)) && (
            <button className="btn-space mt-5 w-full" onClick={nextTask}>
              {current + 1 < TASKS.length ? "Следующее задание →" : "Посмотреть результат 🏆"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
