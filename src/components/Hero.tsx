import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ArrowRight, Play, Sparkles, Trophy, TrendingUp, Users, Award, ShieldCheck, Download, Bot, LayoutGrid, Monitor } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenVideoModal: () => void;
  onOpenResumeModal: () => void;
  onOpenContactModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenVideoModal,
  onOpenResumeModal,
  onOpenContactModal,
}) => {
  const t = translations[currentLang];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 15,
        y: (e.clientY / innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Windows Bloom Morphing Mesh Lighting Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-gold-500/15 via-[#4F6BED]/15 to-[#00BCF2]/15 rounded-full blur-[160px] pointer-events-none animate-bloom-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500/10 via-amber-500/10 to-transparent border border-gold-500/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-gold-300 tracking-wide">
                {t.heroBadge}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                {t.heroTitleLine1}{' '}
                <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600 bg-clip-text text-transparent block mt-1 drop-shadow-sm">
                  {t.heroTitleLine2}
                </span>
              </h1>
              <p className="text-base sm:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed pt-2">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenContactModal}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all overflow-hidden"
              >
                <span className="relative z-10">{t.btnHireMe}</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <button
                onClick={onOpenVideoModal}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white/5 border border-white/15 hover:border-gold-500/40 text-white font-semibold text-sm backdrop-blur-lg hover:bg-white/10 hover:scale-105 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/40">
                  <Play className="w-3.5 h-3.5 text-gold-400 fill-gold-400 ml-0.5" />
                </div>
                <span>{t.btnWatchShowreel}</span>
              </button>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium text-sm transition-all"
              >
                <Download className="w-4 h-4 text-gold-400" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Mini Proof Counters */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">$50M+</div>
                <div className="text-xs text-zinc-400 font-medium">Revenue Generated</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">120+</div>
                <div className="text-xs text-zinc-400 font-medium">Global Campaigns</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">18+</div>
                <div className="text-xs text-zinc-400 font-medium">Industry Awards</div>
              </div>
            </div>

          </div>

          {/* Right Column: Windows 11 Executive Desktop Frame with Live Windows */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              className="relative w-full max-w-md rounded-3xl p-2 bg-gradient-to-b from-gold-500/30 via-white/10 to-transparent shadow-2xl backdrop-blur-2xl border border-white/15 transition-transform duration-200 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              }}
            >
              {/* Windows OS Frame */}
              <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-cover bg-center shadow-inner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
                
                {/* Top Windows Title Bar */}
                <div className="absolute top-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                      <div className="bg-[#0078D4] w-1 h-1 rounded-[0.5px]"></div>
                      <div className="bg-[#0078D4] w-1 h-1 rounded-[0.5px]"></div>
                      <div className="bg-[#0078D4] w-1 h-1 rounded-[0.5px]"></div>
                      <div className="bg-[#0078D4] w-1 h-1 rounded-[0.5px]"></div>
                    </div>
                    <span className="text-[11px] font-bold text-white">Yash OS • Command Center</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  </div>
                </div>

                {/* Floating Window 1: Copilot Live AI Assistant */}
                <div className="absolute top-16 right-4 w-60 bg-black/75 border border-gold-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-xl text-left space-y-2 animate-float">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gold-400">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Executive AI Copilot</span>
                  </div>
                  <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-[10px] text-gold-200">
                    "Yash Agarwal drove 7.4x ROAS on $15M+ ad spend across 120 campaigns."
                  </div>
                </div>

                {/* Floating Window 2: Snap Layout Metrics */}
                <div className="absolute bottom-16 left-4 w-56 bg-black/75 border border-white/15 rounded-xl p-3 shadow-2xl backdrop-blur-xl text-left space-y-1.5 animate-float [animation-delay:2s]">
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">Live Scaling Snap</div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="p-1.5 rounded bg-gold-500/20 text-gold-300 font-bold text-center">+340% LTV</div>
                    <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-center">-42% CAC</div>
                  </div>
                </div>

                {/* Windows 11 Taskbar Centered */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-black/70 border border-white/20 backdrop-blur-2xl flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 cursor-pointer">
                    <div className="bg-[#0078D4] w-1.5 h-1.5 rounded-[0.5px]"></div>
                    <div className="bg-[#0078D4] w-1.5 h-1.5 rounded-[0.5px]"></div>
                    <div className="bg-[#0078D4] w-1.5 h-1.5 rounded-[0.5px]"></div>
                    <div className="bg-[#0078D4] w-1.5 h-1.5 rounded-[0.5px]"></div>
                  </div>
                  <div className="w-3.5 h-3.5 rounded bg-gold-500/30 border border-gold-500 flex items-center justify-center text-gold-400">
                    <Bot className="w-2.5 h-2.5" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded bg-purple-500/30 border border-purple-500 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
