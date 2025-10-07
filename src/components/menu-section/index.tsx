"use client";

import * as React from "react";
import { useState } from "react";
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
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSub(openSub === name ? null : name);
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
                      <Link href={link.path}>{link.name}</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-4">
                        <li>
                          {link.submenu.map((sublink, subIndex) => (
                            <NavigationMenuLink asChild key={subIndex}>
                              <Link href={sublink.path}>{sublink.name}</Link>
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
                    <Link href={link.path}>{link.name}</Link>
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
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full overflow-y-auto">
            <div className="items-start w-full max-w-full">
              <div className="w-3/4 p-15 flex flex-col gap-y-3 relative before:content-[''] before:absolute before:-top-0 before:bottom-0 before:left-0 before:right-0 before:bg-[#F3F3F3] before:-z-1">
                {navLinks
                  .filter((link) => link.name !== "Services")
                  .map((link, index) => {
                    if (link.submenu) {
                      return (
                        <div key={index}>
                          <button
                            onClick={() => toggleSubmenu(link.name)}
                            className="flex items-center justify-between w-full font-medium text-lg py-4"
                          >
                            <span>{link.name}</span>
                            {openSub === link.name ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
                          </button>

                          {openSub === link.name && (
                            <div className="pl-4 mt-2 space-y-2">
                              {link.submenu.map((sublink, subIndex) => (
                                <div key={subIndex}>
                                  <Link
                                    onClick={() => setOpen(false)}
                                    href={sublink.path}
                                    className="block py-3"
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
                        className="block font-medium text-lg py-4"
                      >
                        {link.name}
                      </Link>
                    );
                  })}
              </div>
              <div className="p-10 font-medium">
                {navLinksMobile.map((link, index) => {
                  return (
                    <div key={index}>
                      <Link
                        onClick={() => setOpen(false)}
                        key={index}
                        href={link.path}
                        className="block text-[#0B68FF] text-sm"
                      >
                        {link.name}
                      </Link>
                      <div className="mt-4 space-y-4">
                        {link.submenu.map((sublink, subIndex) => (
                          <div key={subIndex}>
                            <Link
                              onClick={() => setOpen(false)}
                              href={sublink.path}
                              className="block font-medium shadow-[0_2px_20px_rgba(0,0,0,20%)] px-2 py-5 text-center"
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
          </SheetContent>
        </Sheet>
      ) : (
        ""
      )}
    </>
  );
}
