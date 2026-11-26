"use client";

import { useEffect, useState } from "react";

export type Cycle = {
  delivery: string; // "السبت 28 نوفمبر"
  left: string; // الوقت الباقي على قفل الطلب
};

function arDays(n: number) {
  if (n === 1) return "يوم";
  if (n === 2) return "يومين";
  return `${n} أيام`;
}

function arHours(n: number) {
  if (n === 1) return "ساعة";
  if (n === 2) return "ساعتين";
  if (n <= 10) return `${n} ساعات`;
  return `${n} ساعة`;
}

// الدورة: الطلب بيقفل الجمعة 9 مساءً، والتوصيل السبت.
export function useCycle(): Cycle | null {
  const [cycle, setCycle] = useState<Cycle | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const deadline = new Date(now);
      deadline.setHours(21, 0, 0, 0);
      deadline.setDate(deadline.getDate() + ((5 - deadline.getDay() + 7) % 7));
      if (deadline <= now) deadline.setDate(deadline.getDate() + 7);

      const delivery = new Date(deadline);
      delivery.setDate(delivery.getDate() + 1);

      const ms = deadline.getTime() - now.getTime();
      const days = Math.floor(ms / 86_400_000);
      const hours = Math.floor((ms % 86_400_000) / 3_600_000);
      const parts: string[] = [];
      if (days > 0) parts.push(arDays(days));
      if (hours > 0) parts.push(arHours(hours));

      setCycle({
        delivery: new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(delivery),
        left: parts.length ? parts.join(" و") : "أقل من ساعة",
      });
    };
    calc();
    const timer = setInterval(calc, 60_000);
    return () => clearInterval(timer);
  }, []);

  return cycle;
}
