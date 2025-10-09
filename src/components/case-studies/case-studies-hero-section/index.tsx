import React from "react";
import Image from "next/image";

type HeroSectionProps = {
  companyName: string;
  tag?: string;
  logoUrl: string;
  bannerUrl: string;
};

const CaseStudyHero: React.FC<HeroSectionProps> = ({
  companyName,
  tag = "Case Study",
  logoUrl,
  bannerUrl,
}) => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[800px] lg:min-h-[900px] bg-white">
      {/* Banner */}
      <div className="absolute inset-0 md:left-[200px] lg:left-[400px] md:right-10 top-12 bottom-0 overflow-hidden">
        <Image
          src={bannerUrl}
          alt={`${companyName} banner`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ---- Mobile header (bottom overlay) ---- */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 flex flex-col sm:hidden">
        <div className="flex items-center mb-2">
          <div className="w-6 h-[3px] bg-blue-500 mr-2"></div>
          <p className="text-sm font-medium text-blue-500 tracking-wide">{tag}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
          <Image
            src={logoUrl}
            alt={`${companyName} logo`}
            width={100}
            height={50}
            className="object-contain h-8 w-auto"
          />
        </div>
      </div>

      {/* ---- Desktop layout ---- */}
      <div className="hidden sm:block">
        {/* Logo box */}
        <div
          className="absolute z-20 bg-white/50 p-4 left-6 md:left-12 
            top-1/4 md:top-1/3 transform -translate-y-1/3 md:-translate-y-1/4"
        >
          <Image
            src={logoUrl}
            alt={`${companyName} logo`}
            width={160}
            height={80}
            className="object-contain w-[120px] md:w-[160px] lg:w-[200px] h-auto"
          />
        </div>

        {/* Text box */}
        <div
          className="absolute bg-white/50 p-4 md:p-6 w-[90%] md:w-[500px] lg:w-[622px] 
            h-auto min-h-[250px] md:min-h-[300px] lg:min-h-[375px] z-10 left-6 md:left-[100px] 
            top-1/3 md:top-[47%] transform -translate-y-1/3 md:-translate-y-2"
        >
          <div className="pt-6 md:pt-12">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-8 md:w-10 h-[4px] md:h-[5px] bg-blue-500 mr-2 md:mr-3"></div>
              <p className="text-sm md:text-lg font-medium text-blue-500 tracking-wide">
                {tag}
              </p>
            </div>

            <h1
              className="font-bold text-gray-900"
              style={{
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 72px)",
                lineHeight: "117%",
                letterSpacing: "0px",
              }}
            >
              {companyName}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
