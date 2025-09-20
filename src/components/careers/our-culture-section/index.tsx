import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";

type ourCultureProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  paraClassName: string;
};

const OurCultureSection: React.FC<ourCultureProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  sectionClass,
  paraClassName,
}) => {
  return (
    <article>
      <div className="relative mb-10">
        <div className="w-full mx-auto px-5 sm:px-22 2xl:px-0 container">
          <div className="grid py-4 sm:py-16 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 text-left"
              )}
            >
              <HeadingSectionDetail
                align="left"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
                paraClassName={paraClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurCultureSection;
