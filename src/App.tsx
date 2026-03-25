import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ===================== DATA =====================

const VOCAB_WORDS = [
  { en: "spacecraft", ru: "космический аппарат", context: "A spacecraft travels through space at incredible speeds." },
  { en: "orbit", ru: "орбита", context: "The satellite moves in orbit around the Earth." },
  { en: "astronaut", ru: "астронавт/космонавт", context: "The astronaut performs experiments on the ISS." },
  { en: "launch", ru: "запуск", context: "The rocket launch was scheduled for midnight." },
  { en: "gravity", ru: "гравитация", context: "Gravity keeps planets in their orbits." },
  { en: "telescope", ru: "телескоп", context: "The telescope captured stunning images of nebulae." },
  { en: "mission", ru: "миссия", context: "The Mars mission will last six months." },
  { en: "galaxy", ru: "галактика", context: "Our galaxy contains billions of stars." },
  { en: "module", ru: "модуль", context: "The crew module safely returned to Earth." },
  { en: "docking", ru: "стыковка", context: "Docking with the space station requires precision." },
  { en: "thruster", ru: "двигатель реактивный", context: "The thruster adjusted the spacecraft's trajectory." },
  { en: "payload", ru: "полезная нагрузка", context: "The rocket's payload included scientific instruments." },
];

const LESSONS = [
  {
    id: 1, title: "The Solar System", titleRu: "Солнечная система",
    emoji: "🌍", color: "from-blue-600 to-cyan-500",
    level: "Beginner+",
    grammar: "Present Simple — describing facts",
    grammarRu: "Present Simple — описание фактов",
    text: [
      { en: "Our ", ru: "" },
      { en: "solar system", ru: "солнечная система", key: true },
      { en: " consists of eight ", ru: "" },
      { en: "planets", ru: "планеты", key: true },
      { en: " that orbit the Sun. The Sun is a ", ru: "" },
      { en: "star", ru: "звезда", key: true },
      { en: " located at the center. Each planet has a unique ", ru: "" },
      { en: "atmosphere", ru: "атмосфера", key: true },
      { en: " and ", ru: "" },
      { en: "gravitational pull", ru: "сила притяжения", key: true },
      { en: ". Scientists study these planets using powerful ", ru: "" },
      { en: "telescopes", ru: "телескопы", key: true },
      { en: " and space ", ru: "" },
      { en: "probes", ru: "зонды", key: true },
      { en: ".", ru: "" },
    ],
    translation: "Наша солнечная система состоит из восьми планет, которые вращаются вокруг Солнца. Солнце — это звезда, расположенная в центре. Каждая планета имеет уникальную атмосферу и силу притяжения. Учёные изучают планеты с помощью мощных телескопов и космических зондов.",
  },
  {
    id: 2, title: "Life on the ISS", titleRu: "Жизнь на МКС",
    emoji: "🛸", color: "from-purple-600 to-pink-500",
    level: "Intermediate",
    grammar: "Present Continuous — ongoing processes",
    grammarRu: "Present Continuous — текущие процессы",
    text: [
      { en: "Astronauts are currently ", ru: "" },
      { en: "conducting", ru: "проводят (проводить)", key: true },
      { en: " experiments aboard the International Space ", ru: "" },
      { en: "Station", ru: "станция", key: true },
      { en: ". They are ", ru: "" },
      { en: "floating", ru: "плавают в невесомости", key: true },
      { en: " in ", ru: "" },
      { en: "microgravity", ru: "микрогравитация", key: true },
      { en: " while ", ru: "" },
      { en: "monitoring", ru: "мониторинг/отслеживание", key: true },
      { en: " various systems. The crew is also ", ru: "" },
      { en: "maintaining", ru: "обслуживают (обслуживать)", key: true },
      { en: " the station's life support systems.", ru: "" },
    ],
    translation: "Астронавты в данный момент проводят эксперименты на борту Международной космической станции. Они плавают в условиях микрогравитации, отслеживая различные системы. Экипаж также обслуживает системы жизнеобеспечения станции.",
  },
  {
    id: 3, title: "Mars Mission 2040", titleRu: "Миссия Марс 2040",
    emoji: "🔴", color: "from-orange-600 to-red-500",
    level: "Intermediate+",
    grammar: "Future — plans and predictions",
    grammarRu: "Future — планы и прогнозы",
    text: [
      { en: "Engineers ", ru: "" },
      { en: "are going to", ru: "собираются/планируют", key: true },
      { en: " develop a new ", ru: "" },
      { en: "propulsion system", ru: "двигательная система", key: true },
      { en: " for the Mars ", ru: "" },
      { en: "mission", ru: "миссия", key: true },
      { en: ". The spacecraft will ", ru: "" },
      { en: "deploy", ru: "развернуть/установить", key: true },
      { en: " a habitat module on the Martian surface. Scientists predict the journey will take approximately seven months, requiring advanced ", ru: "" },
      { en: "life support", ru: "система жизнеобеспечения", key: true },
      { en: " technology.", ru: "" },
    ],
    translation: "Инженеры собираются разработать новую двигательную систему для миссии на Марс. Космический аппарат развернёт жилой модуль на поверхности Марса. Учёные предсказывают, что путешествие займёт около семи месяцев, что потребует передовых технологий жизнеобеспечения.",
  },
];

