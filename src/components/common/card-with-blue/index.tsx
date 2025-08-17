import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CardProps = {
  cardData: {
    cardDescription: string;
    btnText: string;
    btnUrl: string;
  };
};
const CardBlueBoxSection: React.FC<CardProps> = ({ cardData }) => {
  return (
    <>
      <div className="bg-[#0B68FF] max-w-lg flex flex-col justify-center gap-y-4 sm:gap-y-12 text-white py-4 sm:py-0 px-4 sm:px-30 shadow-[6px_6px_16px_rgba(0,0,0,25%)] sm:shadow-[22px_27px_60px_rgba(0,0,0,25%)]">
        <p className="text-sm sm:text-lg leading-5 sm:leading-9 font-inter">
          {cardData.cardDescription}
        </p>
        <Button
          asChild
          className="w-auto bg-transparent rounded-none sm:py-4 sm:h-16 border-[3px] text-xs sm:text-xl font-semibold font-inter"
          variant="outline"
        >
          <Link href={cardData.btnUrl}>{cardData.btnText}</Link>
        </Button>
      </div>
    </>
  );
};

export default CardBlueBoxSection;
