import { Portfolio } from "@/lib/storage";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const TEMPLATES = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and minimal design for corporate professionals",
    colorSchemes: [
      { id: "blue", name: "Blue", primary: "#2563eb", secondary: "#1e40af" },
      { id: "slate", name: "Slate", primary: "#475569", secondary: "#1e293b" },
      { id: "green", name: "Green", primary: "#059669", secondary: "#047857" },
    ],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with bold typography",
    colorSchemes: [
      { id: "dark", name: "Dark", primary: "#1f2937", secondary: "#111827" },
      {
        id: "purple",
        name: "Purple",
        primary: "#7c3aed",
        secondary: "#6d28d9",
      },
      {
        id: "orange",
        name: "Orange",
        primary: "#ea580c",
        secondary: "#c2410c",
      },
    ],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Colorful and artistic design for creative professionals",
    colorSchemes: [
      {
        id: "vibrant",
        name: "Vibrant",
        primary: "#ec4899",
        secondary: "#db2777",
      },
      {
        id: "sunset",
        name: "Sunset",
        primary: "#f97316",
        secondary: "#ea580c",
      },
      { id: "ocean", name: "Ocean", primary: "#0ea5e9", secondary: "#0284c7" },
    ],
  },
  {
    id: "developer",
    name: "Developer",
    description: "Colorful and artistic design for Developer professionals",
    colorSchemes: [
      {
        id: "vibrant",
        name: "Vibrant",
        primary: "#3b82f6",
        secondary: "#db2777",
      },
      {
        id: "sunset",
        name: "Ocean",
        primary: "#f97316",
        secondary: "#091742",
      },
      { id: "ocean", name: "Ocean", primary: "#3b82f6", secondary: "#091742" },
    ],
  },
];

interface PortfolioTemplateProps {
  portfolio: Portfolio;
  template: (typeof TEMPLATES)[0];
  colorScheme: (typeof TEMPLATES)[0]["colorSchemes"][0];
  customColors?: { primary: string; secondary: string; accent: string };
  theme?: "light" | "dark";
}

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-visible" : "animate-slide-up"}`}
    >
      {children}
    </div>
  );
}

// Animated List Component
function AnimatedList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-stagger" : ""}`}
    >
      {children}
    </div>
  );
}

