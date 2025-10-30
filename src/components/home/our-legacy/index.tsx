"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type LegacyProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
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
interface CustomCSSProperties extends React.CSSProperties {
  "--z-index"?: number | string;
  "--triangle-color"?: string;
}

const OurLegacySection: React.FC<LegacyProps> = ({
  legacyData,
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  const deviceType = useDeviceType();

  return (
    <article className="relative md:mt-20 lg:mt-0">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pl-0 xl:pl-20 pt-0 sm:pt-20 sm:pb-15 max-w-xl text-left">
          <HeadingSectionDetail
            align="left"
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="sm:bg-white">
        <div className="mx-auto px-6 pb-16 pt-6 sm:pt-0 sm:pb-30 xl:pb-80 container">
          <div className="relative z-10">
            {legacyData.timeLine.map((item) => (
              <div key={item.id}>
                {item.align === "right" ? (
                  <div
                    style={
                      {
                        "--z-index": item.zIndex,
                      } as CustomCSSProperties
                    }
                    className={`flex flex-col w-1/2 xl:w-full ml-auto xl:grid xl:grid-cols-[1fr_auto_1fr] justify-end xl:items-center relative z-[${item.aboveZIndex}] z-[var(--z-index)]`}
                  >
                    <>
                      <div></div>
                      <div
                        style={
                          {
                            "--triangle-color": item.bgColor,
                          } as CustomCSSProperties
                        }
                        className={`bg-[var(--triangle-color)] w-[75px] sm:w-[200px] h-[30px] sm:h-[110px] flex text-white justify-center ${
                          deviceType === "mobile" || deviceType === "tablet"
                            ? "items-center"
                            : `items-${item.alignMiddle} sm:before:block before:content-[''] sm:before:absolute sm:before:-bottom-[54px] before:border-l-[100px] before:border-l-transparent before:border-r-[100px] before:border-r-transparent before:border-t-[55px] before:border-t-[var(--triangle-color)] sm:before:transform-[rotate(0deg)]`
                        } text-sm sm:text-[36px] sm:font-bold font-inter xl:font-main relative z-0 before:hidden`}
                      >
                        {item.year}
                      </div>
                      <div className="pl-5 xl:pl-40 pt-2 xl:pt-0 relative xl:before:content-[''] xl:before:absolute xl:before:w-[120px] xl:before:h-[1px] before:bg-[#000] xl:before:left-0 xl:before:top-0 xl:before:bottom-0 xl:before:m-auto xl:before:transform-[rotate(0deg)] border-l-black xl:border-l-none border-l-[1px] xl:border-0">
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
                    style={
                      {
                        "--z-index": item.zIndex,
                      } as CustomCSSProperties
                    }
                    key={item.id}
                    className={`flex flex-col-reverse w-1/2 xl:w-full xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center text-right xl:text-left relative z-[${item.aboveZIndex}] z-[var(--z-index)]`}
                  >
                    <>
                      <div className="pr-5 xl:pr-40 pt-2 xl:pt-0 relative xl:before:content-[''] xl:before:absolute xl:before:w-[120px] xl:before:h-[1px] before:bg-[#000] xl:before:right-0 xl:before:top-0 xl:before:bottom-0 xl:before:m-auto xl:before:transform-[rotate(0deg)] border-r-black xl:border-r-none border-r-[1px] xl:border-0">
                        <p className="text-sm sm:text-base font-inter tracking-[1px]">
                          {item.description}
                        </p>
                      </div>
                      <div
                        style={
                          {
                            "--triangle-color": item.bgColor,
                          } as CustomCSSProperties
                        }
                        className={`bg-[var(--triangle-color)] w-[75px] sm:w-[200px] h-[30px] sm:h-[110px] flex text-white justify-center ${
                          deviceType === "mobile" || deviceType === "tablet"
                            ? "items-center"
                            : "items-end"
                        } ml-auto xl:ml-0 text-sm sm:text-[36px] xl:font-bold font-inter xl:font-main relative z-0 before:z-10 xl:before:content-[''] xl:before:absolute xl:before:-bottom-[54px] xl:before:border-l-[100px] xl:before:border-l-transparent xl:before:border-r-[100px] xl:before:border-r-transparent xl:before:border-t-[55px] before:border-t-[var(--triangle-color)] xl:before:transform-[rotate(0deg)]`}
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
