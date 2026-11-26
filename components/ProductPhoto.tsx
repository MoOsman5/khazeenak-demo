"use client";

import { useState } from "react";
import { packPhoto, photo, type Product } from "@/lib/data";

// الترتيب: صورة العبوة لو موجودة، بعدها الصورة العامة، وآخر حاجة الإيموجي.
export default function ProductPhoto({
  product,
  size,
  className = "",
  pack = true,
}: {
  product: Product;
  size: number;
  className?: string;
  pack?: boolean; // false = استخدم الصورة العامة حتى لو فيه صورة عبوة
}) {
  const [stage, setStage] = useState<"pack" | "photo" | "emoji">(
    pack && product.pack ? "pack" : "photo",
  );

  if (stage === "emoji") {
    return (
      <span className={`grid place-items-center bg-mist text-4xl ${className}`} aria-hidden>
        {product.emoji}
      </span>
    );
  }
  if (stage === "pack" && product.pack) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={packPhoto(product.pack)}
        alt=""
        loading="lazy"
        onError={() => setStage("photo")}
        className={`bg-white object-contain p-1.5 ${className}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo(product.img, size, size)}
      alt=""
      loading="lazy"
      onError={() => setStage("emoji")}
      className={`bg-mist object-cover ${className}`}
    />
  );
}
