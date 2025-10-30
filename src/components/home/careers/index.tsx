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
  info: {
    cardImage: string;
    cardTitle: string;
    cardBoxDescription: string;
  }[];
  sectionClass: string;
};

const CareersSection: React.FC<careerProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  cardTitle,
  cardDescription,
  btnText,
  btnUrl,
  info,
  sectionClass,
}) => {
  return (
    <article>
      <div className="relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-[#F3F3F3] sm:after:w-[60vw] after:w-[80vw] z-0 after:-z-10">
        <div className="w-full mx-auto pl-5 2xl:px-0 container">
          <div className="grid grid-cols-[40%_55%] sm:grid-cols-2 py-9 sm:py-16 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 max-w-xl text-right"
              )}
            >
              <HeadingSectionDetail
                align="right"
                headingWidth="xl"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
              />
            </div>
            <CardBlueBoxSection
              mainClassNames="max-w-lg py-4 sm:py-0 px-4 xl:px-30 gap-y-4 sm:gap-y-12"
              cardDescriptionMobile={false}
              cardData={{
                cardTitle,
                cardDescription,
                btnText,
                btnUrl,
              }}
            />
          </div>
        </div>
      </div>
      {info && (
        <div className="w-full mx-auto px-5 2xl:px-0 container relative overflow-x-hidden sm:overflow-visible">
          <div className="absolute  w-[60vw] h-[600px] bg-[#F3F3F3] right-[-20%] top-[48%] z-[-2] sm:hidden"></div>
          <div className="grid sm:flex lg:grid grid-cols-1 sm:grid-cols-3 sm:overflow-x-auto xl:overflow-visible gap-10 sm:gap-10 xl:gap-20 my-25">
            <CardWithImageSection
              sectionClass="sm:min-w-[500px] lg:min-w-full"
              sectionContentClass=""
              sectionBodyClass="px-4 sm:px-6 xl:px-20 py-5 sm:py-12 "
              cardWithImageData={{ info }}
            />
          </div>
        </div>
      )}
    </article>
  );
};

export default CareersSection;
