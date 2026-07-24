import React, { useState } from 'react';
import { Language, ExperienceItem } from '../types';
import { translations } from '../i18n/translations';
import { Building2, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink, Award, TrendingUp, Play } from 'lucide-react';

interface ExperienceProps {
  currentLang: Language;
  onOpenCaseStudy: (title: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ currentLang, onOpenCaseStudy }) => {
  const t = translations[currentLang];
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const experiences: ExperienceItem[] = [
    {
      id: 'exp-1',
      period: '2023 — Present',
      role: 'Chief Marketing Officer & Growth Partner',
      company: 'Apex Global Ventures',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      location: 'Dubai & Mumbai',
      achievements: [
        'Scales portfolio companies from Series A to Series C via omnichannel growth strategies.',
        'Architected AI-driven performance engine driving $22M+ in net new revenue in 14 months.',
        'Led executive PR campaigns across Forbes Middle East and Economic Times.',
      ],
      kpis: [
        { label: 'Annual Portfolio Growth', value: '+340%' },
        { label: 'Ad Spend ROI', value: '4.8x' },
        { label: 'Global Team Size', value: '35 Members' },
      ],
      featured: true,
    },
    {
      id: 'exp-2',
      period: '2021 — 2023',
      role: 'Head of Brand Strategy & Performance',
      company: 'NexaDigital Inc.',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80',
      location: 'Singapore & India',
      achievements: [
        'Directed 40+ brand product launches generating 12M+ app downloads and signups.',
        'Decreased Customer Acquisition Cost (CAC) by 42% through programmatic ad testing.',
        'Won Best Digital Marketing Campaign of the Year 2022 (APAC Summit).',
      ],
      kpis: [
        { label: 'Leads Generated', value: '8.5M+' },
        { label: 'CAC Reduction', value: '-42%' },
        { label: 'Media Impressions', value: '150M+' },
      ],
      featured: true,
    },
    {
      id: 'exp-3',
      period: '2019 — 2021',
      role: 'Senior Growth & PR Strategist',
      company: 'Vanguard Media Group',
      logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80',
      location: 'Bangalore, India',
      achievements: [
        'Managed $6M+ annual ad budgets across Meta, Google, and Influencer networks.',
        'Established crisis communication framework protecting $100M+ enterprise valuations.',
      ],
      kpis: [
        { label: 'Clients Managed', value: '28 Brands' },
        { label: 'ROAS Average', value: '5.2x' },
      ],
      featured: false,
    },
  ];

  return (
    <section id="experience" className="py-24 relative bg-[#050505] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Track Record & Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Executive Experience
          </h2>
          <p className="text-zinc-400 text-sm">
            Click any milestone to inspect KPIs, revenue metrics, and strategic takeaways.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#121216] border-gold-500/50 shadow-2xl shadow-gold-500/10'
                    : 'bg-[#0a0a0d] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                          {exp.period}
                        </span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{exp.role}</h3>
                      <div className="text-sm font-semibold text-zinc-400">{exp.company}</div>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10 space-y-6 animate-fadeIn">
                    
                    {/* Key KPIs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      {exp.kpis.map((kpi, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5">
                          <div className="text-xs text-zinc-400 font-medium mb-1">{kpi.label}</div>
                          <div className="text-xl font-extrabold text-gold-300">{kpi.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Achievements List */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                        Core Achievements & Leadership Impact
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Trigger */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onOpenCaseStudy(`${exp.company} Growth Strategy`)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-semibold text-xs hover:bg-gold-500 hover:text-black transition-all"
                      >
                        <span>View Deep-Dive Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
