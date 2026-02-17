import { Link } from "wouter";
import { usePathname } from "wouter/use-browser-location";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/templates", label: "Templates", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-4">
      
      {/* Logo / Title */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">
          Admin Panel
        </h1>
        <p className="text-xs text-slate-500">
          Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menu.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  cursor-pointer transition-all
                  ${
                    active
                      ? "bg-gradient-to-r from-[#04296c] to-blue-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
