"use client";

import { useDeviceType } from "../../../../hooks/useDeviceType";
import { PropsWithChildren, useState } from "react";
import React from "react";

interface GridProps extends PropsWithChildren {
  sectionTitle: string;
  sectionHeading: string;
}

const ResourcesGrid: React.FC<GridProps> = ({
  sectionTitle,
  sectionHeading,
  children,
}) => {
  const deviceType = useDeviceType();
  const [expanded, setExpanded] = useState(false);

  const items = React.Children.toArray(children).filter(
    React.isValidElement
  ) as React.ReactElement[];

  // Show only first 4 if not expanded
  const filteredItems = expanded ? items : items?.slice(0, 4);
  //const isBlogPage = pathname.includes("/blogs"); // 👈 adjust logic as needed

  return (
    <section className="w-full bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-16 py-16">
      {/* Section Title */}
      <div
        className={`mb-3 md:mb-4 
          ${
            deviceType === "mobile"
              ? "flex justify-center items-center"
              : "flex items-center"
          }
        `}
      >
        <div className="w-3 sm:w-8 md:w-10 h-[3px] sm:h-[4px] md:h-[5px] bg-blue-500 mr-2 md:mr-3" />
        <h2
          className={`text-blue-600 font-medium tracking-wide 
            ${
              deviceType === "mobile"
                ? "text-sm text-center"
                : "text-base text-left"
            } 
            sm:text-lg md:text-xl lg:text-2xl
          `}
          style={{ letterSpacing: "0" }}
        >
          {sectionTitle}
        </h2>
      </div>

      {/* Section Heading */}
      <h1
        className={`font-bold w-full md:w-[70%] text-gray-900 mt-2 mb-12 
          ${
            deviceType === "mobile"
              ? "text-2xl text-center"
              : "text-4xl text-left"
          } 
          sm:text-3xl md:text-5xl lg:text-6xl
        `}
      >
        {sectionHeading}
      </h1>

      {/* Cards Grid */}
      <div
        className={`${
          deviceType !== "mobile"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8 pr-4 md:pr-6 lg:pr-16 items-stretch"
            : "space-y-6 pr-4"
        } ${expanded ? "h-max pr-2" : "h-max"}`} // 👈 scroll only when expanded
      >
        {filteredItems}
      </div>

      {/* View All Button */}
      {items.length > 4 && (
        <div className="flex justify-center mt-14">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-8 py-3 bg-blue-900 text-white font-medium transition-colors duration-200 hover:bg-blue-800 
             rounded-[30px_0px_30px_0px]`}
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ResourcesGrid;
