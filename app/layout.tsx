import type { Metadata } from "next";
import { allFontVariables, cairo } from "@/styles/fonts";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "مؤسسة إنسان", template: "%s | مؤسسة إنسان" },
  description: "مؤسسة إنسان للأعمال الإنسانية - مؤسسة وطنية إنسانية تنموية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={allFontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={cairo.className}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <ThemeScript />
      </body>
    </html>
  );
}

function ThemeScript() {
  return (
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
          })();
        `,
      }}
    />
  );
}
