import React from "react";
import content from "../../../data/case_study_overview/case_study_overview.json";
import HeroSection from "@/components/common/hero-section";
import OurEnquiryFormSection from "@/components/home/our-enquiry-form";
import CaseStudiesGrid from "@/components/case-studies/case-studies-grid";

const CaseStudies: React.FC = () => {
  return (
    <section>
      <HeroSection mainClassName="items-end" {...content.heroSection} />
      <CaseStudiesGrid {...content.caseStudyGrid} />
      <OurEnquiryFormSection />
    </section>
  );
};

export default CaseStudies;
