import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";
import Image from "next/image";

type contactMapProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  mapImage: string;
};

const ContactMapSection: React.FC<contactMapProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  sectionClass,
  mapImage,
}) => {
  return (
    <article>
      <div className="relative mb-10 sm:mb-30">
        <div className="w-full mx-auto px-5 2xl:px-0 container">
          <div className="grid py-5 sm:py-16 gap-4">
            <div
              className={clsx(
                sectionClass,
                "relative pt-5 sm:pt-20 pb-5 text-center sm:text-left"
              )}
            >
              <HeadingSectionDetail
                align="smLeftXsCenter"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
              />
            </div>
          </div>
          <div className="grid gap-x-14">
            <div className="relative w-full h-[250px] sm:h-[800px] mx-auto aspect-square">
              <Image fill className="object-fill" src={mapImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactMapSection;
