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

const OurHistorySection: React.FC<careerProps> = ({
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
      <div className="relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[60vw] z-0 after:-z-10">
        <div className="w-full mx-auto pl-5 2xl:px-0 container">
          <div className="grid grid-cols-[60%_40%] sm:grid-cols-2 py-9 sm:py-16 gap-4">
            <CardBlueBoxSection
              mainClassNames="py-4 sm:py-10 px-4 sm:px-20 gap-y-4 sm:gap-y-12"
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
          </div>
        </div>
      </div>
      {info && (
        <div className="w-full mx-auto px-5 2xl:px-0 container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-20 my-25">
            <CardWithImageSection cardWithImageData={{ info }} />
          </div>
        </div>
      )}
    </article>
  );
};

export default OurHistorySection;
