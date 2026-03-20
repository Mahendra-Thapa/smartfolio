import { Portfolio } from "@/lib/storage";
import {
  Briefcase,
  BriefcaseIcon,
  Code2,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ScrollToTop from "./ScrollToTop";

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
  const isDark = theme === "dark";

  const navItems = [
    "Home",
    "Skills",
    "Experience",
    "Projects",
    "Education",
    "Contact",
  ];

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-slate-900 text-white"
          : "min-h-screen bg-white text-slate-900"
      }
    >
      <ScrollToTop />

      {/* ==================== HEADER ==================== */}
      <header
        className={
          isDark
            ? "sticky top-0 z-50 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md"
            : "sticky top-0 z-50 bg-white/80 border-b border-slate-200 backdrop-blur-md"
        }
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href={`#home`}
              className="text-2xl font-semibold tracking-tight"
              style={{ color: primaryColor }}
            >
              {portfolio.name}
            </a>

            <nav className="hidden md:flex items-center gap-10">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-3 px-4 rounded-xl ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section
        id="home"
        className="py-24 lg:py-32"
        style={{
          backgroundColor: isDark ? `${primaryColor}10` : `${primaryColor}05`,
        }}
      >
        <div
          ref={heroRef.ref}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center md:justify-between items-center flex-wrap-reverse"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight md:mb-6 mb-3">
              {portfolio.name}
            </h2>
            <p
              className="text-2xl font-medium mb-4 md:mb-8"
              style={{ color: primaryColor }}
            >
              {portfolio.title}
            </p>
            <p
              className={`text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {portfolio.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-8 py-3.5 rounded-2xl font-semibold text-white transition hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                Get In Touch
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="px-8 py-3.5 rounded-2xl font-semibold border-2 transition hover:scale-105"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Call Me
              </a>
            </div>
          </div>
          <div>
            <img
              src={portfolio.personalImage}
              alt="Profile"
              className=" object-cover rounded-md pb-6 md:pb-0"
            />
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      {portfolio.skills.length > 0 && (
        <section
          id="skills"
          className={`py-20 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-4xl font-semibold mb-12">Skills</h3>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-6 py-4 rounded-2xl text-center font-medium transition-all border ${isDark ? "bg-slate-900 border-slate-700 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow"}`}
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  {skill}
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}
      {/* ==================== Qualification ==================== */}
      {portfolio.qualifications.length > 0 && (
        <section
          id="skills"
          className={`py-20 ${isDark ? "bg-slate-800" : "bg-blue-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-4xl font-semibold mb-12">Qualifications</h3>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.skills.map((qualification, idx) => (
                <div
                  key={idx}
                  className={`px-6 py-4 rounded-2xl text-center font-medium transition-all border ${isDark ? "bg-slate-900 border-slate-700 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow"}`}
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  {qualification}
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* ==================== EXPERIENCE ==================== */}
      {portfolio.experience.length > 0 && (
        <section
          id="experience"
          className={`py-20 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-4xl font-semibold mb-12">Experience</h3>
            </AnimatedSection>

            <div className="space-y-12">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 border rounded-md pl-8 py-2 ${isDark ? "border-slate-700" : "border-slate-500"}`}
                  style={{ borderColor: primaryColor }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                    <span className="font-semibold text-sm uppercase tracking-widest text-slate-500">
                      {exp.duration}
                    </span>
                    <h4 className="text-2xl font-semibold">{exp.position}</h4>
                  </div>
                  <p className="font-medium text-lg text-slate-600 dark:text-slate-400 mb-3">
                    {exp.company}
                  </p>
                  <p
                    className={`leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== PROJECTS ==================== */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section
          id="projects"
          className={`py-20 ${isDark ? "bg-slate-800" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-4xl font-semibold mb-12">Projects</h3>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl overflow-hidden border ${isDark ? "border-slate-700" : "border-slate-100"} hover:border-slate-300 transition-all group bg-white dark:bg-slate-800`}
                >
                  {project.image && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={(project.image as string) || "/placeholder.png"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    <h4 className="font-semibold text-xl mb-2">
                      {project.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                      {project.projectRole} • {project.projectDuration}
                    </p>
                    <p
                      className={`text-base leading-relaxed mb-6 line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    >
                      {project.description}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium"
                        style={{ color: primaryColor }}
                      >
                        View Project <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== EDUCATION ==================== */}
      {portfolio.education.length > 0 && (
        <section
          id="education"
          className={`py-20 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-4xl font-semibold mb-12">Education</h3>
            </AnimatedSection>

            <div className="space-y-12">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 pl-8 py-2 border rounded ${isDark ? "border-slate-700" : "border-slate-200"}`}
                  style={{ borderColor: primaryColor }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                    <span className="font-semibold text-sm uppercase tracking-widest text-slate-500">
                      {edu.year}
                    </span>
                    <h4 className="text-2xl font-semibold">{edu.degree}</h4>
                  </div>
                  <p className="font-medium text-lg text-slate-600 dark:text-slate-400 mb-2">
                    {edu.institution}
                  </p>
                  <p
                    className={`text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== CONTACT ==================== */}
      <section
        id="contact"
        className="py-20"
        style={{ backgroundColor: isDark ? "#0f172a" : "#f8fafc" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h3 className="text-4xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-lg max-w-md mx-auto mb-10 text-slate-600 dark:text-slate-400">
              Feel free to reach out for any opportunities or collaborations.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href={`mailto:${portfolio.email}`}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-semibold transition hover:scale-105"
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                <Mail size={22} /> Email Me
              </a>
              <a
                href={`tel:${portfolio.phone}`}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-semibold border-2 transition hover:scale-105"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <Phone size={22} /> Call Me
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className={`py-10 ${isDark ? "bg-slate-950" : "bg-slate-100"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </p>
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

  const navItems = [
    "Home",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Contact",
  ];
  const bgColor = isDark ? "#0f172a" : colorScheme.primary;

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <ScrollToTop />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-black text-white"
            >
              {portfolio.name}
            </a>

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
        <div
          ref={heroRef.ref}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex  justify-between items-center flex-wrap-reverse"
        >
          <div
            className={`max-w-2xl ${heroRef.isVisible ? "animate-visible" : "animate-slide-up"}`}
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
          <img src={portfolio.personalImage} alt="profile image" className="object-cover pb-6 md:pb-0" />
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

      {/* Qualification Section */}
      {portfolio.qualifications.length > 0 && (
        <section id="skills" className="py-12 sm:py-20 bg-white/5  border-t-2 ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-8 sm:mb-12">
                Qualifications
              </h3>
            </AnimatedSection>
            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portfolio.qualifications.map((qualification, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition text-center"
                >
                  <p className="font-bold text-white text-sm sm:text-base">
                    {qualification}
                  </p>
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
  <section
    id="projects"
    className={`py-12 sm:py-20 ${isDark ? "bg-slate-800" : "bg-white/10"}`}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-white">
          Projects
        </h3>
      </AnimatedSection>
      <AnimatedList className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {portfolio.projects.map((project, idx) => (
            <div
              key={idx}
              className="relative flex flex-col h-full rounded-xl overflow-hidden border-l-4 border-[#1250ca] shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Card content */}
              <div className="relative flex flex-col flex-1 p-4 gap-2 z-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition dark:bg-slate-800">
                
                {/* Image */}
                {project.image && (
                  <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg">
                    <img
                      src={project.image || "/placeholder.png"}
                      alt={project.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Title */}
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {project.name}
                </h4>

                {/* Role */}
                <p className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-100"}`}>
                  {project.projectRole}
                </p>

                {/* Duration */}
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-300"}`}>
                  {project.projectDuration}
                </p>

                {/* Description */}
                <p className={`text-sm sm:text-base leading-relaxed flex-1 ${isDark ? "text-slate-300" : "text-slate-200"}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologiesList && project.technologiesList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologiesList.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          isDark
                            ? "bg-slate-700 text-slate-200"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 text-sm font-semibold underline ${
                      isDark
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    } transition-colors`}
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
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
        <section
          id="education"
          className="py-12 sm:py-20 bg-white/5 text-white"
        >
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

  const navItems = [
    "Home",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Contact",
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
    >
      <ScrollToTop />
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${isDark ? "bg-slate-900/80" : "bg-white/80"} backdrop-blur-md border-b-4`}
        style={{ borderColor: colorScheme.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-black"
              style={{ color: colorScheme.primary }}
            >
              {portfolio.name}
            </a>

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
        <div ref={heroRef.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center md:justify-between flex-wrap-reverse ">
          <div
            className={` max-w-2xl ${heroRef.isVisible ? "animate-visible" : "animate-slide-up"}`}
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
          <img src={portfolio.personalImage} alt="portfolio Image" className="object-cover md:pb-0 pb-6" />
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

      {/* Projects Section */}
      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section
          id="projects"
          className={`py-16 sm:py-24 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-4xl sm:text-5xl font-black tracking-tighter">
                  Projects
                </h3>
              </div>
            </AnimatedSection>

            <AnimatedList>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className={`group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-transparent hover:border-zinc-200 dark:hover:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full`}
                  >
                    {/* Image Container */}
                    {project.image && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={(project.image as string) || "/placeholder.png"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Project Icon */}
                        <div
                          className="absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md"
                          style={{
                            backgroundColor: `${colorScheme.primary}20`,
                          }}
                        >
                          <Code2
                            size={24}
                            style={{ color: colorScheme.primary }}
                            strokeWidth={2}
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {project.title}
                      </h4>

                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {project.projectRole}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                        {project.projectDuration}
                      </p>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* View Project Button */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group/btn"
                          style={{ color: colorScheme.primary }}
                        >
                          View Project
                          <ExternalLink
                            size={18}
                            className="transition-transform group-hover/btn:translate-x-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedList>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section
          id="experience"
          className={`py-16 sm:py-24 relative ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-4xl sm:text-5xl font-black tracking-tighter">
                  Experience
                </h3>
              </div>
            </AnimatedSection>

            <div className="relative  mx-auto">
              {/* Vertical Timeline Line */}
              <div
                className="absolute left-8 top-6 bottom-6 w-0.5"
                style={{ backgroundColor: colorScheme.primary + "30" }}
              />

              <AnimatedList className="space-y-16 relative">
                {portfolio.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-20 group">
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-[3px] border-white flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: colorScheme.primary,
                        boxShadow: `0 0 0 4px ${colorScheme.primary}20`,
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>

                    {/* Experience Card */}
                    <div
                      className={`relative p-8 rounded-3xl border transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                          : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                      }`}
                    >
                      {/* Duration Badge */}
                      <div
                        className="absolute -top-4 left-8 px-6 py-1.5 rounded-full text-sm font-bold text-white shadow-md whitespace-nowrap"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {exp.duration}
                      </div>
                      <div className="pt-6">
                        {/* Icon */}
                        <div className="mb-5 text-4xl opacity-80">
                          <BriefcaseIcon className="w-8 h-8" />
                        </div>
                        {/* Position */}
                        <h4 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                          {exp.position}
                        </h4>
                        {/* Company */}
                        <p
                          className={`font-semibold text-lg mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {exp.company}
                        </p>
                        {/* Description */}
                        <p
                          className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
                        >
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section
          id="education"
          className={`py-16 sm:py-24 relative ${isDark ? "bg-slate-900" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ backgroundColor: colorScheme.primary }}
                ></div>
                <h3 className="text-4xl sm:text-5xl font-black tracking-tighter">
                  Education
                </h3>
              </div>
            </AnimatedSection>

            <div className="relative  mx-auto">
              {/* Vertical Timeline Line */}
              <div
                className="absolute left-8 top-6 bottom-6 w-0.5"
                style={{ backgroundColor: colorScheme.primary + "30" }}
              />

              <AnimatedList className="space-y-16 relative">
                {portfolio.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-20 group">
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-[3px] border-white flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: colorScheme.primary,
                        boxShadow: `0 0 0 4px ${colorScheme.primary}20`,
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>

                    {/* Education Card */}
                    <div
                      className={`relative p-8 rounded-3xl border transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                        isDark
                          ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                          : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                      }`}
                    >
                      {/* Year Badge */}
                      <div
                        className="absolute -top-4 left-8 px-6 py-1.5 rounded-full text-sm font-bold text-white shadow-md"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {edu.year}
                      </div>

                      <div className="pt-6">
                        {/* Icon */}
                        <div className="mb-4 text-4xl opacity-80">🎓</div>

                        {/* Degree */}
                        <h4 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                          {edu.degree}
                        </h4>

                        {/* Institution */}
                        <p
                          className={`font-semibold text-lg mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {edu.institution}
                        </p>

                        {/* Field & Extra Info */}
                        <p
                          className={`text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}
                        >
                          {edu.field}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <div className="p-4">
        <section
          id="contact"
          className="relative py-20 sm:py-28 overflow-hidden rounded-3xl border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}10 0%, transparent 50%)`,
            borderColor: `${colorScheme.primary}30`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: colorScheme.primary }}
            />
            <div
              className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: colorScheme.primary }}
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative text-center">
            <AnimatedSection>
              {/* Heading with accent */}
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-px bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: colorScheme.primary }}
                />
                <span
                  className="uppercase tracking-[4px] text-sm font-medium"
                  style={{ color: colorScheme.primary }}
                >
                  Get In Touch
                </span>
                <div
                  className="w-3 h-px bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: colorScheme.primary }}
                />
              </div>

              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-black to-zinc-700 bg-clip-text text-transparent">
                Let's Create Something
                <span
                  className="block -mt-2"
                  style={{ color: colorScheme.primary }}
                >
                  Together
                </span>
              </h3>

              <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto mb-12">
                Open for exciting opportunities, collaborations, or just a good
                conversation.
              </p>

              {/* Creative Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
                {/* Email Button */}
                <a
                  href={`mailto:${portfolio.email}`}
                  className="group relative flex-1 flex items-center justify-center gap-4 bg-white border-2 border-zinc-200 hover:border-zinc-300 rounded-3xl px-10 py-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                  style={{
                    boxShadow: `0 10px 30px -15px ${colorScheme.primary}60`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500"
                    style={{
                      background: `linear-gradient(45deg, ${colorScheme.primary}, transparent)`,
                    }}
                  />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${colorScheme.primary}15` }}
                  >
                    <span className="text-3xl">✉️</span>
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-xl text-black w-24">
                      Email Me
                    </p>
                    <p className="text-sm text-zinc-500">
                      Usually reply in &lt;24h
                    </p>
                  </div>
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${portfolio.phone}`}
                  className="group flex-1 flex items-center justify-center gap-4 border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white rounded-3xl px-10 py-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12">
                    <span className="text-3xl">☎️</span>
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-xl w-20">Call Me</p>
                    <p className="text-sm opacity-70 ">Let's talk live</p>
                  </div>
                </a>
              </div>

              {/* Subtle trust line */}
              <p className="mt-10 text-xs tracking-widest text-zinc-400 uppercase">
                Currently accepting new projects for 2026
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>

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

  const navItems = [
    "Home",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Contact",
  ];

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-slate-950 text-slate-50" : "bg-white text-slate-950"}`}
    >
      <ScrollToTop />

      {/* ==================== HEADER ==================== */}
      <header
        className={`sticky top-0 z-50 ${isDark ? "bg-slate-950/80" : "bg-white/80"} backdrop-blur-md border-b ${isDark ? "border-slate-800" : "border-slate-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="font-bold text-lg tracking-tight">
              {portfolio.name}
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
          
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section id="home" className="py-12 lg:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center md:justify-between">
          <AnimatedSection>
            <div className="space-y-8 max-w-4xl">
              <div className="space-y-6">
                <div
                  className="text-sm font-mono"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="opacity-70">{"<"}</span>developer
                  <span className="opacity-70">{">"}</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  {portfolio.name}
                </h1>
                <div
                  className="text-xl font-medium"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="font-mono text-sm opacity-70 mr-2">
                    title =
                  </span>
                  {portfolio.title}
                </div>
              </div>
              <p
                className={`text-lg leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {portfolio.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded font-medium text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  Get in Touch
                </a>
                <a
                  href={`tel:${portfolio.phone}`}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded font-medium border-2 transition-all ${isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-50"}`}
                  style={{ borderColor: colorScheme.primary }}
                >
                  Call Me
                </a>
              </div>

              <div
                className="text-sm font-mono"
                style={{ color: colorScheme.primary }}
              >
                <span className="opacity-70">{"</"}</span>developer
                <span className="opacity-70">{">"}</span>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection > <img src={portfolio.personalImage} alt="portfolio Image" className="object-cover md:pb-0 pb-6" /></AnimatedSection>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
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
                  <span className="opacity-70">{"<"}</span>skills
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-4xl font-bold">Technical Arsenal</h2>
              </div>
            </AnimatedSection>

            <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group  relative px-6 py-5 rounded-3xl font-semibold text-base text-center border transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3"
                  style={{
                    backgroundColor: isDark ? "#1f2937" : "#fff",
                    borderColor: `${colorScheme.primary}20`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0  transition-opacity "
                    style={{ backgroundColor: colorScheme.primary }}
                  />
                  <span className="relative z-10">{skill}</span>
                </div>
              ))}
            </AnimatedList>

            <div
              className="text-sm font-mono mt-10"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>skills
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* ==================== PROJECTS ==================== */}
      {portfolio.projects?.length > 0 && (
        <section
          id="projects"
          className={`py-20 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-12">
                <div
                  className="text-sm font-mono mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  <span className="opacity-70">{"<"}</span>projects
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-4xl font-bold">Featured Work</h2>
              </div>
            </AnimatedSection>

            <AnimatedList>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-transparent hover:border-zinc-200 dark:hover:border-slate-700 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full transition-all duration-500"
                  >
                    {project.image && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={(project.image as string) || "/placeholder.png"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div
                          className="absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${colorScheme.primary}15`,
                          }}
                        >
                          <Code2
                            size={28}
                            style={{ color: colorScheme.primary }}
                            strokeWidth={2}
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="font-bold text-xl mb-2">
                        {project.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {project.projectRole}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                        {project.projectDuration}
                      </p>
                      <p className="text-sm leading-relaxed flex-1 text-slate-600 dark:text-slate-400 line-clamp-3">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 font-semibold text-sm"
                          style={{ color: colorScheme.primary }}
                        >
                          View Project <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedList>

            <div
              className="text-sm font-mono mt-12"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>projects
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* ==================== EXPERIENCE ==================== */}
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
                  <span className="opacity-70">{"<"}</span>experience
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-4xl font-bold">Work History</h2>
              </div>
            </AnimatedSection>

            <div className="relative  mx-auto">
              <div
                className="absolute left-8 top-6 bottom-6 w-0.5"
                style={{ backgroundColor: `${colorScheme.primary}30` }}
              />
              <AnimatedList className="space-y-16">
                {portfolio.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-20 group">
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950"
                      style={{ backgroundColor: colorScheme.primary }}
                    />
                    <div
                      className={`p-8 rounded-3xl border transition-all group-hover:-translate-y-1 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}
                    >
                      <div
                        className="absolute -top-4  px-6 py-1.5 rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {exp.duration}
                      </div>
                      <div className="pt-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                          style={{
                            backgroundColor: `${colorScheme.primary}15`,
                          }}
                        >
                          <Briefcase
                            size={40}
                            style={{ color: colorScheme.primary }}
                            strokeWidth={1.75}
                          />
                        </div>
                        <h4 className="text-2xl font-bold mb-3">
                          {exp.position}
                        </h4>
                        <p className="font-semibold text-lg mb-4 text-slate-600 dark:text-slate-300">
                          @ {exp.company}
                        </p>
                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>

            <div
              className="text-sm font-mono mt-12"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>experience
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* ==================== EDUCATION ==================== */}
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
                  <span className="opacity-70">{"<"}</span>education
                  <span className="opacity-70">{">"}</span>
                </div>
                <h2 className="text-4xl font-bold">Learning Journey</h2>
              </div>
            </AnimatedSection>

            <div className="relative mx-auto">
              <div
                className="absolute left-8 top-6 bottom-6 w-0.5"
                style={{ backgroundColor: `${colorScheme.primary}30` }}
              />
              <AnimatedList className="space-y-16">
                {portfolio.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-20 group">
                    <div
                      className="absolute left-6 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950"
                      style={{ backgroundColor: colorScheme.primary }}
                    />
                    <div
                      className={`p-8 rounded-3xl border transition-all group-hover:-translate-y-1 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}
                    >
                      <div
                        className="absolute  -top-4  px-6 py-1.5 rounded-full text-sm font-bold text-primary dark:text-white"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {edu.year}
                      </div>
                      <div className="pt-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                          style={{
                            backgroundColor: `${colorScheme.primary}15`,
                          }}
                        >
                          <GraduationCap
                            size={40}
                            style={{ color: colorScheme.primary }}
                            strokeWidth={1.75}
                          />
                        </div>
                        <h4 className="text-2xl font-bold mb-3">
                          {edu.degree}
                        </h4>
                        <p className="font-semibold text-lg mb-4 text-slate-600 dark:text-slate-300">
                          {edu.institution}
                        </p>
                        <p className="text-base text-slate-600 dark:text-slate-400">
                          {edu.field}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>

            <div
              className="text-sm font-mono mt-12"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>education
              <span className="opacity-70">{">"}</span>
            </div>
          </div>
        </section>
      )}

      {/* ==================== CONTACT ==================== */}
      <section
        id="contact"
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}08 0%, transparent)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div
              className="text-sm font-mono mb-4"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"<"}</span>connect
              <span className="opacity-70">{">"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Let's Build Something
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10 opacity-90">
              Open for opportunities, collaborations, or just a good tech
              conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
              <a
                href={`mailto:${portfolio.email}`}
                className="flex-1 flex items-center justify-center gap-4 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-3xl px-8 py-6 hover:-translate-y-1 transition-all group"
                style={{
                  boxShadow: `0 10px 30px -10px ${colorScheme.primary}40`,
                }}
              >
                <div
                  className="w-18 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${colorScheme.primary}15` }}
                >
                  <Mail size={32} style={{ color: colorScheme.primary }} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-xl">Email Me</p>
                  <p className="text-sm text-slate-500">
                    Fast reply guaranteed
                  </p>
                </div>
              </a>

              <a
                href={`tel:${portfolio.phone}`}
                className="flex-1 flex items-center justify-center gap-4 border-2 border-slate-900 dark:border-white rounded-3xl px-8 py-6 hover:bg-slate-900 hover:text-white transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center">
                  <Phone size={32} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-xl">Call Me</p>
                  <p className="text-sm opacity-70">Let's talk live</p>
                </div>
              </a>
            </div>

            <div
              className="text-sm font-mono mt-12"
              style={{ color: colorScheme.primary }}
            >
              <span className="opacity-70">{"</"}</span>connect
              <span className="opacity-70">{">"}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        className={`py-8 text-center ${isDark ? "bg-slate-950" : "bg-blue-800"}`}
        style={{ backgroundColor: colorScheme.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xl text-white font-mono">
            <span className="opacity-70">{"</"}</span>portfolio
            <span className="opacity-70">{">"}</span>
          </div>
          <p
            className={`text-sm mt-4 ${isDark ? "text-slate-400" : "text-slate-300"}`}
          >
            © {new Date().getFullYear()} {portfolio.name}. Built with
            Smartfolio.
          </p>
        </div>
      </footer>
    </div>
  );
}
