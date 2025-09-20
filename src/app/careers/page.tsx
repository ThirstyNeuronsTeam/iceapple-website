import React from "react";
import content from "../../../data/careers-page/careers-page.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import OurCultureSection from "@/components/careers/our-culture-section";
import ContactDetailsCareersSection from "@/components/careers/contact-details";
import GalleryCarousel from "@/components/careers/gallery-carousel";
import JobOpeningSection from "@/components/careers/job-opening";

const Careers: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="hero"
        mainClassName="items-end"
        {...content.careers.heroSection}
      />
      <OurCultureSection
        sectionClass=""
        contentClassName="font-inter sm:font-main"
        paraClassName="sm:leading-10"
        {...content.careers.ourCultureSection}
      />
      <ContactDetailsCareersSection
        sectionClass=""
        contentClassName="font-inter sm:font-main"
        paraClassName=""
        {...content.careers.contactDetails}
      />
      <GalleryCarousel
        sectionClass=""
        headingWidthClass="ml-0"
        contentClassName="font-inter sm:font-main"
        paraClassName=""
        {...content.careers.gallerySection}
      />
      <JobOpeningSection
        sectionClass=""
        contentClassName="font-inter sm:font-main"
        paraClassName="sm:leading-10"
        {...content.careers.jobOpeningSection}
      />
      <OurEnquiryFormSection {...content.careers.enquiryFormSection} />
    </section>
  );
};

export default Careers;
