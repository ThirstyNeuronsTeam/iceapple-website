"use client";
import Image from "next/image";
import Link from "next/link";
import { useDeviceType } from "../../../../hooks/useDeviceType";

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
};

export default function InfoCard({
  title,
  description,
  image,
  link,
  className = "",
}: InfoCardProps) {
  const deviceType = useDeviceType();

  // Dynamic font sizes with clamp for better responsiveness
  const titleStyle = {
    fontWeight: 700,
    fontStyle: "normal",
    fontSize:
      deviceType === "mobile"
        ? "clamp(20px, 5vw, 24px)"
        : "clamp(28px, 3vw, 36px)",
    lineHeight: deviceType === "mobile" ? "120%" : "121%",
    letterSpacing: deviceType === "mobile" ? "0.02em" : "0.03em",
    verticalAlign: "middle",
  };

  const descriptionStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize:
      deviceType === "mobile"
        ? "clamp(13px, 3.5vw, 14px)"
        : "clamp(16px, 1.8vw, 18px)",
    lineHeight: deviceType === "mobile" ? "180%" : "200%",
    letterSpacing: deviceType === "mobile" ? "0.05em" : "0.07em",
  };

  return (
    <div
      className={`bg-white shadow-md overflow-hidden rounded-md flex flex-col ${className}`}
    >
      {/* Responsive Image Container */}
      <div
        className={`relative w-full ${
          deviceType === "mobile"
            ? "h-40"
            : "h-48 sm:h-52 md:h-56 lg:h-72 xl:h-[500px]"
        }`}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Text Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="mb-2 text-gray-900 font-bold" style={titleStyle}>
          {title}
        </h3>

        <div className="h-0.5 w-32 sm:w-40 md:w-[60%] bg-blue-600 my-2"></div>

        <p className="mt-2 text-gray-600" style={descriptionStyle}>
          {description.split(" ").length > 15
            ? description.split(" ").slice(0, 15).join(" ") + "..."
            : description}{" "}
          <Link
            href={link}
            className="text-sm font-medium text-blue-600 hover:underline ml-1"
          >
            Read More
          </Link>
        </p>
      </div>
    </div>
  );
}
