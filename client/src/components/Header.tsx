import { Link } from "wouter";
import { Sparkles, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { usePathname } from "wouter/use-browser-location";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  let pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/templates", label: "Templates" },
    { href: "/contact", label: "Contact" },
    { href: "/my-portfolios", label: "My Portfolios" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                className="dark:hidden "
                height={100}
                width={120}
                src="/lightLogo.png"
                alt="logo"
              />
              <img
                className="dark:block hidden "
                height={100}
                width={120}
                src="/darkLogo.png"
                alt="logo"
              />
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Sparkles className="w-6 h-6 text-white" />
              </div> */}
              {/* <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartFolio
              </span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <a
                  href={link.href}
                  className={`relative group font-medium transition-colors  ${
                    pathname === link.href
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }  `}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300  ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}   `}
                  />
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* CTA Button */}
            <Link href="/create-portfolio">
              <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#04296c] to-blue-600 hover:from-[#04296c] hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                <Sparkles className="w-4 h-4" />
                Create
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={` block px-4 py-2 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  } `}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/create-portfolio">
              <button
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all"
                onClick={() => setIsOpen(false)}
              >
                Create Portfolio
              </button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
