"use client";
import LogoWithCompanyName from "./logoWithCompanyName";
import { MenuSection } from "./menu-section";

const Navbar = () => {
  return (
    <header>
      <nav className="sticky top-0 z-50 pt-5">
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
