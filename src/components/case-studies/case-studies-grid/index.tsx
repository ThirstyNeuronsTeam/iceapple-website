"use client";

import { useDeviceType } from "../../../../hooks/useDeviceType";
import InfoCard from "../info-card";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  link: string;
};

type CaseStudiesProps = {
  sectionTitle: string;
  sectionHeading: string;
  data: CaseStudy[];
};

const CaseStudiesGrid: React.FC<CaseStudiesProps> = ({
  sectionTitle,
  sectionHeading,
  data,
}) => {
  const deviceType = useDeviceType();

  return (
    <section className="w-full bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-16 py-16">
      {/* Section Title */}
      <div className="flex items-center mb-3 md:mb-4">
  <div className="w-6 sm:w-8 md:w-10 h-[3px] sm:h-[4px] md:h-[5px] bg-blue-500 mr-2 md:mr-3"></div>
  <h2
    className={`text-blue-600 font-medium tracking-wide 
      ${deviceType === "mobile" ? "text-sm" : "text-base"} 
      sm:text-lg md:text-xl lg:text-2xl text-left
    `}
    style={{ fontFamily: "'Mosk', sans-serif", letterSpacing: "0" }}
  >
    {sectionTitle}
  </h2>
</div>

{/* Section Heading */}
<h1
  className={`font-bold w-full md:w-[70%] text-gray-900 mt-2 mb-12 
    ${deviceType === "mobile" ? "text-2xl" : "text-4xl"} 
    sm:text-3xl md:text-5xl lg:text-6xl text-left
  `}
  style={{ fontFamily: "'Mosk', sans-serif" }}
>
  {sectionHeading}
</h1>


      {/* Cards Grid */}
      <div
        className={
          deviceType !== "mobile"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8 pr-4 md:pr-6 lg:pr-16"
            : "space-y-6 pr-4"
        }
      >
        {data.map((study, index) => (
          <div
            key={index}
            className={
              deviceType === "mobile"
                ? `flex ${index % 2 === 0 ? "justify-start" : "justify-end"
                }`
                : index % 2 !== 0
                  ? "md:mt-[35%] flex"
                  : "flex"
            }
          >
            <div
              className={
                deviceType === "mobile"
                  ? "w-10/12 pr-4 "
                  : "w-full md:w-11/12 lg:w-auto pr-4 mx-auto"
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

      {/* Button */}
      <div className="flex justify-center mt-14">
        <button
          className={`px-8 py-4 rounded-full bg-blue-900 text-white font-medium transition-colors duration-200 hover:bg-blue-800 ${deviceType === "mobile" ? "w-full" : "w-auto"
            }`}
        >
          View All Case Studies
        </button>
      </div>
    </section>
  );
};

export default CaseStudiesGrid;
