import React from "react";
import content from "../../../data/about-us-page/about-us-page.json";
import HeroSection from "@/components/common/hero-section";
import AboutUsSection from "@/components/common/about-us";
import WhatWeDoSection from "@/components/about-us/what-we-do";
import OurTeamSection from "@/components/about-us/our-team";
import OurHistorySection from "@/components/about-us/our-history";
import WhyChooseUsSection from "@/components/about-us/why-choose-us";
import OurSuccessStoriesSection from "@/components/home/our-success-stories";
import OurEnquiryFormSection from "@/components/home/our-enquiry-form";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection mainClassName="items-end" {...content.about.heroSection} />
      <AboutUsSection contentClassName="sm:pl-16" {...content.about.aboutUs} />
      <WhatWeDoSection contentClassName="" {...content.about.whatWeDo} />
      <OurTeamSection contentClassName="" {...content.about.ourTeam} />
      <OurHistorySection
        sectionClass=""
        contentClassName=""
        {...content.about.historySection}
      />
      <WhyChooseUsSection
        contentClassName=""
        {...content.about.whyChooseUsSection}
      />
      <OurSuccessStoriesSection
        contentClassName=""
        {...content.about.ourSuccessStoriesSection}
        successStoriesData={content.about.ourSuccessStoriesSection}
      />
      <OurEnquiryFormSection />
    </section>
  );
};

export default AboutUs;
