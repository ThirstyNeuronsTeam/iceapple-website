import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type IndustryProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  servicesData: {
    services: {
      id: number;
      title: string;
      description: string;
      imgSrc: string;
      alignRight?: boolean; // alternate layout
      reverse?: boolean;
      alignLeft: boolean;
      sectionName: string;
      shadow: boolean;
    }[];
  };
};

const OurIndustrySection: React.FC<IndustryProps> = ({
  servicesData,
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  return (
    <article className="relative z-0 pb-5 sm:pb-20 mb-0 xl:mb-50 before:hidden sm:before:block sm:before:content-[''] before:absolute before:top-[26%] before:h-[1300px] before:right-0 before:bg-[#F3F3F3] before:w-[49vw]">
      <div className="absolute top-[50%] h-[1200px] left-0 w-full z-0 mb-50 before:hidden sm:before:block sm:before:content-[''] before:absolute before:top-[28%] before:h-[1000px] before:left-0 before:bg-[#F3F3F3] before:w-[45vw]"></div>
      <div className="absolute bottom-0 h-[1200px] right-0 w-full z-0 mb-50 before:hidden sm:before:block sm:before:content-[''] before:absolute before:top-[28%] before:h-[1000px] before:right-0 before:bg-[#F3F3F3] before:w-[85vw]"></div>
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-20 sm:pt-20 sm:pb-15 max-w-5xl text-left sm:text-right">
          <HeadingSectionDetail
            align="smRight"
            // headingWidth=""
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="sm:bg-white">
        <div className="mx-auto px-6 pb-16 sm:py-16 container">
          <div className="sm:space-y-40 relative">
            {servicesData.services.map((item) => (
              <div
                key={item.id}
                className={`${
                  item.sectionName === "one"
                    ? "justify-end sm:justify-center"
                    : ""
                } 
                ${
                  item.sectionName === "two"
                    ? "justify-start sm:justify-center sm:pr-25"
                    : ""
                }
                ${
                  item.sectionName === "three"
                    ? "justify-end sm:justify-start"
                    : ""
                } ${
                  item.sectionName === "four" ? "sm:justify-end sm:pr-25" : ""
                } ${item.sectionName === "five" ? "justify-end sm:pr-5" : ""} ${
                  item.sectionName === "eight"
                    ? "justify-start sm:justify-end sm:pr-15"
                    : ""
                } flex relative pb-50 sm:pb-0`}
              >
                {/* Image Section */}
                <div
                  className={`w-1/2 sm:w-full max-w-lg aspect-[3/4] sm:aspect-square relative  ${
                    item.reverse ? "md:ml-auto md:  mr-0" : ""
                  }`}
                >
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className={`object-cover ${
                      item.shadow
                        ? "shadow-[0_6px_20px_rgba(0,0,0,40%))] sm:shadow-[0_93px_128px_rgba(0,0,0,25%))]"
                        : ""
                    }`}
                  />
                </div>

                {/* Content Section overlapping */}
                <div
                  className={`absolute max-w-[285px] sm:max-w-md bg-[rgba(255,255,255,80%)] z-10  ${
                    item.reverse ? "md:ml-auto" : ""
                  } ${
                    item.sectionName === "one"
                      ? "bottom-[5%] sm:bottom-5 p-5 md:p-10 md:pt-25 right-[10%] sm:right-[5%] text-right sm:text-left"
                      : item.sectionName === "two"
                      ? "bottom-0 sm:bottom-[inherit] sm:-top-[20%] p-4 sm:pl-14 pt-5 sm:pt-16 sm:pr-20 left-[10%] sm:left-[2%] text-left sm:text-right"
                      : item.sectionName === "three"
                      ? "bottom-5 sm:-bottom-[8%] p-4 sm:pl-14 pt-5 sm:pt-16 left-0 sm:left-[32%] text-right sm:text-left"
                      : item.sectionName === "four"
                      ? "bottom-0 sm:-bottom-[18%] p-4 sm:pr-16 sm:pl-14 pt-5 sm:pt-16 left-10 sm:left-[inherit] sm:right-[32%] text-left sm:text-right"
                      : item.sectionName === "five"
                      ? "bottom-5 sm:-bottom-[10%] p-4 sm:pl-14 pt-5 sm:pt-16 right-[22%] sm:right-[32%] text-left sm:text-right"
                      : item.sectionName === "eight"
                      ? "bottom-0 sm:-bottom-[18%] p-4 sm:p-14 sm:pl-14 sm:pr-14 left-5 sm:left-[inherit] sm:right-[32%]"
                      : "bottom-[15%] sm:bottom-[inherit] sm:top-[40%] right-[10%] sm:right-[25%]"
                  }`}
                >
                  <h3
                    className={`${
                      item.sectionName === "two" ? "w-full inline-block" : ""
                    } text-base md:text-4xl font-semibold mb-1 sm:mb-8`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-inter">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurIndustrySection;
