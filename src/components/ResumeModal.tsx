import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { X, Download, Award, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Mail, Phone, Globe } from 'lucide-react';

interface ResumeModalProps {
  currentLang: Language;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ currentLang, onClose }) => {
  const t = translations[currentLang];

  const handleDownloadPDF = () => {
    // Generate/Trigger printable browser preview or PDF download
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#101014] border border-gold-500/40 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-2xl my-8">
        
        {/* Action Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-bold text-gold-400 text-xl">
              YA
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Yash Agarwal — Executive Resume</h2>
              <p className="text-xs text-gold-400 font-medium">Chief Marketing Officer & Growth Architect</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 text-black font-bold text-xs shadow-lg shadow-gold-500/20 hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contact Info Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gold-400" />
            <span>yash@yashagarwal.co</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold-400" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold-400" />
            <span>yashagarwal.co</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Executive Profile & Core Competencies
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
            Results-driven Growth Officer with 8+ years scaling venture-backed startups and Fortune brands across APAC, EMEA, and North America. Proven track record generating over $50M+ in measurable customer revenue through omnichannel performance ad funnels, AI CRM automation, and high-impact tier-1 PR campaigns.
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Work History & Track Record
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white">Chief Marketing Officer & Growth Partner</h4>
                  <p className="text-xs text-gold-400">Apex Global Ventures • Dubai & Mumbai</p>
                </div>
                <span className="text-xs font-bold text-zinc-400 bg-white/5 px-3 py-1 rounded-full">2023 — Present</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                <li>Architected AI-driven growth stack scaling 8 portfolio companies to $22M+ new revenue.</li>
                <li>Directed $15M+ multi-channel ad budgets on Meta, Google, and LinkedIn with 4.8x average ROAS.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white">Head of Brand Strategy & Performance</h4>
                  <p className="text-xs text-gold-400">NexaDigital Inc. • Singapore</p>
                </div>
                <span className="text-xs font-bold text-zinc-400 bg-white/5 px-3 py-1 rounded-full">2021 — 2023</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                <li>Acquired 5.2M verified Fintech app users while reducing CAC by 42%.</li>
                <li>Secured editorial placements in Forbes, Bloomberg, and Business Standard.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" /> Global Certifications
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>Meta Certified Media Buying Professional</span>
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>Google Search & Measurement Master Certification</span>
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>Wharton Business Analytics & Growth Executive</span>
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <h4 className="font-bold text-white">B.S. in Business Administration & Marketing</h4>
              <p className="text-zinc-400">Indian Institute of Management / Global Partner University</p>
              <p className="text-gold-400 font-semibold pt-1">Graduated Summa Cum Laude (Top 1%)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
