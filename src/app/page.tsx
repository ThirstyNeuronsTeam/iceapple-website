import content from "../../data/home-page/home-page.json";
import AboutUsSection from "@/components/home/about-us";
import HeroSection from "@/components/home/hero-section";
import OurLegacySection from "@/components/home/our-legacy";
import OurServicesSection from "@/components/home/our-services";
import React from "react";

const Home: React.FC = () => {
  return (
    <section>
      <HeroSection heroData={content.home.heroSection} />
      <AboutUsSection aboutUsData={content.home.aboutUs} />
      <OurServicesSection servicesData={content.home.ourServicesSection} />
      <OurLegacySection legacyData={content.home.ourLegacySection} />
    </section>
  );
};

export default Home;
