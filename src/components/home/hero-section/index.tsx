import React from "react";
import content from "../../../../data/home-page/home-page.json";
import Image from "next/image";
import BannerSectionDetail from "@/components/common/banner-section-detail";

type HeadingSectionProps = {
  heroData: {
    url: string;
  };
};

const HeroSection: React.FC<HeadingSectionProps> = ({ heroData }) => {
  return (
    <article className="relative before:content-[''] before:absolute before:-top-20 before:bottom-80 sm:before:bottom-0 before:right-0 before:bg-[#F3F3F3] sm:before:w-[89vw] before:w-[80vw]">
      <div className="w-full mx-auto px-5 2xl:px-0">
        <div className="relative py-20 sm:grid flex flex-col lg:grid-cols-2 gap-6 sm:items-start items-end grid-column-end">
          <div className="relative w-full aspect-square order-2 sm:order-1">
            <div className="overflow-hidden ">
              <Image
                src={heroData.url}
                alt=""
                fill
                objectFit="cover"
                className="object-cover"
              />
            </div>
          </div>
          <BannerSectionDetail sectionData={content.home.heroSection} />
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
