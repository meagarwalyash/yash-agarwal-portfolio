import React, { useState } from 'react';
import { Language, PortfolioItem } from '../types';
import { translations } from '../i18n/translations';
import { ExternalLink, X, TrendingUp, CheckCircle, Award, Sparkles, Filter } from 'lucide-react';

interface PortfolioProps {
  currentLang: Language;
}

export const Portfolio: React.FC<PortfolioProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Marketing', 'PR', 'Events', 'Campaigns', 'Social Media', 'Video', 'Branding'];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'p-1',
      title: 'Aura Luxury Watches — International Rebrand & Launch',
      category: 'Branding',
      client: 'Aura Horology Group',
      metrics: '$12.4M Sales in 90 Days',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      summary: 'Positioned Aura as a Swiss-tier luxury timepiece brand through cinematic storytelling and VIP influencer events.',
      fullDetails: {
        challenge: 'Aura needed to break into the US & EU luxury watch segment previously dominated by legacy Swiss manufactures.',
        strategy: 'Executed an exclusive invite-only PR campaign combined with high-ROAS Meta Video Ads and Vogue press features.',
        results: [
          'Generated $12.4M direct-to-consumer revenue in Q1',
          'Achieved 7.4x Return on Ad Spend (ROAS)',
          'Featured in GQ, Esquire, and Hodinkee',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
        ],
        testimonialQuote: 'Yash revolutionized our market positioning. His team delivered flawless campaign execution under intense deadlines.'
      }
    },
    {
      id: 'p-2',
      title: 'FinTech Unicorn Scaleup — 5M+ User Acquisition Engine',
      category: 'Marketing',
      client: 'PayPulse Global',
      metrics: '5.2M New Verified Users',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      summary: 'Designed performance ad funnels and viral referral loops that drove PayPulse to unicorn status.',
      fullDetails: {
        challenge: 'High customer drop-off rates during KYC registration and skyrocketing Google Ads CAC.',
        strategy: 'Restructured user onboarding funnels, built AI retargeting campaigns, and launched a multi-tier referral system.',
        results: [
          'Acquired 5.2M verified users in 12 months',
          'Reduced Cost Per Acquisition (CPA) by 46%',
          'Scaled monthly ad spend from $100k to $1.5M profitably',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        ],
        testimonialQuote: 'Yash Agarwal is the sharpest growth architect we have ever collaborated with. Results were immediate.'
      }
    },
    {
      id: 'p-3',
      title: 'Global Tech Summit 2025 — Press & PR Campaign',
      category: 'PR',
      client: 'TechFuture Alliance',
      metrics: '500+ Global Media Mentions',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      summary: 'Led international media strategy for APAC’s largest artificial intelligence conference.',
      fullDetails: {
        challenge: 'Securing tier-1 journalists and top tech publications in a crowded event calendar.',
        strategy: 'Hosted exclusive press briefings with keynote speakers and published original AI industry benchmarks.',
        results: [
          '500+ editorial features including Forbes and Bloomberg',
          'Sold out 15,000 conference tickets 3 weeks early',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
        ]
      }
    },
    {
      id: 'p-4',
      title: 'Evoke Electric Mobility — Omnichannel Launch Campaign',
      category: 'Campaigns',
      client: 'Evoke Motors',
      metrics: '35,000 Vehicle Pre-Orders',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      summary: 'Automotive launch strategy integrating 3D WebGL configurators, influencer test drives, and national billboards.',
      fullDetails: {
        challenge: 'Convincing traditional commuters to switch to premium electric performance vehicles.',
        strategy: 'Created high-octane 4K video storytelling highlighting speed, eco-efficiency, and luxury interior craftsmanship.',
        results: [
          '35,000 pre-orders collected with paid deposit',
          '$140M projected order book value',
        ],
        gallery: []
      }
    },
    {
      id: 'p-5',
      title: 'CyberVerse AI — Viral Social Media Takeover',
      category: 'Social Media',
      client: 'CyberVerse Labs',
      metrics: '45M organic Video Views',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      summary: 'Architected short-form video strategy across TikTok, YouTube Shorts, and Instagram Reels.',
      fullDetails: {
        challenge: 'Demystifying complex generative AI developer tools for non-technical creators.',
        strategy: 'Produced 60-second micro-tutorials with high-energy motion graphics and creator collaborations.',
        results: [
          '45M+ organic views within 60 days',
          '+250k social community followers',
        ],
        gallery: []
      }
    },
    {
      id: 'p-6',
      title: 'Solstice Retreats — High-Ticket Luxury Hospitality',
      category: 'Video',
      client: 'Solstice Global',
      metrics: '94% Occupancy Rate',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      summary: 'Cinematic promotional video series and targeted high-net-worth advertising campaign.',
      fullDetails: {
        challenge: 'Filling $2,500/night luxury villas during off-peak seasonal windows.',
        strategy: 'High-end drone cinematography and micro-targeted luxury audience segmentation.',
        results: [
          'Sustained 94% year-round occupancy rate',
          '3.8x ROI on video marketing ad spend',
        ],
        gallery: []
      }
    }
  ];

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 relative bg-[#070709] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Excellence In Execution
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.portfolioTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Select a project to unlock the complete strategy blueprint, metrics breakdown, and media gallery.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold shadow-lg shadow-gold-500/20'
                  : 'bg-white/5 border border-white/10 text-zinc-300 hover:border-gold-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-3xl bg-[#101014] border border-white/10 overflow-hidden hover:border-gold-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-bold text-gold-400 uppercase tracking-widest backdrop-blur-md">
                    {item.category}
                  </span>

                  {/* Highlight Metric Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-gold-500 text-black font-extrabold text-xs shadow-lg">
                    {item.metrics}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
                    {item.client}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-gold-400">
                <span>View Full Case Study</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Immersive Fullscreen Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#121216] border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl my-8">
            
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/50 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-gold-500 hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="px-3 py-1 rounded-full bg-gold-500 text-black text-xs font-extrabold uppercase tracking-widest">
                  {activeModalItem.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {activeModalItem.title}
                </h2>
                <div className="text-sm font-medium text-gold-400">{activeModalItem.client}</div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-8 max-h-[65vh] overflow-y-auto">
              
              {/* Challenge & Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h4 className="text-sm uppercase font-bold text-gold-400 tracking-wider">The Strategic Challenge</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeModalItem.fullDetails.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h4 className="text-sm uppercase font-bold text-gold-400 tracking-wider">Growth Strategy & Execution</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeModalItem.fullDetails.strategy}
                  </p>
                </div>
              </div>

              {/* Key Results */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  Key Business Outcomes & Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeModalItem.fullDetails.results.map((res, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-zinc-200">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote if available */}
              {activeModalItem.fullDetails.testimonialQuote && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-500/10 via-amber-500/5 to-transparent border border-gold-500/30 italic text-zinc-200 text-sm">
                  "{activeModalItem.fullDetails.testimonialQuote}"
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20"
                >
                  Close Modal
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
