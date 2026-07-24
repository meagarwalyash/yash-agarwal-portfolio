import React from 'react';
import { Mic, Award, Users, Video, Globe2 } from 'lucide-react';

export const SpeakingSection: React.FC = () => {
  return (
    <section id="speaking" className="py-24 bg-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A951]/10 border border-[#C8A951]/30 text-[#C8A951] text-xs font-bold uppercase tracking-widest">
            <Mic className="w-3.5 h-3.5" />
            <span>Keynotes & Stage Engagements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Speaking & Executive Masterclasses
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Keynoting international growth summits, founder retreats, and corporate marketing seminars.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#C8A951]">50+</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Keynote Speeches</div>
          </div>
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#C8A951]">10,000+</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Executives Trained</div>
          </div>
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#C8A951]">4.9 / 5.0</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Speaker Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};
