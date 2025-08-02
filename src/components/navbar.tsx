"use client";
import LogoWithCompanyName from "./logoWithCompanyName";
import { NavigationMenuDemo } from "./navbar-new";

const Navbar = () => {
  return (
    <header>
      <nav className="sticky top-0 z-50 pt-5">
        <div className="max-w-screen-2xl w-full mx-auto px-5 2xl:px-0">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <LogoWithCompanyName />
            <NavigationMenuDemo />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
