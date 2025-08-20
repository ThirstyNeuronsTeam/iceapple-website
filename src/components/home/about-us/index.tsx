"use client";
import React from "react";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";
import HeadingSectionDetail from "@/components/common/heading";
import content from "../../../../data/home-page/home-page.json";

type AboutUsProps = {
  aboutUsData: {
    aboutImageOne: string;
    aboutImageTwo: string;
    subHeading: string;
    heading: string;
    contents: string[];
    ourValues: {
      title: string;
      listItem: string[];
    }[];
  };
};

const AboutUs: React.FC<AboutUsProps> = ({ aboutUsData }) => {
  const deviceType = useDeviceType();

  return (
    <article className="relative before:hidden sm:before:block sm:before:content-[''] before:absolute before:-top-40 before:h-[500px] before:left-0 before:bg-[#ffffff] before:w-[49vw] after:content-[''] after:absolute after:bottom-0 sm:after:bottom-0 after:h-[248px] sm:after:h-[600px] after:left-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] after:-z-1 pt-20 pb-10 sm:pb-110 w-full">
      <div className="container mx-auto flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-3 gap-y-4 sm:gap-16">
        <div className="relative col-span-2 px-5 sm:px-40">
          <div className="relative aspect-[5/4] w-48 sm:w-full max-w-lg shadow-[0_6px_20px_rgba(0,0,0,40%)] sm:shadow-[0_42px_173px_rgba(0,0,0,70%)] overflow-hidden z-10">
            <Image
              src={aboutUsData.aboutImageTwo}
              alt="Tech Lens"
              fill
              className="object-cover"
            />
          </div>
          <div className="shadow-[0_6px_20px_rgba(0,0,0,40%)] sm:shadow-none absolute bottom-[55%] sm:bottom-[5%] right-5 sm:right-[2%] aspect-[5/4] w-48 sm:w-full max-w-lg overflow-hidden z-20">
            <Image
              src={aboutUsData.aboutImageOne}
              alt="AI Face"
              fill
              className="object-cover"
            />
          </div>
          {deviceType === "desktop"
            ? aboutUsData.ourValues.map((item, index) => (
                <div
                  key={index}
                  className="w-md sm:absolute -bottom-[25%] left-[5%] right-0 z-0 bg-white p-10 sm:pt-200"
                >
                  <h3 className="text-3xl font-bold mb-6">{item.title}</h3>
                  <ul className="grid grid-cols-1 gap-y-4 text-gray-700 text-lg list-disc pl-6 font-inter">
                    {item.listItem.map((list, index) => (
                      <li key={index}>{list}</li>
                    ))}
                  </ul>
                </div>
              ))
            : ""}
        </div>
        <div className="z-30 col-span-2 sm:col-span-1 px-5 sm:px-0">
          <HeadingSectionDetail
            contentClassName="pl-16"
            headingData={content.home.aboutUs}
          />
        </div>
        {deviceType === "mobile"
          ? aboutUsData.ourValues.map((item, index) => (
              <div
                className="bg-white p-5 text-right w-max self-end"
                key={index}
              >
                <h3 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-6">
                  {item.title}
                </h3>
                <ul className="flex flex-col items-end gap-y-2 text-gray-700 text-sm sm:text-lg list-disc pl-6 font-inter">
                  {item.listItem.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>
            ))
          : ""}
      </div>
    </article>
  );
};

export default AboutUs;
