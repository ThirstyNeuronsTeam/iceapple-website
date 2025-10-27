import content from "../../../../data/blogs/blog-main.json";
import HeroSection from "@/components/common/hero-section";
import ResourcesGrid from "@/components/case-studies/resources-grid";
import OurEnquiryFormSection from "@/components/common/our-enquiry-form";
import path from "path";
import fs from "fs";
import { parseStringPromise } from "xml2js";
import { BlogPostCard } from "@/components/blogs/blogs-card";
import CardWrapper from "@/components/case-studies/resources-grid/card-wrapper";


interface XmlItem {
  guid: { _: string };
  title?: string;
  description?: string;
  "content:encoded"?: string;
  pubDate: string;
  "dc:creator": string;
}

interface NormalizedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  link: string;
  creator: string;
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

    console.log(jsonData)

    const channel = jsonData?.rss?.channel;
    if (!channel) return null;

    const items: XmlItem[] = Array.isArray(channel.item) ? channel.item : [channel.item];

    const normalizeItem = (item: XmlItem): NormalizedItem => {
      const id = item.guid._.split("/").pop() || item.guid._;
      const contentHtml = item["content:encoded"] || item.description || "";
      const contentText = contentHtml.replace(/<[^>]*>/g, "");

      // Extract image from content:encoded HTML
      const extractImage = (html: string): string => {
        // Find all img tags (match both single and double quotes)
        const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/gi;
        const matches = Array.from(html.matchAll(imgRegex));

        // Loop through all images and find the first valid one (not a tracking pixel)
        for (const match of matches) {
          const imgSrc = match[1];

          // Filter out Medium tracking pixels and only keep actual content images
          const isTrackingPixel =
            imgSrc.includes('medium.com/_/stat') ||
            imgSrc.includes('width="1"') ||
            imgSrc.includes('height="1"');

          // Check if it's a valid Medium CDN image
          const isMediumCDN =
            imgSrc.includes('cdn-images-1.medium.com') ||
            imgSrc.includes('cdn-images.medium.com') ||
            imgSrc.includes('miro.medium.com');

          const hasImageFormat =
            imgSrc.includes('.jpg') ||
            imgSrc.includes('.jpeg') ||
            imgSrc.includes('.png') ||
            imgSrc.includes('.gif') ||
            imgSrc.includes('.webp') ||
            // Match Medium's image format without extension (e.g., /1024/0*q3_SGI0prc4yssxl or /1*ABC123)
            imgSrc.match(/\/\d+[*/][a-zA-Z0-9_-]+$/);

          const isValidImage = isMediumCDN && hasImageFormat;

          if (!isTrackingPixel && isValidImage) {
            return imgSrc;
          }
        }

        return "/assets/general/blogs/blogs_card.jpg";
      };

      return {
        id,
        title: item.title || "",
        description: contentText,
        creator: item["dc:creator"],
        image: extractImage(contentHtml),
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
      <HeroSection sectionId=" " mainClassName="items-end" {...content.heroSection} />

      <div className="container mx-auto px-4">
        <ResourcesGrid {...(normalizedData ?? content.caseStudyGrid)}>
          {
            normalizedData?.data.map((study, index) => {
              return <CardWrapper zigzag={false} index={index} key={study.link}>
                <BlogPostCard
                  key={study.link}
                  title={study.title}
                  date={study.date}
                  readTime={study.readTime}
                  description={study.description}
                  imageUrl={study.image}
                  link={study.link}
                  creator={study.creator ?? ""}
                />
              </CardWrapper>
            })
          }
        </ResourcesGrid>
      </div>

      <OurEnquiryFormSection {...content.enquiryFormSection} />
    </section>
  );
}
