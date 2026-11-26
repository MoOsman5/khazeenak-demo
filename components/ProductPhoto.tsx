"use client";

import { useState } from "react";
import { photo, type Product } from "@/lib/data";

// صورة المنتج، ولو ماحمّلتش بيظهر الإيموجي مكانها.
export default function ProductPhoto({
  product,
  size,
  className = "",
}: {
  product: Product;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`grid place-items-center bg-mist text-4xl ${className}`} aria-hidden>
        {product.emoji}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo(product.img, size, size)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`bg-mist object-cover ${className}`}
    />
  );
}
