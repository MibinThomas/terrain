import type { Metadata } from "next";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import FloatingActions from "@/components/ui/FloatingActions";
import MetaPixel from "@/components/analytics/MetaPixel";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrainbusiness.com"),
  title: {
    default: "Terrain Business Solutions — Beyond Design. Into Experience.",
    template: "%s | Terrain Business Solutions",
  },
  description:
    "Building Smarter Business Landscapes. We transform ideas, technology, and strategy into intelligent digital products, UI/UX designs, and bespoke software solutions.",
  keywords: [
    "web engineering UAE",
    "UI UX design Dubai",
    "digital agency Middle East",
    "custom software development",
    "branding agency Dubai",
    "AI solutions GCC",
  ],
  authors: [{ name: "Terrain Business Solutions" }],
  creator: "Terrain Business Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://terrainbusiness.com",
    siteName: "Terrain Business Solutions",
    title: "Terrain Business Solutions — Beyond Design. Into Experience.",
    description:
      "We transform ideas, technology, and strategy into intelligent digital products and custom business solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <OrganizationJsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-body bg-terrain-deepBlack text-terrain-softWhite antialiased`}>
        {children}
        <FloatingActions />
        <MetaPixel />
      </body>
    </html>
  );
}
