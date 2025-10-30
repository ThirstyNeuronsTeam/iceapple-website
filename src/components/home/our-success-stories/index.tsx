"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import CardBlueBoxSection from "@/components/common/card-with-blue";

type LegacyProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  successStoriesData: {
    sliders: {
      id: number;
      image: string;
      cardTitle: string;
      cardDescription: string;
      btnText: string;
      btnUrl: string;
    }[];
  };
};

const OurSuccessStoriesSection: React.FC<LegacyProps> = ({
  successStoriesData,
  subHeading,
  heading,
  contents,
  contentClassName,
}) => {
  return (
    <article className="relative mt-15 sm:mt-60">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] pb-0 sm:pb-20 xl:pb-60">
          <div className="relative sm:pb-15 max-w-xl text-left">
            <HeadingSectionDetail
              align="left"
              contentClassName={contentClassName}
              subHeading={subHeading}
              heading={heading}
              contents={contents}
            />
          </div>
          <Carousel className="[&_[data-slot=carousel-item]]:relative">
            <CarouselContent className="overflow-visible">
              {successStoriesData.sliders.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col sm:flex-row xl:pr-20">
                    <div className="w-[150px] sm:w-[250px] xl:w-[450px] h-[170px] sm:h-[400px] xl:h-[600px] aspect-3/2 absolute -top-30 sm:-top-50 -z-[1]">
                      <Image fill src={item.image} alt="" />
                    </div>
                    <div className="flex justify-end w-full pb-20 sm:pb-50">
                      <CardBlueBoxSection
                        mainClassNames="px-5 sm:px-10 xl:px-20 py-10 max-w-xs sm:max-w-md xl:max-w-xl bg-[rgba(11,104,255,0.92)] relative sm:-bottom-[10%] xl:-bottom-[20%]"
                        headingClassNames="text-sm sm:text-5xl mb-5"
                        discriptionClassNames="mb-4"
                        cardDescriptionMobile={false}
                        cardData={{
                          cardTitle: item.cardTitle,
                          cardDescription: item.cardDescription,
                          btnText: item.btnText,
                          btnUrl: item.btnUrl,
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              arrowBig={true}
              className="sm:left-0 right-12 left-[inherit] sm:bottom-[23%] top-5 sm:top-[inherit]"
            />
            <CarouselNext
              arrowBig={true}
              className="left-[inherit] right-0 sm:right-[inherit] sm:left-15 sm:bottom-[23%] top-5 sm:top-[inherit]"
            />
          </Carousel>
        </div>
      </div>
    </article>
  );
};

export default OurSuccessStoriesSection;
