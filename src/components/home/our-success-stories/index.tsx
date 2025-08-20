"use client";
import React from "react";
import content from "../../../../data/home-page/home-page.json";
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
}) => {
  return (
    <article className="relative">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] pb-30">
          <div className="relative pt-0 sm:pt-20 sm:pb-15 max-w-xl text-left">
            <HeadingSectionDetail
              align="left"
              headingData={content.home.ourSuccessStoriesSection}
            />
          </div>
          <Carousel className="[&_[data-slot=carousel-item]]:relative">
            <CarouselContent className="overflow-visible">
              {successStoriesData.sliders.map((item, index) => (
                <CarouselItem className="" key={index}>
                  <div className="w-[300px] h-[500px] aspect-3/2 relative">
                    <Image fill src={item.image} alt="" />
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <CardBlueBoxSection
                      mainClassNames="px-5 sm:px-20 py-10 max-w-xl bg-[rgba(11,104,255,0.92)]"
                      headingClassNames="text-5xl"
                      discriptionClassNames="mb-4"
                      cardData={{
                        cardTitle: item.cardTitle,
                        cardDescription: item.cardDescription,
                        btnText: item.btnText,
                        btnUrl: item.btnUrl,
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -bottom-[10%] top-[inherit]" />
            <CarouselNext className="left-10 -bottom-[10%] top-[inherit]" />
          </Carousel>
        </div>
      </div>
    </article>
  );
};

export default OurSuccessStoriesSection;
