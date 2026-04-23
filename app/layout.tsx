import type { Metadata, Viewport } from "next";
import { allFontVariables, cairo } from "@/styles/fonts";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PWAInstaller from "@/components/ui/PWAInstaller";
import ThemeScript from "@/components/ui/ThemeScript";
import "@/styles/globals.css";

const SITE_URL = 'https://insaaan.org';
const SITE_NAME = 'مؤسسة إنسان للأعمال الإنسانية';
const SITE_DESCRIPTION = 'مؤسسة وطنية إنسانية تنموية غير حكومية مرخصة برقم (88) - معاً نصنع الأمل';
const CONTACT_EMAIL = 'info@insaaan.org';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "مؤسسة إنسان" },
  applicationName: SITE_NAME,
  keywords: ["إنساني", "إغاثة", "تنمية", "يمن", "خيرية", "إنسان", "insaaan", "مؤسسة إنسان", "أعمال إنسانية", "الضالع"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, date: true, address: true, email: true, url: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { title: SITE_NAME, description: SITE_DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, images: [{ url: "/icon-512.png", width: 512, height: 512, alt: SITE_NAME, type: "image/png" }], locale: "ar_SA", type: "website", emails: [CONTACT_EMAIL] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: ["/icon-512.png"], creator: "@insaaan_org" },
};

export const viewport: Viewport = { themeColor: "#1A5F7A", width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={allFontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><link rel="apple-touch-icon" href="/icon-192.png" /><link rel="canonical" href={SITE_URL} /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /></head>
      <body className={cairo.className}><ThemeProvider><Navbar /><main>{children}</main><Footer /><PWAInstaller /></ThemeProvider><ThemeScript /></body>
    </html>
  );
}
