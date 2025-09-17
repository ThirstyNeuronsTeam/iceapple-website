import React from "react";
import HeadingSectionDetail from "@/components/common/heading";
import clsx from "clsx";
import Image from "next/image";

type contactDetailsProps = {
  subHeading: string;
  heading: string;
  contents: string[];
  contentClassName: string;
  sectionClass: string;
  contactData: {
    contactItems: {
      id: string;
      cardIcon: string;
      cardHeading: string;
      cardContent: string;
    }[];
  };
};

const ContactDetailsSection: React.FC<contactDetailsProps> = ({
  subHeading,
  heading,
  contents,
  contentClassName,
  sectionClass,
  contactData,
}) => {
  return (
    <article>
      <div className="relative mb-50">
        <div className="w-full mx-auto pl-5 2xl:px-0 container">
          <div className="grid py-9 sm:py-16 gap-4">
            <div className={clsx(sectionClass, "relative pt-5 sm:pt-20 pb-5")}>
              <HeadingSectionDetail
                align="left"
                contentClassName={contentClassName}
                subHeading={subHeading}
                heading={heading}
                contents={contents}
              />
            </div>
          </div>
          <div className="grid gap-x-14 sm:grid-cols-3 px-60 mx-auto">
            {contactData.contactItems.map((item) => (
              <div key={item.id} className="flex gap-y-6 flex-col text-center">
                <div className="relative w-[90px] h-[70px] mx-auto aspect-square">
                  <Image
                    fill
                    className="object-fill"
                    src={item.cardIcon}
                    alt=""
                  />
                </div>
                <h6 className="text-3xl font-bold">{item.cardHeading}</h6>
                <p className="tracking-[2px] font-inter text-lg">
                  {item.cardContent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactDetailsSection;
