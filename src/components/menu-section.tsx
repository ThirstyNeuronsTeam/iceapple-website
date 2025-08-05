"use client";

import * as React from "react";
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
import { Menu } from "lucide-react";

const navLinks = [
  { name: "About Us", path: "/about-us" },
  {
    name: "Services",
    path: "/services",
    submenu: [
      { name: "App Development", path: "/services/app-development" },
      { name: "Data Science Services", path: "/services/data-science" },
      { name: "DevOps Services", path: "/services/devops" },
    ],
  },
  { name: "Industries", path: "/industries" },
  {
    name: "Resources",
    path: "/resources",
    submenu: [
      { name: "Blog", path: "/resources/blog" },
      { name: "Case Study", path: "/resources/case-study" },
    ],
  },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact-us" },
];

export function MenuSection() {
  return (
    <>
      <NavigationMenu className="hidden md:flex" viewport={false}>
        <NavigationMenuList className="2xl:gap-14 xl:gap-8">
          {navLinks.map((link, index) => {
            if (link.submenu) {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="bg-transparent 2xl:text-xl">
                    {link.name}
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
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[75%] sm:w-[60%]">
            <NavigationMenu className="items-start" viewport={false}>
              <NavigationMenuList className="items-start">
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link, index) => {
                    if (link.submenu) {
                      return (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuTrigger>
                            {link.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                              <li>
                                {link.submenu.map((sublink, subIndex) => (
                                  <NavigationMenuLink asChild key={subIndex}>
                                    <Link href={sublink.path}>
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
                          className={navigationMenuTriggerStyle()}
                        >
                          <Link href={link.path}>{link.name}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </nav>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
