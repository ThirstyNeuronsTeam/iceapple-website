import LogoWithCompanyName from "@/components/logoWithCompanyName";
import Link from "next/link";
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
  return (
    <>
      <div className="mt-9 sm:mt-40 px-5 sm:px-0 mx-auto container">
        <div className="flex flex-col gap-4 md:flex-row font-inter mb-14 sm:mb-20">
          <div className="sm:w-[35%] order-1">
            <LogoWithCompanyName />
            <p className="sm:w-2/3 mt-4 sm:mt-10 text-sm sm:text-2xl">
              {footerData.address}
            </p>
          </div>
          <div className="flex gap-4 w-[full] sm:w-[40%] order-3 sm:order-2 text-sm sm:text-lg">
            <div className="w-1/2">
              <ul className="grid grid-cols-1 gap-4">
                {footerData.menuItems?.map((item, index) => (
                  <li key={index}>
                    <Link href={item.menuUrl}>{item.menuName}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <ul className="grid grid-cols-1 gap-4">
                <li className="font-semibold">{footerData.menuTitle}</li>
                {footerData.menuItemsTwo?.map((item, index) => (
                  <li key={index}>
                    <Link href={item.menuUrl}>{item.menuName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-sm sm:text-2xl sm:w-[25%] order-2 sm:order-3">
            <div className="grid grid-cols-1 gap-1 sm:gap-10">
              {footerData.companyInfo?.map((item, index) => (
                <Link key={index} href={item.menuUrl}>
                  {item.menuName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-0 mx-auto container">
        <hr className="border-1 border-[#696969]" />
        <p className="font-inter text-sm sm:text-lg text-center my-11">
          {footerData.copyRight}
        </p>
      </div>
    </>
  );
};

export default Footer;
