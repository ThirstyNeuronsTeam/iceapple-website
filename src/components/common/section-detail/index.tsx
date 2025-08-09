import React from "react";
import pageData from "../../../../data/home-page/home-page.json";
import Link from "next/link";

interface HeroSectionProps {
  isBtnShow: boolean;
  page: "home";
}

const BannerSectionDetail: React.FC<HeroSectionProps> = ({
  isBtnShow,
  page,
}) => {
  const heroSection = pageData[page]?.heroSection || [];

  return (
    <div className="relative z-10 h-full flex order-1 sm:order-2">
      <div className="w-full max-w-xl space-y-6">
        {heroSection.map((item) => (
          <div key={item.id} className="overflow-hidden">
            <div className="space-y-3 sm:space-y-6 lg:pl-10">
              <div className="text-[#0B68FF]">
                <h1 className="text-[28px] flex flex-col sm:text-7xl font-extrabold leading-none">
                  {item.title.map((section, index) => (
                    <div className="w-max" key={index}>
                      {section}
                    </div>
                  ))}
                </h1>
              </div>
              <p className="text-sm sm:text-2xl font-medium mb-4 sm:mb-11 w-3/4 sm:w-full">
                {item.content}
              </p>
              {isBtnShow && (
                <Link
                  href={item.btnurl}
                  className="bg-[#002656] text-white px-5 py-2 sm:px-18 sm:py-8 shadow text-xs sm:text-lg hover:bg-blue-800 transition-all inline-block"
                >
                  {item.btntext}
                </Link>
              )}
            </div>
            <span className="absolute -right-10 top-1/2 transform -rotate-90 text-xl tracking-wide hidden lg:block font-bold">
              Scroll Down
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSectionDetail;
