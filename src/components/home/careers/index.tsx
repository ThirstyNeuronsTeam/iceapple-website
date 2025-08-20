import React from "react";
import content from "../../../../data/home-page/home-page.json";
import HeadingSectionDetail from "@/components/common/heading";
import CardBlueBoxSection from "@/components/common/card-with-blue";
import CardWithImageSection from "@/components/common/card-with-image";

const CareersSection: React.FC = ({}) => {
  return (
    <article>
      <div className="relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-[#F3F3F3] after:w-full sm:after:w-[60vw] z-0 after:-z-10">
        <div className="w-full mx-auto pl-5 2xl:px-0 container">
          <div className="grid grid-cols-[40%_55%] sm:grid-cols-2 py-9 sm:py-16 gap-4">
            <div className="relative pt-5 sm:pt-20 pb-5 max-w-xl text-right">
              <HeadingSectionDetail
                align="right"
                headingWidth="xl"
                headingData={content.home.careersSection}
              />
            </div>
            <CardBlueBoxSection
              mainClassNames="py-4 sm:py-0 px-4 sm:px-30 gap-y-4 sm:gap-y-12"
              cardData={content.home.careersSection}
            />
          </div>
        </div>
      </div>
      <div className="w-full mx-auto px-5 2xl:px-0 container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-20 my-25">
          <CardWithImageSection cardData={content.home.careersSection} />
        </div>
      </div>
    </article>
  );
};

export default CareersSection;
