import { useState } from "react";
import { Palette, RotateCcw } from "lucide-react";
import { useColorCustomizer, CustomColors, DEFAULT_COLORS } from "@/hooks/useColorCustomizer";

interface ColorCustomizerProps {
  portfolioId: string;
  onColorsChange?: (colors: CustomColors) => void;
}

const COLOR_PRESETS = [
  {
    name: "Ocean Blue",
    colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#06b6d4" },
  },
  {
    name: "Sunset Purple",
    colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#d946ef" },
  },
  {
    name: "Forest Green",
    colors: { primary: "#15803d", secondary: "#22c55e", accent: "#84cc16" },
  },
  {
    name: "Coral Pink",
    colors: { primary: "#ea580c", secondary: "#f97316", accent: "#fb923c" },
  },
  {
    name: "Slate Gray",
    colors: { primary: "#475569", secondary: "#64748b", accent: "#94a3b8" },
  },
  {
    name: "Indigo",
    colors: { primary: "#4f46e5", secondary: "#6366f1", accent: "#818cf8" },
  },
];

export default function ColorCustomizer({ portfolioId, onColorsChange }: ColorCustomizerProps) {
  const { colors, updateColor, resetColors } = useColorCustomizer(portfolioId);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (key: keyof CustomColors, value: string) => {
    updateColor(key, value);
    onColorsChange?.({ ...(colors || DEFAULT_COLORS), [key]: value });
  };

  const handlePresetSelect = (preset: typeof COLOR_PRESETS[0]) => {
    Object.entries(preset.colors).forEach(([key, value]) => {
      updateColor(key as keyof CustomColors, value);
    });
    onColorsChange?.(preset.colors);
  };

  const handleReset = () => {
    resetColors();
    onColorsChange?.(DEFAULT_COLORS);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        title="Customize colors"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">Colors</span>
      </button>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-6 z-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Palette
              </h3>
              <button
                onClick={handleReset}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="Reset to default colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Color Pickers */}
            <div className="space-y-4">
              {[
                { key: "primary" as const, label: "Primary Color" },
                { key: "secondary" as const, label: "Secondary Color" },
                { key: "accent" as const, label: "Accent Color" },
              ].map(({ key, label }) => {
                const activeColors = colors || DEFAULT_COLORS;
                return (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={activeColors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-slate-300 dark:border-slate-600"
                    />
                    <input
                      type="text"
                      value={activeColors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              )})}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-slate-700"></div>

            {/* Presets */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Presets</h4>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors text-left"
                    title={`Apply ${preset.name} preset`}
                  >
                    <div className="flex gap-1 mb-1">
                      {Object.values(preset.colors).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {preset.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
