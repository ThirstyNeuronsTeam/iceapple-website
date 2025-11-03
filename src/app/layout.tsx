import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import content from "../../data/footer/footer.json";
import Footer from "@/components/common/footer";

export const metadata: Metadata = {
  title: "IceApple - Technology and Business Solutions",
  description: "IceApple provides comprehensive technology and business solutions including intelligent apps, device development, data science, and DevOps services. Empowering businesses with innovative technology solutions.",
  keywords: "technology solutions, intelligent apps, device development, data science, DevOps, business solutions, software development",
  authors: [{ name: "IceApple Team" }],
  creator: "IceApple",
  publisher: "IceApple",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iceapple.ai",
    title: "IceApple - Technology and Business Solutions",
    description: "IceApple provides comprehensive technology and business solutions including intelligent apps, device development, data science, and DevOps services.",
    siteName: "IceApple",
  },
  twitter: {
    card: "summary_large_image",
    title: "IceApple - Technology and Business Solutions",
    description: "IceApple provides comprehensive technology and business solutions including intelligent apps, device development, data science, and DevOps services.",
  },
};

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const moskFont = localFont({
  src: [
    {
      path: "./fonts/Mosk-Normal-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Medium-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Semi-Bold-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Bold-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mosk",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${moskFont.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#002656" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn(moskFont.variable, inter.variable, "font-main")}>
        <Navbar />
        <main>{children}</main>
        <Footer footerData={content.footer} />
      </body>
    </html>
  );
}