const TASKS = [
  {
    id: 1, type: "choice", lesson: 1,
    title: "Выбери правильный ответ",
    question: "What keeps planets in orbit around the Sun?",
    hint: "Подсказка: эта сила удерживает всё на Земле",
    options: ["Magnetic field", "Gravity", "Solar wind", "Dark matter"],
    correct: 1,
    pairs: [] as {en:string;ru:string}[],
    explanation: "Gravity (гравитация) — сила притяжения, удерживающая планеты на орбите вокруг Солнца.",
  },
  {
    id: 2, type: "choice", lesson: 1,
    title: "Грамматика: Present Simple",
    question: "Choose the correct form: 'The astronaut _____ experiments every day on the ISS.'",
    hint: "Present Simple для регулярных действий — 3 лицо единственное число",
    options: ["conduct", "conducts", "is conducting", "conducted"],
    correct: 1,
    pairs: [] as {en:string;ru:string}[],
    explanation: "'Conducts' — Present Simple, 3-е лицо ед.ч. Используется для регулярных действий.",
  },
  {
    id: 3, type: "match", lesson: 2,
    title: "Соедини слово с переводом",
    question: "",
    hint: "",
    options: [] as string[],
    correct: -1,
    pairs: [
      { en: "spacecraft", ru: "космический аппарат" },
      { en: "orbit", ru: "орбита" },
      { en: "launch", ru: "запуск" },
      { en: "docking", ru: "стыковка" },
    ],
    explanation: "",
  },
  {
    id: 4, type: "choice", lesson: 2,
    title: "Аудирование: выбери верное утверждение",
    question: "According to the ISS report, what is the main challenge for the crew?",
    hint: "Послушай: о чём говорит астронавт?",
    options: [
      "Communication with Earth",
      "Working in microgravity conditions",
      "Finding food and water",
      "Navigating through asteroids",
    ],
    correct: 1,
    pairs: [] as {en:string;ru:string}[],
    explanation: "Microgravity (микрогравитация) — главная особенность жизни на МКС.",
  },
  {
    id: 5, type: "fill", lesson: 3,
    title: "Вставь пропущенное слово",
    question: "The rocket's _____ included a Mars rover and scientific instruments.",
    hint: "Полезная нагрузка ракеты — что она везёт",
    options: ["cargo", "payload", "module", "thruster"],
    correct: 1,
    pairs: [] as {en:string;ru:string}[],
    explanation: "'Payload' (полезная нагрузка) — технический термин для обозначения груза ракеты.",
  },
];

