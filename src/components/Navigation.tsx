import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { translations } from '../i18n/translations';
import { Globe, Sun, Moon, Sparkles, Menu, X, LayoutDashboard, Send } from 'lucide-react';

interface NavigationProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenAdmin: () => void;
  onOpenContactModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onThemeChange,
  onOpenAdmin,
  onOpenContactModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  ];

  const navLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navAbout, href: '#about' },
    { name: t.navExperience, href: '#experience' },
    { name: t.navPortfolio, href: '#portfolio' },
    { name: t.navServices, href: '#services' },
    { name: t.navMedia, href: '#media' },
    { name: t.navBlog, href: '#blog' },
    { name: t.navContact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center p-[1px] shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
              <span className="font-bold text-gold-400 text-lg tracking-wider">YA</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-gold-400 transition-colors">
              Yash Agarwal
            </span>
            <span className="text-[10px] text-gold-500/80 uppercase tracking-widest font-semibold">
              Executive Brand Strategist
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:border-gold-500/50 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{languages.find((l) => l.code === currentLang)?.code.toUpperCase()}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#101012] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                      currentLang === lang.code ? 'text-gold-400 font-semibold bg-white/5' : 'text-zinc-300'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span>{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin Dashboard CMS Modal Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
            title="CMS Admin Dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* Contact CTA */}
          <button
            onClick={onOpenContactModal}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-gold-400 text-black font-semibold text-xs shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.btnHireMe}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0c]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white bg-white/5 rounded-xl text-center"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Select Language:</span>
              <div className="flex gap-2 flex-wrap">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 rounded text-xs ${
                      currentLang === l.code ? 'bg-gold-500 text-black font-bold' : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-gold-400" />
                CMS Admin
              </button>
              <button
                onClick={() => {
                  onOpenContactModal();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gold-500 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <Send className="w-4 h-4" />
                {t.btnHireMe}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
