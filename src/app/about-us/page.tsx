import React from "react";
import content from "../../../data/about-us-page/about-us-page.json";
import HeroSection from "@/components/common/hero-section";
import AboutUsSection from "@/components/common/about-us";
import WhatWeDoSection from "@/components/about-us/what-we-do";
import OurTeamSection from "@/components/about-us/our-team";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection mainClassName="items-end" {...content.about.heroSection} />
      <AboutUsSection contentClassName="sm:pl-16" {...content.about.aboutUs} />
      <WhatWeDoSection contentClassName="" {...content.about.whatWeDo} />
      <OurTeamSection contentClassName="" {...content.about.ourTeam} />
    </section>
  );
};

export default AboutUs;
