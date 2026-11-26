"use client";

import { useEffect, useMemo, useState } from "react";
import ProductPhoto from "@/components/ProductPhoto";
import {
  categories,
  DELIVERY_FEE,
  egp,
  featuredIds,
  HERO_IMG,
  MIN_ORDER,
  photo,
  productById,
  products,
  subLabels,
  zones,
  type Order,
  type SubPref,
} from "@/lib/data";
import type { Cycle } from "@/lib/useCycle";

type Props = {
  cycle: Cycle | null;
  nextId: number;
  onPlaced: (order: Order) => void;
  goAdmin: () => void;
};

const steps = [
  { title: "اطلب", detail: "لحد الجمعة 9 مساءً" },
  { title: "بنشتري", detail: "السبت الصبح" },
  { title: "يوصلك", detail: "السبت من 2 الضهر" },
];

function Stepper({
  name,
  qty,
  onAdd,
  onRemove,
  tone = "dark",
}: {
  name: string;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  tone?: "dark" | "light";
}) {
  const color = tone === "light" ? "bg-marigold text-ink" : "bg-petrol text-white";
  if (qty === 0) {
    return (
      <button
        onClick={onAdd}
        aria-label={`ضيف ${name}`}
        className={`grid size-11 shrink-0 place-items-center rounded-full text-2xl leading-none shadow-lg shadow-ink/20 transition-transform active:scale-90 ${color}`}
      >
        +
      </button>
    );
  }
  return (
    <div className={`flex shrink-0 items-center rounded-full shadow-lg shadow-ink/20 ${color}`}>
      <button onClick={onAdd} aria-label={`زوّد ${name}`} className="grid size-11 place-items-center text-2xl leading-none">
        +
      </button>
      <span className="min-w-5 text-center font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button onClick={onRemove} aria-label={`قلّل ${name}`} className="grid size-11 place-items-center text-2xl leading-none">
        −
      </button>
    </div>
  );
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`rounded-xl border px-3 py-3 text-sm transition-colors ${
        selected ? "border-petrol bg-petrol text-white" : "border-line bg-white text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function Storefront({ cycle, nextId, onPlaced, goAdmin }: Props) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sheet, setSheet] = useState<"closed" | "checkout" | "done">("closed");
  const [placed, setPlaced] = useState<{ order: Order; total: number } | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [addressNote, setAddressNote] = useState("");
  const [notes, setNotes] = useState("");
  const [sub, setSub] = useState<SubPref>("alt");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = sheet === "closed" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const cartItems = useMemo(
    () => Object.entries(cart).map(([productId, qty]) => ({ productId, qty })),
    [cart],
  );
  const count = cartItems.reduce((s, it) => s + it.qty, 0);
  const subtotal = cartItems.reduce((s, it) => s + productById[it.productId].price * it.qty, 0);
  const total = subtotal + DELIVERY_FEE;
  const missing = Math.max(0, MIN_ORDER - subtotal);

  const groups = useMemo(() => {
    const q = query.trim();
    return categories
      .filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({
        category: c,
        items: products.filter((p) => p.cat === c.id && (!q || p.name.includes(q))),
      }))
      .filter((g) => g.items.length > 0);
  }, [cat, query]);

  const confirm = () => {
    const found: Record<string, string> = {};
    if (name.trim().length < 3) found.name = "اكتب اسمك عشان المندوب يعرفك.";
    if (!/^01[0125]\d{8}$/.test(phone.trim())) found.phone = "رقم الموبايل لازم يبقى 11 رقم ويبدأ بـ 01.";
    if (!zone) found.zone = "اختار المنطقة.";
    if (!/^\d{1,4}$/.test(building.trim())) found.building = "اكتب رقم العمارة.";
    if (!apartment.trim()) found.apartment = "اكتب رقم الشقة.";
    setErrors(found);
    if (Object.keys(found).length > 0 || missing > 0) return;

    const order: Order = {
      id: nextId,
      customer: name.trim(),
      phone: phone.trim(),
      zone,
      building: building.trim(),
      apartment: apartment.trim(),
      addressNote: addressNote.trim() || undefined,
      notes: notes.trim() || undefined,
      items: cartItems,
      sub,
      isNew: true,
    };
    onPlaced(order);
    setPlaced({ order, total });
    setCart({});
    setSheet("done");
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted/70";

  return (
    <div className={count > 0 ? "pb-40" : "pb-10"}>
      <header className="relative isolate overflow-hidden bg-petrol text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo(HERO_IMG, 1600, 900)}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-petrol via-petrol/75 to-petrol/30" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-5 sm:px-6 md:pb-28 md:pt-8">
          <p className="font-display text-xl font-bold">خزينك</p>
          <h1 className="mt-16 font-display text-[1.9rem] font-extrabold leading-[1.3] min-[380px]:text-[2.15rem] md:mt-24 md:text-5xl md:leading-[1.25] xl:text-6xl xl:leading-[1.2]">
            خزين البيت كله
            <br />
            يوصلك {cycle?.delivery ?? "السبت"}
          </h1>
          <p className="mt-3 max-w-[32ch] leading-relaxed text-white/85 md:mt-4 md:text-lg">
            من غير مشوار ولا شيل. اطلب دلوقتي وادفع كاش لما يوصلك.
          </p>
        </div>
      </header>

      <section className="relative z-[1] mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-4 shadow-[0_22px_44px_-22px_rgba(14,59,67,0.55)] md:flex md:items-center md:gap-8 md:p-6">
          <div className="flex items-center justify-between gap-3 md:w-80 md:shrink-0">
            <div>
              <p className="text-sm text-muted">باقي على قفل الطلب</p>
              <p className="font-display text-xl font-extrabold tabular-nums">{cycle?.left ?? "…"}</p>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-marigold px-3.5 py-1.5 text-sm font-semibold">
              التوصيل {DELIVERY_FEE} ج.م
            </span>
          </div>
          <ol className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 md:mt-0 md:flex-1 md:border-s md:border-t-0 md:ps-8 md:pt-0">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pt-5">
                <span className="absolute inset-x-0 top-[5px] h-px bg-line" aria-hidden />
                <span
                  className={`absolute start-0 top-0 size-[11px] rounded-full ${
                    i === 0 ? "bg-marigold" : "border-2 border-petrol/40 bg-white"
                  }`}
                  aria-hidden
                />
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-xs leading-relaxed text-muted">{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="sticky top-0 z-10 mt-4 border-b border-line bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-2 pt-3 sm:px-6">
          <label className="sr-only" htmlFor="search">
            دوّر على صنف
          </label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دوّر على صنف أو ماركة: سكر، جهينة، فاين"
            className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base placeholder:text-muted/70 md:max-w-md"
          />
          <div className="no-scrollbar -mx-4 mt-2.5 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
            {[{ id: "all", name: "الكل" }, ...categories].map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  cat === c.id ? "bg-ink font-semibold text-white" : "bg-white text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {groups.length === 0 && (
          <p className="py-16 text-center text-muted">مفيش صنف بالاسم ده. جرّب كلمة تانية.</p>
        )}

        {cat === "all" && !query.trim() && (
          <section className="mt-6">
            <h2 className="font-display text-lg font-bold">الأكتر طلبًا</h2>
            <div className="no-scrollbar -mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:gap-4">
              {featuredIds.map((id) => {
                const p = productById[id];
                return (
                  <article
                    key={id}
                    className="w-[58%] max-w-56 shrink-0 snap-start overflow-hidden rounded-3xl bg-white sm:w-52 lg:w-56"
                  >
                    <ProductPhoto product={p} className="aspect-square w-full" />
                    <div className="p-3">
                      <p className="truncate font-semibold">{p.name}</p>
                      <p className="text-sm text-muted">{p.unit}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="font-display text-lg font-extrabold tabular-nums">
                          {egp(p.price)} <span className="text-xs font-normal text-muted">ج.م</span>
                        </p>
                        <Stepper
                          tone="light"
                          name={`${p.name} من الأكتر طلبًا`}
                          qty={cart[id] ?? 0}
                          onAdd={() => add(id)}
                          onRemove={() => remove(id)}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {groups.map((group) => (
          <section key={group.category.id} className="mt-6">
            <h2 className="font-display text-lg font-bold">{group.category.name}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {group.items.map((p) => {
                const qty = cart[p.id] ?? 0;
                return (
                  <li
                    key={p.id}
                    className={`overflow-hidden rounded-3xl bg-white ${qty > 0 ? "ring-2 ring-petrol" : ""}`}
                  >
                    <div className="relative">
                      <ProductPhoto product={p} className="aspect-square w-full" />
                      <div className="absolute bottom-2 end-2">
                        <Stepper name={p.name} qty={qty} onAdd={() => add(p.id)} onRemove={() => remove(p.id)} />
                      </div>
                    </div>
                    <div className="px-3 pb-3 pt-2.5">
                      <p className="line-clamp-2 min-h-[2.75em] font-medium leading-snug">{p.name}</p>
                      <p className="text-sm text-muted">{p.unit}</p>
                      <p className="mt-1 font-display text-lg font-extrabold tabular-nums">
                        {egp(p.price)} <span className="text-xs font-normal text-muted">ج.م</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <p className="mt-8 text-center text-xs leading-relaxed text-muted">
          الحد الأدنى للطلب {MIN_ORDER} ج.م، والتوصيل {DELIVERY_FEE} ج.م لأي أوردر. الدفع كاش عند الاستلام.
        </p>
      </main>

      {count > 0 && sheet === "closed" && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white px-4 pb-4 pt-3 md:inset-x-auto md:bottom-6 md:end-6 md:w-96 md:rounded-3xl md:border md:shadow-2xl md:shadow-ink/25">
          <div className="mx-auto max-w-xl">
            {missing > 0 ? (
              <div className="mb-2.5">
                <p className="text-sm text-muted">
                  فاضل <span className="font-semibold text-ink tabular-nums">{egp(missing)} ج.م</span> وتوصل للحد الأدنى
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-marigold transition-[width]"
                    style={{ width: `${Math.min(100, (subtotal / MIN_ORDER) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="mb-2.5 text-sm text-leaf">وصلت للحد الأدنى، تقدر تأكد الطلب.</p>
            )}
            <button
              onClick={() => setSheet("checkout")}
              className="flex w-full items-center justify-between rounded-2xl bg-petrol px-5 py-3.5 text-white active:bg-petrol-2"
            >
              <span className="font-semibold">راجع الطلب</span>
              <span className="flex items-baseline gap-3 tabular-nums">
                <span className="text-sm text-white/70">{count} قطعة</span>
                <span className="font-display font-bold">{egp(subtotal)} ج.م</span>
              </span>
            </button>
          </div>
        </div>
      )}

      {sheet !== "closed" && (
        <div className="fixed inset-0 z-30 bg-ink/55" role="dialog" aria-modal="true" aria-label="تأكيد الطلب">
          <div className="sheet-up absolute inset-x-0 bottom-0 top-10 mx-auto flex max-w-xl flex-col overflow-hidden rounded-t-3xl bg-mist md:bottom-6 md:top-6 md:rounded-3xl">
            {sheet === "checkout" && (
              <>
                <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3.5">
                  <h2 className="font-display text-lg font-bold">راجع طلبك</h2>
                  <button
                    onClick={() => setSheet("closed")}
                    aria-label="اقفل"
                    className="grid size-10 place-items-center rounded-full bg-mist text-lg"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-6">
                  <ul className="mt-4 divide-y divide-line rounded-2xl bg-white">
                    {cartItems.map((it) => {
                      const p = productById[it.productId];
                      return (
                        <li key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                          <ProductPhoto product={p} className="size-12 shrink-0 rounded-xl" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className="text-sm text-muted tabular-nums">
                              {p.unit}، {egp(p.price * it.qty)} ج.م
                            </p>
                          </div>
                          <Stepper name={p.name} qty={it.qty} onAdd={() => add(p.id)} onRemove={() => remove(p.id)} />
                        </li>
                      );
                    })}
                    {cartItems.length === 0 && (
                      <li className="px-3 py-6 text-center text-muted">السلة فاضية. اقفل وضيف أصناف.</li>
                    )}
                  </ul>

                  <div className="mt-5 space-y-4">
                    <label className="block text-sm font-medium">
                      الاسم
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearError("name");
                        }}
                        autoComplete="name"
                        className={inputClass}
                      />
                      {errors.name && <span className="mt-1 block text-sm font-normal text-tomato">{errors.name}</span>}
                    </label>

                    <label className="block text-sm font-medium">
                      رقم الموبايل
                      <input
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 11));
                          clearError("phone");
                        }}
                        inputMode="numeric"
                        autoComplete="tel"
                        dir="ltr"
                        placeholder="01xxxxxxxxx"
                        className={`${inputClass} text-right tabular-nums`}
                      />
                      {errors.phone && <span className="mt-1 block text-sm font-normal text-tomato">{errors.phone}</span>}
                    </label>

                    <div>
                      <p className="text-sm font-medium">المنطقة</p>
                      <div className="mt-1.5 grid grid-cols-2 gap-2" role="radiogroup" aria-label="المنطقة">
                        {zones.map((z) => (
                          <Choice key={z} selected={zone === z} onClick={() => {
                              setZone(z);
                              clearError("zone");
                            }}>
                            {z}
                          </Choice>
                        ))}
                      </div>
                      {errors.zone && <p className="mt-1 text-sm text-tomato">{errors.zone}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block text-sm font-medium">
                        رقم العمارة
                        <input
                          value={building}
                          onChange={(e) => {
                            setBuilding(e.target.value.replace(/[^\d]/g, "").slice(0, 4));
                            clearError("building");
                          }}
                          inputMode="numeric"
                          className={`${inputClass} tabular-nums`}
                        />
                        {errors.building && (
                          <span className="mt-1 block text-sm font-normal text-tomato">{errors.building}</span>
                        )}
                      </label>
                      <label className="block text-sm font-medium">
                        رقم الشقة
                        <input
                          value={apartment}
                          onChange={(e) => {
                            setApartment(e.target.value.slice(0, 6));
                            clearError("apartment");
                          }}
                          inputMode="numeric"
                          className={`${inputClass} tabular-nums`}
                        />
                        {errors.apartment && (
                          <span className="mt-1 block text-sm font-normal text-tomato">{errors.apartment}</span>
                        )}
                      </label>
                    </div>

                    <label className="block text-sm font-medium">
                      وصف العنوان <span className="font-normal text-muted">(اختياري)</span>
                      <input
                        value={addressNote}
                        onChange={(e) => setAddressNote(e.target.value)}
                        placeholder="مثال: الدور التالت، جنب المسجد"
                        className={inputClass}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      ملاحظات للمندوب <span className="font-normal text-muted">(اختياري)</span>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        placeholder="مثال: رن قبل ما توصل"
                        className={`${inputClass} resize-none`}
                      />
                    </label>

                    <div>
                      <p className="text-sm font-medium">لو صنف مش موجود عند التاجر</p>
                      <div className="mt-1.5 grid gap-2" role="radiogroup" aria-label="لو صنف مش موجود">
                        {(Object.keys(subLabels) as SubPref[]).map((key) => (
                          <Choice key={key} selected={sub === key} onClick={() => setSub(key)}>
                            {subLabels[key]}
                          </Choice>
                        ))}
                      </div>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-2 rounded-2xl bg-white p-4 text-sm tabular-nums">
                    <div className="flex justify-between">
                      <dt className="text-muted">الأصناف</dt>
                      <dd>{egp(subtotal)} ج.م</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">التوصيل</dt>
                      <dd>{egp(DELIVERY_FEE)} ج.م</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">الدفع</dt>
                      <dd>كاش عند الاستلام</dd>
                    </div>
                    <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
                      <dt>الإجمالي</dt>
                      <dd className="font-display">{egp(total)} ج.م</dd>
                    </div>
                  </dl>
                </div>

                <div className="border-t border-line bg-white px-4 pb-4 pt-3">
                  {missing > 0 && (
                    <p className="mb-2 text-sm text-tomato">
                      ضيف أصناف بـ {egp(missing)} ج.م كمان عشان توصل للحد الأدنى ({MIN_ORDER} ج.م).
                    </p>
                  )}
                  <button
                    onClick={confirm}
                    disabled={missing > 0}
                    className="flex w-full items-center justify-between rounded-2xl bg-petrol px-5 py-3.5 text-white active:bg-petrol-2 disabled:bg-line disabled:text-muted"
                  >
                    <span className="font-semibold">أكّد الطلب</span>
                    <span className="font-display font-bold tabular-nums">{egp(total)} ج.م</span>
                  </button>
                </div>
              </>
            )}

            {sheet === "done" && placed && (
              <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-10">
                <span className="grid size-14 place-items-center rounded-full bg-leaf text-white" aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold">طلبك اتسجل</h2>
                <p className="mt-1 text-muted">
                  رقم الطلب <span className="font-semibold text-ink tabular-nums">#{placed.order.id}</span>، هيوصلك{" "}
                  {cycle?.delivery ?? "السبت"} من 2 الضهر.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-4">
                  <p className="text-sm text-muted">هتدفع كاش للمندوب عند الاستلام</p>
                  <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">{egp(placed.total)} ج.م</p>
                  <p className="mt-3 text-sm leading-relaxed">
                    هنكلمك على <span className="tabular-nums" dir="ltr">{placed.order.phone}</span> قبل ما نتحرك. لو
                    تقدر جهّز المبلغ على قده.
                  </p>
                </div>

                <div className="mt-auto space-y-2 pt-8">
                  <button
                    onClick={() => {
                      setSheet("closed");
                      goAdmin();
                    }}
                    className="w-full rounded-2xl bg-petrol px-5 py-3.5 font-semibold text-white active:bg-petrol-2"
                  >
                    شوف الطلب في لوحة التشغيل
                  </button>
                  <button
                    onClick={() => setSheet("closed")}
                    className="w-full rounded-2xl border border-line bg-white px-5 py-3.5 font-semibold"
                  >
                    ارجع للأصناف
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
