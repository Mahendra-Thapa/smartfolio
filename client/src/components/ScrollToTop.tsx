"use client";

import { useEffect } from "react";
import { usePathname } from "wouter/use-browser-location";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // no animation during load
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
