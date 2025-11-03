"use client";

import * as React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

import { useDeviceType } from "../../../hooks/useDeviceType";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  {
    name: "Services",
    path: "/services",
    submenu: [
      { name: "Intelligent Apps", path: "/services/intelligent-apps" },
      { name: "Intelligent Devices", path: "/services/intelligent-devices" },
    ],
  },
  { name: "Industries", path: "/industries" },
  {
    name: "Resources",
    path: "",
    submenu: [
      { name: "Blogs", path: "/resources/blogs" },
      { name: "Case Studies", path: "/resources/case-studies" },
    ],
  },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact-us" },
];
const navLinksMobile = [
  {
    name: "Services",
    path: "/services",
    submenu: [
      { name: "Intelligent Apps", path: "/services/intelligent-apps" },
      { name: "Intelligent Devices", path: "/services/intelligent-devices" },
    ],
  },
];

export function MenuSection() {
  const deviceType = useDeviceType();
  const pathname = usePathname();
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSub(openSub === name ? null : name);
  };

  const isLinkActive = (link: typeof navLinks[number]) => {
    // If link has a path, match root exactly, otherwise check startsWith for sections
    if (link.path) {
      if (link.path === "/") return pathname === "/";
      return pathname?.startsWith(link.path);
    }

    // If no path but has submenu, check sublinks
    if (link.submenu) {
      return link.submenu.some((s) => (s.path === "/" ? pathname === "/" : pathname?.startsWith(s.path)));
    }

    return false;
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      {deviceType === "desktop" ? (
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="2xl:gap-14 xl:gap-8">
            {navLinks.map((link, index) => {
              if (link.submenu) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="bg-transparent 2xl:text-xl">
                      <NavigationMenuLink
                    asChild
                    className={
                      (navigationMenuTriggerStyle(),
                        "bg-transparent font-medium 2xl:text-xl")
                    }
                  >
                    <Link href={link.path} className={`hover:!text-[#0B68FF] ${isLinkActive(link) ? '!text-[#0B68FF]' : ''}`}>
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-4">
                        <li>
                          {link.submenu.map((sublink, subIndex) => (
                            <NavigationMenuLink asChild key={subIndex}>
                              <Link
                                href={sublink.path}
                                className={`hover:!text-[#0B68FF] ${pathname?.startsWith(sublink.path) ? '!text-[#0B68FF]' : ''}`}
                              >
                                {sublink.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }
              return (
                  <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={
                      (navigationMenuTriggerStyle(),
                        "bg-transparent font-medium 2xl:text-xl")
                    }
                  >
                    <Link href={link.path} className={`hover:!text-[#0B68FF] ${isLinkActive(link) ? '!text-[#0B68FF]' : ''}`}>
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        ""
      )}

      {/* Mobile Navigation */}
      {["tablet", "mobile"].includes(deviceType) ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full overflow-y-auto">
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              <div className="items-start w-full max-w-full">
                <div className="w-3/4 py-4 p-15 flex flex-col gap-y-3 relative before:content-[''] before:absolute before:-top-0 before:bottom-0 before:left-0 before:right-0 before:bg-[#F3F3F3] before:-z-1">
                {
                  navLinks
                    .filter((link) => link.name !== "Services")
                    .map((link, index) => {
                      if (link.submenu) {
                        return (
                          <div key={index}>
                            <button
                              onClick={() => toggleSubmenu(link.name)}
                              aria-expanded={openSub === link.name}
                              aria-controls={`submenu-${link.name.replace(' ', '-').toLowerCase()}`}
                              className={`flex justify-between w-full font-medium text-lg py-4 hover:!text-[#0B68FF] focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                              <span className="hover:!text-[#0B68FF]">{link.name}</span>
                              {openSub === link.name ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
                            </button>

                            {openSub === link.name && (
                              <div
                                id={`submenu-${link.name.replace(' ', '-').toLowerCase()}`}
                                className="pl-4 mt-2 space-y-2"
                                role="menu"
                              >
                                {link.submenu.map((sublink, subIndex) => (
                                  <div key={subIndex}>
                                    <Link
                                      onClick={() => setOpen(false)}
                                      href={sublink.path}
                                      className={`block py-3 hover:!text-[#0B68FF] focus:outline-none focus:ring-2 focus:ring-blue-500 ${pathname?.startsWith(sublink.path) ? '!text-[#0B68FF] underline' : ''}`}
                                      role="menuitem"
                                    >
                                      {sublink.name}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return (
                        <Link
                          onClick={() => setOpen(false)}
                          key={index}
                          href={link.path}
                          className={`block font-medium text-lg py-4 hover:!text-[#0B68FF] focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLinkActive(link) ? '!text-[#0B68FF] underline' : ''}`}
                        >
                          {link.name}
                        </Link>
                      );
                    })
                }

              </div>
              <div className="p-10 font-medium">
                {navLinksMobile.map((link, index) => {
                  return (
                    <div key={index}>
                      <Link
                        onClick={() => setOpen(false)}
                        key={index}
                        href={link.path}
                        className={`block text-[#0B68FF] text-sm hover:underline ${isLinkActive(link) ? 'underline' : ''}`}
                      >
                        {link.name}
                      </Link>
                      <div className="mt-4 space-y-4">
                        {link.submenu.map((sublink, subIndex) => (
                          <div key={subIndex}>
                            <Link
                              onClick={() => setOpen(false)}
                              href={sublink.path}
                              className={`block font-medium shadow-[0_2px_20px_rgba(0,0,0,20%)] px-2 py-5 text-center hover:!text-[#0B68FF] ${pathname?.startsWith(sublink.path) ? '!text-[#0B68FF]' : ''}`}
                            >
                              {sublink.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        ""
      )}
    </>
  );
}
