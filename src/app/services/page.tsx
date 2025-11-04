import React from "react";
import content from "../../../data/services-page/services-page.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import OurServicesSection from "@/components/about-us/our-services";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="services-hero"
        mainClassName="items-end"
        {...content.services.heroSection}
      />
      <div id="our-services">
        <OurServicesSection
          contentClassName=""
          {...content.services.ourServicesSection}
          servicesData={content.services.ourServicesSection}
        />
      </div>
      <OurEnquiryFormSection {...content.services.enquiryFormSection} />
    </section>
  );
};

export default AboutUs;
