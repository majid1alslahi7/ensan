import type { Metadata, Viewport } from "next";
import { allFontVariables, cairo } from "@/styles/fonts";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PWAInstaller from "@/components/ui/PWAInstaller";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "مؤسسة إنسان للأعمال الإنسانية", template: "%s | مؤسسة إنسان" },
  description: "مؤسسة إنسان للأعمال الإنسانية - مؤسسة وطنية إنسانية تنموية",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "مؤسسة إنسان",
  },
  applicationName: "مؤسسة إنسان",
  keywords: ["إنساني", "إغاثة", "تنمية", "يمن", "خيرية"],
  authors: [{ name: "مؤسسة إنسان للأعمال الإنسانية" }],
  creator: "مؤسسة إنسان",
  publisher: "مؤسسة إنسان",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "مؤسسة إنسان للأعمال الإنسانية",
    description: "مؤسسة وطنية إنسانية تنموية غير حكومية",
    type: "website",
    locale: "ar_SA",
    siteName: "مؤسسة إنسان",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "مؤسسة إنسان" }],
  },
  twitter: {
    card: "summary",
    title: "مؤسسة إنسان للأعمال الإنسانية",
    description: "مؤسسة وطنية إنسانية تنموية غير حكومية",
    images: ["/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A5F7A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={allFontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem("theme-mode");
                  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = mode || (systemDark ? "dark" : "light");
                  document.documentElement.classList.add(theme);
                } catch (e) {}
                
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(
                      function(registration) {
                        console.log('Service Worker registered');
                      },
                      function(err) {
                        console.log('Service Worker failed:', err);
                      }
                    );
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className={cairo.className}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <PWAInstaller />
        </ThemeProvider>
      </body>
    </html>
  );
}
