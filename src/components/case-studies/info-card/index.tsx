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

  // Dynamic font sizes for mobile vs desktop
  const titleStyle = {
    fontFamily: 'Mosk, sans-serif',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: deviceType === "mobile" ? '24px' : '36px', // responsive size
    lineHeight: deviceType === "mobile" ? '120%' : '121%',
    letterSpacing: deviceType === "mobile" ? '0.02em' : '0.03em',
    verticalAlign: 'middle',
  };

  const descriptionStyle = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: deviceType === "mobile" ? '14px' : '18px', // responsive size
    lineHeight: deviceType === "mobile" ? '180%' : '200%',
    letterSpacing: deviceType === "mobile" ? '0.05em' : '0.07em',
  };

  return (
    <div className={`bg-white shadow-md overflow-hidden rounded-md ${className}`}>
      {/* Responsive Image Container */}
      <div
        className={`relative w-full ${deviceType === "mobile"
            ? "h-40"
            : "h-48 sm:h-52 md:h-56 lg:h-72 xl:h-200"
          }`}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Text Section */}
      <div className="p-6 flex flex-col">
        <h3 className="mb-2 text-gray-900 font-bold" style={titleStyle}>
          {title}
        </h3>

        <div className="h-1 w-40 sm:w-[60%] bg-blue-600 rounded my-2"></div>

        <p className="mt-2 text-gray-600" style={descriptionStyle}>
          {description.split(" ").length > 15
            ? description.split(" ").slice(0, 15).join(" ") + "..."
            : description}
          <Link
            href={link}
            className="text-sm px-2 font-medium text-blue-600 hover:underline mt-4"
          >
            Read More
          </Link>
        </p>
      </div>
    </div>
  );
}
