import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { SpeakBtn, speakText } from "@/lib/tts";
import { VOCAB_WORDS, AUDIO_LESSONS } from "@/data/content";

// ===================== LISTENING PAGE =====================

export function ListeningPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null]);
  const [showAnswers, setShowAnswers] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lesson = AUDIO_LESSONS[selectedIdx];

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setPlaying(true); }
  }

  useEffect(() => {
    setPlaying(false);
    setShowTranscript(false);
    setAnswers([null, null]);
    setShowAnswers(false);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  }, [selectedIdx]);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title text-2xl text-white text-center mb-6">🎧 АУДИРОВАНИЕ</h1>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {AUDIO_LESSONS.map((al, i) => (
            <div
              key={al.id}
              className={`glass-card p-4 cursor-pointer border transition-all ${selectedIdx === i ? "border-cyan-400/60" : "border-white/10 hover:border-white/25"}`}
              onClick={() => setSelectedIdx(i)}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${al.color} flex items-center justify-center text-xl mb-2`}>{al.emoji}</div>
              <div className="text-white font-bold text-sm">{al.title}</div>
              <div className="text-white/50 text-xs mb-2">{al.titleRu}</div>
              <div className="flex gap-2 flex-wrap">
                <span className="badge-lesson" style={{ background: "rgba(6,182,212,0.15)", color: "#67E8F9", border: "1px solid rgba(6,182,212,0.3)", fontSize: "0.7rem" }}>⏱ {al.duration}</span>
                <span className="badge-lesson" style={{ background: "rgba(245,158,11,0.15)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.3)", fontSize: "0.7rem" }}>{al.level}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="audio-player mb-4">
          <div className="flex items-center gap-4 mb-2">
            <button className="btn-space flex items-center gap-2" onClick={togglePlay} style={{ minWidth: "120px" }}>
              {playing ? <><Icon name="Pause" size={16} /> Пауза</> : <><Icon name="Play" size={16} /> Слушать</>}
            </button>
            <div className={`audio-wave flex-1 ${playing ? "" : "paused"}`}>
              {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
            </div>
            <span className="text-cyan-300 text-sm font-mono">{lesson.duration}</span>
          </div>
          <audio ref={audioRef} src={lesson.audioUrl} onEnded={() => setPlaying(false)} />
          <div className="text-white/40 text-xs mt-1">🔊 Нажми «Слушать» и внимательно следи за текстом</div>
        </div>

        <div className="glass-card p-4 mb-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">📝 Транскрипт с переводом</h3>
            <button className="btn-outline text-xs py-1 px-3" onClick={() => setShowTranscript(!showTranscript)}>
              {showTranscript ? "Скрыть" : "Показать"}
            </button>
          </div>
          {showTranscript ? (
            <div className="space-y-3">
              {lesson.transcript.map((line, i) => (
                <div key={i} className="p-2 rounded-lg" style={line.key ? { background: "rgba(245,158,11,0.08)" } : {}}>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <span className={`text-sm leading-6 ${line.key ? "text-yellow-200 font-semibold" : "text-white"}`}>{line.en}</span>
                      <SpeakBtn text={line.en.trim()} id={`tr-${i}`} size={13} />
                      {line.key && <div className="text-yellow-500/70 text-xs mt-0.5 font-mono">{line.word} → {line.wordRu}</div>}
                    </div>
                    <div className="text-white/40 text-xs leading-6 w-40 sm:w-52 shrink-0">{line.ru}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">Сначала послушай, затем проверь транскрипт 😉</p>
          )}
        </div>

        <div className="glass-card p-5 border border-purple-500/25">
          <h3 className="text-white font-bold mb-4">❓ Вопросы по аудио</h3>
          <div className="space-y-5">
            {lesson.questions.map((q, qi) => (
              <div key={qi}>
                <p className="text-white text-sm font-semibold mb-2">{qi + 1}. {q.q}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, ai) => (
                    <button
                      key={ai}
                      className={`answer-option text-sm ${showAnswers ? (ai === q.correct ? "correct" : answers[qi] === ai ? "wrong" : "") : answers[qi] === ai ? "selected" : ""}`}
                      onClick={() => { const na = [...answers]; na[qi] = ai; setAnswers(na); }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {answers.every(a => a !== null) && !showAnswers && (
            <button className="btn-green mt-4 w-full" onClick={() => setShowAnswers(true)}>✅ Проверить ответы</button>
          )}
          {showAnswers && (
            <div className="mt-3 p-3 rounded-xl text-center" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
              <span className="text-green-300 font-bold">
                {answers.filter((a, i) => a === lesson.questions[i].correct).length} / {lesson.questions.length} правильно
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===================== VOCAB PAGE =====================

export function VocabPage() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [known, setKnown] = useState<number[]>([]);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title text-2xl text-white">💬 ЛЕКСИКА</h1>
          <span className="text-white/50 text-sm">{known.length}/{VOCAB_WORDS.length} изучено</span>
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${(known.length / VOCAB_WORDS.length) * 100}%` }} />
        </div>
        <p className="text-white/40 text-sm mb-5 text-center">Нажми на карточку чтобы перевернуть · Отметь слова которые знаешь ✅</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {VOCAB_WORDS.map((w, i) => (
            <div key={i} className={`vocab-card ${flipped === i ? "flipped" : ""}`} style={{ height: 148 }} onClick={() => setFlipped(flipped === i ? null : i)}>
              <div className="vocab-inner" style={{ height: 148 }}>
                <div className="vocab-front glass-card p-4 flex flex-col items-center justify-center text-center" style={{ height: 148, border: known.includes(i) ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.1)", background: known.includes(i) ? "rgba(34,197,94,0.06)" : undefined }}>
                  <div className="text-white/30 text-xs mb-1">EN</div>
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-white font-bold text-lg">{w.en}</span>
                    <SpeakBtn text={w.en} id={`vocab-${i}`} size={14} />
                  </div>
                  {known.includes(i) && <div className="text-green-400 text-xs mt-1">✅ Знаю</div>}
                </div>
                <div className="vocab-back p-4 flex flex-col items-center justify-center text-center" style={{ height: 148, background: "rgba(147,51,234,0.2)", border: "1px solid rgba(147,51,234,0.4)", borderRadius: "1.25rem" }}>
                  <div className="text-purple-300 text-xs mb-1">RU</div>
                  <div className="text-yellow-300 font-bold text-sm mb-1">{w.ru}</div>
                  <div className="text-white/45 text-xs leading-tight mb-2">{w.context}</div>
                  <div className="flex gap-2 justify-center">
                    <SpeakBtn text={w.en} id={`vocab-back-${i}`} size={13} />
                    <button
                      className="btn-green text-xs py-1 px-3"
                      onClick={e => { e.stopPropagation(); setKnown(k => k.includes(i) ? k.filter(x => x !== i) : [...k, i]); }}
                    >
                      {known.includes(i) ? "Убрать" : "Знаю ✅"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== PROGRESS PAGE =====================

export function ProgressPage() {
  const stats = [
    { label: "Уроков пройдено", val: 1, max: 3, color: "#9333EA" },
    { label: "Заданий выполнено", val: 3, max: 5, color: "#06B6D4" },
    { label: "Слов изучено", val: 4, max: 12, color: "#F59E0B" },
    { label: "Аудио прослушано", val: 1, max: 2, color: "#22C55E" },
  ];
  const achievements = [
    { emoji: "🚀", title: "Первый старт", desc: "Пройди первый урок", done: true },
    { emoji: "🎧", title: "Слушатель", desc: "Прослушай аудирование", done: true },
    { emoji: "🏆", title: "Отличник", desc: "5/5 в заданиях", done: false },
    { emoji: "🌟", title: "Знаток слов", desc: "Изучи 10 слов", done: false },
    { emoji: "🛸", title: "Астронавт", desc: "Пройди все уроки", done: false },
    { emoji: "🔭", title: "Исследователь", desc: "Открой весь словарь", done: false },
  ];
  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title text-2xl text-white text-center mb-6">📊 ПРОГРЕСС</h1>
        <div className="glass-card p-6 mb-5 border border-yellow-500/25 text-center">
          <div className="text-5xl mb-2">⭐</div>
          <div className="section-title text-4xl text-yellow-300 mb-1">240</div>
          <div className="text-white/60 text-sm">Очков опыта · Уровень: Юный Астронавт</div>
        </div>
        <div className="glass-card p-5 mb-5 border border-white/10">
          <h2 className="text-white font-bold mb-4">Статистика</h2>
          <div className="space-y-4">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{s.label}</span>
                  <span className="text-white font-bold">{s.val}/{s.max}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(s.val / s.max) * 100}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-5 border border-white/10">
          <h2 className="text-white font-bold mb-4">Достижения</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className={`glass-card p-3 text-center border transition-all ${a.done ? "border-yellow-500/40" : "border-white/5 opacity-50"}`}
                style={a.done ? { background: "rgba(245,158,11,0.08)" } : {}}>
                <div className="text-3xl mb-1">{a.emoji}</div>
                <div className={`text-xs font-bold ${a.done ? "text-yellow-300" : "text-white/40"}`}>{a.title}</div>
                <div className="text-white/40 text-xs">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== DICTIONARY PAGE =====================

export function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [activeWord, setActiveWord] = useState<typeof VOCAB_WORDS[0] | null>(null);
  const filtered = VOCAB_WORDS.filter(
    w => w.en.toLowerCase().includes(search.toLowerCase()) || w.ru.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen pt-24 pb-10 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title text-2xl text-white text-center mb-6">📚 СЛОВАРЬ</h1>
        <div className="relative mb-5">
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            className="w-full rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 bg-transparent focus:outline-none"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            placeholder="Поиск: spacecraft, орбита..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {activeWord ? (
          <div className="glass-card p-6 animate-fade-in-up border border-purple-500/30">
            <button className="btn-outline text-sm py-1 px-3 mb-4" onClick={() => setActiveWord(null)}>← Назад</button>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl font-black text-white">{activeWord.en}</span>
                <SpeakBtn text={activeWord.en} id="dict-active" size={22} />
              </div>
              <div className="text-2xl text-yellow-300 font-bold mb-3">{activeWord.ru}</div>
              <div className="text-white/60 text-sm leading-relaxed p-4 rounded-xl italic" style={{ background: "rgba(255,255,255,0.05)" }}>
                💬 {activeWord.context}
              </div>
              <button
                className="btn-cyan mt-4"
                style={{ background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: "0.75rem", padding: "0.5rem 1.25rem", color: "#67E8F9", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                onClick={() => speakText(activeWord.context)}
              >
                <Icon name="Volume2" size={16} style={{ color: "#67E8F9" }} />
                Произнести пример
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((w, i) => (
              <div
                key={i}
                className="glass-card p-4 border border-white/10 hover:border-purple-400/40 cursor-pointer transition-all hover:translate-x-1 flex items-center justify-between"
                onClick={() => setActiveWord(w)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{w.en}</span>
                  <SpeakBtn text={w.en} id={`dict-list-${i}`} size={13} />
                  <span className="text-white/30 mx-1">—</span>
                  <span className="text-yellow-300">{w.ru}</span>
                </div>
                <Icon name="ChevronRight" className="text-white/30" size={18} />
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center text-white/40 py-8">Ничего не найдено 🔭</div>}
          </div>
        )}
      </div>
    </div>
  );
}
