import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";
import CardWithImageSection from "@/components/common/card-with-image";

type contactDetailsCareersProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  paraClassName: string;
  info: {
    cardImage: string;
    cardTitle: string;
    cardBoxDescription: string;
  }[];
};

const ContactDetailsCareersSection: React.FC<contactDetailsCareersProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  sectionClass,
  paraClassName,
  info,
}) => {
  return (
    <article>
      <div className="relative mb-10">
        <div className="w-full mx-auto px-5 sm:px-22 2xl:px-0 container">
          <div className="grid py-4 sm:py-10 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 xl:pt-20 pb-5 text-center sm:text-right"
              )}
            >
              <HeadingSectionDetail
                align="smRightXsCenter"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
                paraClassName={paraClassName}
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto px-5 2xl:px-0 container">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-20">
            <CardWithImageSection
              sectionClass=""
              sectionContentClass=""
              sectionBodyClass="px-4 sm:px-20 py-5 sm:py-12 "
              cardWithImageData={{ info }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactDetailsCareersSection;
