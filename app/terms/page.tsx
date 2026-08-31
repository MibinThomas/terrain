import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terrain Business Solutions terms of service, engagement conditions, and legal agreements.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-white font-semibold mb-2 block">
            Legal & Compliance
          </span>
          <h1 className="font-heading font-bold text-4xl mb-8">Terms of Service</h1>
          <div className="space-y-6 text-terrain-midGrey text-sm leading-relaxed">
            <p>Last updated: August 2026</p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">1. Scope of Services</h2>
            <p>
              Terrain Business Solutions provides web design, software development, e-commerce engineering, and digital consulting services subject to executed client statements of work (SOW).
            </p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">2. Intellectual Property</h2>
            <p>
              Upon final settlement of project invoices, intellectual property rights for custom code and design assets created for client projects transfer to the client as specified in the service agreement.
            </p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">3. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Dubai and the United Arab Emirates.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
