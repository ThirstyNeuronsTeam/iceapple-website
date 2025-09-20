"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import styles from "./style.module.scss";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";
import Image from "next/image";

type galleryProps = {
  subHeading: string;
  heading: string;
  headingWidthClass: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  paraClassName: string;
  info: {
    cardImage: string;
  }[];
};

const GalleryCarousel: React.FC<galleryProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  sectionClass,
  paraClassName,
  info,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <article>
      <div className="relative sm:mb-10">
        <div className="w-full mx-auto px-5 sm:px-22 2xl:px-0 container">
          <div className="grid py-2 sm:py-10 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 text-center sm:text-left"
              )}
            >
              <HeadingSectionDetail
                align="smLeftXsCenter"
                // headingWidth="md"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
                paraClassName={paraClassName}
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto px-5 sm:px-22 2xl:px-0">
          <div className={`${styles["carousel-container"]} relative`}>
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true} // ✅ ensures active slide is centered
              slidesPerView={3} // ✅ set a number, or use "auto" with correct width
              loop={true}
              spaceBetween={30}
              modules={[EffectCoverflow]}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              className="mySwiper"
            >
              {info.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className={`${styles["custom-slide"]}`}
                >
                  <div className="relative w-[700px] aspect-video h-[300px] sm:h-[500px] z-0">
                    <Image
                      fill
                      className="object-cover"
                      src={slide.cardImage}
                      alt=""
                    />
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

export default GalleryCarousel;