const AUDIO_LESSONS = [
  {
    id: 1,
    title: "ISS Daily Report",
    titleRu: "Ежедневный отчёт МКС",
    duration: "0:42",
    level: "Intermediate",
    emoji: "📡",
    color: "from-cyan-600 to-blue-600",
    transcript: [
      { en: "Good morning, Houston.", ru: "Доброе утро, Хьюстон.", key: false, word: "", wordRu: "" },
      { en: " This is Commander Rodriguez reporting from the International Space Station.", ru: " Говорит командир Родригез с борта Международной космической станции.", key: false, word: "", wordRu: "" },
      { en: " All systems are nominal.", ru: " Все системы в норме.", key: true, word: "nominal", wordRu: "номинальный/штатный" },
      { en: " We completed the scheduled EVA", ru: " Мы завершили плановый выход в открытый космос.", key: true, word: "EVA", wordRu: "Extra-Vehicular Activity — выход в открытый космос" },
      { en: " and repaired the solar panel array.", ru: " и починили массив солнечных панелей.", key: true, word: "solar panel array", wordRu: "массив солнечных панелей" },
      { en: " Microgravity continues to affect our sleep cycles.", ru: " Микрогравитация продолжает влиять на наши циклы сна.", key: true, word: "microgravity", wordRu: "микрогравитация" },
      { en: " Over and out.", ru: " Конец связи.", key: false, word: "", wordRu: "" },
    ],
    audioUrl: "https://cdn.poehali.dev/projects/15b0968a-a311-4053-ae24-ce6b86b62abf/bucket/iss-report.mp3",
    questions: [
      { q: "Who is speaking?", options: ["A NASA engineer", "Commander Rodriguez", "Mission Control", "A cosmonaut"], correct: 1 },
      { q: "What did they repair?", options: ["A broken thruster", "The life support system", "The solar panel array", "The docking module"], correct: 2 },
    ],
  },
  {
    id: 2,
    title: "Mars Launch Countdown",
    titleRu: "Обратный отсчёт до Марса",
    duration: "0:35",
    level: "Beginner+",
    emoji: "🚀",
    color: "from-orange-600 to-red-500",
    transcript: [
      { en: "T-minus ten seconds.", ru: "До старта десять секунд.", key: false, word: "", wordRu: "" },
      { en: " All systems go.", ru: " Все системы готовы к запуску.", key: true, word: "systems go", wordRu: "все системы в готовности" },
      { en: " Ignition sequence initiated.", ru: " Запущена последовательность зажигания.", key: true, word: "ignition sequence", wordRu: "последовательность зажигания" },
      { en: " We have liftoff!", ru: " Старт!", key: true, word: "liftoff", wordRu: "старт/взлёт ракеты" },
      { en: " The Ares rocket is now climbing through the atmosphere.", ru: " Ракета Арес набирает высоту в атмосфере.", key: true, word: "climbing through the atmosphere", wordRu: "набирает высоту в атмосфере" },
      { en: " Stage separation confirmed.", ru: " Разделение ступеней подтверждено.", key: true, word: "stage separation", wordRu: "разделение ступеней" },
      { en: " Godspeed, crew.", ru: " Удачи, экипаж.", key: false, word: "", wordRu: "" },
    ],
    audioUrl: "https://cdn.poehali.dev/projects/15b0968a-a311-4053-ae24-ce6b86b62abf/bucket/launch.mp3",
    questions: [
      { q: "What is 'liftoff'?", options: ["Landing", "Rocket launch", "Stage separation", "Ignition"], correct: 1 },
      { q: "What was confirmed during the flight?", options: ["Orbit insertion", "System failure", "Stage separation", "Docking"], correct: 2 },
    ],
  },
];

// ===================== COMPONENTS =====================

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
        <span className="tooltip-translate">
          <div>{trans}</div>
        </span>
      )}
    </span>
  );
}

// ===================== HOME PAGE =====================
function HomePage({ setActive }: { setActive: (s: string) => void }) {
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
            <div key={i} className="glass-card p-4 text-center" style={{ animationDelay: `${i * 0.1}s` }}>
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
function LessonsPage() {
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
              <div className="text-sm text-white/40 mb-2">👇 Наведи на подчёркнутые слова для перевода</div>
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
function TasksPage() {
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

// ===================== LISTENING PAGE =====================
function ListeningPage() {
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
                <div key={i} className={`p-2 rounded-lg ${line.key ? "" : ""}`} style={line.key ? { background: "rgba(245,158,11,0.08)" } : {}}>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <span className={`text-sm leading-6 ${line.key ? "text-yellow-200 font-semibold" : "text-white"}`}>{line.en}</span>
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
function VocabPage() {
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
                <div className={`vocab-front glass-card p-4 flex flex-col items-center justify-center text-center`} style={{ height: 148, border: known.includes(i) ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.1)", background: known.includes(i) ? "rgba(34,197,94,0.06)" : undefined }}>
                  <div className="text-white/30 text-xs mb-2">EN</div>
                  <div className="text-white font-bold text-lg">{w.en}</div>
                  {known.includes(i) && <div className="text-green-400 text-xs mt-1">✅ Знаю</div>}
                </div>
                <div className="vocab-back p-4 flex flex-col items-center justify-center text-center" style={{ height: 148, background: "rgba(147,51,234,0.2)", border: "1px solid rgba(147,51,234,0.4)", borderRadius: "1.25rem" }}>
                  <div className="text-purple-300 text-xs mb-1">RU</div>
                  <div className="text-yellow-300 font-bold text-base mb-2">{w.ru}</div>
                  <div className="text-white/45 text-xs leading-tight mb-2">{w.context}</div>
                  <button
                    className="btn-green text-xs py-1 px-3"
                    onClick={e => { e.stopPropagation(); setKnown(k => k.includes(i) ? k.filter(x => x !== i) : [...k, i]); }}
                  >
                    {known.includes(i) ? "Убрать" : "Знаю ✅"}
                  </button>
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
function ProgressPage() {
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
function DictionaryPage() {
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
              <div className="text-4xl font-black text-white mb-2">{activeWord.en}</div>
              <div className="text-2xl text-yellow-300 font-bold mb-3">{activeWord.ru}</div>
              <div className="text-white/60 text-sm leading-relaxed p-4 rounded-xl italic" style={{ background: "rgba(255,255,255,0.05)" }}>
                💬 {activeWord.context}
              </div>
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
                <div>
                  <span className="text-white font-bold">{w.en}</span>
                  <span className="text-white/30 mx-2">—</span>
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
