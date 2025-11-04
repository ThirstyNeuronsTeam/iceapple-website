"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface StickyScrollButtonProps {
  sectionIds?: string[];
}

const StickyScrollButton: React.FC<StickyScrollButtonProps> = ({
  sectionIds = [],
}) => {
  const pathname = usePathname();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    // Get all sections - either use provided IDs or find all main sections
    const getSections = () => {
      if (sectionIds && sectionIds.length > 0) {
        return sectionIds
          .map((id) => document.getElementById(id))
          .filter(Boolean) as HTMLElement[];
      }

      // Auto-detect sections - get all elements with IDs inside main
      // This includes:
      // - Direct children with IDs (home page sections)
      // - Nested sections and articles
      // - Individual cards within sections (industry cards, service cards, etc.)
      // - Headings with IDs (blog content)
      const allSections = Array.from(
        document.querySelectorAll("main [id]")
      ) as HTMLElement[];

      // Filter out sections with empty or whitespace-only IDs
      const validSections = allSections.filter((section) => {
        const id = section.getAttribute('id');
        return id && id.trim().length > 0;
      });

      // Sort by document position (top to bottom)
      return validSections.sort((a, b) => {
        const position = a.compareDocumentPosition(b);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });
    };

    const detectSections = () => {
      const foundSections = getSections();
      setSections(foundSections);
      setCurrentSectionIndex(0); // Reset to first section on page change
    };

    // Initial detection with timeout to ensure DOM is fully rendered
    const timer = setTimeout(detectSections, 150);

    // Listen for dynamic content loaded event (e.g., from blog XML content)
    const handleDynamicContentLoaded = () => {
      // Re-detect sections after dynamic content loads
      setTimeout(detectSections, 100);
    };

    window.addEventListener('dynamicContentLoaded', handleDynamicContentLoaded);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('dynamicContentLoaded', handleDynamicContentLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;

      // Check if we're at the bottom of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }

      // Determine current section
      const viewportMiddle = scrollTop + clientHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;

        if (viewportMiddle >= sectionTop) {
          setCurrentSectionIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleScrollToNext = () => {
    if (sections.length === 0) return;

    // If at bottom, scroll to top
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Otherwise, scroll to next section
    const nextIndex = currentSectionIndex + 1;

    if (nextIndex < sections.length) {
      // Scroll to next section
      const nextSection = sections[nextIndex];
      const yOffset = 0; // Adjust if you have a fixed header
      const y = nextSection.offsetTop + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      // We're past the last section, scroll a bit more to reveal the footer
      // but not to the absolute bottom - let the isAtBottom check handle cycling back to top
      const currentScrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Scroll down by one viewport height or to bottom, whichever is less
      const targetScroll = Math.min(currentScrollTop + clientHeight, scrollHeight);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Don't render if no sections found
  if (sections.length === 0) {
    return null;
  }

  return (
    // Use the background utility so the fixed right column matches the app's
    // background (adapts in dark mode via the --background variable).
    <div className="hidden xl:block fixed right-0 top-0 w-16 h-screen pointer-events-none z-40 bg-background">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={handleScrollToNext}
          className="transform -rotate-90 text-xl tracking-wide font-bold whitespace-nowrap
                     hover:text-[#0B68FF] transition-colors duration-300
                     cursor-pointer pointer-events-auto
                     bg-transparent border-none outline-none"
          aria-label={isAtBottom ? "Scroll to top" : "Scroll to next section"}
        >
          {isAtBottom ? "Scroll Up" : "Scroll Down"}
        </button>
      </div>
    </div>
  );
};

export default StickyScrollButton;
