"use client";

import React from "react";

type DynamicTextBlockProps = {
  title?: string;
  id: string;
  className?: string;
};

const DynamicTextBlock: React.FC<DynamicTextBlockProps> = ({
  title,
  id,
  className = "",
}) => {


  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}

      <iframe src={`/assets/general/blogs/content/${encodeURIComponent(id)}.html`} className="w-full h-[600px] border-0"></iframe>
    </section>
  );
};

export default DynamicTextBlock;
