import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface BrandsProps {
  currentLang: Language;
}

export const Brands: React.FC<BrandsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const brandLogos = [
    { name: 'Apple', logo: ' Apple Inc.' },
    { name: 'Stripe', logo: 'stripe' },
    { name: 'Linear', logo: 'LINEAR' },
    { name: 'Porsche', logo: 'PORSCHE' },
    { name: 'Arc Browser', logo: 'ARC' },
    { name: 'Notion', logo: 'N Notion' },
    { name: 'Vercel', logo: '▲ Vercel' },
    { name: 'Rolex', logo: '♛ ROLEX' },
    { name: 'Tesla', logo: 'TESLA' },
    { name: 'Nike', logo: 'NIKE' },
  ];

  return (
    <section className="py-16 bg-[#050505] border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
          {t.brandsTitle}
        </span>
      </div>

      {/* Marquee Loop */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-[#101014] border border-white/10 hover:border-gold-500/40 text-zinc-400 hover:text-gold-300 font-bold tracking-widest text-sm transition-all shadow-lg hover:scale-105 shrink-0"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
