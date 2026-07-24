import React, { useState } from 'react';
import { BookOpen, CheckCircle2, X } from 'lucide-react';

export const BookSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handlePreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  return (
    <section id="book" className="py-24 bg-gradient-to-b from-black via-[#0D0D10] to-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Book 3D Cover */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => setModalOpen(true)}
              className="relative w-64 sm:w-80 rounded-2xl p-1.5 bg-gradient-to-tr from-gold-500/50 via-white/10 to-transparent border border-gold-500/40 shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-500 cursor-pointer"
            >
              <img
                src="/no godfather cover.png"
                alt="No Godfather by Yash Agarwal"
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="p-6 bg-gradient-to-tr from-gold-500 via-[#1A1A20] to-black rounded-xl flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-gold-400">National Bestseller</span>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">NO GODFATHER</h3>
                  <p className="text-xs text-gold-300 font-bold">The Non-Conformist Playbook to Building an Empire</p>
                </div>
                <div className="pt-8 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-zinc-400">Written by</div>
                    <div className="text-sm font-extrabold text-white">Yash Agarwal</div>
                  </div>
                  <div className="text-xs font-bold text-gold-400">@MeAgarwalYash</div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Synopsis & Pre-Order */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Featured Book Release</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              "No Godfather" — The Self-Made Executive Playbook
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              In his debut masterwork, Yash Agarwal breaks down the exact strategies used to build a top-tier digital career, command high advisory retainers, and scale multi-million dollar brand funnels without corporate pedigree or industry godfathers.
            </p>

            <div className="p-6 rounded-2xl bg-black border border-white/10 text-xs text-zinc-300 space-y-2">
              <div className="font-bold text-gold-400 uppercase text-[11px]">Inside The Book:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
                <li>Personal Branding Architecture</li>
                <li>High-Ticket Advisory Pitching</li>
                <li>Executive PR Media Dominance</li>
                <li>AI Growth & Automation Funnels</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 rounded-full bg-gold-500 text-black font-extrabold text-xs shadow-xl shadow-gold-500/20 hover:scale-105 transition-transform"
              >
                Read Chapter Excerpt & Join Launch List
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Chapter Excerpt Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fadeIn">
          <div className="bg-[#101014] border border-gold-500/40 rounded-3xl p-8 max-w-2xl w-full text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-gold-400">"No Godfather" — Chapter 1 Preview</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed italic space-y-3">
              <p>"True leverage is built when your reputation precedes your entry into any boardroom. In the modern economy, you do not need permission or patronage; you need a system that consistently delivers measurable impact..."</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You are on the VIP Book Launch List!</span>
                </div>
              ) : (
                <form onSubmit={handlePreOrder} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email for launch updates..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-400"
                  />
                  <button type="submit" className="px-5 py-2 bg-gold-500 text-black font-extrabold text-xs rounded-full hover:scale-105 transition-transform">
                    Pre-Order List
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
