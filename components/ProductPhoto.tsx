"use client";

import { useState } from "react";
import PackArt from "@/components/PackArt";
import { photo, type Product } from "@/lib/data";

// الترتيب: صورتك للمنتج (public/products) لو موجودة، بعدها الصورة العامة، وآخر حاجة الرسمة.
export default function ProductPhoto({
  product,
  size = 400,
  className = "",
}: {
  product: Product;
  size?: number;
  className?: string;
}) {
  const [stage, setStage] = useState<"file" | "photo" | "art">(product.file ? "file" : "photo");

  if (stage === "art") return <PackArt art={product.art} className={className} />;

  if (stage === "file" && product.file) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`products/${product.file}`}
        alt=""
        loading="lazy"
        onError={() => setStage("photo")}
        className={`bg-white object-contain p-2 ${className}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo(product.img, size, size)}
      alt=""
      loading="lazy"
      onError={() => setStage("art")}
      className={`bg-mist object-cover ${className}`}
    />
  );
}
