import React from "react";

type HeadingProps = {
  headingData: {
    smallText: string;
    heading: string;
    content: string[];
  };
  align?: "left" | "center" | "right" | "smRight";
};
const HeadingSectionDetail: React.FC<HeadingProps> = ({
  headingData,
  align = "left",
}) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "justify-end",
    smRight: "sm:justify-end",
  }[align];
  return (
    <>
      <div
        className={`${alignmentClass} flex items-center gap-1 sm:gap-4 mb-2 sm:mb-0`}
      >
        <div className="w-[8px] sm:w-[30px] h-[1px] sm:h-[5px] bg-[#0B68FF]"></div>
        <p className="text-blue-600 font-semibold text-xs sm:text-2xl">
          {headingData.smallText}
        </p>
      </div>
      <h2 className="text-[22px] sm:text-7xl font-bold leading-none mb-2 sm:mb-11">
        {headingData.heading}
      </h2>
      <div className="sm:px-16 font-inter">
        {headingData.content.length > 0
          ? headingData.content.map((item, index) => (
              <p className="text-sm sm:text-lg mb-5" key={index}>
                {item}
              </p>
            ))
          : ""}
      </div>
    </>
  );
};

export default HeadingSectionDetail;
