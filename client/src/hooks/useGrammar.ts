import { useState } from "react";

export function useGrammar(onChange: (v: string) => void) {
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_PUBLIC_BASE_AI_URL;

  const fixGrammar = async (value: string, showBanner: (msg: string, ok: boolean) => void) => {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/grammar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });

      const data = await res.json();

      if (data.changed) {
        onChange(data.corrected);
        showBanner("Grammar & spelling fixed!", true);
      } else {
        showBanner("No corrections needed — looks great.", false);
      }
    } catch (e) {
      console.error(e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoading(false);
    }
  };

  return { fixGrammar, loading };
}