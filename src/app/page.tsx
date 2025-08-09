import content from "../../data/home-page/home-page.json";
import AboutUsSection from "@/components/home/about-us";
import HeroSection from "@/components/home/hero-section";
import React from "react";

const Home: React.FC = () => {
  return (
    <section>
      <HeroSection />
      <AboutUsSection aboutUsData={content.home.aboutUs} />
    </section>
  );
};

export default Home;
