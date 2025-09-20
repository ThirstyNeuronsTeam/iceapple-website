import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";

type jobOpeningProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  paraClassName: string;
  info: {
    cardTitle: string;
  }[];
};

const JobOpeningSection: React.FC<jobOpeningProps> = ({
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
      <div className="relative mb-50">
        <div className="w-full mx-auto px-5 sm:px-22 2xl:px-0 container">
          <div className="grid py-9 sm:py-16 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 text-center sm:text-right"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12">
            {info.map((item, index) => (
              <div
                key={index}
                className="text-center px-10 py-20 font-bold text-lg sm:text-4xl shadow-[18px_23px_104px_rgba(0,0,0,30%)] sm:shadow-[38px_47px_212px_rgba(0,0,0,30%)]"
              >
                {item.cardTitle}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobOpeningSection;
