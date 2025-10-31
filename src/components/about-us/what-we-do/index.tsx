"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type whatWeDoProps = {
  subHeading: string;
  heading: string;
  contentClassName: string;
  content: string;
  imageOne: string;
  imageTwo: string;
};

const WhatWeDoSection: React.FC<whatWeDoProps> = ({
  subHeading,
  heading,
  contentClassName,
  content,
  imageOne,
  imageTwo,
}) => {
  const deviceType = useDeviceType();

  return (
    <article>
      <div className="relative after:content-[''] after:absolute after:top-0 sm:after:bottom-0 after:bottom-[70%] after:left-0 after:bg-[#F3F3F3] pb-15 sm:pb-30 after:w-full z-0 after:-z-10">
        <div className="w-full mx-auto px-5 2xl:px-0 container relative">
          <div className="relative pt-5 sm:pt-20 pb-5 pl-0 sm:pl-30 max-w-2xl xl:max-w-4xl text-left sm:text-right z-10">
            <HeadingSectionDetail
              align="smRight"
              contentClassName={contentClassName}
              subHeading={subHeading}
              heading={heading}
            />
          </div>
          <div className="sm:-mt-[7%] relative z-0 flex flex-col gap-5">
            <div className="sm:bg-white py-10 sm:px-15 sm:py-10 lg:py-30 max-w-3xl xl:ml-10 order-2 sm:order-1">
              <p className="text-sm sm:text-lg leading-6 sm:leading-10 font-inter sm:font-main lg:pr-30 xl:pr-0 text-black">
                {content}
              </p>
            </div>

            <div className="relative sm:absolute right-0 top-0 z-10 w-full sm:w-1/4 order-1 sm:order-2 pb-20 sm:pb-0">
              {["desktop", "mobile"].includes(deviceType) ? (
                <div className="relative aspect-3/2 sm:aspect-square w-[50%] sm:w-auto">
                  <Image src={imageTwo} fill alt="What we do - Decorative illustration" />
                </div>
              ) : (
                ""
              )}
              {deviceType === "mobile" ? (
                <div className="absolute -right-[-5%] bottom-[0%] top-[2%] z-10 w-3/5 transform scale-x-[-1]">
                  <div className="relative aspect-square">
                    <Image src={imageOne} fill alt="What we do - Background illustration" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {["desktop"].includes(deviceType) ? (
            <div className="absolute right-[10%] xl:right-[15%] -bottom-[18%] z-10 w-2/6 xl:w-2/5">
              <div className="relative aspect-square">
                <Image src={imageOne} fill alt="What we do - Background illustration" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </article>
  );
};

export default WhatWeDoSection;
