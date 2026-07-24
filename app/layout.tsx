import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terrain Business Solutions",
  description: "Building Smarter Business Landscapes. We transform ideas, technology, and strategy into intelligent business solutions designed for sustainable growth and measurable impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-body bg-terrain-deepBlack text-terrain-softWhite antialiased`}>
        {children}
      </body>
    </html>
  );
}
