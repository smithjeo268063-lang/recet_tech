"use client";

import { useState } from "react";

export function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const gallery = images.length > 0 ? images : [];
  const [activeImage, setActiveImage] = useState(gallery[0] ?? "");

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <img src={activeImage} alt={title} className="h-[520px] w-full rounded-[1.5rem] object-cover" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {gallery.map((image, index) => (
          <button
            key={`${index}-${image}`}
            type="button"
            onClick={() => setActiveImage(image)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={activeImage === image}
            className={`overflow-hidden rounded-2xl border bg-white ${activeImage === image ? "border-[#193B8C] ring-2 ring-[#193B8C]/20" : "border-slate-200"}`}
          >
            <img src={image} alt={`${title} view ${index + 1}`} className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
