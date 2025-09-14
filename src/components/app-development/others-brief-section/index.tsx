"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type OthersServicesProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  servicesData: {
    services: {
      id: number;
      title: string;
      imgSrc: string;
      sectionName: string;
      alignRight: boolean;
    }[];
  };
};

const OthersServicesSection: React.FC<OthersServicesProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  servicesData,
}) => {
  const deviceType = useDeviceType();

  return (
    <article className="relative mt-30 pb-10 sm:pb-50 after:content-[''] after:absolute after:top-[13%] sm:after:top-[30%] after:bottom-0 after:right-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] z-0 after:-z-10">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-0 sm:pt-20 pb-5 sm:pb-0 text-right">
          <HeadingSectionDetail
            align="right"
            headingWidth="lg"
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="mx-auto px-6 py-4 pb-16 sm:py-16 container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-20">
          {servicesData.services.map((item) => {
            return (
              <div
                id="item.id"
                className="relative z-0 aspect-video before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgba(0,0,0,0.6)] before:z-10"
              >
                <Image src={item.imgSrc} alt="" fill objectFit="cover" />
                <h3 className="text-[22px] sm:text-7xl text-white font-bold absolute bottom-10 left-10 z-20">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default OthersServicesSection;
