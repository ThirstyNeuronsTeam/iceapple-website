import HeroSection from "@/components/common/hero-section";
import React from "react";
import content from "../../../data/industry-page/industry-page.json";
import OurIndustrySection from "@/components/industry/our-industries";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import OurClientsSection from "@/components/industry/our-clients";

const Industries: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="hero"
        mainClassName="items-end"
        {...content.industry.heroSection}
      />
      <OurIndustrySection
        contentClassName=""
        {...content.industry.ourIndustriesSection}
        servicesData={content.industry.ourIndustriesSection}
      />
      <OurSuccessStoriesSection
        contentClassName=""
        {...content.industry.ourSuccessStoriesSection}
        successStoriesData={content.industry.ourSuccessStoriesSection}
      />
      <OurClientsSection
        contentClassName=""
        {...content.industry.ourClientsSection}
        servicesData={content.industry.ourClientsSection}
      />
      <OurEnquiryFormSection {...content.industry.enquiryFormSection} />
    </section>
  );
};

export default Industries;
