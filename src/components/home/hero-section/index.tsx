import React from "react";
import heroData from "../../../../data/home-page/home-page.json";
import Image from "next/image";
import BannerSectionDetail from "@/components/common/section-detail";

const HeroSection: React.FC = () => {
  const isBtnShow = true;
  const page = "home";
  const heroSection = heroData[page]?.heroSection || [];

  return (
    <article className="relative before:content-[''] before:absolute before:-top-20 before:bottom-0 before:right-0 before:bg-[#F3F3F3] before:w-[89vw]">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative py-20 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="relative w-full aspect-square -left-[12%]">
            {heroSection.map((item) => (
              <div key={item.id} className="overflow-hidden ">
                <Image
                  src={item.url}
                  alt={item.title1}
                  layout="fill"
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
