"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import { Mail, MapPin, Send, CheckCircle2, Loader2, Phone } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS = [
  "Web Engineering & Next.js",
  "UI/UX Product Architecture",
  "E-Commerce Solutions",
  "Brand Identity System",
  "AI & Custom Software",
  "Other Consultation",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    reset();
  };

  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terrain-midGrey border border-white/10 px-3.5 py-1.5 rounded-full mb-6">
            Get In Touch
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl max-w-4xl leading-tight text-terrain-softWhite mb-4">
            Let's Build Something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h1>
          <p className="text-terrain-midGrey text-lg max-w-xl">
            Have a project in mind or want to explore how Terrain can elevate your business? Reach out today.
          </p>
        </div>
      </section>

      {/* Form & Info Layout */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
              <h2 className="font-heading font-bold text-2xl mb-2 text-terrain-softWhite">
                Start a Conversation
              </h2>
              <p className="text-terrain-midGrey text-sm mb-8">
                Fill out the details below and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="text-center py-12 bg-white/[0.02] border border-emerald-500/30 rounded-2xl p-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-terrain-softWhite">
                    Message Delivered!
                  </h3>
                  <p className="text-terrain-midGrey text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out to Terrain. Our strategy team will review your inquiry and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-purple-400 underline font-semibold hover:text-purple-300"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="e.g. Ahmad Al-Rashid"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-terrain-softWhite outline-none focus:border-purple-500 transition-colors"
                      />
                      {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="name@company.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-terrain-softWhite outline-none focus:border-purple-500 transition-colors"
                      />
                      {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="Your Company / Brand"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-terrain-softWhite outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                        Service of Interest *
                      </label>
                      <select
                        {...register("service")}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-terrain-softWhite outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="" className="bg-terrain-nearBlack">Select a service...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-terrain-nearBlack text-terrain-softWhite">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && <p className="text-[10px] text-red-400 mt-1">{errors.service.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                      Project Goals & Timeline *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Describe your project requirements, goals, and target timeline..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-terrain-softWhite outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                    {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl text-sm transition-all duration-300 shadow-[0_0_25px_rgba(157,0,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
                <h3 className="font-heading font-bold text-lg text-terrain-softWhite border-b border-white/5 pb-4">
                  Contact Information
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-terrain-midGrey block font-semibold">
                        Email Inquiry
                      </span>
                      <a href="mailto:hello@terrainbusiness.com" className="text-sm font-semibold text-terrain-softWhite hover:text-purple-300">
                        hello@terrainbusiness.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-terrain-midGrey block font-semibold">
                        Phone & WhatsApp
                      </span>
                      <span className="text-sm font-semibold text-terrain-softWhite">
                        +971 4 XXX XXXX
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-terrain-midGrey block font-semibold">
                        Office Location
                      </span>
                      <span className="text-sm font-semibold text-terrain-softWhite">
                        Dubai, United Arab Emirates
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Response Guarantee */}
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/10 border border-purple-500/20 rounded-3xl p-6">
                <h4 className="font-heading font-bold text-base text-terrain-softWhite mb-2">
                  ⚡ 24-Hour Guarantee
                </h4>
                <p className="text-xs text-terrain-midGrey leading-relaxed">
                  We value your time. Every technical and design consultation inquiry receives a detailed response from our team within 24 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </main>
  );
}
