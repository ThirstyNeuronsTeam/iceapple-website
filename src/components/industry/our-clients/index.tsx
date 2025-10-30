"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";

type ClientsProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  servicesData: {
    services: {
      id: number;
      title: string;
      imgSrc: string;
    }[];
  };
};

const OurClientsSection: React.FC<ClientsProps> = ({
  servicesData,
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  return (
    <article className="relative z-0 pb-5 sm:pb-20 mb-0 sm:mb-20 xl:mb-50">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-20 sm:pt-10 xl:pt-20 sm:pb-15 text-center sm:px-30">
          <HeadingSectionDetail
            align="center"
            headingWidth="w-full"
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="sm:bg-white my-10 sm:my-0 py-10 relative z-0 before:block sm:before:content-[''] before:absolute before:top-[0%] before:left-0 before:bottom-0 before:bg-[#F3F3F3] before:w-[47vw] after:content-[''] after:absolute after:top-[0%] after:right-0 after:bottom-0 after:bg-[#F3F3F3] after:w-[47vw]">
        <div className="mx-auto px-6 py-10 sm:py-16 container">
          <div className="">
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              className="mySwiper"
            >
              {servicesData.services.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={`flex relative`}>
                    {/* Image Section */}
                    <div className={`w-full h-[160px] relative`}>
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className=" object-cover "
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurClientsSection;
