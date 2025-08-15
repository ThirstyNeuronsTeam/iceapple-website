import React from "react";
import content from "../../../../data/home-page/home-page.json";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type ServicesProps = {
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

const OurServicesSection: React.FC<ServicesProps> = ({ servicesData }) => {
  return (
    <article className="relative before:hidden sm:before:block sm:before:content-[''] before:absolute before:top-[38%] before:h-[1000px] before:right-0 before:bg-[#F3F3F3] before:w-[49vw] after:content-[''] after:absolute after:top-0 after:h-[250px] sm:after:h-[600px] after:left-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[75vw] z-0 after:-z-10">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-20 sm:py-20 max-w-md text-left sm:text-right">
          <HeadingSectionDetail
            align="smRight"
            headingData={content.home.ourServicesSection}
          />
        </div>
      </div>
      <div className="sm:bg-white">
        <div className="mx-auto px-6 pb-16 sm:py-16 container">
          <div className="sm:space-y-40">
            {servicesData.services.map((item) => (
              <div
                key={item.id}
                className={`${item.alignRight === true ? "justify-end" : ""} 
                ${
                  item.sectionName === "three" ? "sm:right-[20%]" : ""
                } flex relative pb-80 sm:pb-0`}
              >
                {/* Image Section */}
                <div
                  className={`w-1/2 sm:w-full max-w-lg aspect-square relative  ${
                    item.reverse ? "md:ml-auto md:mr-0" : ""
                  }`}
                >
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className={`${
                      item.shadow
                        ? "shadow-[0_10px_24px_rgba(0,0,0,25%))] sm:shadow-[0_93px_128px_rgba(0,0,0,25%))]"
                        : ""
                    }`}
                  />
                </div>

                {/* Content Section overlapping */}
                <div
                  className={`absolute max-w-[285px] sm:max-w-md bg-[rgba(255,255,255,80%)] z-10  ${
                    item.reverse ? "md:ml-auto" : ""
                  } ${item.alignLeft ? "text-left" : "text-right "} ${
                    item.sectionName === "one"
                      ? "bottom-[15%] sm:bottom-[inherit] sm:-top-[30%] p-5 md:p-10 md:pt-30 right-[10%] sm:right-[32%]"
                      : item.sectionName === "two"
                      ? "top-[30%] p-4 sm:p-14 pt-5 sm:pt-16 left-[10%] sm:left-[25%]"
                      : "bottom-[15%] sm:bottom-[inherit] sm:top-[40%] right-[10%] sm:right-[25%]"
                  } p-6 md:p-10`}
                >
                  <h3
                    className={`${
                      item.sectionName === "two" ? "w-full sm:w-1/2" : ""
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

export default OurServicesSection;
