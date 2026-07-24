import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle2, MessageSquare, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Hyper-Scaled Growth Marketing',
    budget: '$10k - $25k',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        service: 'Hyper-Scaled Growth Marketing',
        budget: '$10k - $25k',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Initiate Consultation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Book an executive briefing session or submit your project parameters for advisory evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Calendly Booking Trigger */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Calendly Booking Highlight Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121216] via-[#1a1a22] to-[#121216] border border-gold-500/40 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gold-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Schedule 1-on-1 Executive Call</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Reserve a 30-minute private consultation directly on Yash's calendar for strategy audits or advisory inquiries.
                </p>
              </div>

              <button
                onClick={() => setCalendlyModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-gold-500 text-black font-extrabold text-xs shadow-lg shadow-gold-500/25 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.calendlyBtn}</span>
              </button>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:yash@yashagarwal.co"
                className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-gold-500/40 transition-all flex flex-col justify-between"
              >
                <Mail className="w-5 h-5 text-gold-400 mb-3" />
                <div>
                  <div className="text-xs text-zinc-400">Direct Email</div>
                  <div className="text-sm font-bold text-white truncate">yash@yashagarwal.co</div>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-gold-500/40 transition-all flex flex-col justify-between"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400 mb-3" />
                <div>
                  <div className="text-xs text-zinc-400">WhatsApp VIP</div>
                  <div className="text-sm font-bold text-white">+91 98765 43210</div>
                </div>
              </a>
            </div>

            {/* Social Network Links */}
            <div className="p-6 rounded-2xl bg-[#101014] border border-white/10 space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Connect Across Networks</span>
              <div className="flex gap-3 pt-1">
                <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Google Maps Location Preview Widget */}
            <div className="p-6 rounded-3xl bg-[#101014] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Global Executive Hubs
              </div>
              <p className="text-xs text-zinc-400">
                Operating out of **Dubai International Financial Centre (DIFC)** and **Mumbai Business District**.
              </p>
              <div className="h-32 rounded-xl bg-[#181820] border border-white/10 overflow-hidden relative flex items-center justify-center text-xs text-zinc-400">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                  alt="Dubai DIFC"
                  className="w-full h-full object-cover filter brightness-70"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-bold text-white">
                  DIFC Dubai • BKC Mumbai
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#101014] border border-white/10 shadow-2xl relative">
            
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Inquiry Received</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Thank you for submitting your project parameters. Yash's executive team will review your proposal and respond within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-white">Submit Brief or Advisory Request</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Work Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Primary Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-xs text-white focus:outline-none focus:border-gold-500/50"
                    >
                      <option>Hyper-Scaled Growth Marketing</option>
                      <option>Executive PR & Media Strategy</option>
                      <option>Brand Positioning & Architecture</option>
                      <option>AI Marketing Automation</option>
                      <option>Corporate Advisory & Workshops</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Monthly Marketing Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-xs text-white focus:outline-none focus:border-gold-500/50"
                    >
                      <option>$10k - $25k / month</option>
                      <option>$25k - $50k / month</option>
                      <option>$50k - $100k+ / month</option>
                      <option>Project Retainer / Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300">Project Goals & Parameters</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your product, current monthly spend, and target revenue growth goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-black font-extrabold text-xs shadow-xl shadow-gold-500/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Advisory Request</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

      {/* Calendly Booking Popup Modal */}
      {calendlyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#121216] border border-gold-500/40 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-400" />
                Select Consultation Slot
              </h3>
              <button
                onClick={() => setCalendlyModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-4">
              <p className="text-xs text-zinc-300">
                Calendly API Synchronization Active. Available slots:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    alert('Slot reserved! Yash Agarwal will meet you at Tomorrow 4:00 PM GST.');
                    setCalendlyModalOpen(false);
                  }}
                  className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 font-bold hover:bg-gold-500 hover:text-black transition-all"
                >
                  Tomorrow • 4:00 PM GST
                </button>
                <button
                  onClick={() => {
                    alert('Slot reserved! Yash Agarwal will meet you at Friday 6:30 PM IST.');
                    setCalendlyModalOpen(false);
                  }}
                  className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 font-bold hover:bg-gold-500 hover:text-black transition-all"
                >
                  Friday • 6:30 PM IST
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
