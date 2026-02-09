import { storage } from "@/lib/storage";
import { TEMPLATES, ProfessionalTemplate, ModernTemplate, CreativeTemplate, DeveloperTemplate } from "@/components/PortfolioTemplates";
import { generateNextJsProject } from "@/lib/codeGenerator";
// import ColorCustomizer from "@/components/ColorCustomizer";
import SharePortfolioModal from "@/components/SharePortfolioModal";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorCustomizer } from "@/hooks/useColorCustomizer";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Code2, Loader2, Moon, Sun } from "lucide-react";
import JSZip from "jszip";
import ScrollToTop from "@/components/ScrollToTop";

export default function ViewPortfolio() {
  const [, setLocation] = useLocation();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [colorScheme, setColorScheme] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [portfolioTheme, setPortfolioTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);
  const { theme: appTheme } = useTheme();
  const { colors: customColors } = useColorCustomizer(portfolio?.id || "");

useEffect(() => {
  setLoading(true);

  try {
    // For wouter, use window.location directly
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    // Try to get ID from query params first
    let portfolioId = params.get("id");

    // If not in query params, check if we're on a /view-portfolio/:id route
    if (!portfolioId && currentPath.startsWith("/view-portfolio/")) {
      // Extract ID from pathname
      const pathParts = currentPath.split("/");
      portfolioId = pathParts[pathParts.length - 1];
      
      // Decode if needed
      if (portfolioId) {
        portfolioId = decodeURIComponent(portfolioId);
      }
    }

    if (portfolioId) {
      const p = storage.getPortfolio(portfolioId);
      if (p) {
        setPortfolio(p);

        // Make sure these properties exist in your storage
        //  const t = TEMPLATES.find((tmpl) => tmpl.id === (p.template || p.templateId));
        const t = TEMPLATES.find((tmpl) => tmpl.id === ( p.templateId));
        const cs = t?.colorSchemes.find((scheme) => scheme.id === (p.colorScheme || "blue"));

        setTemplate(t || TEMPLATES[0]); // Default to first template
        setColorScheme(cs || t?.colorSchemes[0] || TEMPLATES[0].colorSchemes[0]);

        const savedTheme = localStorage.getItem(`portfolio-theme-${portfolioId}`);
        if (savedTheme) {
          setPortfolioTheme(savedTheme as "light" | "dark");
        }
        setLoading(false);
      } else {
        setLoading(false);
        setLocation("/my-portfolios");
      }
    } else {
      setLoading(false);
      setLocation("/my-portfolios");
    }
  } catch (error) {
    console.error("Error loading portfolio:", error);
    setLocation("/my-portfolios");
  }
}, [setLocation]);


  const handleDownloadCode = async () => {
    if (!portfolio) return;

    setDownloading(true);
    try {
      const project = generateNextJsProject(portfolio);
      const zip = new JSZip();

      // Add all files to the zip
      for (const [path, content] of Object.entries(project.files)) {
        zip.file(path, content as string);
      }

      // Generate the zip file
      const blob = await zip.generateAsync({ type: "blob" });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${project.projectName}-portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading code:", error);
      alert("Failed to download portfolio code. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const togglePortfolioTheme = () => {
    const newTheme = portfolioTheme === "light" ? "dark" : "light";
    setPortfolioTheme(newTheme);
    if (portfolio) {
      localStorage.setItem(`portfolio-theme-${portfolio.id}`, newTheme);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio || !template || !colorScheme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
         <ScrollToTop />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Portfolio not found</h2>
          <Link href="/my-portfolios">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Back to Portfolios
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const templateProps = {
      portfolio,
      template,
      colorScheme,
      customColors,
      theme: portfolioTheme,
    };

    switch (template.id) {
      case "professional":
        return <ProfessionalTemplate {...templateProps} />;
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      case "developer":
        return <DeveloperTemplate {...templateProps} />;
      default:
        return <ProfessionalTemplate {...templateProps} />;
    }
  };

  return (
    <div className={portfolioTheme === "dark" ? "dark" : ""}>
      {/* Floating Action Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4 flex-wrap">
          <Link href="/my-portfolios">
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </Link>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">{portfolio.name}</h1>
          <div className="flex gap-2 flex-wrap">
            {/* Portfolio Theme Toggle */}
            <button
              onClick={togglePortfolioTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={`Switch to ${portfolioTheme === "light" ? "dark" : "light"} mode`}
            >
              {portfolioTheme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Color Customizer */}
            {/* <ColorCustomizer portfolioId={portfolio.id} /> */}

            {/* Share Button */}
            <SharePortfolioModal
              portfolioId={portfolio.id}
              portfolioTitle={portfolio.name}
            />

            {/* Edit Button */}
            <Link href={`/create-portfolio?edit=${portfolio.id}`}>
              <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-semibold transition">
                Edit
              </button>
            </Link>

            {/* Download Code Button */}
            <button
              onClick={handleDownloadCode}
              disabled={downloading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Code2 className="w-4 h-4" />
                  Download Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="pt-16">
        {renderTemplate()}
      </div>

      {/* Download Info Modal */}
      {downloading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Generating Your Next.js Project
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Please wait while we prepare your portfolio code...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
