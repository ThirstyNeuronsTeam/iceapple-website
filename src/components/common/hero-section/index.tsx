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
      className="relative before:content-[''] before:absolute before:-top-20 before:bottom-80 sm:before:bottom-0 before:right-0 before:bg-[#F3F3F3] sm:before:w-[89vw] before:w-[80vw]"
    >
      <div className="relative w-full mx-auto">
  <div className="flex flex-col-reverse sm:grid sm:grid-cols-[50%_50%]  py-12 ">
    
    {/* Text Section */}
    <BannerSectionDetail
      title={title}
      content={content}
      btntext={btntext}
      btnurl={btnurl}
      isBtnShow={isBtnShow}
      mainClassName={mainClassName}
    />

    {/* Image Section */}
    <div className="relative flex justify-center sm:justify-start">
      <Image
        src={url}
        alt=""
        width={1242}
        height={828}
        className="w-full max-w-md sm:max-w-none h-auto object-contain sm:object-cover"
        priority
      />
    </div>
  </div>
</div>


    </article>
  );
};

export default HeroSection;
