import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { CheckCircle2, Cpu, BarChart3, Target, Radio, Globe2, Award, Users, Zap, Layers } from 'lucide-react';

interface AboutProps {
  currentLang: Language;
}

export const About: React.FC<AboutProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'strategy' | 'marketing' | 'tech'>('strategy');

  const stats = [
    { label: 'Years Experience', value: '8+', icon: Zap },
    { label: 'Projects Completed', value: '120+', icon: Layers },
    { label: 'Countries Scaled', value: '14+', icon: Globe2 },
    { label: 'Brands Scaled', value: '45+', icon: Target },
    { label: 'Global Clients', value: '80+', icon: Users },
    { label: 'Awards Won', value: '18+', icon: Award },
  ];

  const skills = [
    { name: 'Brand Strategy & Positioning', level: 98, category: 'strategy' },
    { name: 'Performance Marketing (Meta & Google Ads)', level: 96, category: 'marketing' },
    { name: 'Public Relations & Crisis Media', level: 94, category: 'strategy' },
    { name: 'AI Marketing & Automated Funnels', level: 93, category: 'tech' },
    { name: 'Data Analytics & Attribution Modeling', level: 95, category: 'tech' },
    { name: 'Growth Hacking & CRO', level: 92, category: 'marketing' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#070709]/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Behind The Leader
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.aboutHeadline}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Combining data science precision with high-end creative direction, Yash Agarwal builds sustainable enterprise value for venture-backed unicorns and Fortune 500 organizations.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-gold-500/40 transition-all hover:-translate-y-1 group"
              >
                <Icon className="w-6 h-6 text-gold-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-gold-300 transition-colors">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-400 font-medium">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Strategy & Radar Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Radar / Skill Bars */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#101014] border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-gold-400" />
                <span>{t.skillsTitle}</span>
              </h3>
              <div className="flex gap-1 p-1 bg-black/40 rounded-lg border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('strategy')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'strategy' ? 'bg-gold-500 text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  Strategy
                </button>
                <button
                  onClick={() => setActiveTab('marketing')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'marketing' ? 'bg-gold-500 text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  Growth
                </button>
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'tech' ? 'bg-gold-500 text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  AI Tech
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-200">{skill.name}</span>
                    <span className="text-gold-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>Verified Audit Score: 98.4%</span>
              <span className="text-gold-400 font-medium">Certified Growth Architect</span>
            </div>
          </div>

          {/* Right Column: Strategic Pillars Card Grid */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-gold-500/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Hyper-Scaled Performance Marketing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Managing over $15M+ in ad spend across Meta, Google Ads, TikTok, and LinkedIn with a disciplined focus on Customer Acquisition Cost (CAC) reduction and LTV expansion.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-gold-500/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Executive PR & Media Dominance</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Securing top-tier coverage in Forbes, Business Standard, ANI, and The Week to establish industry authority and trust for founders and enterprise brands.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-gold-500/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Next-Gen AI Marketing Engine</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deploying LLMs, predictive customer analytics, and automated CRM workflows to streamline lead generation and personalize customer touchpoints at scale.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
