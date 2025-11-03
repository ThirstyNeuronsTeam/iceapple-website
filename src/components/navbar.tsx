"use client";
import { useEffect, useState } from "react";
import LogoWithCompanyName from "./logoWithCompanyName";
import { MenuSection } from "./menu-section";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 8;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 100);

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY - lastScrollY > SCROLL_THRESHOLD) {
        setIsVisible(false);
      } else if (lastScrollY - currentScrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`${
        scrolled ? "bg-white shadow-md pb-2 sm:pb-5" : "bg-transparent"
      } sticky top-0 z-50 pt-2 sm:pt-5 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      role="banner"
    >
      <nav role="navigation" aria-label="Main navigation">
        <div className="w-full mx-auto px-5 2xl:px-0 3xl:px-5 container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <LogoWithCompanyName />
            <MenuSection />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
