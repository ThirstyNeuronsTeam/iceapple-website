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
    const p = path.join(
      process.cwd(),
      "data",
      "blogs",
      "iceapple-tech-talks.xml"
    );

    const xmlData = fs.readFileSync(p, "utf8");

    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    // console.log(jsonData);

    const channel = jsonData?.rss?.channel;
    if (!channel) return null;

    const items: XmlItem[] = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];

    // console.log(items);

    const normalizeItem = (item: XmlItem): NormalizedItem => {
      const id = item.guid._.split("/").pop() || item.guid._;
      const contentHtml = item["content:encoded"] || item.description || "";
      const contentText = contentHtml.replace(/<[^>]*>/g, "");

      // Extract image from content:encoded HTML
      const extractImage = (html: string): string => {
        // Early return if no HTML content
        if (!html || html.trim().length === 0) {
          return "/assets/general/blogs/blogs_card.jpg";
        }

        // Extract all img src attributes (supports both single and double quotes)
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
        const matches = html.matchAll(imgRegex);

        // Medium CDN domains to look for
        const validCDNPatterns = [
          "cdn-images-1.medium.com",
          "cdn-images.medium.com",
          "miro.medium.com",
        ];

        // Tracking pixel patterns to exclude
        const trackingPatterns = [
          "medium.com/_/stat",
          'width="1"',
          'height="1"',
        ];

        for (const match of matches) {
          const imgSrc = match[1];

          // Skip tracking pixels
          if (trackingPatterns.some((pattern) => imgSrc.includes(pattern))) {
            continue;
          }

          // Check if it's a valid Medium CDN image
          const isMediumCDN = validCDNPatterns.some((cdn) =>
            imgSrc.includes(cdn)
          );

          // Check for valid image formats or Medium's dynamic image URLs
          const hasValidFormat =
            /\.(jpe?g|png|gif|webp)(\?|$)/i.test(imgSrc) || // Standard image extensions
            /\/\d+\/[\d*][a-zA-Z0-9_-]+$/i.test(imgSrc); // Medium's format: /1024/1*abc123 or /742/0*xyz

          // Return first valid Medium image found
          if (isMediumCDN && hasValidFormat) {
            return imgSrc;
          }
        }

        // Fallback to default image
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
        readTime: `${Math.ceil(
          contentText.trim().split(/\s+/).length / 200
        )} min read`,
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
      <HeroSection
        sectionId=" "
        mainClassName="items-end"
        {...content.heroSection}
      />

      <div className="container mx-auto px-4">
        <ResourcesGrid {...(normalizedData ?? content.caseStudyGrid)}>
          {normalizedData?.data.map((study, index) => {
            return (
              <CardWrapper zigzag={false} index={index} key={study.link}>
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
            );
          })}
        </ResourcesGrid>
      </div>

      <OurEnquiryFormSection {...content.enquiryFormSection} />
    </section>
  );
}
