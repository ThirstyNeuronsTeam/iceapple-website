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

export function BlogPostCard({
  title,
  date,
  readTime,
  description,
  imageUrl,
  link,
  creator,
}: BlogPostCardProps) {
  return (
    <Link
      href={link}
      className="
        group block h-full
        rounded-2xl border overflow-hidden
        shadow-sm hover:shadow-md transition-shadow
      "
    >
      {/* Image */}
      <div className="relative aspect-[16/9]">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
          unoptimized
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col p-4 sm:p-6 h-full">
        <h3 className="font-bold text-gray-900 leading-[1.21] tracking-[0.03em]
                       text-base sm:text-2xl lg:text-3xl
                       mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-800">
            {capitalizeFirstLetters(creator)}
          </span>
        </div>

        <div className="mt-2 sm:mt-3 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>{date}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <BookOpenText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Grow area */}
        <p className="mt-2 text-gray-700 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Footer pinned to bottom */}
        <div className="mt-auto pt-3">
          <span className="text-sm font-medium text-blue-600 group-hover:underline">
            Read More
          </span>
        </div>
      </div>
    </Link>
  )
}
