// TemplatePreview.tsx
"use client";

import { useState } from "react";
import { 
  ProfessionalTemplate, 
  ModernTemplate, 
  CreativeTemplate, 
  DeveloperTemplate,
  TEMPLATES 
} from "../PortfolioTemplates";
import { demoPortfolio } from "../data/demoData";
import { X, Moon, Sun } from "lucide-react";

interface TemplatePreviewProps {
  templateId?: string;
  onClose?: () => void;
}

export default function TemplatePreview({ templateId, onClose }: TemplatePreviewProps) {
  const initialTemplate = templateId 
    ? TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0]
    : TEMPLATES[0];

  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [selectedColor, setSelectedColor] = useState(initialTemplate.colorSchemes[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const renderTemplate = () => {
    const props = {
      portfolio: demoPortfolio,
      template: selectedTemplate,
      colorScheme: selectedColor,
      theme,
    };

    switch (selectedTemplate.id) {
      case "professional":
        return <ProfessionalTemplate {...props} />;
      case "modern":
        return <ModernTemplate {...props} />;
      case "creative":
        return <CreativeTemplate {...props} />;
      case "developer":
        return <DeveloperTemplate {...props} />;
      default:
        return <ProfessionalTemplate {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
      {/* Control Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Template Preview: <span className="text-blue-600">{selectedTemplate.name}</span>
          </h2>
          
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          
          {/* Color Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden md:block">Colors:</span>
            <div className="flex gap-2">
              {selectedTemplate.colorSchemes.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    selectedColor.id === color.id ? "border-slate-900 dark:border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.primary }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {theme === "light" ? <Moon className="w-5 h-5 text-slate-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="min-h-full">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}