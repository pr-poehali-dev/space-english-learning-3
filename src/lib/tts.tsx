import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const TTS_URL = "https://functions.poehali.dev/74d72ca4-f171-4413-85b2-d95cec6d47a9";

export async function speakText(text: string): Promise<void> {
  const resp = await fetch(TTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang: "en" }),
  });
  if (!resp.ok) throw new Error("TTS error");
  const data = await resp.json();
  const binary = atob(data.audio);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
  audio.onended = () => URL.revokeObjectURL(url);
}

export function useTTS() {
  const [loading, setLoading] = useState<string | null>(null);
  const speak = useCallback(async (text: string, id?: string) => {
    const key = id ?? text;
    setLoading(key);
    try { await speakText(text); } finally { setLoading(null); }
  }, []);
  return { speak, loading };
}

export function SpeakBtn({ text, id, size = 16 }: { text: string; id?: string; size?: number }) {
  const { speak, loading } = useTTS();
  const key = id ?? text;
  const busy = loading === key;
  return (
    <button
      onClick={e => { e.stopPropagation(); speak(text, key); }}
      disabled={busy}
      title={`Произнести: ${text}`}
      style={{
        background: busy ? "rgba(6,182,212,0.3)" : "rgba(6,182,212,0.15)",
        border: "1px solid rgba(6,182,212,0.4)",
        borderRadius: "6px",
        padding: "3px 6px",
        cursor: busy ? "wait" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        transition: "all 0.15s",
        verticalAlign: "middle",
        marginLeft: "4px",
      }}
    >
      {busy
        ? <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 3, height: 10, borderRadius: 2,
                background: "#06B6D4",
                animation: "wave 0.8s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </span>
        : <Icon name="Volume2" size={size} style={{ color: "#67E8F9" }} />
      }
    </button>
  );
}
