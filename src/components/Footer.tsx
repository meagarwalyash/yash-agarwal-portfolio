import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ArrowUp, Sparkles, Send, CheckCircle2, ShieldCheck, Linkedin, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030304] text-zinc-400 border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Newsletter & Callout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-[#0a0a0e] border border-white/10 shadow-2xl">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Executive Growth Digest
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Subscribe to Yash Agarwal's Private Strategy Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Monthly breakdown of high-ROAS marketing benchmarks, AI automation tools, and executive brand positioning.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Subscribed! You are on the private VIP distribution list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter executive email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-gold-500 text-black font-extrabold text-xs shadow-lg shadow-gold-500/20 hover:scale-105 transition-transform"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links & Brand Column */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold">
                YA
              </div>
              <span className="text-lg font-extrabold text-white">Yash Agarwal</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Architecting high-growth brand legacies, AI performance engines, and executive PR dominance.
            </p>
            <div className="text-xs text-gold-400 font-mono">
              Live IST: <span className="text-white font-bold">{currentTime || '12:00:00 AM'}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold-400 transition-colors">About Yash</a></li>
              <li><a href="#experience" className="hover:text-gold-400 transition-colors">Experience Timeline</a></li>
              <li><a href="#portfolio" className="hover:text-gold-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-gold-400 transition-colors">Growth Marketing</a></li>
              <li><a href="#services" className="hover:text-gold-400 transition-colors">Executive PR</a></li>
              <li><a href="#services" className="hover:text-gold-400 transition-colors">AI CRM Automation</a></li>
              <li><a href="#services" className="hover:text-gold-400 transition-colors">Brand Architecture</a></li>
            </ul>
          </div>

          {/* Col 4: Back to Top & Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Global Reach</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-gold-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-gold-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:text-gold-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-white transition-colors pt-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Yash Agarwal. All Rights Reserved. Built with Apple & Stripe level design standards.
          </div>
          <div className="flex gap-6 text-[11px]">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
