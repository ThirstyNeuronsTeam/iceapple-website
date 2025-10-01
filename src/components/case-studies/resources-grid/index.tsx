"use client";

import { useDeviceType } from "../../../../hooks/useDeviceType";
import InfoCard from "../info-card";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BlogPostCard } from "@/components/blogs/blogs-card";

type CardData = {
  title: string;
  description: string;
  image: string;
  date?: string;
  readTime?: string;
  link: string;
  creator?:string
};

type GridProps = {
  sectionTitle: string;
  sectionHeading: string;
  data: CardData[];
  zigzag?: boolean; // enable/disable zigzag
};

const ResourcesGrid: React.FC<GridProps> = ({
  sectionTitle,
  sectionHeading,
  data,
  zigzag = false,
}) => {
  const deviceType = useDeviceType();
  const pathname = usePathname(); // 👈 get current path
  const [expanded, setExpanded] = useState(false);

  // Show only first 4 if not expanded
  const visibleData = expanded ? data : data.slice(0, 4);
    const isBlogPage = pathname.includes("/blogs"); // 👈 adjust logic as needed

  return (
    <section className="w-full bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-16 py-16">
      {/* Section Title */}
      <div
        className={`mb-3 md:mb-4 
          ${deviceType === "mobile"
            ? "flex justify-center items-center"
            : "flex items-center"}
        `}
      >
        <div className="w-3 sm:w-8 md:w-10 h-[3px] sm:h-[4px] md:h-[5px] bg-blue-500 mr-2 md:mr-3" />
        <h2
          className={`text-blue-600 font-medium tracking-wide 
            ${deviceType === "mobile"
              ? "text-sm text-center"
              : "text-base text-left"} 
            sm:text-lg md:text-xl lg:text-2xl
          `}
          style={{ fontFamily: "'Mosk', sans-serif", letterSpacing: "0" }}
        >
          {sectionTitle}
        </h2>
      </div>

      {/* Section Heading */}
      <h1
        className={`font-bold w-full md:w-[70%] text-gray-900 mt-2 mb-12 
          ${deviceType === "mobile"
            ? "text-2xl text-center"
            : "text-4xl text-left"} 
          sm:text-3xl md:text-5xl lg:text-6xl
        `}
        style={{ fontFamily: "'Mosk', sans-serif" }}
      >
        {sectionHeading}
      </h1>

      {/* Cards Grid */}
      <div
        className={`${
          deviceType !== "mobile"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8 pr-4 md:pr-6 lg:pr-16"
            : "space-y-6 pr-4"
        } ${expanded ? "h-max pr-2" : "h-max"}`} // 👈 scroll only when expanded
      >
        {visibleData.map((study, index) => (
          <div
            key={index}
            className={
              zigzag
                ? deviceType === "mobile"
                  ? `flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`
                  : index % 2 !== 0
                  ? "md:mt-[35%] flex"
                  : "flex"
                : "flex justify-center"
            }
          >
            <div
              className={
                deviceType === "mobile"
                  ? "w-10/12 pr-4"
                  : "w-full md:w-11/12 lg:w-auto md:pr-4 mx-auto"
              }
            >
              {isBlogPage ? (
                <BlogPostCard
                  title={study.title}
                  date={study.date}
                  readTime={study.readTime}
                  description={study.description}
                  imageUrl={study.image}
                  link={study.link}
                  creator={study.creator ?? ""}
                />
              ) : (
                <InfoCard
                  title={study.title}
                  description={study.description}
                  image={study.image}
                  link={study.link}
                  className="rounded-none"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {data.length > 4 && (
        <div className="flex justify-center mt-14">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-8 py-4 rounded-full bg-blue-900 text-white font-medium transition-colors duration-200 hover:bg-blue-800 
              ${deviceType === "mobile" ? "w-full" : "w-auto"}`}
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ResourcesGrid;
