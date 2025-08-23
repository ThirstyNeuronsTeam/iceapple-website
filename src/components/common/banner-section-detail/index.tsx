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
  return (
    <div
      className={clsx(
        mainClassName,
        "relative z-10 h-full flex order-1 sm:order-2"
      )}
    >
      <div className="w-full max-w-xl space-y-6">
        <div className="overflow-hidden">
          <div className="space-y-3 sm:space-y-6 lg:pl-10">
            <div className="text-[#0B68FF]">
              <h1 className="text-[28px] flex flex-col sm:text-7xl font-extrabold leading-none">
                {title?.map((item, index) => (
                  <div className="w-max" key={index}>
                    {item}
                  </div>
                ))}
              </h1>
            </div>
            <p className="text-sm sm:text-2xl font-medium mb-4 sm:mb-11 w-3/4 sm:w-full">
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
          <span className="absolute right-10 top-1/2 transform -rotate-90 text-xl tracking-wide hidden lg:block font-bold">
            Scroll Down
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerSectionDetail;
