"use client";
import { useEffect, useState } from "react";
import LogoWithCompanyName from "./logoWithCompanyName";
import { MenuSection } from "./menu-section";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // toggle when scroll passes 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={` ${
        scrolled ? "bg-white shadow-md pb-2 sm:pb-5" : "bg-transparent"
      } sticky top-0 z-50 pt-2 sm:pt-5 transition-all`}
    >
      <nav>
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
