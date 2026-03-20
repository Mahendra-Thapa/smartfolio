import { useState } from "react";

export function useBanner() {
  const [banner, setBanner] = useState<{ msg: string; ok: boolean } | null>(null);

  const showBanner = (msg: string, ok: boolean) => {
    setBanner({ msg, ok });
    setTimeout(() => setBanner(null), 4000);
  };

  return { banner, showBanner };
}