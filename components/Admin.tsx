"use client";

import { useMemo, useState } from "react";
import ProductPhoto from "@/components/ProductPhoto";
import {
  categories,
  DELIVERY_FEE,
  egp,
  formatAddress,
  itemsTotal,
  PACKING_PER_ORDER,
  productById,
  subLabels,
  summarize,
  zones,
  type Order,
} from "@/lib/data";
import type { Cycle } from "@/lib/useCycle";

type Tab = "summary" | "purchase" | "delivery";

const tabs: [Tab, string][] = [
  ["summary", "حساب الرحلة"],
  ["purchase", "قائمة الشراء"],
  ["delivery", "خط التوصيل"],
];

function LedgerRow({
  label,
  note,
  amount,
  sign,
  strong,
}: {
  label: string;
  note?: string;
  amount: number;
  sign?: "+" | "−";
  strong?: boolean;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2.5 ${strong ? "font-semibold" : ""}`}>
      <dt>
        {label}
        {note && <span className="ms-2 text-sm font-normal text-muted">{note}</span>}
      </dt>
      <dd className="shrink-0 tabular-nums" dir="ltr">
        {sign === "−" ? "− " : ""}
        {egp(amount)}
      </dd>
    </div>
  );
}

export default function Admin({ cycle, orders }: { cycle: Cycle | null; orders: Order[] }) {
  const [tab, setTab] = useState<Tab>("summary");
  const [bought, setBought] = useState<Set<string>>(new Set());
  const [delivered, setDelivered] = useState<Set<number>>(new Set());
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  const s = useMemo(() => summarize(orders, delivered), [orders, delivered]);
  const maxZone = Math.max(...s.byZone.map((z) => z.count), 1);

  const toggleBought = (id: string) =>
    setBought((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleDelivered = (id: number) =>
    setDelivered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="pb-16">
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
          <p className="text-sm text-muted">لوحة التشغيل</p>
          <h1 className="font-display text-2xl font-extrabold">رحلة {cycle?.delivery ?? "السبت"}</h1>
          <p className="mt-1 text-sm text-muted tabular-nums">
            {s.count} أوردر، اتسلّم منهم {s.deliveredCount}
          </p>

          <div className="no-scrollbar -mx-4 mt-4 flex gap-1 overflow-x-auto px-4" role="tablist">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`shrink-0 border-b-[3px] px-3 pb-2.5 pt-1 text-[15px] transition-colors ${
                  tab === id ? "border-petrol font-semibold text-petrol" : "border-transparent text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {tab === "summary" && (
          <div className="mt-5 grid gap-5 md:grid-cols-5">
            <section className="overflow-hidden rounded-2xl bg-white md:col-span-3">
              <dl className="divide-y divide-line px-4 pt-2">
                <LedgerRow label="مبيعات البضاعة" amount={s.sales} />
                <LedgerRow label="تكلفة الشراء بالجملة" amount={s.goodsCost} sign="−" />
                <LedgerRow label="هامش البضاعة" note={`${s.marginPct.toFixed(1)}%`} amount={s.margin} strong />
                <LedgerRow label="رسوم التوصيل" note={`${s.count} × ${DELIVERY_FEE}`} amount={s.deliveryFees} />
                <LedgerRow label="بنزين الرحلة" amount={s.fuel} sign="−" />
                <LedgerRow label="أكياس وتعبئة" note={`${s.count} × ${PACKING_PER_ORDER}`} amount={s.packing} sign="−" />
              </dl>
              <div className="mt-2 bg-petrol px-4 py-5 text-white">
                <p className="text-sm text-white/70">صافي ربح الرحلة</p>
                <p className="mt-1 font-display text-4xl font-extrabold tabular-nums">
                  {egp(s.net)} <span className="text-lg font-semibold">ج.م</span>
                </p>
                <p className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-3 text-sm">
                  <span className="text-white/80">نصيب كل شريك (النص)</span>
                  <span className="font-semibold tabular-nums">{egp(s.perPartner)} ج.م</span>
                </p>
              </div>
            </section>

            <div className="space-y-5 md:col-span-2">
              <section className="rounded-2xl bg-white p-4">
                <h2 className="font-display font-bold">التحصيل</h2>
                <dl className="mt-2 divide-y divide-line text-[15px]">
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">اتحصّل كاش ({s.deliveredCount} أوردر)</dt>
                    <dd className="tabular-nums text-leaf">{egp(s.collected)} ج.م</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">لسه هيتحصّل ({s.count - s.deliveredCount} أوردر)</dt>
                    <dd className="tabular-nums">{egp(s.due)} ج.م</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">متوسط الأوردر</dt>
                    <dd className="tabular-nums">{egp(s.avgOrder)} ج.م</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl bg-white p-4">
                <h2 className="font-display font-bold">الأوردرات حسب المنطقة</h2>
                <ul className="mt-3 space-y-3">
                  {s.byZone.map((z) => (
                    <li key={z.zone}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span>{z.zone}</span>
                        <span className="tabular-nums text-muted">
                          {z.count} أوردر، {egp(z.sales)} ج.م
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-mist">
                        <div
                          className="h-full rounded-full bg-petrol-2"
                          style={{ width: `${(z.count / maxZone) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {tab === "purchase" && (
          <div className="mx-auto mt-5 max-w-2xl">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted tabular-nums">
                اشتريت {bought.size} من {s.purchase.length} صنف
              </p>
              <p className="font-display font-bold tabular-nums">{egp(s.goodsCost)} ج.م</p>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white">
              <div
                className="h-full rounded-full bg-leaf transition-[width]"
                style={{ width: `${(bought.size / Math.max(1, s.purchase.length)) * 100}%` }}
              />
            </div>

            {categories.map((c) => {
              const lines = s.purchase.filter((l) => l.product.cat === c.id);
              if (lines.length === 0) return null;
              return (
                <section key={c.id} className="mt-5">
                  <h2 className="font-display font-bold">{c.name}</h2>
                  <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl bg-white">
                    {lines.map((line) => {
                      const done = bought.has(line.product.id);
                      return (
                        <li key={line.product.id}>
                          <label className="flex cursor-pointer items-center gap-3 px-3 py-3">
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => toggleBought(line.product.id)}
                              className="size-5 shrink-0 accent-leaf"
                            />
                            <ProductPhoto product={line.product} size={120} className="size-12 shrink-0 rounded-xl" />
                            <span className={`min-w-0 flex-1 ${done ? "text-muted line-through" : ""}`}>
                              <span className="block truncate font-medium">{line.product.name}</span>
                              <span className="block text-sm text-muted">{line.product.unit}</span>
                            </span>
                            <span className="shrink-0 text-end tabular-nums">
                              <span className="block font-display text-lg font-bold">× {line.qty}</span>
                              <span className="block text-sm text-muted">{egp(line.cost)} ج.م</span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}

        {tab === "delivery" && (
          <div className="mx-auto mt-5 max-w-2xl">
            <p className="text-sm text-muted tabular-nums">
              اتسلّم {delivered.size} من {s.count} أوردر
            </p>

            {zones.map((zone, zi) => {
              const list = orders.filter((o) => o.zone === zone);
              if (list.length === 0) return null;
              return (
                <section key={zone} className="mt-5">
                  <h2 className="flex items-baseline justify-between">
                    <span className="font-display font-bold">
                      الوقفة {zi + 1}: {zone}
                    </span>
                    <span className="text-sm text-muted tabular-nums">{list.length} أوردر</span>
                  </h2>
                  <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl bg-white">
                    {list.map((o) => {
                      const isOpen = openOrder === o.id;
                      const isDone = delivered.has(o.id);
                      return (
                        <li key={o.id} className={isDone ? "opacity-55" : ""}>
                          <button
                            onClick={() => setOpenOrder(isOpen ? null : o.id)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center gap-3 px-3 py-3 text-start"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-medium">{o.customer}</span>
                                {o.isNew && (
                                  <span className="rounded-full bg-marigold px-2 py-0.5 text-xs font-semibold">جديد</span>
                                )}
                              </span>
                              <span className="block text-sm text-muted tabular-nums">
                                #{o.id}، {formatAddress(o)}
                              </span>
                            </span>
                            <span className="shrink-0 text-end">
                              <span className="block font-display font-bold tabular-nums">
                                {egp(itemsTotal(o.items) + DELIVERY_FEE)} ج.م
                              </span>
                              <span className={`block text-sm ${isDone ? "text-leaf" : "text-muted"}`}>
                                {isDone ? "اتسلّم واتحصّل" : "كاش عند الاستلام"}
                              </span>
                            </span>
                          </button>

                          {isOpen && (
                            <div className="border-t border-line bg-mist/60 px-3 py-3 text-sm">
                              <ul className="space-y-1">
                                {o.items.map((it) => {
                                  const p = productById[it.productId];
                                  return (
                                    <li key={p.id} className="flex justify-between gap-3">
                                      <span>
                                        {p.name} <span className="text-muted">{p.unit}</span>
                                      </span>
                                      <span className="shrink-0 tabular-nums">× {it.qty}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                              {o.addressNote && (
                                <p className="mt-3 text-muted">
                                  وصف العنوان: <span className="text-ink">{o.addressNote}</span>
                                </p>
                              )}
                              {o.notes && (
                                <p className="mt-3 rounded-lg bg-marigold/25 px-2.5 py-2 text-ink">{o.notes}</p>
                              )}
                              <p className="mt-3 text-muted">
                                لو صنف ناقص: <span className="text-ink">{subLabels[o.sub]}</span>
                              </p>
                              <p className="mt-1 text-muted">
                                موبايل: <span className="text-ink tabular-nums" dir="ltr">{o.phone}</span>
                              </p>
                              <button
                                onClick={() => toggleDelivered(o.id)}
                                className={`mt-3 w-full rounded-xl px-4 py-2.5 font-semibold ${
                                  isDone ? "border border-line bg-white" : "bg-petrol text-white"
                                }`}
                              >
                                {isDone ? "رجّعه لسه متسلّمش" : "علّم إنه اتسلّم واتحصّل"}
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
