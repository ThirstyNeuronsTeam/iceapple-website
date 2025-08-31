import CareersSection from "@/components/home/careers";
import content from "../../data/home-page/home-page.json";
import AboutUsSection from "@/components/common/about-us";
import HeroSection from "@/components/common/hero-section";
import OurLegacySection from "@/components/home/our-legacy";
import OurServicesSection from "@/components/home/our-services";
import React from "react";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OurEnquiryFormSection from "@/components/home/our-enquiry-form";

const Home: React.FC = () => {
  return (
    <section>
      <HeroSection {...content.home.heroSection} />
      <AboutUsSection contentClassName="sm:pl-16" {...content.home.aboutUs} />
      <OurServicesSection
        contentClassName=""
        {...content.home.ourServicesSection}
        servicesData={content.home.ourServicesSection}
      />
      <OurLegacySection
        contentClassName=""
        {...content.home.ourLegacySection}
        legacyData={content.home.ourLegacySection}
      />
      <CareersSection
        sectionClass=""
        contentClassName=""
        {...content.home.careersSection}
      />
      <OurSuccessStoriesSection
        contentClassName=""
        {...content.home.ourSuccessStoriesSection}
        successStoriesData={content.home.ourSuccessStoriesSection}
      />
      <OurEnquiryFormSection />
    </section>
  );
};

export default Home;
