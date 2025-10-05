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
    const hero = document.getElementById("hero"); // Hero should always have an id
    const afterHero = hero?.nextElementSibling as HTMLElement;
    afterHero?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={clsx(
        mainClassName,
        "relative z-10 h-full flex order-1 sm:order-2"
      )}
    >
      <div className="w-full max-w-[280px] sm:max-w-none space-y-6 pr-5 sm:pr-0 ms-auto">
        <div className="overflow-hidden">
          <div className="space-y-3 sm:space-y-6 lg:pl-10">
            <div className="text-[#0B68FF]">
              <h1 className="flex flex-col  font-extrabold leading-none text-[clamp(1.75rem,4vw,4.5rem)]">
                {title?.map((item, index) => (
                  <div className="w-max" key={index}>
                    {item}
                  </div>
                ))}
              </h1>
            </div>
            <p className="font-medium mb-4 sm:mb-11 w-3/4 sm:w-full text-[clamp(0.875rem,1.5vw,1.5rem)]">
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
          <span
            onClick={handleScroll}
            className="cursor-pointer absolute right-10 sm:top-3/4 xl:top-1/4 transform -rotate-90 text-xl tracking-wide hidden lg:block font-bold"
          >
            Scroll Down
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerSectionDetail;
