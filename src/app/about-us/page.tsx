import React from "react";
import content from "../../../data/about-us-page/about-us-page.json";
import HeroSection from "@/components/common/hero-section";

const AboutUs: React.FC = () => {
  return (
    <section>
      <HeroSection mainClassName="items-end" {...content.about.heroSection} />
    </section>
  );
};

export default AboutUs;
