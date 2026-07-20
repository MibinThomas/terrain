import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ContactSectionProps {
  scrollToSection: (id: string) => void;
}

export default function ContactSection({ scrollToSection }: ContactSectionProps) {
  const activeSection = useStore((state) => state.activeSection);
  const isActive = activeSection === 'contact';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Ideas & Architecture',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: 'Ideas & Architecture', message: '' });
    }, 1200);
  };

  return (
    <section className="experience-panel interactive-section" id="contact">
      <div className="panel-inner contact-panel-inner">
        <div className="panel-content contact-panel-content">
          <div className="panel-label hero-badge">
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-black)',
                boxShadow: '0 0 3px var(--color-black)',
                display: 'inline-block',
                marginRight: '6px',
              }}
            ></span>
            INTELLIGENT BUSINESS ARCHITECTURE • CONTACT
          </div>

          <h2 className="text-gradient panel-heading contact-heading">
            START A CONVERSATION WITH OUR ARCHITECTS
          </h2>

          <p className="panel-description contact-description">
            Ready to engineer a scalable digital foundation or optimize enterprise operations? Send us a message to schedule a consultation.
          </p>

          {/* Split Content: Form & Info */}
          <div className="contact-split-grid">
            {/* Left: Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="contact-info-card interactive-element"
            >
              <div className="info-header">
                <span className="info-pill">Direct Response</span>
                <h3>We’re Ready to Help</h3>
                <p>Our strategic team reviews all inquiries within 24 business hours.</p>
              </div>

              <div className="info-item-list">
                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="info-label">Email Us</span>
                    <a href="mailto:contact@terrain.solutions" className="info-value">contact@terrain.solutions</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="info-label">Global Headquarters</span>
                    <span className="info-value">Dubai • Abu Dhabi • International</span>
                  </div>
                </div>
              </div>

              <div className="info-footer">
                <span className="availability-dot"></span>
                <span>Accepting new client engagements for Q3/Q4</span>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-form-card interactive-element"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="contact-success-state"
                  >
                    <CheckCircle2 size={48} color="#10b981" />
                    <h3>Message Received</h3>
                    <p>Thank you for reaching out. One of our senior architects will be in touch with you shortly.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)} 
                      className="contact-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >
                    <div className="form-group-row">
                      <div className="form-field">
                        <label htmlFor="name">Full Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          required 
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="email">Work Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="service">Service Focus</label>
                      <select 
                        id="service"
                        name="service" 
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="Ideas & Architecture">Ideas & Strategic Architecture</option>
                        <option value="Technology Systems">Technology & Cloud Systems</option>
                        <option value="Execution & Growth">Execution & Operational Growth</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="message">Project Overview / Message</label>
                      <textarea 
                        id="message"
                        name="message" 
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your business goals or technical requirements..."
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation Back */}
          <div className="hero-cta-wrapper interactive-element" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => scrollToSection('blog')}
                className="back-cta-btn"
                aria-label="Back to Blog"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              
              <button 
                onClick={() => scrollToSection('hero')}
                className="panel-cta"
              >
                RETURN TO HERO <ArrowRight size={14} style={{ marginLeft: '6px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
