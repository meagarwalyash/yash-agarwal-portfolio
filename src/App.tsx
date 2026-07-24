import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, Settings, ArrowRight, CheckCircle2, ChevronRight, 
  Mail, Linkedin, Globe, Sparkles, Award, TrendingUp, Users, BookOpen, Clock, FileText 
} from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: '✨ Head of Marketing at DR Choksey FinServ • Author of "No Godfather"',
    heroGreeting: "Hi, I'm Yash Agarwal.",
    heroBio: 'I help founders, executives, and high-growth brands build category-defining digital empires through hyper-scaled performance marketing, strategic PR, and luxury personal branding.',
    btnAudit: 'Get Free Growth Blueprint',
    btnBook: 'Book Strategy Call',
    yearsExp: 'Years Exp',
    monthlyRev: 'Ad Scale',
    pressCov: 'Press Coverage',
    pathTitle: 'What Are You Looking To Build?',
    pathSub: 'Select your primary objective below for customized strategy frameworks.',
  },
  hi: {
    badge: '✨ डीआर चोकसी फिनसर्व में हेड ऑफ मार्केटिंग • "नो गॉडफादर" के लेखक',
    heroGreeting: 'नमस्ते, मैं हूँ यश अग्रवाल।',
    heroBio: 'मैं संस्थापकों, अधिकारियों और उच्च-विकास वाले ब्रांडों को हाइपर-स्केल्ड परफॉरमेंस मार्केटिंग, रणनीतिक पीआर और ब्रांडिंग के माध्यम से मार्केट लीडर बनाने में मदद करता हूँ।',
    btnAudit: 'निःशुल्क ग्रोथ ब्लूप्रिंट प्राप्त करें',
    btnBook: 'रणनीति कॉल बुक करें',
    yearsExp: 'वर्षों का अनुभव',
    monthlyRev: 'विज्ञापन पैमाना',
    pressCov: 'प्रेस कवरेज',
    pathTitle: 'आप क्या निर्माण करना चाहते हैं?',
    pathSub: 'कस्टमाइज़्ड रणनीतिक ढाँचे के लिए नीचे अपना प्राथमिक उद्देश्य चुनें।',
  },
  mr: {
    badge: '✨ डीआर चोक्सी फिनसर्व मध्ये हेड ऑफ मार्केटिंग • "नो गॉडफादर" चे लेखक',
    heroGreeting: 'नमस्कार, मी आहे यश अग्रवाल.',
    heroBio: 'मी संस्थापक आणि कंपन्यांना परफॉर्मन्स मार्केटिंग, स्ट्रॅटेजिक पीआर आणि ब्रँडिंगद्वारे मार्केट लीडर बनवण्यास मदत करतो.',
    btnAudit: 'मोफत ग्रोथ ब्लूप्रिंट मिळवा',
    btnBook: 'मीटिंग बुक करा',
    yearsExp: 'वर्षांचा अनुभव',
    monthlyRev: 'जाहिरात स्केल',
    pressCov: 'प्रेस कव्हरेज',
    pathTitle: 'तुम्हाला काय तयार करायचे आहे?',
    pathSub: 'सानुकूलित धोरणासाठी तुमचे ध्येय निवडा.',
  },
  gu: {
    badge: '✨ DR ચોકસી ફિનસર્વમાં હેડ ઓફ માર્કેટિંગ • "નો ગોડફાધર" ના લેખક',
    heroGreeting: 'નમસ્તે, હું છું યશ અગ્રવાલ.',
    heroBio: 'હું સ્થાપકો અને બ્રાન્ડ્સને માર્કેટિંગ, PR અને બ્રાન્ડિંગ દ્વારા ગ્રોથ મેળવવામાં મદદ કરું છું.',
    btnAudit: 'મફત ગ્રોથ બ્લૂપ્રિન્ટ મેળવો',
    btnBook: 'મીટિંગ બુક કરો',
    yearsExp: 'વર્ષોનો અનુભવ',
    monthlyRev: 'એડ સ્કેલ',
    pressCov: 'પ્રેસ કવરેજ',
    pathTitle: 'તમે શું બનાવવા માંગો છો?',
    pathSub: 'તમારો પ્રાથમિક હેતુ પસંદ કરો.',
  },
  bn: {
    badge: '✨ ডিআর চোকসি ফিনসার্ভে হেড অব মার্কেটিং • "নো গডফাদার" এর লেখক',
    heroGreeting: 'হ্যালো, আমি যশ আগরওয়াল।',
    heroBio: 'আমি ডিজিটাল মার্কেটিং, পিআর এবং ব্র্যান্ডিংয়ের মাধ্যমে ব্যবসায়িক বৃদ্ধি অর্জনে সাহায্য করি।',
    btnAudit: 'ফ্রি গ্রোথ ব্লুপ্রিন্ট পান',
    btnBook: 'কল বুক করুন',
    yearsExp: 'বছরের অভিজ্ঞতা',
    monthlyRev: 'এড স্কেল',
    pressCov: 'প্রেস কভারেজ',
    pathTitle: 'আপনি কী তৈরি করতে চান?',
    pathSub: 'আপনার উদ্দেশ্য নির্বাচন করুন।',
  }
};

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [currentTime, setCurrentTime] = useState('');
  const [auditSpend, setAuditSpend] = useState('Under ₹10L/mo');
  const [auditGoal, setAuditGoal] = useState('Scale Digital Revenue Past ₹3Cr');
  const [auditEmail, setAuditEmail] = useState('');
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // IST Live Time Display
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditEmail) return;
    setAuditSubmitted(true);
  };

  const t = translations[lang] || translations.en;

  return (
    <div className={`min-h-screen transition-colors duration-400 font-sans ${darkMode ? 'bg-[#0A090E] text-white' : 'bg-[#FAF8F5] text-[#121212]'}`}>
      
      {/* FLOATING TOP NAVIGATION DOCK */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${darkMode ? 'bg-[#0A090E]/90 border-white/10' : 'bg-[#FAF8F5]/90 border-[#EAE6DF]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-black font-extrabold flex items-center justify-center text-xs tracking-wider shadow-md">
              MAY
            </div>
            <div className="text-left">
              <span className="font-extrabold text-sm tracking-tight block">Yash Agarwal</span>
              <span className="text-[10px] text-[#D4AF37] font-bold block">@MeAgarwalYash</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide">
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#D4AF37] transition-colors">Experience</a>
            <a href="#book" className="hover:text-[#D4AF37] transition-colors">Book</a>
            <a href="#programs" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#audit" className="hover:text-[#D4AF37] transition-colors">Free Blueprint</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition-all ${darkMode ? 'bg-white/10 border-white/20 text-[#D4AF37]' : 'bg-[#FDF8EC] border-[#E6D298] text-black'}`}
              title="Toggle Dark/Light Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className={`px-3 py-1.5 rounded-full font-bold text-[11px] border focus:outline-none cursor-pointer ${darkMode ? 'bg-white/10 text-[#D4AF37] border-white/20' : 'bg-[#FDF8EC] text-black border-[#E6D298]'}`}
            >
              <option value="en" className="bg-black text-white">EN (English)</option>
              <option value="hi" className="bg-black text-white">HI (हिंदी)</option>
              <option value="mr" className="bg-black text-white">MR (मराठी)</option>
              <option value="gu" className="bg-black text-white">GU (ગુજરાતી)</option>
              <option value="bn" className="bg-black text-white">BN (বাংলা)</option>
            </select>

            <a
              href="#audit"
              className="px-4 py-2 rounded-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-extrabold text-xs shadow-md transition-all shrink-0"
            >
              {t.btnAudit}
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${darkMode ? 'bg-white/10 border-white/20 text-[#D4AF37]' : 'bg-[#FDF8EC] border-[#E6D298] text-[#B8860B]'}`}>
              {t.badge}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              {t.heroGreeting}
            </h1>

            <p className={`text-lg sm:text-xl leading-relaxed font-normal ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {t.heroBio}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#audit"
                className="px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>{t.btnAudit}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#programs"
                className={`px-8 py-4 rounded-full font-bold text-sm transition-all border-2 ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
              >
                Explore Services & Advisory
              </a>
            </div>

            {/* Key Metrics */}
            <div className={`pt-8 border-t grid grid-cols-4 gap-4 text-center sm:text-left ${darkMode ? 'border-white/10' : 'border-[#EAE6DF]'}`}>
              <div>
                <div className="text-3xl font-bold text-[#D4AF37]">12+</div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{t.yearsExp}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">₹3Cr+</div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{t.monthlyRev}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{t.pressCov}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1</div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Bestselling Book</div>
              </div>
            </div>
          </div>

          {/* Hero Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/30">
              <img
                src="/yashdp.png"
                alt="Yash Agarwal"
                className="w-full h-auto max-h-[650px] object-cover rounded-3xl filter contrast-[1.03]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* MEDIA TICKER */}
      <section className={`py-8 border-y ${darkMode ? 'bg-[#14131B] border-white/10' : 'bg-white border-[#EAE6DF]'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">AS FEATURED ACROSS NATIONAL PRESS & MEDIA</div>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 font-bold text-sm text-zinc-400 tracking-wider uppercase">
            <span>BUSINESS STANDARD</span> • <span>FORBES INDIA</span> • <span>HINDUSTAN TIMES</span> • <span>THE WEEK</span> • <span>MID-DAY</span> • <span>ANI PRESS</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">EXECUTIVE CAREER TRACK RECORD</span>
          <h2 className="text-4xl sm:text-5xl font-bold">12+ Years Executive Leadership</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              role: 'Head of Marketing',
              company: 'DR Choksey FinServ',
              period: '2023 — Present • Mumbai',
              desc: 'Leading omnichannel digital marketing, HNI wealth brand positioning, performance ad funnels, and press relations.'
            },
            {
              role: 'Head of Digital Marketing',
              company: 'Avant Garde Industries',
              period: '2021 — 2023 • India',
              desc: 'Scaled digital revenue past multi-crores monthly, optimized CAC by 42%, and managed international brand expansions.'
            },
            {
              role: 'Founder & Chief Strategist',
              company: 'FMK Agency',
              period: '2016 — 2021 • Global',
              desc: 'Built Fractional CMO agency scaling 100+ high-growth startups and personal brands across US, UAE, and APAC.'
            }
          ].map((exp, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border transition-all ${darkMode ? 'bg-[#14131B] border-white/10 hover:border-[#D4AF37]/50' : 'bg-white border-[#EAE6DF] hover:border-[#D4AF37]'}`}>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{exp.period}</span>
              <h3 className="text-2xl font-bold mt-1">{exp.role}</h3>
              <div className="text-sm font-semibold text-zinc-400 mb-3">{exp.company}</div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BOOK: "NO GODFATHER" */}
      <section id="book" className={`py-24 border-t ${darkMode ? 'bg-[#14131B] border-white/10' : 'bg-[#FDF8EC] border-[#EAE6DF]'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => setBookModalOpen(true)}
                className="relative w-64 sm:w-80 rounded-2xl p-1.5 bg-gradient-to-tr from-[#D4AF37] via-white/10 to-black border border-[#D4AF37]/40 shadow-2xl overflow-hidden group hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src="/no godfather cover.png"
                  alt="No Godfather by Yash Agarwal"
                  className="w-full h-auto rounded-xl shadow-2xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="p-6 bg-gradient-to-tr from-[#D4AF37] via-[#1A1A20] to-black rounded-xl flex flex-col justify-between text-left space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#D4AF37]">National Bestseller</span>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">NO GODFATHER</h3>
                  <p className="text-xs text-[#D4AF37] font-bold">The Non-Conformist Playbook to Building an Empire</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Featured Book Release</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold">
                "No Godfather" — The Self-Made Executive Playbook
              </h2>

              <p className={`text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                In his debut masterwork, Yash Agarwal breaks down the exact strategies used to build a top-tier digital career, command high advisory retainers, and scale multi-million dollar brand funnels without corporate pedigree or industry godfathers.
              </p>

              <button
                onClick={() => setBookModalOpen(true)}
                className="px-8 py-4 rounded-full bg-[#D4AF37] text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-transform"
              >
                Read Chapter Excerpt & Join Launch List →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FREE GROWTH AUDIT LEAD MAGNET */}
      <section id="audit" className={`py-20 border-t ${darkMode ? 'bg-[#14131B] border-white/10' : 'bg-white border-[#EAE6DF]'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">FREE ENTERPRISE RESOURCE</div>
          <h2 className="text-4xl sm:text-5xl font-bold">Get Your Free Growth Blueprint</h2>
          <p className={`text-base max-w-xl mx-auto ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
            Generate an immediate custom Growth Blueprint analyzing your current ad spend, media channels, and revenue scale bottlenecks.
          </p>

          <div className={`p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37] text-left space-y-6 shadow-xl ${darkMode ? 'bg-[#0A090E]' : 'bg-[#FAF8F5]'}`}>
            {auditSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="text-3xl font-bold text-[#D4AF37]">✓ Growth Blueprint Sent!</div>
                <p className={`text-xs max-w-md mx-auto ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Your customized 10-Point Enterprise Growth Blueprint is on its way to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold">Current Monthly Ad Spend:</label>
                    <select
                      value={auditSpend}
                      onChange={(e) => setAuditSpend(e.target.value)}
                      className={`w-full p-3.5 rounded-xl border text-xs font-medium focus:border-[#D4AF37] focus:outline-none ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-[#EAE6DF] text-black'}`}
                    >
                      <option value="Under ₹10L/mo" className="bg-[#14131B]">Under ₹10L / mo ($12k/mo)</option>
                      <option value="₹10L - ₹50L/mo" className="bg-[#14131B]">₹10L – ₹50L / mo ($60k/mo)</option>
                      <option value="₹50L - ₹2Cr/mo" className="bg-[#14131B]">₹50L – ₹2Cr / mo ($250k/mo)</option>
                      <option value="₹2Cr+/mo" className="bg-[#14131B]">₹2Cr+ / mo ($250k+/mo)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold">Primary Scale Bottleneck:</label>
                    <select
                      value={auditGoal}
                      onChange={(e) => setAuditGoal(e.target.value)}
                      className={`w-full p-3.5 rounded-xl border text-xs font-medium focus:border-[#D4AF37] focus:outline-none ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-[#EAE6DF] text-black'}`}
                    >
                      <option value="Scale Digital Revenue Past ₹3Cr" className="bg-[#14131B]">Scale Digital Revenue Past ₹3Cr/mo</option>
                      <option value="High Customer Acquisition Cost (CAC)" className="bg-[#14131B]">High Customer Acquisition Cost (CAC)</option>
                      <option value="Lack of Earned Press & Media Authority" className="bg-[#14131B]">Lack of Earned Press & Media Authority</option>
                      <option value="Creative Ad Fatigue & Low Conversion" className="bg-[#14131B]">Creative Ad Fatigue & Low Conversion</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold">Your Work Email Address:</label>
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="email"
                      required
                      placeholder="e.g. founder@enterprise.com"
                      value={auditEmail}
                      onChange={(e) => setAuditEmail(e.target.value)}
                      className={`flex-1 p-3.5 rounded-xl border text-xs placeholder:text-zinc-400 focus:border-[#D4AF37] focus:outline-none ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-[#EAE6DF] text-black'}`}
                    />
                    <button type="submit" className="px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold text-xs shadow-md transition-all">
                      Generate Growth Blueprint →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT & FOOTER SIGNATURE */}
      <section id="contact" className={`py-24 border-t text-center ${darkMode ? 'bg-[#12111A] border-white/10' : 'bg-[#FDF8EC] border-[#EAE6DF]'}`}>
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">START A CONVERSATION</span>
          <h2 className="text-4xl sm:text-6xl font-bold">Ready To Build A Growth Engine You Love?</h2>
          <p className={`text-base max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            For fractional CMO retainers, private executive advisory, speaking invitations, or press inquiries — reach out directly. Based in Mumbai, working globally.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="mailto:hello@meagarwalyash.com" className="px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-sm hover:bg-[#B8860B] transition-all shadow-lg">
              Email Direct: hello@meagarwalyash.com
            </a>
            <a href="https://linkedin.com/in/meagarwalyash" target="_blank" rel="noreferrer" className={`px-8 py-4 rounded-full border font-bold text-sm transition-all ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-[#EAE6DF] bg-white text-black hover:bg-[#B8860B] hover:text-white'}`}>
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t text-center text-xs space-y-2 ${darkMode ? 'bg-black border-white/10 text-zinc-400' : 'bg-white border-[#EAE6DF] text-zinc-500'}`}>
        <div>© 2026 Yash Agarwal (@MeAgarwalYash). All Rights Reserved.</div>
        <div className="text-[#D4AF37] font-bold">MUMBAI, INDIA • LIVE IST: {currentTime || '12:00:00 AM'}</div>
      </footer>

    </div>
  );
};

export default App;
