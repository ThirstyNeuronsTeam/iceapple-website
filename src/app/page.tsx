import AboutUsSection from "@/components/home/about-us";
import HeroSection from "@/components/home/hero-section";
import React from "react";

const Home: React.FC = () => {
  return (
    <section>
      <HeroSection />
      <AboutUsSection />
    </section>
  );
};

export default Home;
