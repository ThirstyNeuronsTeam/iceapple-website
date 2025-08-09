import React from "react";
import heroData from "../../../../data/home-page/home-page.json";
import Image from "next/image";
import BannerSectionDetail from "@/components/common/section-detail";

const HeroSection: React.FC = () => {
  const isBtnShow = true;
  const page = "home";
  const heroSection = heroData[page]?.heroSection || [];

  return (
    <article className="relative before:content-[''] before:absolute before:-top-20 before:bottom-80 sm:before:bottom-0 before:right-0 before:bg-[#F3F3F3] sm:before:w-[89vw] before:w-[80vw]">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative py-20 sm:grid flex flex-col lg:grid-cols-2 gap-6 sm:items-start items-end grid-column-end">
          <div className="relative w-full aspect-square -left-[12%] order-2 sm:order-1">
            {heroSection.map((item) => (
              <div key={item.id} className="overflow-hidden ">
                <Image
                  src={item.url}
                  alt=""
                  fill
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <BannerSectionDetail isBtnShow={isBtnShow} page={page} />
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
