"use client";
import React from "react";
import homePageData from "../../../../data/home-page/home-page.json";
import Image from "next/image";
import { useDeviceType } from "../../../../hooks/useDeviceType";
// import BannerSectionDetail from "@/components/common/section-detail";

const AboutUsSection: React.FC = () => {
  //   const isBtnShow = true;
  //   const page = "home";
  //   const heroSection = heroData[page]?.heroSection || [];
  const deviceType = useDeviceType();

  return (
    <article className="relative before:hidden sm:before:block sm:before:vi before:content-[''] before:absolute before:-top-40 before:h-[500px] before:left-0 before:bg-[#ffffff] before:w-[49vw] after:content-[''] after:absolute after:bottom-100 sm:after:bottom-20 after:h-[600px] sm:after:h-[900px] after:left-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[49vw] after:-z-1 pt-20 pb-200 w-full">
      <div className="container mx-auto flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-3 gap-y-4 sm:gap-16">
        <div className="relative col-span-2 px-5 sm:px-40">
          <div className="relative aspect-[5/4] w-48 sm:w-full max-w-lg shadow-[0_6px_20px_rgba(0,0,0,40%)] sm:shadow-[0_42px_173px_rgba(0,0,0,70%)] overflow-hidden z-10">
            <Image
              src="/assets/general/home-page/about-image-2.jpg"
              alt="Tech Lens"
              fill
              className="object-cover"
            />
          </div>
          <div className="shadow-[0_6px_20px_rgba(0,0,0,40%)] sm:shadow-none absolute bottom-[55%] sm:bottom-[5%] right-5 sm:right-[2%] aspect-[5/4] w-48 sm:w-full max-w-lg overflow-hidden z-20">
            <Image
              src="/assets/general/home-page/about-image-1.jpg"
              alt="AI Face"
              fill
              className="object-cover"
            />
          </div>
          {deviceType === "desktop" ? (
            <div className="w-md sm:absolute -bottom-[25%] left-[5%] right-0 z-0 bg-white p-10 sm:pt-200">
              <h3 className="text-3xl font-bold mb-6">Our Values</h3>
              <ul className="grid grid-cols-1 gap-y-4 text-gray-700 text-lg list-disc pl-6">
                <li>Partnerships and Collaboration</li>
                <li>Empowering Innovation</li>
                <li>Long-lasting Relationships</li>
                <li>Thriving Together</li>
                <li>Inspiring Possibilities</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="z-30 col-span-2 sm:col-span-1 px-5 sm:px-0">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <div className="w-[8px] sm:w-[30px] h-[5px] bg-[#0B68FF]"></div>
            <p className="text-blue-600 font-semibold text-xs sm:text-2xl">
              A brief overview of ‘About us’
            </p>
          </div>
          <h2 className="text-[22px] sm:text-7xl font-bold leading-none mb-2 sm:mb-11">
            Driven by the desire to drive innovation.
          </h2>
          <div className="sm:px-16 font-inter">
            <p className="text-sm sm:text-lg mb-5">
              We are a dynamic technology company providing innovative and
              cost-effective solutions for businesses across industries. Our
              passionate team of engineers, with expertise in Automotive,
              Industrial, and Gaming domains, focuses on developing deep
              technology products and delivering niche software development
              services.
            </p>
            <p className="text-sm sm:text-lg">
              With a vision to build a world-class technology services and
              product development company, IceApple leverages cutting-edge
              technologies like Artificial Intelligence, Machine Learning, web,
              cloud, IoT, mobile app development, and embedded software.
            </p>
          </div>
        </div>
        {deviceType === "mobile" ? (
          <div className="bg-white p-5 text-right w-max self-end">
            <h3 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-6">
              Our Values
            </h3>
            <ul className="flex flex-col items-end gap-y-2 text-gray-700 text-sm sm:text-lg list-disc pl-6 font-inter">
              <li>Partnerships and Collaboration</li>
              <li>Empowering Innovation</li>
              <li>Long-lasting Relationships</li>
              <li>Thriving Together</li>
              <li>Inspiring Possibilities</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </article>
  );
};

export default AboutUsSection;
