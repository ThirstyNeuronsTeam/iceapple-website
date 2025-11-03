import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type ServicesProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  servicesData: {
    services: {
      id: number;
      titleBlue: string;
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

const OurServicesSection: React.FC<ServicesProps> = ({
  servicesData,
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  return (
    <article className="relative mb-10 sm:mb-60 sm:before:content-[''] before:absolute before:bottom-[25%] sm:before:bottom-[3%] before:h-[300px] sm:before:h-[800px] before:left-0 sm:before:left-[inherit] sm:before:right-0 before:bg-[#F3F3F3] before:w-[40vw] sm:before:w-[49vw] z-0">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-0 sm:pt-20 pb-5 sm:pb-15 max-w-xl text-center sm:text-right">
          <HeadingSectionDetail
            align="smRightXsCenter"
            headingWidth="xl"
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="sm:bg-white">
        <div className="mx-auto px-6 pb-16 sm:py-16 container">
          <div className="sm:space-y-40">
            {servicesData.services.map((item) => (
              <div
                key={item.id}
                className={`${
                  item.alignRight === true
                    ? "sm:justify-end"
                    : "sm:justify-center justify-end"
                } 
                ${item.sectionName === "one" ? "sm:right-[10%]" : ""}
                ${item.sectionName === "two" ? "sm:pr-70" : ""}
                ${
                  item.sectionName === "three" ? "sm:right-[30%]" : ""
                } flex relative pb-45 sm:pb-0`}
              >
                {/* Image Section */}
                <div
                  className={`w-1/2 sm:w-full max-w-lg  relative ${
                    item.sectionName === "two" || item.sectionName === "three"
                      ? "aspect-square"
                      : "sm:aspect-square aspect-[3/4]"
                  } ${item.reverse ? "md:ml-auto md:mr-0" : ""}`}
                >
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    fill
                    sizes="(min-width:1280px) 28vw, (min-width:1024px) 35vw, (min-width:640px) 50vw, 90vw"
                    className={`${
                      item.shadow
                        ? "shadow-[0_10px_24px_rgba(0,0,0,25%))] sm:shadow-[0_93px_128px_rgba(0,0,0,25%))]"
                        : ""
                    }`}
                  />
                </div>

                {/* Content Section overlapping */}
                <div
                  className={`absolute max-w-[300px] sm:max-w-xl bg-[rgba(255,255,255,80%)] z-10 ${
                    item.reverse ? "md:ml-auto" : ""
                  } ${item.alignLeft ? "text-left" : ""} ${
                    item.alignRight ? "sm:text-right" : ""
                  } ${
                    item.sectionName === "one"
                      ? "bottom-[10%] sm:-bottom-[5%] p-5 md:p-10 md:pt-25 right-[5%] sm:right-[0%] text-right sm:text-left"
                      : item.sectionName === "two"
                      ? "top-[30%] sm:top-[0%] p-4 sm:p-14 pt-5 sm:pt-16 left-[10%] sm:left-[15%]"
                      : "bottom-[0%] sm:bottom-[inherit] sm:top-[40%] right-[10%] sm:right-[5%] text-right sm:text-left"
                  } p-6 sm:p-20`}
                >
                  <h3
                    className={`${
                      item.sectionName === "two" ? "w-full" : ""
                    } text-base md:text-4xl font-semibold mb-1 sm:mb-8 sm:tracking-[3px]`}
                  >
                    <span className="text-[#0B68FF]">{item.titleBlue}</span>{" "}
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

export default OurServicesSection;
