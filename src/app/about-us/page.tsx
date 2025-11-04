import React from "react";
import content from "../../../data/about-us-page/about-us-page.json";
import HeroSection from "@/components/common/hero-section";
import AboutUsSection from "@/components/common/about-us";
import WhatWeDoSection from "@/components/about-us/what-we-do";
import OurTeamSection from "@/components/about-us/our-team";
import OurHistorySection from "@/components/about-us/our-history";
import WhyChooseUsSection from "@/components/about-us/why-choose-us";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="about-hero"
        mainClassName="items-end"
        {...content.about.heroSection}
      />
      <div id="about-us">
        <AboutUsSection
          contentClassName="sm:pl-0 xl:pl-16"
          {...content.about.aboutUs}
        />
      </div>
      <div id="what-we-do">
        <WhatWeDoSection contentClassName="" {...content.about.whatWeDo} />
      </div>
      <div id="our-team">
        <OurTeamSection contentClassName="" {...content.about.ourTeam} />
      </div>
      <div id="our-history">
        <OurHistorySection
          sectionClass=""
          contentClassName=""
          {...content.about.historySection}
        />
      </div>
      <div id="why-choose-us">
        <WhyChooseUsSection
          contentClassName=""
          {...content.about.whyChooseUsSection}
        />
      </div>
      <div id="success-stories">
        <OurSuccessStoriesSection
          contentClassName=""
          {...content.about.ourSuccessStoriesSection}
          successStoriesData={content.about.ourSuccessStoriesSection}
        />
      </div>
      <OurEnquiryFormSection {...content.about.enquiryFormSection} />
    </section>
  );
};

export default AboutUs;
