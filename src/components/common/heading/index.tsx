import React from "react";
import clsx from "clsx";
type HeadingProps = {
  contentClassName?: string;
  subHeading: string;
  heading: string;
  contents?: string[];
  align?:
    | "left"
    | "center"
    | "right"
    | "smRight"
    | "smRightXsLeft"
    | "smLeftXsRight"
    | "smRightXsCenter"
    | "smLeftXsCenter";
  headingWidth?: "w-full" | "xl" | "lg";
};
const HeadingSectionDetail: React.FC<HeadingProps> = ({
  align = "left",
  headingWidth = "auto",
  contentClassName,
  subHeading,
  heading,
  contents,
}) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center justify-center",
    right: "justify-end",
    smRight: "sm:justify-end",
    smRightXsLeft: "sm:justify-end justify-start",
    smLeftXsRight: "sm:justify-start justify-end",
    smRightXsCenter: "sm:justify-end justify-center",
    smLeftXsCenter: "sm:justify-start justify-center",
  }[align];

  const headingWidthClass = {
    auto: "w-auto",
    xl: "sm:w-[80%]",
    lg: "w-[75%] sm:w-[50%] ms-auto",
  }[headingWidth];

  return (
    <>
      {subHeading && (
        <div
          className={`${alignmentClass} flex items-center gap-1 sm:gap-4 mb-2 sm:mb-0`}
        >
          <div className="w-[8px] sm:w-[30px] h-[1px] sm:h-[5px] bg-[#0B68FF]"></div>

          <p className="text-blue-600 font-semibold text-xs sm:text-2xl">
            {subHeading || ""}
          </p>
        </div>
      )}

      <h2
        className={`${headingWidthClass} sm:ml-auto text-[22px] sm:text-7xl font-bold leading-none mb-2 sm:mb-11`}
      >
        {heading}
      </h2>
      {contents?.map((item, index) => (
        <div key={index} className={clsx(contentClassName, "font-inter")}>
          <p className="text-sm sm:text-lg mb-5" key={index}>
            {item}
          </p>
        </div>
      ))}
    </>
  );
};

export default HeadingSectionDetail;
