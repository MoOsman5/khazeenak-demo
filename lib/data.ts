// بيانات الديمو: الأسعار تقريبية، بدّلها بقايمة أسعار المحل / مكسب.

export const MIN_ORDER = 300; // الحد الأدنى للأوردر (ج.م)
export const DELIVERY_FEE = 25; // رسوم التوصيل للأوردر
export const FUEL_PER_TRIP = 520; // بنزين الرحلة رايح جاي + اللف جوه المنطقة
export const PACKING_PER_ORDER = 4; // أكياس وكراتين لكل أوردر
export const PARTNERS = 2;

export type Category = { id: string; name: string };

export const categories: Category[] = [
  { id: "grocery", name: "بقالة" },
  { id: "oils", name: "زيوت وسمن" },
  { id: "drinks", name: "مشروبات" },
  { id: "dairy", name: "ألبان وبيض" },
  { id: "cleaning", name: "منظفات" },
  { id: "paper", name: "ورقيات وأطفال" },
];

export type PackShape =
  | "bag" | "can" | "flatcan" | "bottle" | "carton" | "jar" | "box"
  | "tissue" | "round" | "tray" | "rolls" | "softpack" | "flatpack";

export type Art = { shape: PackShape; color: string; accent: string; label: string; bg: string };

export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number; // سعر البيع للعميل
  cost: number; // سعر الجملة
  cat: string;
  emoji: string;
  art: Art; // رسمة العبوة
  weight: number; // قد إيه الصنف مطلوب (لتوليد أوردرات الديمو)
};

