"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

type HeroSectionProps = {
  mainClassName?: string;
  title?: string[];
  content?: string;
  btntext?: string;
  btnurl?: string;
  isBtnShow?: boolean;
};

const BannerSectionDetail: React.FC<HeroSectionProps> = ({
  mainClassName,
  title,
  content,
  btntext,
  btnurl,
  isBtnShow,
}) => {
  const handleScroll = () => {
    const hero = document.getElementById("hero");
    const afterHero = hero?.nextElementSibling as HTMLElement;
    afterHero?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={clsx(
        mainClassName,
        // Responsive flex direction tweaks for smaller screens
        "relative z-10 h-full sm:pt-16 flex flex-col sm:flex-row items-end sm:items-center order-1 sm:order-2"
      )}
    >
      <div className="w-full sm:max-w-none space-y-6 pr-4 ml-auto sm:ml-0">
        <div className="overflow-hidden">
          <div className="space-y-3 sm:space-y-6 lg:pl-10 text-right sm:text-left">
            <div className="text-[#0B68FF]">
              <h1 className="flex flex-col items-end sm:items-start font-extrabold leading-none text-[clamp(1.75rem,4vw,4.5rem)] break-words max-w-full">
                {title?.map((item, index) => (
                  <div className="w-max" key={index}>
                    {item}
                  </div>
                ))}
              </h1>
            </div>
            <p className="font-medium mb-4 sm:mb-11 w-3/4 sm:w-full text-[clamp(0.875rem,1.5vw,1.5rem)] ml-auto sm:ml-0">
              {content}
            </p>
            {isBtnShow && btnurl && btntext && (
              <Link
                href={btnurl}
                className="bg-[#002656] text-white px-5 py-2 sm:px-18 sm:py-8 shadow text-xs sm:text-lg hover:bg-blue-800 transition-all inline-block"
              >
                {btntext}
              </Link>
            )}
          </div>
        </div>
        {/* Hide "Scroll Down" button on screens smaller than xl */}
        <span
          onClick={handleScroll}
          className="cursor-pointer absolute right-4 xl:right-10 top-auto bottom-6 xl:bottom-auto xl:top-1/4 transform -rotate-90 text-xl tracking-wide font-bold hidden xl:block"
        >
          Scroll Down
        </span>
      </div>
    </div>
  );
};

export default BannerSectionDetail;
