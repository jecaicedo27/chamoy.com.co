import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/env";
import "./globals.css";

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
  title: {
    default: "Chamoy en Colombia | Sirope y salsa para negocios",
    template: "%s | Chamoy Colombia"
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.name,
    title: "Chamoy en Colombia para bebidas, frutas y negocios",
    description: site.description,
    images: [{ url: "/assets/img/hero-chamoy.webp", width: 1672, height: 941 }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b81826"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        {children}
        <Footer />
        <StickyMobileBar />
        <AnalyticsListener />
        {ga4Id ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
