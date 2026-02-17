import { Link } from "wouter";
import {
  Sparkles,
  Menu,
  X,
  Moon,
  Sun,
  UserPlus,
  LogIn,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { usePathname } from "wouter/use-browser-location";
import { clearCookies, getTokenFromCookies } from "@/utils/cookies";
import toast from "react-hot-toast";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  let pathname = usePathname();
  const token = getTokenFromCookies();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/templates", label: "Templates" },
    { href: "/contact", label: "Contact" },
    { href: "/my-portfolios", label: "My Portfolios" },
  ];

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Promise.resolve()
      .then(() => {
        clearCookies(); // your function
        toast.dismiss();
        toast.success("Logout successful");

        setTimeout(() => {
          window.location.href = "/";
        }, 800); // small delay for UX
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Logout failed. Please try again.");
      });
  };

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
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group font-medium transition-colors ${
                  pathname === link.href
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
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

            {token ? (
              <div className="flex gap-2 items-center justify-center">
                <Link href="/create-portfolio">
                  <button
                    type="button"
                    className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#04296c] to-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create
                  </button>
                </Link>
                <div className="relative" ref={menuRef}>
                  {/* Profile Button */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="  w-10 h-10  rounded-full  overflow-hidden  border border-gray-200  hover:scale-105  transition-all duration-200"
                  >
                    <img
                      src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Dropdown */}
                  {open && (
                    <div className="  absolute right-0 mt-2  w-44 bg-white  rounded-xl  shadow-lg  border border-gray-100  py-2 z-50 ">
                      {/* <button className="  w-full text-left  px-4 py-2  text-sm text-gray-700  hover:bg-gray-50 ">
                        Profile
                      </button> */}

                      <button
                        className="  w-full text-left  px-4 py-2  text-sm text-red-500  hover:bg-red-50  flex items-center gap-2 font-semibold"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/signin">
                <button
                  type="button"
                  className="hidden md:flex items-center gap-2 px-6 py-2.5
          bg-gradient-to-r from-[#04296c] to-blue-600
          hover:to-blue-700 text-white rounded-lg font-semibold
          transition-all rounded shadow-md hover:shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </Link>
            )}

            {/* Create Account */}
            {/* <Link href="/signup">
              <button
                type="button"
                className="hidden md:flex items-center gap-2 px-6 py-2.5
          bg-gradient-to-r from-[#04296c] to-blue-600
          hover:to-blue-700 text-white rounded-lg font-semibold
          transition-all shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </button>
            </Link> */}

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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div>
              {token ? (
                <Link href="/create-portfolio">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5
          bg-gradient-to-r from-[#04296c] to-blue-600
          hover:to-blue-700 text-white rounded-lg font-semibold
          transition-all shadow-md hover:shadow-lg"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Portfolio
                  </button>
                </Link>
              ) : (
                <Link href="/signin">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5
          bg-gradient-to-r from-[#04296c] to-blue-600
          hover:to-blue-700 text-white rounded-lg font-semibold
          transition-all shadow-md hover:shadow-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
