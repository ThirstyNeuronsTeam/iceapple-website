import content from "../../../../data/blogs/blog-main.json";
import HeroSection from "@/components/common/hero-section";
import ResourcesGrid from "@/components/case-studies/resources-grid";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
 import path from "path";
import fs from "fs";
import { parseStringPromise } from "xml2js";

 
interface XmlItem {
  guid: { _: string };
  title?: string;
  description?: string;
  "content:encoded"?: string;
  pubDate: string;
}
 
interface NormalizedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  link: string;
}
 
interface NormalizedData {
  sectionHeading: string;
  sectionTitle: string;
  data: NormalizedItem[];
}
 
async function fetchXmlData(): Promise<NormalizedData | null> {
    try {
       const p = path.join(process.cwd(), "data", "blogs", "iceapple-tech-talks.xml");
      
          const xmlData = fs.readFileSync(p, "utf8");
 
      const jsonData = await parseStringPromise(xmlData, { explicitArray: false });
 
      const channel = jsonData?.rss?.channel;
      if (!channel) return null;
 
      const items: XmlItem[] = Array.isArray(channel.item) ? channel.item : [channel.item];
 
      const normalizeItem = (item: XmlItem): NormalizedItem => {
        const id = item.guid._.split("/").pop() || item.guid._;
        const contentText = item["content:encoded"]?.replace(/<[^>]*>/g, "") || item.description || "";
 
        return {
          id,
          title: item.title || "",
          description: contentText,
          image: "/assets/general/blogs/blogs_card.jpg",
          date: new Date(item.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime: `${Math.ceil(contentText.trim().split(/\s+/).length / 200)} min read`,
          link: "/resources/blogs/" + id,
        };
      };
 
      return {
        sectionHeading: channel.title,
        sectionTitle: "Blogs",
        data: items.map(normalizeItem),
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch XML";
      console.error("❌ Error fetching blogs XML:", message);
      return null;
    }
  }
 
export default async function BlogsMainPage() {
    const normalizedData = await fetchXmlData();
 
  return (
    <section>
      <HeroSection sectionId="" mainClassName="items-end" {...content.heroSection} />
 
      <div className="container mx-auto px-4">
        <ResourcesGrid {...(normalizedData ?? content.caseStudyGrid)} />
      </div>
 
      <OurEnquiryFormSection {...content.enquiryFormSection} />
    </section>
  );
}
 