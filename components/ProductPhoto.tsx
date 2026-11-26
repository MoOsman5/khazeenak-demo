import PackArt from "@/components/PackArt";
import type { Product } from "@/lib/data";

// صورة الصنف. دلوقتي رسمة عبوة موحّدة؛ لما يبقى فيه صور حقيقية للمنتجات بدّلها هنا.
export default function ProductPhoto({ product, className = "" }: { product: Product; className?: string }) {
  return <PackArt art={product.art} className={className} />;
}
