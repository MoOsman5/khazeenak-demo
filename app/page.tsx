"use client";

import { useEffect, useMemo, useState } from "react";
import Admin from "@/components/Admin";
import Storefront from "@/components/Storefront";
import { NEXT_ORDER_ID, seedOrders, type Order } from "@/lib/data";
import { useCycle } from "@/lib/useCycle";

type View = "shop" | "admin";

export default function Home() {
  const [view, setView] = useState<View>("shop");
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const cycle = useCycle();

  useEffect(() => {
    const sync = () => setView(window.location.hash === "#admin" ? "admin" : "shop");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (next: View) => {
    setView(next);
    try {
      window.location.hash = next;
    } catch {
      // بعض المتصفحات بتمنع تغيير الـ hash جوه iframe
    }
    window.scrollTo(0, 0);
  };

  const orders = useMemo(() => [...seedOrders, ...newOrders], [newOrders]);

  return (
    <div className="min-h-screen">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
          <span className="text-xs text-white/70">نسخة تجريبية</span>
          <div className="flex rounded-full bg-white/10 p-0.5 text-sm" role="tablist" aria-label="اختار الواجهة">
            {(
              [
                ["shop", "تطبيق العميل"],
                ["admin", "لوحة التشغيل"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => go(id)}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  view === id ? "bg-marigold font-semibold text-ink" : "text-white/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "shop" ? (
        <Storefront
          cycle={cycle}
          nextId={NEXT_ORDER_ID + newOrders.length}
          onPlaced={(order) => setNewOrders((list) => [...list, order])}
          goAdmin={() => go("admin")}
        />
      ) : (
        <Admin cycle={cycle} orders={orders} />
      )}
    </div>
  );
}
