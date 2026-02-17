// RoleProtectedRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getUserFromCookies } from "@/utils/cookies";

interface RoleProtectedRouteProps {
  children: ReactNode;
  publicRoute?: boolean; // for routes that don't require login
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  publicRoute = false,
}) => {
  const [location, setLocation] = useLocation() as [string, (path: string) => void];
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = getUserFromCookies(); // decode JWT from cookie
    const role = user?.roles?.[0]; // "ROLE_USER" or "ROLE_ADMIN"

    const publicPaths = ["/", "/about", "/contact", "/templates", "/signin", "/signup", "/404"];

    // 1️⃣ PUBLIC ROUTES
    if (publicRoute || publicPaths.includes(location)) {
      if (role) {
        // Logged-in users cannot access signin/signup
        if (location === "/signin" || location === "/signup") {
          if (role === "ROLE_USER") setLocation("/");
          else if (role === "ROLE_ADMIN") setLocation("/admin/dashboard");
          return;
        }

        // Admin is strictly blocked from all public routes
        if (role === "ROLE_ADMIN") {
          setLocation("/admin/dashboard");
          return;
        }
      }
      setReady(true);
      return;
    }

    // 2️⃣ PRIVATE ROUTE: not logged in
    if (!role) {
      setLocation("/signin");
      return;
    }

    // 3️⃣ ROLE_USER: cannot access admin
    if (role === "ROLE_USER") {
      if (location.startsWith("/admin")) {
        setLocation("/"); // strictly block admin routes
      } else {
        setReady(true);
      }
      return;
    }

    // 4️⃣ ROLE_ADMIN: STRICTLY ONLY /admin/*
    if (role === "ROLE_ADMIN") {
      if (!location.startsWith("/admin")) {
        setLocation("/admin/dashboard"); // block any non-admin path
      } else {
        setReady(true);
      }
      return;
    }

    // 5️⃣ fallback
    setLocation("/signin");
  }, [location, setLocation]);

  if (!ready) return <div />; // prevent rendering before redirect

  return <div>{children}</div>; // wrap children to avoid fragment issues
};

export default RoleProtectedRoute;
