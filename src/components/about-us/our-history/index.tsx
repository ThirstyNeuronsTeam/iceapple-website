import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import CardBlueBoxSection from "@/components/common/card-with-blue";
import CardWithImageSection from "@/components/common/card-with-image";
import clsx from "clsx";

type careerProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  cardTitle: string;
  cardDescription: string;
  btnText: string;
  btnUrl: string;
  sectionClass: string;
};

const OurHistorySection: React.FC<careerProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  cardTitle,
  cardDescription,
  btnText,
  btnUrl,
  sectionClass,
}) => {
  return (
    <article>
      <div className="relative mt-10 sm:mt-40 after:content-[''] after:absolute after:top-0 sm:after:bottom-0 after:left-0 sm:after:left-auto sm:after:right-0 after:bg-[#F3F3F3] sm:after:w-[60vw] after:w-[85vw] after:h-[250px] sm:after:h-auto z-0 after:-z-10">
        <div className="w-full mx-auto pl-10 pr-5 sm:pr-0 2xl:px-0 container">
          <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] py-9 sm:py-16 gap-0 sm:gap-16">
            <CardBlueBoxSection
              mainClassNames="py-4 sm:py-10 px-4 sm:px-20 gap-y-4 sm:gap-y-12 order-2 sm:order-1"
              cardData={{
                cardTitle,
                cardDescription,
                btnText,
                btnUrl,
              }}
            />
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 max-w-xl text-right sm:text-left order-1 sm:order-2 w-[70vw] sm:w-auto"
              )}
            >
              <HeadingSectionDetail
                align="smLeftXsRight"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurHistorySection;
