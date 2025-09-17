import React from "react";
import content from "../../../data/contact-us-page/contact-us-page.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import ContactDetailsSection from "@/components/contact-us/contact-details";

const ContactUs: React.FC = () => {
  return (
    <section>
      <HeroSection
        sectionId="hero"
        mainClassName="items-end"
        {...content.contact.heroSection}
      />
      <ContactDetailsSection
        sectionClass=""
        contentClassName=""
        {...content.contact.contactDetailsSection}
        contactData={content.contact.contactDetailsSection}
      />
      <OurEnquiryFormSection {...content.contact.enquiryFormSection} />
    </section>
  );
};

export default ContactUs;
