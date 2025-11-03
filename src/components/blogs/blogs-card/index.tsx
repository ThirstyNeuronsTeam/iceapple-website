import { BookOpenText, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPostCardProps {
  title: string
  date?: string
  readTime?: string
  description: string
  imageUrl: string
  link: string
  creator: string;
}

function capitalizeFirstLetters(str:string) {
  return str
  .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function BlogPostCard({ title, date, readTime, description, imageUrl, link, creator }: BlogPostCardProps) {
  return (
    <Link
      href={link}
      className="
        w-full
    sm:w-full
    max-w-[95vw] sm:max-w-full
    mx-auto
    h-auto 
    shadow-sm hover:shadow-md 
    transition-shadow overflow-hidden flex flex-col p-6
      "
    >
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-64 lg:h-120">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Card Content Section */}
  <div className="flex-1 p-4 sm:p-6 flex flex-col h-full">
        {/* Title */}
        <h3
          className="
            font-bold text-gray-900 leading-[121%] tracking-[0.03em]
            text-base sm:text-2xl lg:text-3xl
            mb-2 sm:mb-4
            line-clamp-2
          "
        >
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span
            className="
      text-xs sm:text-sm lg:text-base 
      font-medium text-gray-800 
    "
          >
            {capitalizeFirstLetters(creator)}
          </span>
        </div>

        {/* Date and Read Time */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>{date}</span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-1">
            <BookOpenText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>{readTime}</span>
          </div>
        </div>


        {/* description and "Read More" text */}
        <p className="text-gray-700 text-sm leading-relaxed flex-1">
          {description.split(" ").length > 15
            ? description.split(" ").slice(0, 15).join(" ") + "..."
            : description}{" "}
          <span className="text-sm font-medium text-blue-600 hover:underline ml-1">
            Read More
          </span>
        </p>
      </div>
    </Link>
  )
}
