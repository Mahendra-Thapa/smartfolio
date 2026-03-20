import { useState } from "react";

export function useAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [completions, setCompletions] = useState<string[]>([]);
  const API_BASE = import.meta.env.VITE_PUBLIC_BASE_AI_URL;

  const getSuggestions = async (
    value: string,
    showBanner: (msg: string, ok: boolean) => void
  ) => {
    if (!value.trim()) return;

    setLoading(true);
    setCompletions([]);

    try {
      const res = await fetch(`${API_BASE}/api/autocomplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
          top_k: 5,
          num_words: 5,
        }),
      });

      const data = await res.json();

      if (!data.ready) {
        showBanner("Model still training — try again later.", false);
        return;
      }

      if (!data.completions?.length) {
        showBanner("No suggestions found.", false);
        return;
      }

      setCompletions(data.completions);
    } catch (e) {
      console.error(e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoading(false);
    }
  };

  return { getSuggestions, completions, setCompletions, loading };
}
