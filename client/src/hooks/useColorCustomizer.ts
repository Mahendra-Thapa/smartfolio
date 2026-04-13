import { useState, useEffect } from "react";

export interface CustomColors {
  primary: string;
  secondary: string;
  accent: string;
}

export const DEFAULT_COLORS: CustomColors = {
  primary: "#2563eb",
  secondary: "#1e40af",
  accent: "#7c3aed",
};

export function useColorCustomizer(portfolioId: string) {
  const [colors, setColors] = useState<CustomColors | null>(null);

  // Load colors from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`portfolio-colors-${portfolioId}`);
    if (stored) {
      try {
        setColors(JSON.parse(stored));
      } catch {
        setColors(null);
      }
    } else {
      setColors(null);
    }
  }, [portfolioId]);

  // Save colors to localStorage
  const updateColor = (key: keyof CustomColors, value: string) => {
    const newColors = { ...(colors || DEFAULT_COLORS), [key]: value };
    setColors(newColors);
    localStorage.setItem(`portfolio-colors-${portfolioId}`, JSON.stringify(newColors));
  };

  // Reset to defaults
  const resetColors = () => {
    setColors(null);
    localStorage.removeItem(`portfolio-colors-${portfolioId}`);
  };

  return { colors, updateColor, resetColors };
}
