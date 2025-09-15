import React from "react";
import content from "../../../../data/case_study_overview/case_study_overview.json";
import HeroSection from "@/components/common/hero-section";
import CaseStudiesGrid from "@/components/case-studies/case-studies-grid";
// import OurEnquiryFormSection from "@/components/common/our-enquiry-form";

const CaseStudies: React.FC = () => {
  return (
    <section>
      <HeroSection sectionId={""} mainClassName="items-end" {...content.heroSection} />
      <CaseStudiesGrid {...content.caseStudyGrid} />
      {/* <OurEnquiryFormSection image={""} cardTitle={""} cardDescription={""} btnText={""} btnUrl={""} /> */}
    </section>
  );
};

export default CaseStudies;
