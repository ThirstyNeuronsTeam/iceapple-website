import React from "react";
import content from "../../../../data/services-page/app-development-page.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import AppServicesSection from "@/components/app-development/app-brief-section";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="hero"
        mainClassName="items-end"
        {...content.appServices.heroSection}
      />
      <AppServicesSection
        contentClassName="w-full sm:w-3/4 ms-auto"
        {...content.appServices.ourServicesSection}
        // servicesData={content.appServices.ourServicesSection}
      />
      <OurEnquiryFormSection {...content.appServices.enquiryFormSection} />
    </section>
  );
};

export default AboutUs;
