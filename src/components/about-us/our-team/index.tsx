"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";
import clsx from "clsx";

type ourTeamProps = {
  subHeading: string;
  heading: string;
  contentClassName?: string;
  contents: string[];
  sectionBg: string;
  teamOne: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamTwo: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamThree: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamFour: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamFive: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamSix: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  teamSeven: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
};

const OurTeamSection: React.FC<ourTeamProps> = ({
  subHeading,
  heading,
  contents,
  sectionBg,
  teamOne,
  teamTwo,
  teamThree,
  teamFour,
  teamFive,
  teamSix,
  teamSeven,
}) => {
  return (
    <article>
      <div className="relative pt-0 sm:pt-40 after:content-[''] after:absolute sm:after:bottom-0 after:left-0 after:right-0 after:bg-[#F3F3F3] pb-50 after:w-full z-0 after:-z-10 sm:after:h-200">
        <div
          className="hidden sm:flex bg-cover bg-center w-[400px] h-[600px] absolute top-[5%] right-0 -z-[1]"
          style={{ backgroundImage: `url(${sectionBg})` }}
        />
        <div className="w-full mx-auto px-5 2xl:px-0 container relative">
          <div className="relative pt-5 sm:pt-20 pb-5 max-w-4xl mx-auto text-center z-10">
            <HeadingSectionDetail
              align="center"
              contentClassName="max-w-2xl mx-auto"
              subHeading={subHeading}
              heading={heading}
              contents={contents}
            />
          </div>
        </div>
        <div className="relative container mx-auto px-5 2xl:px-0">
          <div className="flex sm:justify-center w-full">
            <div className="w-full sm:w-xl sm:max-w-xl font-inter relative">
              <div className="bg-[#F5F5F5] pt-8 sm:pt-14 pb-10 sm:pb-17 px-8 sm:px-10 w-3/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamOne.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamOne.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] top-0 right-0">
                <Image objectFit="cover" fill src={teamOne.image} alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full justify-between mt-10">
            <div className="w-full sm:w-xl max-w-xl font-inter relative flex justify-end sm:justify-center mt-25 sm:mt-0">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-17 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamTwo.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamTwo.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] -top-[75%] left-0 -z-[1]">
                <Image objectFit="cover" fill src={teamTwo.image} alt="" />
              </div>
            </div>
            <div className="w-full sm:w-xl max-w-xl font-inter flex justify-end sm:justify-center sm:pt-80 relative sm:absolute left-0 right-0 mx-auto order-3 sm:order-2 mt-35 sm:mt-0">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-7 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamThree.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamThree.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] -top-[80%] sm:top-[15%] left-0 sm:left-0 sm:right-0 mx-auto -z-[1]">
                <Image objectFit="cover" fill src={teamThree.image} alt="" />
              </div>
            </div>
            <div className="w-full sm:w-xl max-w-xl font-inter relative flex sm:justify-center order-2 sm:order-3 mt-40 sm:mt-0">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-7 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamFour.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamFour.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] -top-[75%] right-0 -z-[1]">
                <Image objectFit="cover" fill src={teamFour.image} alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full justify-between mt-0 sm:mt-70">
            <div className="w-full sm:w-xl max-w-xl font-inter relative flex justify-end sm:justify-start mt-30 sm:mt-0 order-2 sm:order-2">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-17 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamFive.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamFive.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] -top-[75%] left-0 sm:right-30 -z-[1]">
                <Image objectFit="cover" fill src={teamFive.image} alt="" />
              </div>
            </div>
            <div className="w-full sm:w-xl max-w-xl font-inter flex sm:mt-20 pt-30 pb-10 relative sm:absolute z-0 left-0 right-0 mx-auto bg-white order-1 sm:order-2">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-7 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamSix.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamSix.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] top-[10%] right-0 mx-auto -z-[1]">
                <Image objectFit="cover" fill src={teamSix.image} alt="" />
              </div>
            </div>
            <div className="w-full sm:w-xl max-w-xl font-inter relative flex sm:justify-center mt-35 sm:mt-0 order-3 sm:order-3">
              <div className="bg-[rgba(245,245,245,0.8)] pt-4 sm:pt-14 pb-4 sm:pb-7 px-8 sm:px-10 w-4/5 max-w-xs">
                <h5 className="text-base sm:text-3xl font-bold tracking-[3px]">
                  {teamSeven.name}
                </h5>
                <p className="text-sm sm:text-lg tracking-[1px]">
                  {teamSeven.description}
                </p>
              </div>
              <div className="absolute w-[146px] sm:w-[280px] h-[146px] sm:h-[280px] -top-[75%] right-0 -z-[1]">
                <Image objectFit="cover" fill src={teamSeven.image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurTeamSection;
