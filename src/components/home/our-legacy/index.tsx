"use client";
import React from "react";
import content from "../../../../data/home-page/home-page.json";
import HeadingSectionDetail from "@/components/common/heading";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type LegacyProps = {
  legacyData: {
    timeLine: {
      id: number;
      year: string;
      description: string;
      bgColor: string;
      align: string;
      zIndex: string;
      aboveZIndex: string;
      alignMiddle: string;
    }[];
  };
};

const OurLegacySection: React.FC<LegacyProps> = ({ legacyData }) => {
  const deviceType = useDeviceType();

  return (
    <article className="relative">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative sm:pl-40 pt-0 sm:pt-20 sm:pb-15 max-w-xl text-left">
          <HeadingSectionDetail
            align="left"
            headingData={content.home.ourLegacySection}
          />
        </div>
      </div>
      <div className="sm:bg-white">
        <div className="mx-auto px-6 pb-16 pt-6 sm:pt-0 sm:pb-80 container">
          <div className="relative z-10">
            {legacyData.timeLine.map((item) => (
              <div key={item.id}>
                {item.align === "right" ? (
                  <div
                    style={{ ["--z-index" as any]: item.zIndex }}
                    className={`flex flex-col w-1/2 sm:w-full ml-auto sm:grid sm:grid-cols-[1fr_auto_1fr] justify-end sm:items-center relative z-[${item.aboveZIndex}] z-[var(--z-index)]`}
                  >
                    <>
                      <div></div>
                      <div
                        style={{ ["--triangle-color" as any]: item.bgColor }}
                        className={`bg-[var(--triangle-color)] w-[75px] sm:w-[200px] h-[30px] sm:h-[110px] flex text-white justify-center ${
                          deviceType === "mobile"
                            ? "items-center"
                            : `items-${item.alignMiddle} sm:before:block before:content-[''] sm:before:absolute sm:before:-bottom-[54px] before:border-l-[100px] before:border-l-transparent before:border-r-[100px] before:border-r-transparent before:border-t-[55px] before:border-t-[var(--triangle-color)] sm:before:transform-[rotate(0deg)]`
                        } text-sm sm:text-[36px] sm:font-bold font-inter sm:font-main relative z-0 before:hidden`}
                      >
                        {item.year}
                      </div>
                      <div className="pl-5 sm:pl-40 pt-2 sm:pt-0 relative sm:before:content-[''] sm:before:absolute sm:before:w-[120px] sm:before:h-[1px] before:bg-[#000] sm:before:left-0 sm:before:top-0 sm:before:bottom-0 sm:before:m-auto sm:before:transform-[rotate(0deg)] border-l-black sm:border-l-none border-l-[1px] sm:border-0">
                        <p className="text-sm sm:text-base font-inter tracking-[1px]">
                          {item.description}
                        </p>
                      </div>
                    </>
                  </div>
                ) : (
                  ""
                )}

                {item.align === "left" ? (
                  <div
                    style={{ ["--z-index" as any]: item.zIndex }}
                    key={item.id}
                    className={`flex flex-col-reverse w-1/2 sm:w-full sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center text-right sm:text-left relative z-[${item.aboveZIndex}] z-[var(--z-index)]`}
                  >
                    <>
                      <div className="pr-5 sm:pr-40 pt-2 sm:pt-0 relative sm:before:content-[''] sm:before:absolute sm:before:w-[120px] sm:before:h-[1px] before:bg-[#000] sm:before:right-0 sm:before:top-0 sm:before:bottom-0 sm:before:m-auto sm:before:transform-[rotate(0deg)] border-r-black sm:border-r-none border-r-[1px] sm:border-0">
                        <p className="text-sm sm:text-base font-inter tracking-[1px]">
                          {item.description}
                        </p>
                      </div>
                      <div
                        style={{ ["--triangle-color" as any]: item.bgColor }}
                        className={`bg-[var(--triangle-color)] w-[75px] sm:w-[200px] h-[30px] sm:h-[110px] flex text-white justify-center ${
                          deviceType === "mobile" ? "items-center" : "items-end"
                        } ml-auto sm:ml-0 text-sm sm:text-[36px] sm:font-bold font-inter sm:font-main relative z-0 before:z-10 sm:before:content-[''] sm:before:absolute sm:before:-bottom-[54px] sm:before:border-l-[100px] sm:before:border-l-transparent sm:before:border-r-[100px] sm:before:border-r-transparent sm:before:border-t-[55px] before:border-t-[var(--triangle-color)] sm:before:transform-[rotate(0deg)]`}
                      >
                        {item.year}
                      </div>
                      <div></div>
                    </>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurLegacySection;
