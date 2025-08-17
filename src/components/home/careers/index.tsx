import React from "react";
import content from "../../../../data/home-page/home-page.json";
import HeadingSectionDetail from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CareersProps = {
  careersData: {
    services: {
      id: number;
      title: string;
      description: string;
      imgSrc: string;
      alignRight?: boolean; // alternate layout
      reverse?: boolean;
      alignLeft: boolean;
      sectionName: string;
      shadow: boolean;
    }[];
  };
};

const CareersSection: React.FC<CareersProps> = ({ careersData }) => {
  return (
    <article className="relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[60vw] z-0 after:-z-10">
      <div className="w-full mx-auto pl-5 2xl:px-0 container">
        <div className="grid grid-cols-[40%_55%] sm:grid-cols-2 py-9 sm:py-16 gap-4">
          <div className="relative pt-5 sm:pt-20 pb-5 max-w-xl text-right">
            <HeadingSectionDetail
              align="right"
              headingWidth="xl"
              headingData={content.home.careersSection}
            />
          </div>
          <div className="bg-[#0B68FF] max-w-lg flex flex-col justify-center gap-y-4 sm:gap-y-12 text-white py-4 sm:py-0 px-4 sm:px-30 shadow-[6px_6px_16px_rgba(0,0,0,25%)] sm:shadow-[22px_27px_60px_rgba(0,0,0,25%)]">
            <p className="text-sm sm:text-lg leading-5 sm:leading-9 font-inter">
              Seize the opportunity to sculpt a rewarding career and shape your
              future with us
            </p>
            <Button
              asChild
              className="w-auto bg-transparent rounded-none sm:py-4 sm:h-16 border-[3px] text-xs sm:text-xl font-semibold font-inter"
              variant="outline"
            >
              <Link href="/login">Join us</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CareersSection;
