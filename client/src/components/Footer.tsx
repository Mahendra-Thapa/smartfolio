import { Link } from "wouter";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black dark:from-slate-950 dark:to-black text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <img height={100} width={120} src="/darkLogo.png" alt="logo" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create professional portfolios in minutes without any coding or
              design skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/templates", label: "Templates" },
                { href: "/contact", label: "Contact" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Documentation" },
                { href: "/", label: "FAQ" },
                { href: "/", label: "Blog" },
                { href: "/", label: "Support" },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:info@smartfolio.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  info@smartfolio.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:+1234567890"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +977-9804647727
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400">
                  Tinkune, Kathmandu, Nepal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 dark:border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-slate-400 text-sm">
            © {currentYear} SmartFolio. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(social => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all"
                  title={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
