import React, { useState } from 'react';
import { Language, MediaItem } from '../types';
import { translations } from '../i18n/translations';
import { Newspaper, ExternalLink, X, BookOpen, Clock } from 'lucide-react';

interface MediaCoverageProps {
  currentLang: Language;
}

export const MediaCoverage: React.FC<MediaCoverageProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeArticle, setActiveArticle] = useState<MediaItem | null>(null);

  const articles: MediaItem[] = [
    {
      id: 'm-1',
      publication: 'Forbes India',
      logo: 'Forbes',
      headline: 'How Yash Agarwal is Redefining AI Performance Marketing for APAC Startups',
      date: 'May 2026',
      readTime: '4 min read',
      excerpt: 'In an exclusive interview with Forbes India, growth strategist Yash Agarwal details how predictive LLMs and financial modeling are replacing traditional agency frameworks.',
      url: '#'
    },
    {
      id: 'm-2',
      publication: 'Business Standard',
      logo: 'Business Standard',
      headline: 'Scaling Brands to $50M+: The Data-Driven Blueprint by Yash Agarwal',
      date: 'March 2026',
      readTime: '6 min read',
      excerpt: 'Business Standard examines the exact customer acquisition architecture implemented by Yash Agarwal across 120+ international product launches.',
      url: '#'
    },
    {
      id: 'm-3',
      publication: 'The Week',
      logo: 'THE WEEK',
      headline: 'Top 10 Young Executive Marketing Strategists to Watch',
      date: 'January 2026',
      readTime: '3 min read',
      excerpt: 'The Week profiles Yash Agarwal as a pioneer in AI-driven CRM automation and high-impact executive personal branding.',
      url: '#'
    },
    {
      id: 'm-4',
      publication: 'ANI News',
      logo: 'ANI',
      headline: 'Yash Agarwal Awarded Best Growth Marketing Leader at APAC Tech Summit',
      date: 'November 2025',
      readTime: '2 min read',
      excerpt: 'Recognizing over 15M+ leads generated and $50M+ in measurable client revenue growth.',
      url: '#'
    },
    {
      id: 'm-5',
      publication: 'Mid-Day',
      logo: 'mid-day',
      headline: 'Mastering Omnichannel Ad Funnels in High-Competition Markets',
      date: 'August 2025',
      readTime: '5 min read',
      excerpt: 'Yash Agarwal breaks down CAC reduction techniques and creative ad testing methodologies.',
      url: '#'
    },
    {
      id: 'm-6',
      publication: 'Hindustan Times',
      logo: 'Hindustan Times',
      headline: 'The Rise of AI-Powered PR & Crisis Communication Frameworks',
      date: 'June 2025',
      readTime: '4 min read',
      excerpt: 'How modern executives use synthetic sentiment tracking to protect corporate reputation.',
      url: '#'
    }
  ];

  return (
    <section id="media" className="py-24 bg-[#070709] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Editorial & Press Coverage
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.mediaTitle}
          </h2>
          <p className="text-zinc-400 text-sm">
            Featured in leading global financial and business publications.
          </p>
        </div>

        {/* Magazine Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveArticle(item)}
              className="group p-8 rounded-3xl bg-[#101014] border border-white/10 hover:border-gold-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-gold-400 uppercase">
                    {item.logo}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Clock className="w-3 h-3" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                  {item.headline}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-gold-400">
                <span>Read Full Article</span>
                <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#121216] border border-gold-500/40 rounded-3xl p-8 space-y-6 shadow-2xl">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 text-white hover:bg-gold-500 hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-gold-500 text-black text-[10px] font-extrabold uppercase tracking-widest">
                {activeArticle.publication}
              </span>
              <h2 className="text-2xl font-extrabold text-white pt-2">
                {activeArticle.headline}
              </h2>
              <div className="text-xs text-zinc-400">{activeArticle.date} • {activeArticle.readTime}</div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-sm text-zinc-200 leading-relaxed space-y-4">
              <p>{activeArticle.excerpt}</p>
              <p className="text-xs text-zinc-400 italic">
                "Strategy is not merely about launching campaigns; it is about building a self-sustaining ecosystem where every dollar spent strengthens long-term brand equity." — Yash Agarwal in {activeArticle.publication}.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-full bg-gold-500 text-black font-bold text-xs shadow-lg shadow-gold-500/20"
              >
                Close Press Reader
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
