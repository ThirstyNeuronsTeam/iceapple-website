// src/app/resources/case-studies/[id]/page.tsx
import React from "react";
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
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

// Pre-render these params at build time
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "public", "data", "resources", "case-studies");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  return files
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({
      id: file.replace(/\.json$/, ""),
    }));
}

// Server component — runs on the server at build time (for generateStaticParams items)
// and on request for any dynamic rendering (but since we pre-render, it will be built)
export default async function CaseStudyDetailedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = path.join(process.cwd(), "public", "data", "resources", "case-studies", `${id}.json`);

  if (!fs.existsSync(p)) {
    // show 404 if the file doesn't exist
    return notFound();
  }

  const raw = fs.readFileSync(p, "utf8");
  const content: CaseStudyContent = JSON.parse(raw);

  return (
    <section>
      <CaseStudyHero {...content.heroSection} />
      <CaseStudyDetailedSection dataSection={content.details} dataCaseStudy={content2.caseStudyGrid?.data} />
    </section>
  );
}
