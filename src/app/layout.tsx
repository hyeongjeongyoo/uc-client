import "@/styles/globals.css";
import "@/styles/fonts.css"; // pretendard 폰트 CSS 임포트
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          src="/assets/lang-config.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/translation.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        ></Script>
      </head>
      {/* className에서 pretendard 제거 */}
      <body>
        <ScrollToTop />
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
