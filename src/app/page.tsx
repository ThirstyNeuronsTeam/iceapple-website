import React from "react";
import content from "../../data/home-page/home-page.json";

import HeroSection from "@/components/common/hero-section";
import AboutUsSection from "@/components/common/about-us";
import OurServicesSection from "@/components/home/our-services";
import CareersSection from "@/components/home/careers";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection
        sectionId="hero"
        mainClassName="items-end"
        {...content.home.heroSection}
      />

      <main role="main">
        <div id="about-us">
          <AboutUsSection
            contentClassName="sm:pl-16"
            {...content.home.aboutUs}
          />
        </div>

        <div id="our-services">
          <OurServicesSection
            contentClassName=""
            {...content.home.ourServicesSection}
            servicesData={content.home.ourServicesSection}
          />
        </div>

        {/* <div id="our-legacy">
          <OurLegacySection
            contentClassName=""
            {...content.home.ourLegacySection}
            legacyData={content.home.ourLegacySection}
          />
        </div> */}

        <div id="careers">
          <CareersSection
            sectionClass=""
            contentClassName=""
            {...content.home.careersSection}
          />
        </div>

        <div id="success-stories">
          <OurSuccessStoriesSection
            contentClassName=""
            {...content.home.ourSuccessStoriesSection}
            successStoriesData={content.home.ourSuccessStoriesSection}
          />
        </div>

        <div id="enquiry-form">
          <OurEnquiryFormSection {...content.home.enquiryFormSection} />
        </div>
      </main>
    </>
  );
};

export default Home;
