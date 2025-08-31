import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";

type CardProps = {
  mainClassNames?: string;
  headingClassNames?: string;
  discriptionClassNames?: string;
  cardData: {
    cardTitle: string;
    cardDescription: string;
    btnText: string;
    btnUrl: string;
  };
};
const CardBlueBoxSection: React.FC<CardProps> = ({
  cardData,
  mainClassNames,
  headingClassNames,
  discriptionClassNames,
}) => {
  return (
    <>
      <div
        className={clsx(
          mainClassNames,
          "bg-[#0B68FF] flex flex-col justify-center text-white shadow-[6px_6px_16px_rgba(0,0,0,25%)] sm:shadow-[22px_27px_60px_rgba(0,0,0,25%)]"
        )}
      >
        {cardData.cardTitle ? (
          <h5 className={clsx(headingClassNames, "mb-5")}>
            {cardData.cardTitle}
          </h5>
        ) : (
          ""
        )}
        <p
          className={clsx(
            discriptionClassNames,
            "text-sm sm:text-lg leading-5 sm:leading-9 font-inter"
          )}
        >
          {cardData.cardDescription}
        </p>
        {cardData.btnText ? (
          <Button
            asChild
            className="w-auto bg-transparent rounded-none sm:py-4 sm:h-16 border-[3px] text-xs sm:text-xl font-semibold font-inter"
            variant="outline"
          >
            <Link href={cardData.btnUrl}>{cardData.btnText}</Link>
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CardBlueBoxSection;
