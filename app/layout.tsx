import type { Metadata } from "next";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import FloatingActions from "@/components/ui/FloatingActions";

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
      </head>
      <body className={`font-body bg-terrain-deepBlack text-terrain-softWhite antialiased`}>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
