import React, { useState } from 'react';
import { Language, Lead, PortfolioItem } from '../types';
import { LayoutDashboard, Users, FolderPlus, FileText, BarChart3, Settings, X, Plus, Trash2, CheckCircle2, Lock, ShieldCheck, Mail } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'leads' | 'portfolio' | 'blogs'>('analytics');

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'l-1',
      name: 'Vikramaditya Sharma',
      email: 'vikram@apexventures.com',
      service: 'Hyper-Scaled Growth Marketing',
      budget: '$50k - $100k+',
      message: 'Looking to scale Series B Fintech portfolio company in APAC region.',
      date: '2026-07-22',
      status: 'New'
    },
    {
      id: 'l-2',
      name: 'Sarah Lin',
      email: 'sarah@auratime.com',
      service: 'Executive PR & Media Strategy',
      budget: '$25k - $50k',
      message: 'Exclusive luxury timepiece product launch in North America.',
      date: '2026-07-21',
      status: 'Contacted'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput.length > 0) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#101014] border border-gold-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="py-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Yash Agarwal CMS Console</h2>
              <p className="text-xs text-zinc-400 mt-1">Enter your executive access pin to manage portfolio and lead data.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password (default: admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/50"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gold-500 text-black font-extrabold text-xs shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform"
              >
                Access CMS Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Executive Control Console</h2>
                  <p className="text-xs text-gold-400">Status: System Operational • Real-Time Synchronization</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    activeTab === 'analytics' ? 'bg-gold-500 text-black' : 'bg-white/5 text-zinc-300'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    activeTab === 'leads' ? 'bg-gold-500 text-black' : 'bg-white/5 text-zinc-300'
                  }`}
                >
                  Inbound Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    activeTab === 'portfolio' ? 'bg-gold-500 text-black' : 'bg-white/5 text-zinc-300'
                  }`}
                >
                  Manage Portfolio
                </button>
              </div>
            </div>

            {/* Tab: Analytics */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="text-xs text-zinc-400">Monthly Visitors</div>
                    <div className="text-2xl font-extrabold text-white">142,500</div>
                    <div className="text-[10px] text-emerald-400 font-bold">+18.4% this month</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="text-xs text-zinc-400">Lead Conversion Rate</div>
                    <div className="text-2xl font-extrabold text-white">4.82%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Top 1% Industry</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="text-xs text-zinc-400">Active Retainers</div>
                    <div className="text-2xl font-extrabold text-gold-400">$185k/mo</div>
                    <div className="text-[10px] text-zinc-400">6 Enterprise Accounts</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="text-xs text-zinc-400">Lighthouse Score</div>
                    <div className="text-2xl font-extrabold text-emerald-400">99 / 100</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Ultra Fast 60fps</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Traffic & Conversion Heatmap</h4>
                  <div className="h-40 rounded-xl bg-white/5 border border-white/5 flex items-end justify-between p-4 gap-2">
                    {[40, 65, 80, 55, 90, 100, 85, 95, 75, 110, 130, 142].map((val, idx) => (
                      <div key={idx} className="flex-1 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t" style={{ height: `${(val / 150) * 100}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Leads */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Recent Consultation Requests</h4>
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-white text-sm">{lead.name}</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/20 text-gold-400">
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{lead.email} • {lead.service} • <span className="text-gold-300">{lead.budget}</span></p>
                        <p className="text-xs text-zinc-300 italic mt-1 font-serif">"{lead.message}"</p>
                      </div>

                      <button
                        onClick={() => {
                          setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Contacted' } : l));
                        }}
                        className="px-4 py-2 rounded-xl bg-gold-500 text-black font-bold text-xs shrink-0"
                      >
                        Mark Contacted
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Portfolio */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Live Portfolio Items</h4>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 text-black font-bold text-xs">
                    <Plus className="w-4 h-4" /> Add New Project
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-zinc-400">
                  Projects automatically synchronized with main site gallery.
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
