"use client";

import React, { useEffect, useRef ,useState } from "react";


type DynamicTextBlockProps = {
  title?: string;
  id: string;
  className?: string;
  // optional max height cap in px (if you want to control maximum)
  maxHeightPx?: number;
};

const DynamicTextBlock: React.FC<DynamicTextBlockProps> = ({
  title,
  id,
  className = ""
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

      <RemoteHtml id={id}/>

     
    </section>
  );
};


export default DynamicTextBlock;


export  function RemoteHtml({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/assets/general/blogs/content/${encodeURIComponent(id)}.html`);
        if (!res.ok) throw new Error(res.statusText);
        const html = await res.text();
        if (cancelled) return;
        if (!ref.current) return;

        // Optionally sanitize here with DOMPurify when installed

        ref.current.innerHTML = html;
        // run scripts as in previous example (extract and replace)
        // ...
      } catch (err: unknown) {
        setError(String(err));
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (error) return <div>Error loading content: {error}</div>;
  return <div ref={ref} />;
}

