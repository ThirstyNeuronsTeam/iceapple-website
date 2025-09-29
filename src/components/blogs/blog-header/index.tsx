import React from "react";
import Image from "next/image";
import { BookOpenText, Calendar } from "lucide-react";

type HeroSectionProps = {
  blogName: string;
  tag?: string;
  bannerUrl: string;
  date: string;
  readTime: string;
};

const BlogsHeader: React.FC<HeroSectionProps> = ({
  blogName,
  tag = "Case Study",
  bannerUrl,
  date,
  readTime,
}) => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[800px] lg:min-h-[900px] bg-white">
      {/* Banner */}
      <div className="absolute inset-0 md:left-[200px] lg:left-[400px] md:right-10 top-12 bottom-0 overflow-hidden">
        <Image
          src={bannerUrl}
          alt={`${blogName} banner`}
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

        <div>
          <h1 className="text-xl font-bold text-gray-900">{blogName}</h1>
          <div className="flex items-center text-gray-600 text-sm mt-2 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={16} className="text-blue-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpenText size={16} className="text-blue-500" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Desktop layout ---- */}
      <div className="hidden sm:block">
        {/* Text box */}
        <div
          className="absolute bg-white/50 p-4 md:p-6 w-[90%] md:w-[500px] lg:w-[622px] 
            h-auto min-h-[250px] md:min-h-[300px] lg:min-h-[375px] z-10 left-6 md:left-[100px] 
            top-1/4 md:top-[45%] transform -translate-y-1/4 md:-translate-y-1/2"
        >
          <div className="pt-6 md:pt-12">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-8 md:w-10 h-[4px] md:h-[5px] bg-blue-500 mr-2 md:mr-3"></div>
              <p className="text-sm md:text-lg font-medium text-blue-500 tracking-wide">
                {tag}
              </p>
            </div>

            <h1
              className="
    font-bold text-gray-900 line-clamp-3
    text-[clamp(20px,5vw,72px)]
  "
              style={{
                fontFamily: "Mosk",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "0px",
              }}
            >
              {blogName}
            </h1>

            {/* Date + Time */}
            <div className="flex items-center text-gray-600 text-sm mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-blue-500" />
                <span>{date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpenText size={18} className="text-blue-500" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHeader;
