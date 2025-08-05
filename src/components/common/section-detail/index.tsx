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
    <div className="relative z-10 h-full flex">
      <div className="w-full max-w-xl space-y-6">
        {heroSection.map((item) => (
          <div key={item.id} className="overflow-hidden">
            <div className="space-y-6 lg:pl-10">
              <div className="text-[#0B68FF]">
                <h1 className="text-7xl font-extrabold leading-none">
                  {item.title1}
                </h1>
                <div className="text-7xl font-extrabold leading-none">
                  {item.title2}
                </div>
                <div className="text-7xl font-extrabold leading-none">
                  {item.title3}
                </div>
              </div>
              <p className="text-2xl font-medium mb-11">{item.content}</p>
              {isBtnShow && (
                <Link
                  href={item.btnurl}
                  className="bg-[#002656] text-white px-18 py-8 shadow text-lg hover:bg-blue-800 transition-all inline-block"
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
