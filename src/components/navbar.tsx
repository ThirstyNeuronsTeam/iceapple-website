"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import LogoWithCompanyName from "./logoWithCompanyName"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
  }

  const toggleResources = () => {
    setResourcesOpen(!resourcesOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

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
  ]

  return (
    <nav className="sticky top-0 z-50 pt-5">
      <div className="container">
        <div className="flex justify-between items-center h-20 pl-5 md:pl-25 md:pr-5 box-border">
          {/* Logo */}
         
          <LogoWithCompanyName/>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 pt-10">
            {navLinks.map((link, index) => {
              if (link.submenu) {
                return (
                  <div key={index} className="relative group">
                    <button
                      className={`flex items-center text-gray-700 hover:text-blue-600 ${pathname.includes(link.path) ? "text-blue-600 font-semibold" : ""
                        }`}
                      onClick={link.name === "Services" ? toggleServices : toggleResources}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {link.submenu.map((sublink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sublink.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`text-gray-700 hover:text-blue-600 ${isActive(link.path) ? "text-blue-600 font-semibold" : ""
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link, index) => {
              if (link.submenu) {
                return (
                  <div key={index} className="py-2">
                    <button
                      className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 ${pathname.includes(link.path) ? "text-blue-600 font-semibold" : ""
                        }`}
                      onClick={link.name === "Services" ? toggleServices : toggleResources}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {(link.name === "Services" && servicesOpen) || (link.name === "Resources" && resourcesOpen) ? (
                      <div className="pl-8 mt-2 space-y-2">
                        {link.submenu.map((sublink, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sublink.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              }
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`block px-4 py-2 text-gray-700 hover:text-blue-600 ${isActive(link.path) ? "text-blue-600 font-semibold" : ""
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
