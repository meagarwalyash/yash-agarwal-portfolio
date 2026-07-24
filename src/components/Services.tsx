import React from 'react';
import { Language, ServiceItem } from '../types';
import { translations } from '../i18n/translations';
import { TrendingUp, Megaphone, Target, Award, Cpu, Search, Users, GraduationCap, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  currentLang: Language;
  onOpenContactModal: () => void;
}

export const Services: React.FC<ServicesProps> = ({ currentLang, onOpenContactModal }) => {
  const t = translations[currentLang];

  const services: ServiceItem[] = [
    {
      id: 's-1',
      iconName: 'TrendingUp',
      title: 'Hyper-Scaled Growth Marketing',
      subtitle: 'Data-Backed Acquisition',
      description: 'End-to-end performance engine building across Meta, Google Ads, TikTok, and Programmatic networks.',
      deliverables: ['Omnichannel Ad Scaling', 'LTV & CAC Optimization', 'Attribution & Analytics Setup'],
      tag: 'Most Popular'
    },
    {
      id: 's-2',
      iconName: 'Megaphone',
      title: 'Executive PR & Media Strategy',
      subtitle: 'Tier-1 Global Placement',
      description: 'Securing top-tier coverage in Forbes, Business Standard, ANI, and Economic Times for leadership status.',
      deliverables: ['Press Release Distribution', 'Crisis Media Protection', 'Founder Thought Leadership'],
      tag: 'Executive Preferred'
    },
    {
      id: 's-3',
      iconName: 'Target',
      title: 'Brand Positioning & Architecture',
      subtitle: 'Luxury Brand Storytelling',
      description: 'Refining brand identity, visual guidelines, tone of voice, and high-converting positioning copy.',
      deliverables: ['Brand Deck & Strategy Guidelines', 'Visual Identity Systems', 'Core Messaging Framework'],
      tag: 'Foundational'
    },
    {
      id: 's-4',
      iconName: 'Cpu',
      title: 'AI Marketing & Automated CRM',
      subtitle: 'Next-Gen Automation',
      description: 'Integrating LLMs, predictive customer scoring, and automated email/SMS funnels.',
      deliverables: ['AI Lead Qualification', 'HubSpot & Salesforce Workflows', 'Chatbot & Voice Agent Setup'],
      tag: 'Cutting-Edge'
    },
    {
      id: 's-5',
      iconName: 'Search',
      title: 'Enterprise SEO & Authority',
      subtitle: 'Organic Dominance',
      description: 'Dominating organic search results for high-intent keywords to secure long-term traffic streams.',
      deliverables: ['Technical SEO Audits', 'Programmatic Content Engines', 'High-DA Backlink Building'],
      tag: 'High ROI'
    },
    {
      id: 's-6',
      iconName: 'GraduationCap',
      title: 'Corporate Training & Workshops',
      subtitle: 'Executive Upskilling',
      description: 'Custom growth masterclasses for CMOs, marketing teams, and founder cohorts.',
      deliverables: ['1-on-1 Advisory Sessions', 'Growth Playbook Licensing', 'Hands-on Team Training'],
      tag: 'Advisory'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-gold-400" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6 text-amber-400" />;
      case 'Target': return <Target className="w-6 h-6 text-yellow-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-gold-300" />;
      case 'Search': return <Search className="w-6 h-6 text-amber-300" />;
      default: return <GraduationCap className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#070709] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Capabilities & Advisory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.servicesTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Custom-tailored marketing solutions designed for rapid enterprise value creation.
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-3xl bg-[#101014] border border-white/10 hover:border-gold-500/50 transition-all duration-300 shadow-2xl flex flex-col justify-between hover:-translate-y-2"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gold-400 uppercase tracking-widest">
                    {service.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gold-400/80 font-medium mt-0.5">{service.subtitle}</p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2 space-y-2 border-t border-white/5">
                  {service.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={onOpenContactModal}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-gold-400 transition-colors"
                >
                  <span>Engage Advisory</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
