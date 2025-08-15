import React from "react";
import content from "../../../../data/home-page/home-page.json";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type HeadingSectionProps = {
  heroData: {
    url: string;
  };
};
type Service = {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  alignRight?: boolean; // alternate layout
  reverse?: boolean;
  alignLeft: boolean;
  sectionName: string;
  shadow: boolean;
};

const services: Service[] = [
  {
    id: 1,
    title: "Data Science Services",
    description:
      "Tap the untapped potential of data with IceApple's futuristic data science solutions. Partner with us and leverage vast data sets for actionable insights, improved customer experience, and optimized supply chain operations. Maximize your business value with data-driven decisions.",
    imgSrc: "/assets/general/home-page/data-science.webp",
    alignRight: true,
    alignLeft: false,
    sectionName: "one",
    shadow: true,
  },
  {
    id: 2,
    title: "Application Services",
    description:
      "With specialization in creating stable, robust, and powerful custom apps our team of experts caters to unique business needs, With world-class technology and a powerful business orientation we deliver extravagant results for your organization. Take your organisation to new heights with our application solutions.",
    imgSrc: "/assets/general/home-page/application-services.webp",
    alignRight: false,
    alignLeft: true,
    sectionName: "two",
    shadow: true,
  },
  {
    id: 3,
    title: "DevOps Services",
    description:
      "Looking to automatize, grow, and modernize your business faster? Discover the power of IceApple's DevOps Services. Our proprietary DevOps framework automates CI/CD pipelines and elevates your infrastructure automation, enabling faster growth and efficiency. Elevate your operations today.",
    imgSrc: "/assets/general/home-page/devops-services.webp",
    alignRight: true,
    alignLeft: false,
    sectionName: "three",
    shadow: true,
  },
];

const OurServicesSection: React.FC<HeadingSectionProps> = ({ heroData }) => {
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
            {services.map((s) => (
              <div
                key={s.id}
                className={`${s.alignRight === true ? "justify-end" : ""} 
                ${
                  s.sectionName === "three" ? "sm:right-[20%]" : ""
                } flex relative pb-80 sm:pb-0`}
              >
                {/* Image Section */}
                <div
                  className={`w-1/2 sm:w-full max-w-lg aspect-square relative  ${
                    s.reverse ? "md:ml-auto md:mr-0" : ""
                  }`}
                >
                  <Image
                    src={s.imgSrc}
                    alt={s.title}
                    fill
                    sizes="100vw"
                    className={`${
                      s.shadow
                        ? "shadow-[0_10px_24px_rgba(0,0,0,25%))] sm:shadow-[0_93px_128px_rgba(0,0,0,25%))]"
                        : ""
                    }`}
                  />
                </div>

                {/* Content Section overlapping */}
                <div
                  className={`absolute max-w-[285px] sm:max-w-md bg-[rgba(255,255,255,80%)] z-10  ${
                    s.reverse ? "md:ml-auto" : ""
                  } ${s.alignLeft ? "text-left" : "text-right "} ${
                    s.sectionName === "one"
                      ? "bottom-[15%] sm:bottom-[inherit] sm:-top-[30%] p-5 md:p-10 md:pt-30 right-[10%] sm:right-[32%]"
                      : s.sectionName === "two"
                      ? "top-[30%] p-4 sm:p-14 pt-5 sm:pt-16 left-[10%] sm:left-[25%]"
                      : "bottom-[15%] sm:bottom-[inherit] sm:top-[40%] right-[10%] sm:right-[25%]"
                  } p-6 md:p-10`}
                >
                  <h3
                    className={`${
                      s.sectionName === "two" ? "w-full sm:w-1/2" : ""
                    } text-base md:text-4xl font-semibold mb-1 sm:mb-8`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-inter">
                    {s.description}
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
