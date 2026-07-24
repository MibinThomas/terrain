"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(2, "Please select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, "Please provide more details about your project"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-32 bg-terrain-pureWhite text-terrain-deepBlack relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="font-heading text-4xl md:text-6xl leading-[0.95] tracking-tight mb-8">
              LET&apos;S SHAPE<br />WHAT&apos;S NEXT.
            </h2>
            <p className="text-xl text-terrain-deepBlack/70 mb-16 max-w-md">
              Have an idea, product or business challenge? Let&apos;S turn it into a clear, intelligent and scalable solution.
            </p>

            <div className="space-y-6 border-t border-terrain-deepBlack/10 pt-8">
              <div>
                <span className="block text-xs font-heading tracking-widest text-terrain-midGrey uppercase mb-1">Email</span>
                <a href="mailto:hello@terrain.com" className="text-lg font-medium hover:opacity-70">hello@terrain.com</a>
              </div>
              <div>
                <span className="block text-xs font-heading tracking-widest text-terrain-midGrey uppercase mb-1">Phone</span>
                <a href="tel:+1234567890" className="text-lg font-medium hover:opacity-70">+1 (234) 567-890</a>
              </div>
              <div>
                <span className="block text-xs font-heading tracking-widest text-terrain-midGrey uppercase mb-1">LinkedIn</span>
                <a href="#" className="text-lg font-medium hover:opacity-70">Terrain Business Solutions</a>
              </div>
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-terrain-nearBlack text-terrain-pureWhite p-12 h-full flex flex-col justify-center items-center text-center"
                >
                  <div className="w-16 h-16 border-2 border-terrain-pureWhite flex items-center justify-center rounded-full mb-6">
                    <svg className="w-8 h-8 text-terrain-pureWhite" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-3xl mb-4">Request Received</h3>
                  <p className="text-terrain-midGrey">Thank you for reaching out. A member of our team will be in touch shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Name *" 
                        {...register("name")}
                        className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-terrain-deepBlack/20'} py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors`}
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1 block px-2">{errors.name.message}</span>}
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Company" 
                        {...register("company")}
                        className="w-full bg-transparent border-b border-terrain-deepBlack/20 py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email *" 
                        {...register("email")}
                        className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-terrain-deepBlack/20'} py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors`}
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-1 block px-2">{errors.email.message}</span>}
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Phone" 
                        {...register("phone")}
                        className="w-full bg-transparent border-b border-terrain-deepBlack/20 py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <select 
                        defaultValue=""
                        {...register("service")}
                        className={`w-full bg-transparent border-b ${errors.service ? 'border-red-500' : 'border-terrain-deepBlack/20'} py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors appearance-none`}
                      >
                        <option value="" disabled>Service Required *</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="web-dev">Web Development</option>
                        <option value="brand">Brand Identity</option>
                        <option value="product">Product Design</option>
                      </select>
                      {errors.service && <span className="text-red-500 text-xs mt-1 block px-2">{errors.service.message}</span>}
                    </div>
                    <div>
                      <select 
                        defaultValue=""
                        {...register("budget")}
                        className="w-full bg-transparent border-b border-terrain-deepBlack/20 py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors appearance-none"
                      >
                        <option value="" disabled>Estimated Budget</option>
                        <option value="under-10k">Under $10k</option>
                        <option value="10k-50k">$10k - $50k</option>
                        <option value="50k-plus">$50k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea 
                      placeholder="Project Description *" 
                      rows={4}
                      {...register("description")}
                      className={`w-full bg-transparent border-b ${errors.description ? 'border-red-500' : 'border-terrain-deepBlack/20'} py-4 px-2 focus:outline-none focus:border-terrain-deepBlack transition-colors resize-none`}
                    />
                    {errors.description && <span className="text-red-500 text-xs mt-1 block px-2">{errors.description.message}</span>}
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="consent"
                      {...register("consent")}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-sm text-terrain-deepBlack/70">
                      I agree to the <a href="/privacy" className="underline hover:text-terrain-deepBlack">Privacy Policy</a> and consent to my data being processed.
                      {errors.consent && <span className="text-red-500 text-xs block mt-1">{errors.consent.message}</span>}
                    </label>
                  </div>

                  {/* Honeypot for basic spam prevention */}
                  <input type="text" name="_gotcha" style={{ display: "none" }} />

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-terrain-deepBlack text-terrain-pureWhite font-semibold py-4 mt-8 hover:bg-terrain-nearBlack transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-terrain-pureWhite rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
