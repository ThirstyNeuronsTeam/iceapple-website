import clsx from "clsx";
import Image from "next/image";
import React from "react";

type CardProps = {
  cardWithImageData: {
    info: {
      cardImage: string;
      cardTitle: string;
      cardBoxDescription: string;
    }[];
  };
  sectionClass: string;
  sectionBodyClass: string;
  sectionContentClass: string;
};
const CardWithImageSection: React.FC<CardProps> = ({
  cardWithImageData,
  sectionClass,
  sectionBodyClass,
  sectionContentClass,
}) => {
  return (
    <>
      {cardWithImageData.info
        ? cardWithImageData.info?.map((item, index) => (
            <div
              key={index}
              className={clsx(
                sectionClass,
                "flex flex-col justify-center items-start shadow-[8px_3px_42px_rgba(0,0,0,30%)] sm:shadow-[38px_47px_212px_rgba(0,0,0,30%)]"
              )}
            >
              <div className="aspect-3/2 w-full relative">
                <Image fill sizes="100vw" src={item.cardImage} alt="" />{" "}
                {item.cardTitle === "Win Together" && (
                  <div className="absolute  w-[60vw] h-[480px] bg-[#F3F3F3] right-[-20%] top-[55%] z-[-2] sm:hidden"></div>
                )}
              </div>
              <div
                className={clsx(
                  sectionBodyClass,
                  "text-center h-full bg-[#FFFFFF]"
                )}
              >
                <h6 className="text-base sm:text-2xl font-bold font-inter mb-4">
                  {item.cardTitle}
                </h6>
                <p
                  className={clsx(
                    sectionContentClass,
                    "text-sm sm:text-lg leading-5 sm:leading-9 font-inter max-h-fit"
                  )}
                >
                  {item.cardBoxDescription}
                </p>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default CardWithImageSection;
