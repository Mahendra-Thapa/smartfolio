import { useState } from "react";

export function useRewrite() {
  const [loading, setLoading] = useState(false);
  const [rewrite, setRewrite] = useState<any>(null);
  const API_BASE = import.meta.env.VITE_PUBLIC_BASE_AI_URL;

  const rewriteText = async (
    value: string,
    field: string,
    showBanner: (msg: string, ok: boolean) => void
  ) => {
    if (!value.trim()) return;

    setLoading(true);
    setRewrite(null);

    try {
      const res = await fetch(`${API_BASE}/api/rewrite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value, field }),
      });

      const data = await res.json();
      setRewrite(data);
    } catch (e) {
      console.error(e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoading(false);
    }
  };

  return { rewriteText, rewrite, setRewrite, loading };
}