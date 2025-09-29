// app/case-studies/[id]/page.tsx
import React from "react";
import BlogsHeader from "@/components/blogs/blog-header";
import DynamicTextBlock from "@/components/blogs/DynamicTextBlock";

// ----------------- Types -----------------
type XmlItem = {
  guid?: { _: string };
  title?: string;
  description?: string;
  "content:encoded"?: string;
  pubDate: string;
};

type HeroSection = {
  id: string;
  blogName: string;
  tag: string;
  date: string;
  readTime: string;
  bannerUrl: string;
};

type BlogContent = {
  heroSection: HeroSection;
  details: string[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

// ----------------- Fetch Function -----------------
async function fetchBlogById(id: string): Promise<BlogContent | null> {
  try {
    const res = await fetch("http://localhost:3000/api/fetch-xml/", {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const xmlJson = await res.json();
    const items: XmlItem[] = Array.isArray(xmlJson?.rss?.channel?.item)
      ? xmlJson.rss.channel.item
      : [xmlJson?.rss?.channel?.item];

    if (!items) return null;

    const blog = items.find((item) => item.guid?._?.split("/").pop() === id);
    if (!blog) return null;

    const contentText = blog["content:encoded"] || blog.description || "";

    return {
      heroSection: {
        id,
        blogName: blog.title || "Untitled",
        tag: "Blog",
        date: new Date(blog.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: `${Math.ceil(contentText.trim().split(/\s+/).length / 200)} min read`,
        bannerUrl: "/assets/general/blogs/blogs_card.jpg",
      },
      details: [contentText],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error fetching blog";
    console.error("❌ Error fetching blog:", message);
    return null;
  }
}

// ----------------- Page Component -----------------
export default async function BlogsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const content = await fetchBlogById(id);

  if (!content) {
    return <p>Blog not found.</p>;
  }

  return (
    <section>
      <BlogsHeader {...content.heroSection} />
      <DynamicTextBlock {...content.heroSection} className="bg-white" />
    </section>
  );
}
