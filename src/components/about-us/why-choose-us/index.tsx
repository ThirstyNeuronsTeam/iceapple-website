"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import CardWithImageSection from "@/components/common/card-with-image";

type whyChooseUsProps = {
  subHeading: string;
  heading: string;
  contentClassName?: string;
  contents: string[];
  sectionBg: string;
  info: {
    cardImage: string;
    cardTitle: string;
    cardBoxDescription: string;
  }[];
};

const WhyChooseUsSection: React.FC<whyChooseUsProps> = ({
  subHeading,
  heading,
  contents,
  info,
}) => {
  return (
    <article>
      <div className="relative pb-20 xl:pb-50">
        <div className="w-full mx-auto px-5 2xl:px-0 container relative">
          <div className="relative pt-5 sm:pt-20 pb-5 mx-auto text-center z-10">
            <HeadingSectionDetail
              align="center"
              contentClassName="max-w-3xl mx-auto"
              subHeading={subHeading}
              heading={heading}
              contents={contents}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20 xl:place-items-center">
            <CardWithImageSection
              sectionClass="last:col-span-1 flex justify-center"
              sectionContentClass="min-h-auto sm:min-h-[180px]"
              sectionBodyClass="px-4 sm:px-8 xl:px-15 py-5 sm:py-8 xl:py-12 bg-white"
              cardWithImageData={{ info }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default WhyChooseUsSection;
