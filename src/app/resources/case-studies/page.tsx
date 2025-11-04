import React from "react";
import content from "../../../../data/case_study_overview/case_study_overview.json";
import HeroSection from "@/components/common/hero-section";
import ResourcesGrid from "@/components/case-studies/resources-grid";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import InfoCard from "@/components/case-studies/info-card";
import CardWrapper from "@/components/case-studies/resources-grid/card-wrapper";
// import OurEnquiryFormSection from "@/components/common/our-enquiry-form";

const CaseStudies: React.FC = () => {
  return (
    <section>
      <HeroSection sectionId="case-studies-hero" mainClassName="items-end" {...content.heroSection} />
      <div id="case-studies-grid" className="container mx-auto px-4">
        <ResourcesGrid {...content.caseStudyGrid}>
          {
            content.caseStudyGrid?.data.map((study,index) => {
              return <CardWrapper zigzag={true} index={index} key={study.link}>

                <InfoCard

                  title={study.title}
                  description={study.description}
                  image={study.image}
                  link={study.link}
                  className="rounded-none"
                />
              </CardWrapper>
            }) 
          }
        </ResourcesGrid>
      </div>
      <OurEnquiryFormSection {...content.enquiryFormSection} />
    </section>
  );
};

export default CaseStudies;
