// /pages/case-studies/[id].tsx

import React from "react";
import path from 'path';
import fs from 'fs';
import CaseStudyHero from "@/components/case-studies/case-studies-hero-section";
import CaseStudyDetailedSection from "@/components/case-studies/case-studies-detailed-section";
import content2 from "../../../../../data/case_study_overview/case_study_overview.json";
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

type PageProps = {
  params: Promise<{ id: string }>;
};

const CaseStudyDetailedPage = async ({ params }: PageProps) => {
  
  const { id } = await params;
  const p = path.join(process.cwd(), 'public', 'data', 'resources', 'case-studies', `${id}.json`);
  const content: CaseStudyContent = JSON.parse(fs.readFileSync(p, 'utf8'));

  return (
    <section>
      <CaseStudyHero {...content?.heroSection} />
      <CaseStudyDetailedSection dataSection={content?.details} dataCaseStudy={content2?.caseStudyGrid?.data} />
    </section>
  );
};

export default CaseStudyDetailedPage;
