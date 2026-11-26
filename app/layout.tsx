import type { Metadata, Viewport } from "next";
import "@fontsource-variable/readex-pro";
import "@fontsource-variable/alexandria";
import "./globals.css";

export const metadata: Metadata = {
  title: "خزينك | ديمو",
  description: "اطلب خزين البيت مرة في الأسبوع ويوصلك لحد الباب",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e3b43",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