// Professional Template
export function ProfessionalTemplate({
  portfolio,
  colorScheme,
  customColors,
  theme = "light",
}: PortfolioTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useScrollAnimation();
  const primaryColor = customColors?.primary || colorScheme.primary;
  const secondaryColor = customColors?.secondary || colorScheme.secondary;

  const navItems = ["Home", "About", "Skills", "Experience", "Contact"];
  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-slate-900 text-white"
          : "min-h-screen bg-white text-slate-900"
      }
    >
      {/* Header */}
      <header
        className={
          isDark
            ? "sticky top-0 z-50 bg-slate-900/80 border-slate-700/50 backdrop-blur-md border-b"
            : "sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50"
        }
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl sm:text-2xl font-bold"
              style={{ color: primaryColor }}
            >
              {portfolio.name}
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${isDark ? "text-slate-300 hover:text-white font-medium" : "text-slate-600 hover:text-slate-900 font-medium"} transition relative group`}
                >
                  {item}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: primaryColor }}
                  ></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block px-4 py-2 ${isDark ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"} rounded-lg transition`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-12 sm:py-20 lg:py-32"
        style={{
          backgroundColor: isDark ? `${primaryColor}15` : `${primaryColor}10`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heroRef.ref}
            className={`max-w-3xl ${heroRef.isVisible ? "animate-visible" : "animate-slide-up"}`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {portfolio.name}
            </h2>
            <p
              className="text-xl sm:text-2xl font-semibold mb-6"
              style={{ color: primaryColor }}
            >
              {portfolio.title}
            </p>
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              {portfolio.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-6 py-3 rounded-lg font-semibold text-white text-center transition hover:shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                Get In Touch
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="px-6 py-3 rounded-lg font-semibold text-center transition border-2 hover:shadow-lg"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Call Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section
          id="skills"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
                Skills
              </h3>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 hover:bg-slate-600" : "bg-white border-slate-200 hover:bg-slate-50"} hover:shadow-md transition text-center`}
                >
                  <p className="font-semibold text-sm sm:text-base">{skill}</p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section
          id="experience"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-900" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
                Experience
              </h3>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="border-l-4 pl-4 sm:pl-6"
                  style={{ borderColor: primaryColor }}
                >
                  <h4 className="text-xl sm:text-2xl font-bold mb-1">
                    {exp.position}
                  </h4>
                  <p
                    className={`font-semibold mb-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {exp.company}
                  </p>
                  <p
                    className={`text-sm mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {exp.duration}
                  </p>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section
          id="about"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
                Education
              </h3>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border-l-4 pl-4 sm:pl-6"
                  style={{ borderColor: primaryColor }}
                >
                  <h4 className="text-xl sm:text-2xl font-bold mb-1">
                    {edu.degree}
                  </h4>
                  <p
                    className={`font-semibold mb-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {edu.field} • {edu.year}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-20 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Let's Connect
            </h3>
            <p className="text-base sm:text-lg mb-8 opacity-90">
              Feel free to reach out for any opportunities or collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                Email Me
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Call Me
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 ${isDark ? "bg-slate-950 text-slate-300" : "bg-slate-900 text-white"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 {portfolio.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Modern Template with dark mode
export function ModernTemplate({
  portfolio,
  colorScheme,
  theme = "light",
}: PortfolioTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useScrollAnimation();
  const isDark = theme === "dark";

  const navItems = ["Home", "About", "Skills", "Experience", "Contact"];
  const bgColor = isDark ? "#0f172a" : colorScheme.primary;

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {portfolio.name}
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-white font-bold transition"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-12 sm:py-20 lg:py-32 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heroRef.ref}
            className={`max-w-3xl ${heroRef.isVisible ? "animate-visible" : "animate-slide-up"}`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4">
              {portfolio.name}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold mb-6 opacity-90">
              {portfolio.title}
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-80">
              {portfolio.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition text-center"
                style={{ color: bgColor }}
              >
                Get In Touch
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition text-center"
              >
                Call Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section id="skills" className="py-12 sm:py-20 bg-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-8 sm:mb-12">
                Skills
              </h3>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition text-center"
                >
                  <p className="font-bold text-white text-sm sm:text-base">
                    {skill}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section id="experience" className="py-12 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-12">
                Experience
              </h3>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition"
                >
                  <h4 className="text-xl sm:text-2xl font-black mb-1">
                    {exp.position}
                  </h4>
                  <p className="font-bold mb-1 opacity-90">{exp.company}</p>
                  <p className="text-sm opacity-70 mb-3">{exp.duration}</p>
                  <p className="text-sm sm:text-base leading-relaxed opacity-80">
                    {exp.description}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section id="about" className="py-12 sm:py-20 bg-white/5 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-12">
                Education
              </h3>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <h4 className="text-xl sm:text-2xl font-black mb-1">
                    {edu.degree}
                  </h4>
                  <p className="font-bold mb-1 opacity-90">{edu.institution}</p>
                  <p className="text-sm opacity-70">
                    {edu.field} • {edu.year}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black/30 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 {portfolio.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Creative Template with dark mode
export function CreativeTemplate({
  portfolio,
  colorScheme,
  theme = "light",
}: PortfolioTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useScrollAnimation();
  const isDark = theme === "dark";

  const navItems = ["Home", "About", "Skills", "Experience", "Contact"];

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${isDark ? "bg-slate-900/80" : "bg-white/80"} backdrop-blur-md border-b-4`}
        style={{ borderColor: colorScheme.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl sm:text-2xl font-black"
              style={{ color: colorScheme.primary }}
            >
              {portfolio.name}
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-bold transition hover:opacity-70"
                  style={{ color: colorScheme.primary }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              style={{ color: colorScheme.primary }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block px-4 py-2 rounded-lg transition ${isDark ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                  style={{ color: colorScheme.primary }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-12 sm:py-20 lg:py-32 text-white"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heroRef.ref}
            className={`max-w-3xl ${heroRef.isVisible ? "animate-visible" : "animate-slide-up"}`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4">
              {portfolio.name}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold mb-6 opacity-90">
              {portfolio.title}
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-80">
              {portfolio.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition text-center"
              >
                Get In Touch
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition text-center"
              >
                Call Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section
          id="skills"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-800" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <div
                  className="w-1 h-12"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-3xl sm:text-4xl font-black">Skills</h3>
              </div>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg text-white font-bold text-center text-sm sm:text-base transition hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  {skill}
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section
          id="experience"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <div
                  className="w-1 h-12"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-3xl sm:text-4xl font-black">Experience</h3>
              </div>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border-2 ${isDark ? "hover:bg-slate-800" : "hover:bg-white"} hover:shadow-lg transition`}
                  style={{ borderColor: colorScheme.primary }}
                >
                  <h4 className="text-xl sm:text-2xl font-black mb-1">
                    {exp.position}
                  </h4>
                  <p
                    className={`font-bold mb-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {exp.company}
                  </p>
                  <p
                    className={`text-sm mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {exp.duration}
                  </p>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section
          id="about"
          className={`py-12 sm:py-20 ${isDark ? "bg-slate-800" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <div
                  className="w-1 h-12"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-3xl sm:text-4xl font-black">Education</h3>
              </div>
            </AnimatedSection>
            <AnimatedList className="space-y-6 sm:space-y-8">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border-2 ${isDark ? "hover:bg-slate-700" : "hover:bg-white"} hover:shadow-lg transition`}
                  style={{ borderColor: colorScheme.primary }}
                >
                  <h4 className="text-xl sm:text-2xl font-black mb-1">
                    {edu.degree}
                  </h4>
                  <p
                    className={`font-bold mb-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {edu.field} • {edu.year}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-8 text-white"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 {portfolio.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Developer Template with dark mode

export function DeveloperTemplate({
  portfolio,
  colorScheme,
  theme = "light",
}: PortfolioTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const navItems = ["About", "Experience", "Skills", "Contact"];

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-slate-950 text-slate-50" : "bg-white text-slate-950"}`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${isDark ? "bg-slate-950/80" : "bg-white/20 shadow"} backdrop-blur-md border-b ${isDark ? "border-slate-800" : "border-slate-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-lg tracking-tight">
              {portfolio.name}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav
              className="md:hidden pb-4 space-y-2"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? "text-slate-300 hover:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="py-8 lg:py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-8 max-w-4xl">
              <div className="space-y-6">
                <div
                  className="text-sm font-mono"
                  style={{ color: colorScheme.primary }}
                >
                  {/* <span className="opacity-70">{"<"}</span>
                  <span>developer</span>
                  <span className="opacity-70">{">"}</span> */}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance leading-tight ">
                  {portfolio.name}
                </h1>
                <div
                  className="text-lg sm:text-xl font-medium"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="font-mono text-sm opacity-70 mr-2">
                    title =
                  </span>
                  {portfolio.title}
                </div>
              </div>
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {portfolio.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded font-medium transition-all hover:shadow-lg text-white"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  <span className="font-mono text-xs opacity-70">{"<"}</span>
                  Get in Touch
                  <span className="font-mono text-xs opacity-70">{"/>"}</span>
                </a>
                <a
                  href={`tel:${portfolio.phone}`}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded font-medium border-2 transition-colors ${
                    isDark
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}
                  style={{ borderColor: colorScheme.primary }}
                >
                  <span
                    className="font-mono text-xs opacity-70"
                    style={{ color: colorScheme.primary }}
                  >
                    {"<"}
                  </span>
                  <span style={{ color: colorScheme.primary }}>Call</span>
                  <span
                    className="font-mono text-xs opacity-70"
                    style={{ color: colorScheme.primary }}
                  >
                    {"/>"}
                  </span>
                </a>
              </div>
              <div
                className="text-sm font-mono pt-4"
                style={{ color: colorScheme.primary }}
              >
                {/* <span className="opacity-70">{"</"}</span>
                <span>developer</span>
                <span className="opacity-70">{">"}</span> */}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section
          id="skills"
          className={`py-20 ${isDark ? "bg-slate-900/30" : "bg-slate-50/50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-12">
                <div
                  className="text-sm font-mono mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="opacity-70">{"<"}</span>
                  <span>skills</span>
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Technical Arsenal
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-4 rounded font-medium text-sm transition-all hover:shadow-lg hover:-translate-y-1 text-center border ${
                    isDark
                      ? "bg-slate-800/40 border-slate-700/50 text-slate-200"
                      : "bg-white border-slate-200"
                  }`}
                  style={{ color: isDark ? "inherit" : colorScheme.primary }}
                >
                  <span className="font-mono text-xs opacity-50 mr-1">
                    {"<"}
                  </span>
                  {skill}
                  <span className="font-mono text-xs opacity-50 ml-1">
                    {"/>"}
                  </span>
                </div>
              ))}
            </AnimatedList>
            <div
              className="text-sm font-mono mt-8"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>
              <span>skills</span>
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section
          id="experience"
          className={`py-20 ${isDark ? "bg-slate-950/50" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-12">
                <div
                  className="text-sm font-mono mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="opacity-70">{"<"}</span>
                  <span>experience</span>
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">Work History</h2>
              </div>
            </AnimatedSection>
            <AnimatedList className="space-y-6">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded border-l-4 transition-all hover:shadow-md ${
                    isDark
                      ? "bg-slate-800/40 border-slate-700/50"
                      : "bg-slate-50/50 border-slate-300/50"
                  }`}
                  style={{ borderLeftColor: colorScheme.primary }}
                >
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-mono text-xs opacity-50"
                        style={{ color: colorScheme.primary }}
                      >
                        {"<"}
                      </span>
                      <h3 className="text-lg font-bold">{exp.position}</h3>
                      <span
                        className="font-mono text-xs opacity-50"
                        style={{ color: colorScheme.primary }}
                      >
                        {"/>"}
                      </span>
                    </div>
                    <p
                      style={{ color: colorScheme.primary }}
                      className="font-medium text-sm ml-4"
                    >
                      @ {exp.company}
                    </p>
                  </div>
                  <p
                    className={`text-xs mb-3 ml-4 font-mono opacity-50 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {exp.duration}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ml-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </AnimatedList>
            <div
              className="text-sm font-mono mt-8"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>
              <span>experience</span>
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section
          id="education"
          className={`py-20 ${isDark ? "bg-slate-900/30" : "bg-slate-50/50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-12">
                <div
                  className="text-sm font-mono mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="opacity-70">{"<"}</span>
                  <span>education</span>
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Learning Journey
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedList className="space-y-6">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded border-l-4 transition-all hover:shadow-md ${
                    isDark
                      ? "bg-slate-800/40 border-slate-700/50"
                      : "bg-white border-slate-300/50"
                  }`}
                  style={{ borderLeftColor: colorScheme.primary }}
                >
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-mono text-xs opacity-50"
                        style={{ color: colorScheme.primary }}
                      >
                        {"<"}
                      </span>
                      <h3 className="text-lg font-bold">{edu.degree}</h3>
                      <span
                        className="font-mono text-xs opacity-50"
                        style={{ color: colorScheme.primary }}
                      >
                        {"/>"}
                      </span>
                    </div>
                    <p
                      style={{ color: colorScheme.primary }}
                      className="font-medium text-sm ml-4"
                    >
                      {edu.institution}
                    </p>
                  </div>
                  <p
                    className={`text-sm ml-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    <span className="font-mono opacity-50">{edu.field}</span> •{" "}
                    <span className="font-mono opacity-50">{edu.year}</span>
                  </p>
                </div>
              ))}
            </AnimatedList>
            <div
              className="text-sm font-mono mt-8"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>
              <span>education</span>
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className={`py-16 text-center ${isDark ? "bg-slate-950" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div
            className="text-xl font-mono"
            style={{ color: colorScheme.primary }}
          >
            <span className="opacity-70">{"</"}</span>
            <span>portfolio</span>
            <span className="opacity-70">{">"}</span>
          </div>
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            © 2024 {portfolio.name}. Crafted with code.
          </p>
        </div>
      </footer>
    </div>
  );
}
