"use client";
import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import Image from "next/image";
import clsx from "clsx";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type AppServicesProps = {
  topContent: string;
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  servicesData: {
    services: {
      id: number;
      title: string;
      imgSrc: string;
      sectionName: string;
      alignRight: boolean;
      mobileSectionName: string;
    }[];
  };
  bottomContent: string;
};

const ServiceItem: React.FC<{
  item: AppServicesProps["servicesData"]["services"][0];
}> = ({ item }) => {
  return (
    <div
      className={clsx(
        item.mobileSectionName === "two" ? "order-2" : "",
        item.mobileSectionName === "three" ? "order-1 mt-30" : "",
        item.mobileSectionName === "four" ? "ms-auto" : "",
        "relative w-1/2"
      )}
    >
      <div
        className={clsx(
          item.alignRight ? "ms-auto" : "",
          "relative w-full sm:w-2/4 aspect-[3/4]"
        )}
      >
        <Image fill alt="" sizes="100vw" src={item.imgSrc} />
      </div>

      {/* Content Section overlapping */}
      <div
        className={clsx(
          item.mobileSectionName === "one" ? "left-[70%] -bottom-[10%]" : "",
          item.mobileSectionName === "two" ? "-left-[37%] -top-[5%]" : "",
          item.mobileSectionName === "three" ? "left-[70%] -bottom-[10%]" : "",
          item.mobileSectionName === "four" ? "-left-[34%] -top-[5%]" : "",
          "absolute min-w-[125px] max-w-[125px] sm:max-w-xl bg-[rgba(255,255,255,80%)] z-10 p-4 sm:p-15"
        )}
      >
        <h3
          className={clsx(
            item.mobileSectionName === "four" ? "text-right" : "",
            "text-sm md:text-4xl font-bold sm:font-semibold tracking-[1px] sm:tracking-[3px] max-w-xs"
          )}
        >
          {item.title}
        </h3>
      </div>
    </div>
  );
};

const AppServicesSection: React.FC<AppServicesProps> = ({
  topContent,
  subHeading,
  heading,
  contents,
  contentClassName,
  servicesData,
  bottomContent,
}) => {
  const deviceType = useDeviceType();

  return (
    <article className="relative mb-10 sm:mb-60">
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="relative pt-0 sm:pt-20 pb-5 sm:pb-15 text-left sm:text-right">
          <HeadingSectionDetail
            align="smLeftXsCenter"
            headingWidth="xl"
            contentClassName={contentClassName}
            subHeading={subHeading}
            heading={heading}
            contents={contents}
          />
        </div>
      </div>
      <div className="bg-[#F3F3F3]">
        <div className="mx-auto px-6 py-4 pb-16 sm:py-16 container">
          <p className="sm:text-3xl font-medium text-center mb-4 sm:mb-20">
            {topContent}
          </p>
          <div className="space-y-16 sm:space-y-40">
            {deviceType === "mobile" && (
              <>
                {servicesData.services[0] && (
                  <ServiceItem item={servicesData.services[0]} />
                )}

                {(servicesData.services[1] || servicesData.services[2]) && (
                  <div className="flex justify-between gap-x-5 gap-y-10">
                    {servicesData.services.slice(1, 3).map((item) => (
                      <ServiceItem key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {servicesData.services[3] && (
                  <ServiceItem item={servicesData.services[3]} />
                )}
              </>
            )}
            {deviceType === "desktop" ? (
              <div className="flex justify-between flex-wrap gap-y-10">
                {servicesData.services.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsx(
                        item.sectionName === "two" ? "mt-30" : "",
                        "relative w-1/2"
                      )}
                    >
                      <div
                        className={clsx(
                          item.alignRight === true ? "ms-auto" : "",
                          "relative w-full sm:w-2/4 aspect-[3/4]"
                        )}
                      >
                        <Image fill alt="" sizes="100vw" src={item.imgSrc} />
                      </div>
                      {/* Content Section overlapping */}
                      <div
                        className={clsx(
                          item.alignRight === true
                            ? "left-0 -top-[10%]"
                            : "right-0 bottom-[10%]",
                          "absolute max-w-[200px] sm:max-w-xl bg-[rgba(255,255,255,80%)] z-10 p-5 sm:p-15"
                        )}
                      >
                        <h3
                          className={`text-sm md:text-4xl font-semibold sm:tracking-[3px] max-w-xs`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <p className="text-sm sm:text-lg text-center">{bottomContent}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AppServicesSection;
