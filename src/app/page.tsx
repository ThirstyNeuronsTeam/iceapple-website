import CareersSection from "@/components/home/careers";
import content from "../../data/home-page/home-page.json";
import AboutUsSection from "@/components/home/about-us";
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
      <AboutUsSection aboutUsData={content.home.aboutUs} />
      <OurServicesSection servicesData={content.home.ourServicesSection} />
      <OurLegacySection legacyData={content.home.ourLegacySection} />
      <CareersSection />
      <OurSuccessStoriesSection
        successStoriesData={content.home.ourSuccessStoriesSection}
      />
      <OurEnquiryFormSection />
    </section>
  );
};

export default Home;