export const products: Product[] = [
  { id: "sugar", name: "سكر الضحى", unit: "1 كجم", price: 37, cost: 33.5, cat: "grocery", emoji: "🥄", weight: 10, art: { shape: "bag", color: "#FFFFFF", accent: "#D8432E", label: "سكر", bg: "#FBF0D9" } },
  { id: "rice", name: "أرز الضحى", unit: "1 كجم", price: 39, cost: 35, cat: "grocery", emoji: "🍚", weight: 10, art: { shape: "bag", color: "#EAF4EE", accent: "#17804F", label: "أرز", bg: "#FBF0D9" } },
  { id: "pasta", name: "مكرونة الملكة", unit: "400 جم", price: 17, cost: 15, cat: "grocery", emoji: "🍝", weight: 9, art: { shape: "bag", color: "#F7C948", accent: "#C93A26", label: "مكرونة", bg: "#FBF0D9" } },
  { id: "flour", name: "دقيق الضحى", unit: "1 كجم", price: 26, cost: 23, cat: "grocery", emoji: "🌾", weight: 5, art: { shape: "bag", color: "#F6EEDD", accent: "#8A5A2B", label: "دقيق", bg: "#FBF0D9" } },
  { id: "lentils", name: "عدس أصفر الضحى", unit: "500 جم", price: 42, cost: 37, cat: "grocery", emoji: "🫘", weight: 4, art: { shape: "bag", color: "#F28A3C", accent: "#8A3B12", label: "عدس", bg: "#FBF0D9" } },
  { id: "beans", name: "فول مدمس حدائق كاليفورنيا", unit: "400 جم", price: 19, cost: 16.5, cat: "grocery", emoji: "🥫", weight: 6, art: { shape: "can", color: "#8A5A2B", accent: "#F2B705", label: "فول", bg: "#FBF0D9" } },
  { id: "tuna", name: "تونة صن شاين قطع", unit: "185 جم", price: 68, cost: 61, cat: "grocery", emoji: "🐟", weight: 6, art: { shape: "flatcan", color: "#1E6FA8", accent: "#F2B705", label: "تونة", bg: "#FBF0D9" } },
  { id: "paste", name: "صلصة هاينز", unit: "320 جم", price: 24, cost: 21, cat: "grocery", emoji: "🍅", weight: 6, art: { shape: "can", color: "#C93A26", accent: "#17804F", label: "صلصة", bg: "#FBF0D9" } },

  { id: "sunoil", name: "زيت كريستال عباد الشمس", unit: "1 لتر", price: 92, cost: 85, cat: "oils", emoji: "🌻", weight: 9, art: { shape: "bottle", color: "#F5C542", accent: "#17804F", label: "زيت", bg: "#FCEDC0" } },
  { id: "mixoil", name: "زيت سلايت خليط", unit: "800 مل", price: 68, cost: 62, cat: "oils", emoji: "🍳", weight: 5, art: { shape: "bottle", color: "#EDAE32", accent: "#C93A26", label: "زيت", bg: "#FCEDC0" } },
  { id: "ghee", name: "سمن روابي", unit: "1 كجم", price: 125, cost: 114, cat: "oils", emoji: "🧈", weight: 4, art: { shape: "jar", color: "#F6D56B", accent: "#17804F", label: "سمن", bg: "#FCEDC0" } },

  { id: "tea", name: "شاي العروسة", unit: "250 جم", price: 78, cost: 71, cat: "drinks", emoji: "🍵", weight: 7, art: { shape: "box", color: "#C93A26", accent: "#F2B705", label: "شاي", bg: "#DCEFF7" } },
  { id: "coffee", name: "نسكافيه كلاسيك", unit: "100 جم", price: 165, cost: 150, cat: "drinks", emoji: "☕", weight: 2, art: { shape: "jar", color: "#4A2C1A", accent: "#C93A26", label: "قهوة", bg: "#DCEFF7" } },
  { id: "water", name: "مياه نستله بيور لايف", unit: "6 × 1.5 لتر", price: 54, cost: 47, cat: "drinks", emoji: "💧", weight: 10, art: { shape: "bottle", color: "#BFE3F5", accent: "#1E6FA8", label: "مياه", bg: "#DCEFF7" } },
  { id: "juice", name: "عصير جهينة بيور", unit: "1 لتر", price: 38, cost: 33, cat: "drinks", emoji: "🧃", weight: 5, art: { shape: "carton", color: "#F28A3C", accent: "#17804F", label: "عصير", bg: "#DCEFF7" } },
  { id: "soda", name: "بيبسي", unit: "2.25 لتر", price: 37, cost: 33, cat: "drinks", emoji: "🥤", weight: 4, art: { shape: "bottle", color: "#2B1B14", accent: "#C93A26", label: "كولا", bg: "#DCEFF7" } },

  { id: "milk", name: "لبن جهينة كامل الدسم", unit: "1 لتر", price: 48, cost: 43.5, cat: "dairy", emoji: "🥛", weight: 8, art: { shape: "carton", color: "#FFFFFF", accent: "#1E6FA8", label: "لبن", bg: "#E4EFFA" } },
  { id: "eggs", name: "بيض أبيض", unit: "طبق 30", price: 165, cost: 152, cat: "dairy", emoji: "🥚", weight: 7, art: { shape: "tray", color: "#C9A77A", accent: "#C9A77A", label: "بيض", bg: "#E4EFFA" } },
  { id: "feta", name: "جبنة دومتي بيضاء", unit: "500 جم", price: 62, cost: 55, cat: "dairy", emoji: "🧀", weight: 6, art: { shape: "box", color: "#FFFFFF", accent: "#1E6FA8", label: "جبنة", bg: "#E4EFFA" } },
  { id: "triangles", name: "جبنة لافاش كيري مثلثات", unit: "24 قطعة", price: 95, cost: 86, cat: "dairy", emoji: "🧀", weight: 3, art: { shape: "round", color: "#D8432E", accent: "#F2B705", label: "جبنة", bg: "#E4EFFA" } },

  { id: "powder", name: "برسيل أوتوماتيك", unit: "4 كجم", price: 315, cost: 285, cat: "cleaning", emoji: "🧺", weight: 4, art: { shape: "softpack", color: "#1E6FA8", accent: "#F2B705", label: "مسحوق", bg: "#E2F3EA" } },
  { id: "dish", name: "بريل سائل أطباق", unit: "1 لتر", price: 58, cost: 50, cat: "cleaning", emoji: "🧽", weight: 6, art: { shape: "bottle", color: "#7BC043", accent: "#FFFFFF", label: "أطباق", bg: "#E2F3EA" } },
  { id: "bleach", name: "كلوركس", unit: "1 لتر", price: 28, cost: 24, cat: "cleaning", emoji: "🧴", weight: 5, art: { shape: "bottle", color: "#F4F8FB", accent: "#1E6FA8", label: "كلور", bg: "#E2F3EA" } },
  { id: "floor", name: "ديتول منظف أرضيات", unit: "1 لتر", price: 55, cost: 47, cat: "cleaning", emoji: "🪣", weight: 4, art: { shape: "bottle", color: "#8E5BD0", accent: "#F2B705", label: "أرضيات", bg: "#E2F3EA" } },

  { id: "tissues", name: "مناديل فاين", unit: "500 منديل", price: 42, cost: 36, cat: "paper", emoji: "🤧", weight: 7, art: { shape: "tissue", color: "#6FC3DF", accent: "#1E6FA8", label: "مناديل", bg: "#F3E5F4" } },
  { id: "toilet", name: "ورق تواليت فاين", unit: "6 رول", price: 78, cost: 69, cat: "paper", emoji: "🧻", weight: 5, art: { shape: "rolls", color: "#6FC3DF", accent: "#1E6FA8", label: "تواليت", bg: "#F3E5F4" } },
  { id: "diapers", name: "بامبرز مقاس 4", unit: "58 قطعة", price: 465, cost: 430, cat: "paper", emoji: "👶", weight: 2, art: { shape: "softpack", color: "#36B3A8", accent: "#FFFFFF", label: "حفاضات", bg: "#F3E5F4" } },
  { id: "wipes", name: "مناديل مبللة جونسون", unit: "72 منديل", price: 45, cost: 38, cat: "paper", emoji: "🧼", weight: 3, art: { shape: "flatpack", color: "#F27BA5", accent: "#C2386B", label: "مبللة", bg: "#F3E5F4" } },
];

