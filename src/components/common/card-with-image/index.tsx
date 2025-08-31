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
};
const CardWithImageSection: React.FC<CardProps> = ({ cardWithImageData }) => {
  return (
    <>
      {cardWithImageData.info
        ? cardWithImageData.info?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-start shadow-[8px_3px_42px_rgba(0,0,0,30%)] sm:shadow-[38px_47px_212px_rgba(0,0,0,30%)]"
            >
              <div className="aspect-3/2 w-full relative">
                <Image fill sizes="100vw" src={item.cardImage} alt="" />
              </div>
              <div className="px-4 sm:px-20 py-5 sm:py-12 text-center h-full">
                <h6 className="text-base sm:text-2xl font-bold font-inter mb-4">
                  {item.cardTitle}
                </h6>
                <p className="text-sm sm:text-lg leading-5 sm:leading-9 font-inter max-h-fit">
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
