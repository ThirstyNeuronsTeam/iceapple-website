import React from "react";
import Image from "next/image";
import BannerSectionDetail from "@/components/common/banner-section-detail";

type HeadingSectionProps = {
  sectionId: string;
  id: number;
  title: string[];
  content: string;
  btntext?: string;
  btnurl?: string;
  url: string;
  isBtnShow?: boolean;
  mainClassName?: string;
};

const HeroSection: React.FC<HeadingSectionProps> = ({
  title,
  content,
  btntext,
  btnurl,
  url,
  isBtnShow,
  mainClassName,
  sectionId,
}) => {
  return (
    <article
      id={sectionId}
      className="relative before:content-[''] before:absolute before:top-0 before:h-1/2 sm:before:-top-20 sm:before:bottom-0 sm:before:h-auto before:right-0 before:bg-[#F3F3F3] sm:before:w-[89vw] before:w-[80vw]"
    >
      <div className="relative w-full mx-auto">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 py-12 items-center sm:items-center min-h-[500px] sm:min-h-[600px] gap-8 sm:gap-12">
          {/* Text Section */}
          <BannerSectionDetail
            title={title}
            content={content}
            btntext={btntext}
            btnurl={btnurl}
            isBtnShow={isBtnShow}
            mainClassName={`${mainClassName || ""} mt-6        `} // space only on mobile
            />

          {/* Image Section */}
          <div className="relative w-full h-[300px] sm:h-[600px] flex justify-center sm:justify-start -mt-20 sm:mt-0">
          <Image
              src={url}
              alt=""
              fill
              className="object-contain object-center rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