// صورة الهيرو من Unsplash (ترخيص مجاني).
export const HERO_IMG = "1588964895597-cfccd6e2dbf9";

export function photo(id: string, width: number, height: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=70`;
}

export const featuredIds = ["rice", "sunoil", "eggs", "water", "milk", "tea"];

export const productById: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.id, p]),
);

// ترتيب المناطق = ترتيب الوقفات في خط السير
export const zones = ["منطقة 645 عمارة", "منطقة 309 عمارة"];
const zoneBuildings = [645, 309];

export type SubPref = "alt" | "credit" | "call";

export const subLabels: Record<SubPref, string> = {
  alt: "هاتلي بديل قريب",
  credit: "رجّع المبلغ رصيد",
  call: "كلمني الأول",
};

export type OrderItem = { productId: string; qty: number };

export type Order = {
  id: number;
  customer: string;
  phone: string;
  zone: string;
  building: string;
  apartment: string;
  addressNote?: string; // وصف العنوان (اختياري)
  notes?: string; // ملاحظات للمندوب (اختياري)
  items: OrderItem[];
  sub: SubPref;
  isNew?: boolean;
};

export function formatAddress(o: Pick<Order, "building" | "apartment">): string {
  return `عمارة ${o.building}، شقة ${o.apartment}`;
}

export function itemsTotal(items: OrderItem[]): number {
  return items.reduce((s, it) => s + productById[it.productId].price * it.qty, 0);
}

export function itemsCost(items: OrderItem[]): number {
  return items.reduce((s, it) => s + productById[it.productId].cost * it.qty, 0);
}

export function egp(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

// ---------- أوردرات الديمو (مولّدة بـ seed ثابت عشان الأرقام متتغيرش) ----------

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const firstNames = [
  "أحمد", "منى", "محمود", "سارة", "كريم", "هبة", "مصطفى", "نهى", "عمرو", "دينا", "إسلام", "ياسمين",
  "حسام", "رانيا", "طارق", "مروة", "شريف", "إيمان", "وليد", "نورهان", "بسمة", "هاني", "علا", "باسم",
];
const lastNames = [
  "سمير", "عادل", "فتحي", "حسن", "مجدي", "إبراهيم", "جمال", "صلاح", "خالد", "شريف", "رضا", "طارق",
  "نبيل", "وليد", "عبد الله", "سعيد", "أشرف", "فؤاد", "حمدي", "علي", "يوسف", "رمضان", "مدحت", "عزت",
];

const zoneShare = [0.67, 0.33];
const demoNotes = [
  "رن قبل ما توصل بعشر دقايق",
  "سيب الأوردر مع البواب لو مش موجود",
  "التسليم بعد 4 العصر",
];
const SEED_ORDER_COUNT = 41;
const FIRST_ORDER_ID = 1041;

function buildSeedOrders(): Order[] {
  const rnd = mulberry32(20261128);
  const totalWeight = products.reduce((s, p) => s + p.weight, 0);
  const pickProduct = () => {
    let r = rnd() * totalWeight;
    for (const p of products) {
      r -= p.weight;
      if (r <= 0) return p;
    }
    return products[0];
  };

  const orders: Order[] = [];
  for (let i = 0; i < SEED_ORDER_COUNT; i++) {
    const wanted = 5 + Math.floor(rnd() * 6);
    const picked = new Map<string, number>();
    let subtotal = 0;
    let guard = 0;
    while ((picked.size < wanted || subtotal < MIN_ORDER) && guard++ < 80) {
      const p = pickProduct();
      if (picked.has(p.id)) continue;
      const maxQty = p.price > 150 ? 1 : p.price > 60 ? 2 : 3;
      const qty = 1 + Math.floor(rnd() * maxQty);
      picked.set(p.id, qty);
      subtotal += p.price * qty;
    }

    let z = rnd();
    let zoneIndex = 0;
    while (zoneIndex < zoneShare.length - 1 && z > zoneShare[zoneIndex]) {
      z -= zoneShare[zoneIndex];
      zoneIndex++;
    }

    const s = rnd();
    const n = rnd();
    orders.push({
      id: FIRST_ORDER_ID + i,
      customer: `${firstNames[Math.floor(rnd() * firstNames.length)]} ${lastNames[Math.floor(rnd() * lastNames.length)]}`,
      phone: "010" + String(10000000 + Math.floor(rnd() * 89999999)),
      zone: zones[zoneIndex],
      building: String(1 + Math.floor(rnd() * zoneBuildings[zoneIndex])),
      apartment: String(1 + Math.floor(rnd() * 12)),
      notes: n < 0.24 ? demoNotes[Math.floor(n / 0.08)] : undefined,
      items: [...picked].map(([productId, qty]) => ({ productId, qty })),
      sub: s < 0.55 ? "alt" : s < 0.85 ? "credit" : "call",
    });
  }
  return orders;
}

export const seedOrders: Order[] = buildSeedOrders();
export const NEXT_ORDER_ID = FIRST_ORDER_ID + SEED_ORDER_COUNT;

// ---------- حسابات الدورة ----------

export type PurchaseLine = { product: Product; qty: number; cost: number };

// الدفع كاش عند الاستلام: اللي اتسلّم هو اللي اتحصّل.
export function summarize(orders: Order[], delivered: Set<number> = new Set()) {
  const sales = orders.reduce((s, o) => s + itemsTotal(o.items), 0);
  const goodsCost = orders.reduce((s, o) => s + itemsCost(o.items), 0);
  const deliveryFees = orders.length * DELIVERY_FEE;
  const packing = orders.length * PACKING_PER_ORDER;
  const fuel = orders.length ? FUEL_PER_TRIP : 0;
  const margin = sales - goodsCost;
  const net = margin + deliveryFees - fuel - packing;

  const deliveredOrders = orders.filter((o) => delivered.has(o.id));
  const collected = deliveredOrders.reduce((s, o) => s + itemsTotal(o.items) + DELIVERY_FEE, 0);
  const due = sales + deliveryFees - collected;

  const byZone = zones.map((zone) => {
    const list = orders.filter((o) => o.zone === zone);
    return { zone, count: list.length, sales: list.reduce((s, o) => s + itemsTotal(o.items), 0) };
  });

  const qtyById = new Map<string, number>();
  for (const o of orders) {
    for (const it of o.items) qtyById.set(it.productId, (qtyById.get(it.productId) ?? 0) + it.qty);
  }
  const purchase: PurchaseLine[] = products
    .filter((p) => qtyById.has(p.id))
    .map((p) => ({ product: p, qty: qtyById.get(p.id)!, cost: p.cost * qtyById.get(p.id)! }));

  return {
    count: orders.length,
    sales,
    goodsCost,
    margin,
    marginPct: sales ? (margin / sales) * 100 : 0,
    deliveryFees,
    packing,
    fuel,
    net,
    perPartner: net / PARTNERS,
    avgOrder: orders.length ? sales / orders.length : 0,
    deliveredCount: deliveredOrders.length,
    collected,
    due,
    byZone,
    purchase,
  };
}
