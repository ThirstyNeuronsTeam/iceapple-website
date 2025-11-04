"use client";
import LogoWithCompanyName from "@/components/logoWithCompanyName";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type FooterProps = {
  footerData: {
    address: string;
    menuItems: {
      id: number;
      menuName: string;
      menuUrl: string;
    }[];
    menuTitle: string;
    menuItemsTwo: {
      id: number;
      menuName: string;
      menuUrl: string;
    }[];
    companyInfo: {
      menuName: string;
      menuUrl: string;
    }[];
    copyRight: string;
  };
};
const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const pathname = usePathname();

  const isLinkActive = (menuUrl: string) => {
    if (menuUrl === "/") return pathname === "/";
    return pathname?.startsWith(menuUrl);
  };

  return (
    <>
  <div className="relative mt-9 sm:mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-4 md:flex-row font-inter mb-14 sm:mb-20">
          <div className="footer-logo-section sm:w-[35%] order-1">
            <div className="footer-logo-wrapper">
              <LogoWithCompanyName />
            </div>
            <p className="footer-address mt-4 sm:mt-10 text-sm sm:text-lg xl:text-2xl">
              {footerData.address}
            </p>
          </div>
          <div className="flex gap-4 w-[full] sm:w-[40%] order-3 sm:order-2 text-sm sm:text-lg">
            <div className="w-1/2">
              <ul className="grid grid-cols-1 gap-4">
                {footerData.menuItems?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.menuUrl}
                      className={`hover:!text-[#0B68FF] transition-colors ${isLinkActive(item.menuUrl) ? '!text-[#0B68FF]' : ''}`}
                    >
                      {item.menuName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <ul className="grid grid-cols-1 gap-4">
                <li className="font-semibold">{footerData.menuTitle}</li>
                {footerData.menuItemsTwo?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.menuUrl}
                      className={`hover:!text-[#0B68FF] transition-colors ${isLinkActive(item.menuUrl) ? '!text-[#0B68FF]' : ''}`}
                    >
                      {item.menuName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-sm sm:text-lg xl:text-2xl sm:w-[25%] order-2 sm:order-3">
            <div className="grid grid-cols-1 gap-1 sm:gap-10">
              {footerData.companyInfo?.map((item, index) => (
                <Link
                  key={index}
                  href={item.menuUrl}
                  className={`hover:!text-[#0B68FF] transition-colors ${isLinkActive(item.menuUrl) ? '!text-[#0B68FF]' : ''}`}
                >
                  {item.menuName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <hr className="border-1 border-[#696969] sm:mx-4 lg:mx-0" />
        <p className="font-inter text-sm sm:text-lg text-center my-11 px-4 sm:px-6 lg:px-0">
          {footerData.copyRight}
        </p>
      </div>
    </>
  );
};

export default Footer;
