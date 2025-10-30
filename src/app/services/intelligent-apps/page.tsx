import React from "react";
import content from "../../../../data/services-page/intelligent-apps.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import AppServicesSection from "@/components/app-development/app-brief-section";
import AboutUsSection from "@/components/common/about-us";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OthersServicesSection from "@/components/app-development/others-brief-section";

const IntelligentApps: React.FC = () => {
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
        servicesData={content.appServices.ourServicesSection}
      />
      <AboutUsSection contentClassName="" {...content.appServices.aboutUs} />
      <OurSuccessStoriesSection
        contentClassName=""
        {...content.appServices.ourSuccessStoriesSection}
        successStoriesData={content.appServices.ourSuccessStoriesSection}
      />
      <OurEnquiryFormSection {...content.appServices.enquiryFormSection} />
      <OthersServicesSection
        contentClassName="w-full sm:w-1/4 ms-auto"
        {...content.appServices.othersServicesSection}
        servicesData={content.appServices.othersServicesSection}
      />
    </section>
  );
};

export default IntelligentApps;
