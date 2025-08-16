import React from "react";

type HeadingProps = {
  headingData: {
    subHeading: string;
    heading: string;
    contents: string[];
  };
  align?: "left" | "center" | "right" | "smRight";
  headingWidth?: "w-full" | "xl";
};
const HeadingSectionDetail: React.FC<HeadingProps> = ({
  headingData,
  align = "left",
  headingWidth = "auto",
}) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "justify-end",
    smRight: "sm:justify-end",
  }[align];
  const headingWidthClass = {
    auto: "w-auto",
    xl: "w-[80%]",
  }[headingWidth];
  return (
    <>
      <div
        className={`${alignmentClass} flex items-center gap-1 sm:gap-4 mb-2 sm:mb-0`}
      >
        <div className="w-[8px] sm:w-[30px] h-[1px] sm:h-[5px] bg-[#0B68FF]"></div>
        <p className="text-blue-600 font-semibold text-xs sm:text-2xl">
          {headingData.subHeading}
        </p>
      </div>
      <h2
        className={`${headingWidthClass} sm:ml-auto text-[22px] sm:text-7xl font-bold leading-none mb-2 sm:mb-11`}
      >
        {headingData.heading}
      </h2>
      {headingData.contents
        ? headingData.contents?.map((item, index) => (
            <div key={index} className="sm:px-16 font-inter">
              <p className="text-sm sm:text-lg mb-5" key={index}>
                {item}
              </p>
            </div>
          ))
        : ""}
    </>
  );
};

export default HeadingSectionDetail;
