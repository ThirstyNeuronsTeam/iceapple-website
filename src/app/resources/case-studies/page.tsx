import React from "react";
import content from "../../../../data/case_study_overview/case_study_overview.json";
import HeroSection from "@/components/common/hero-section";
import ResourcesGrid from "@/components/case-studies/resources-grid";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
// import OurEnquiryFormSection from "@/components/common/our-enquiry-form";

const CaseStudies: React.FC = () => {
  return (
    <section>
      <HeroSection sectionId={""} mainClassName="items-end" {...content.heroSection} />
      <div className="container mx-auto px-4">
        <ResourcesGrid zigzag {...content.caseStudyGrid} />
      </div>
        <OurEnquiryFormSection {...content.enquiryFormSection} />
    </section>
  );
};

export default CaseStudies;
