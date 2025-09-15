// /pages/case-studies/[id].tsx

import { useRouter } from "next/router";
import React from "react";
import CaseStudyHero from "@/components/case-studies/case-studies-hero-section";
import CaseStudyDetailedSection from "@/components/case-studies/case-studies-detailed-section";
import content2 from "../../../../../../iceapple-website/data/case_study_overview/case_study_overview.json";
type Section = {
  title: string;
  content: string;
};

type CaseStudyContent = {
  heroSection: {
    id: number;
    companyName: string;
    tag: string;
    logoUrl: string;
    bannerUrl: string;
  };
  details: Section[];
};

const CaseStudyDetailedPage: React.FC = async ({params}:any) => {
  const { id } = params;
  const resp = await fetch(`http://localhost:3000/data/case-studies/${id}.json`);
  const content: CaseStudyContent = await resp.json();
  return (
    <section>
      <CaseStudyHero {...content?.heroSection} />
      <CaseStudyDetailedSection dataSection={content?.details} dataCaseStudy={content2?.caseStudyGrid?.data} />
    </section>
  );
};

export default CaseStudyDetailedPage;
