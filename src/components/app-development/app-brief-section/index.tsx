import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type AppServicesProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  //   servicesData: {
  //     services: {
  //       id: number;
  //       titleBlue: string;
  //       title: string;
  //       description: string;
  //       imgSrc: string;
  //       alignRight?: boolean; // alternate layout
  //       reverse?: boolean;
  //       alignLeft: boolean;
  //       sectionName: string;
  //       shadow: boolean;
  //     }[];
  //   };
};

const AppServicesSection: React.FC<AppServicesProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  return (
    <article className="relative mb-10 sm:mb-60 sm:before:content-[''] before:absolute before:bottom-[25%] sm:before:bottom-[3%] before:h-[300px] sm:before:h-[800px] before:left-0 sm:before:left-[inherit] sm:before:right-0 before:bg-[#F3F3F3] before:w-[40vw] sm:before:w-[49vw] z-0">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-0 sm:pt-20 pb-5 sm:pb-15 text-center sm:text-right">
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
      <div className="sm:bg-[#F3F3F3]">
        <div className="mx-auto px-6 pb-16 sm:py-16 container">
          <p className="sm:text-3xl font-medium text-center mb-20">
            Our team of skilled professionals have expertise in:
          </p>
          <div className="sm:space-y-40">
            <div className="flex justify-between flex-wrap gap-y-10">
              <div className="relative w-1/2">
                <div className="relative w-2/4 aspect-[3/4]">
                  <Image
                    fill
                    alt=""
                    sizes="100vw"
                    src="/assets/general/services/mobile-app.png"
                  />
                </div>
                {/* Content Section overlapping */}
                <div
                  className={`absolute right-0 bottom-0 max-w-[300px] sm:max-w-xl bg-[rgba(255,255,255,80%)] z-10 p-6 sm:p-15`}
                >
                  <h3
                    className={`text-base md:text-4xl font-semibold sm:tracking-[3px]`}
                  >
                    Mobile App Development
                  </h3>
                </div>
              </div>
              <div className="relative w-1/2 mt-20">
                <div className="relative w-2/4 aspect-[3/4] ms-auto">
                  <Image
                    fill
                    alt=""
                    sizes="100vw"
                    src="/assets/general/services/e-commerce.png"
                  />
                </div>
                {/* Content Section overlapping */}
                <div
                  className={`absolute left-0 -top-[10%] max-w-[200px] sm:max-w-lg bg-[rgba(255,255,255,80%)] z-10 p-6 sm:p-15`}
                >
                  <h3
                    className={`text-base text-right md:text-4xl font-semibold sm:tracking-[3px]`}
                  >
                    E-commerce Integrations
                  </h3>
                </div>
              </div>
              <div className="relative w-1/2">
                <div className="relative w-2/4 aspect-[3/4]">
                  <Image
                    fill
                    alt=""
                    sizes="100vw"
                    src="/assets/general/services/mobile-app.png"
                  />
                </div>
                {/* Content Section overlapping */}
                <div
                  className={`absolute right-0 bottom-0 max-w-[300px] sm:max-w-xl bg-[rgba(255,255,255,80%)] z-10 p-6 sm:p-15`}
                >
                  <h3
                    className={`text-base md:text-4xl font-semibold sm:tracking-[3px]`}
                  >
                    Mobile App Development
                  </h3>
                </div>
              </div>
              <div className="relative w-1/2 mt-20">
                <div className="relative w-2/4 aspect-[3/4] ms-auto">
                  <Image
                    fill
                    alt=""
                    sizes="100vw"
                    src="/assets/general/services/e-commerce.png"
                  />
                </div>
                {/* Content Section overlapping */}
                <div
                  className={`absolute left-0 -top-[10%] max-w-[200px] sm:max-w-lg bg-[rgba(255,255,255,80%)] z-10 p-6 sm:p-15`}
                >
                  <h3
                    className={`text-base text-right md:text-4xl font-semibold sm:tracking-[3px]`}
                  >
                    E-commerce Integrations
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AppServicesSection;
