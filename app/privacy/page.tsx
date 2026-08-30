import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Terrain Business Solutions privacy policy, data collection procedures, and user data rights.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
            Legal & Compliance
          </span>
          <h1 className="font-heading font-bold text-4xl mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-terrain-midGrey text-sm leading-relaxed">
            <p>Last updated: August 2026</p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">1. Data Collection</h2>
            <p>
              Terrain Business Solutions respects your privacy. We collect information you provide directly through our contact forms, newsletter subscriptions, and project consultation requests.
            </p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">2. Use of Information</h2>
            <p>
              Information collected is strictly utilized to communicate project proposals, improve user experience, optimize site performance, and fulfill contractual services. We do not sell or trade your data to third parties.
            </p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">3. Security</h2>
            <p>
              We enforce modern encryption standards, secure HTTP connections, and restricted access protocols to protect your personal and business data.
            </p>
            <h2 className="font-heading text-xl text-terrain-softWhite font-bold mt-6">4. Contact Rights</h2>
            <p>
              If you have any questions regarding our privacy practices or wish to request data deletion, contact us at hello@terrainbusiness.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
