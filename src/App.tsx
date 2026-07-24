import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Language, Theme } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { BookSection } from './components/BookSection';
import { Portfolio } from './components/Portfolio';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { SpeakingSection } from './components/SpeakingSection';
import { Testimonials } from './components/Testimonials';
import { MediaCoverage } from './components/MediaCoverage';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Bot, Play, X } from 'lucide-react';

// Lazy loaded modals for ultra-fast initial bundle loading
const AiAssistant = lazy(() => import('./components/AiAssistant').then(m => ({ default: m.AiAssistant })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleOpenContactModal = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenCaseStudy = (_title: string) => {
    const el = document.getElementById('portfolio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans relative selection:bg-gold-500/30 selection:text-gold-300">
      
      {/* 3D Particle Matrix Background */}
      <ParticleCanvas />

      {/* Floating Sticky Navigation Bar */}
      <Navigation
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        theme={theme}
        onThemeChange={setTheme}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenContactModal={handleOpenContactModal}
      />

      {/* Main Sections */}
      <main className="relative z-10 space-y-0">
        <Hero
          currentLang={currentLang}
          onOpenVideoModal={() => setVideoModalOpen(true)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenContactModal={handleOpenContactModal}
        />

        <About currentLang={currentLang} />

        <Experience
          currentLang={currentLang}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        <BookSection />

        <Portfolio currentLang={currentLang} />

        <Brands currentLang={currentLang} />

        <Services
          currentLang={currentLang}
          onOpenContactModal={handleOpenContactModal}
        />

        <SpeakingSection />

        <Testimonials
          currentLang={currentLang}
          onOpenVideoModal={() => setVideoModalOpen(true)}
        />

        <MediaCoverage currentLang={currentLang} />

        <BlogSection currentLang={currentLang} />

        <ContactSection currentLang={currentLang} />
      </main>

      {/* Minimal Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating AI Assistant Trigger Toggle */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-gold-400 text-black shadow-2xl shadow-gold-500/30 hover:scale-110 transition-transform flex items-center gap-2 group font-bold text-xs"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">Ask Yash AI</span>
        </button>
      )}

      {/* Lazy Loaded AI Assistant Chat Modal */}
      {aiAssistantOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-gold-400 text-xs">Loading AI Assistant...</div>}>
          <AiAssistant
            currentLang={currentLang}
            onClose={() => setAiAssistantOpen(false)}
          />
        </Suspense>
      )}

      {/* Lazy Loaded Resume Modal */}
      {resumeModalOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-gold-400 text-xs">Loading Executive CV...</div>}>
          <ResumeModal
            currentLang={currentLang}
            onClose={() => setResumeModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Lazy Loaded Admin Dashboard CMS Modal */}
      {adminModalOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-gold-400 text-xs">Loading CMS...</div>}>
          <AdminDashboard
            onClose={() => setAdminModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Video Showreel Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#101014] border border-gold-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-gold-400 fill-gold-400" />
                Yash Agarwal — 2026 Executive Showreel & Case Studies
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Yash Agarwal Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
