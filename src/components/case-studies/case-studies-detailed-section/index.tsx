"use client";
import React, { useState } from "react";
import { useDeviceType } from "../../../../hooks/useDeviceType";
import InfoCard from "../info-card";

type Section = {
  title: string;
  content: string;
};

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  link: string;
};

type CaseStudyDetailedSectionProps = {
  dataSection: Section[];
  dataCaseStudy: CaseStudy[];
};

const CaseStudyDetailedSection: React.FC<CaseStudyDetailedSectionProps> = ({
  dataSection,
  dataCaseStudy,
}) => {
  const deviceType = useDeviceType();
  const [showAll, setShowAll] = useState(false);

  const displayedCaseStudies = showAll
    ? dataCaseStudy
    : dataCaseStudy.slice(0, 2);

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12">
      {/* Section Titles */}
      <div className="bg-white py-10 flex flex-col gap-10">
        {dataSection.map((section, index) => (
          <div key={index} className="">
            <div
              className="bg-blue-600 shadow-md flex items-center justify-start px-4 text-white 
              max-w-[643px] h-auto py-4 
               text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[2px] sm:tracking-[3px] leading-[121%]"
            >
              {section.title}
            </div>

            <p
              className="mt-4 text-gray-700 px-2 sm:px-6 lg:px-10 text-left
               text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "1px",
              }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Scrollable InfoCards Container */}
      <div
        className={`overflow-y-auto px-2 ${
          showAll ? "max-h-full" : "max-h-full"
        } ${
          deviceType !== "mobile"
            ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "flex flex-col gap-6"
        }`}
      >
        {displayedCaseStudies.map((study, index) => (
          <div key={index} className="flex justify-center">
            <div
              className={
                deviceType === "mobile"
                  ? "w-10/12"
                  : "w-full md:w-11/12 lg:w-full "
              }
            >
              <InfoCard
                title={study.title}
                description={study.description}
                image={study.image}
                link={study.link}
                className="rounded-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {dataCaseStudy.length > 2 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`px-8 py-3 bg-blue-900 text-white font-medium transition-colors duration-200 hover:bg-blue-800 
             rounded-[30px_0px_30px_0px]`}
          >
            {showAll ? "Show Less" : "View All Case Studies"}
          </button>
        </div>
      )}
    </section>
  );
};

export default CaseStudyDetailedSection;
