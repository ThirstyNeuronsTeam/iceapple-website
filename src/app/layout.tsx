import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "IceApple",
  description: "Provides Technology and Business Solutions",
};

const moskFont = localFont({
  src: [
    {
      path: "./fonts/Mosk-Thin-100.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Extra-Light-200.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Light-300.ttf",
      weight: "300",
      style: "normal",
    },
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
    {
      path: "./fonts/Mosk-Extra-Bold-800.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Mosk-Ultra-Bold-900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mosk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${moskFont.variable} antialiased`}>
      <body className={cn`${moskFont.variable} font-main`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
