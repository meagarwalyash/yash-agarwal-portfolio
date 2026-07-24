import React from 'react';
import { Language, TestimonialItem } from '../types';
import { translations } from '../i18n/translations';
import { Star, CheckCircle, Linkedin, Play, Quote } from 'lucide-react';

interface TestimonialsProps {
  currentLang: Language;
  onOpenVideoModal: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang, onOpenVideoModal }) => {
  const t = translations[currentLang];

  const testimonials: TestimonialItem[] = [
    {
      id: 't-1',
      name: 'Vikramaditya Sharma',
      role: 'Founder & CEO',
      company: 'Apex Global Ventures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      content: 'Yash is a force of nature in growth marketing. He brought structured financial discipline to our ad spending while multiplying customer acquisition 4x within months.',
      linkedinVerified: true,
    },
    {
      id: 't-2',
      name: 'Elena Rostova',
      role: 'VP of Marketing',
      company: 'PayPulse Fintech',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      content: 'Working with Yash Agarwal was the best decision our board made prior to our Series B raise. His PR and brand positioning strategy generated instant global credibility.',
      linkedinVerified: true,
    },
    {
      id: 't-3',
      name: 'Rohan Mehta',
      role: 'Chief Revenue Officer',
      company: 'NexaDigital Inc.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      content: 'Incredible strategic clarity. Yash doesn’t just execute ad campaigns; he builds sustainable brand empires with AI automation and data-backed precision.',
      linkedinVerified: true,
    }
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Peer & Executive Validation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <p className="text-zinc-400 text-sm">
            Direct endorsements from founders, venture capitalists, and enterprise C-level executives.
          </p>
        </div>

        {/* Video Feature Highlight Card */}
        <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-[#121216] via-[#1a1a22] to-[#121216] border border-gold-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-gold-500 text-black text-[10px] font-extrabold uppercase tracking-widest">
              Video Review Spotlight
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Watch Founders Share Their 4x Scaling Story
            </h3>
            <p className="text-xs text-zinc-400">
              Recorded live at the APAC Growth Summit in Singapore.
            </p>
          </div>

          <button
            onClick={onOpenVideoModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 text-black font-extrabold text-xs shadow-xl shadow-gold-500/20 hover:scale-105 transition-transform shrink-0"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Play Video Testimonials (3 Min)</span>
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#101014] border border-white/10 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
              
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-gold-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.linkedinVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                      )}
                    </h4>
                    <p className="text-[11px] text-zinc-400">{item.role}, <span className="text-gold-400/80">{item.company}</span></p>
                  </div>
                </div>

                <Linkedin className="w-4 h-4 text-zinc-500 hover:text-gold-400 transition-colors" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
