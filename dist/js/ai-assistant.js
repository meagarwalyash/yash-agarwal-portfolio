/**
 * MAY Platform — AI Assistant & Site-Wide Search Widget (js/ai-assistant.js)
 * Provides interactive search, product recommendations, and AI assistant modal.
 */

(function () {
  // Inject Widget Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .may-ai-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9990;
      background: linear-gradient(135deg, #D4AF37 0%, #B5942B 100%);
      color: #0A090E;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .may-ai-fab:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 15px 35px rgba(212, 175, 55, 0.6);
    }
    .may-ai-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(10, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .may-ai-modal.active {
      opacity: 1;
      pointer-events: auto;
    }
    .may-ai-card {
      background: #14131B;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 24px;
      width: 100%;
      max-width: 680px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.15);
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // Helper to load CMS data
  function getCmsData() {
    try {
      const saved = localStorage.getItem('MAY_WEBSITE_CMS_DATA');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      blogs: [],
      digitalProducts: [],
      consultingOptions: [],
      courses: []
    };
  }

  // Create FAB Button
  const fab = document.createElement('div');
  fab.className = 'may-ai-fab';
  fab.id = 'MAY_AI_Trigger';
  fab.title = 'Ask MAY AI Assistant & Search Platform';
  fab.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
      <path d="M12 12 2.1 12.1"></path>
      <path d="M20 12a8 8 0 1 0-8 8"></path>
    </svg>
  `;

  // Modal Container
  const modal = document.createElement('div');
  modal.className = 'may-ai-modal';
  modal.id = 'MAY_AI_Modal';
  modal.innerHTML = `
    <div class="may-ai-card">
      <div class="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-gold to-amber-600 text-black flex items-center justify-center font-bold text-sm shadow-md">
            ✨
          </div>
          <div>
            <h3 class="text-sm font-bold text-white tracking-wide">MAY AI Assistant & Intelligent Search</h3>
            <p class="text-[10px] text-zinc-400 font-mono">Ask strategy questions or search products, blogs & advisory</p>
          </div>
        </div>
        <button id="MAY_AI_Close" class="text-zinc-400 hover:text-white p-2 text-xl font-bold transition-colors">✕</button>
      </div>

      <div class="p-4 border-b border-white/10 bg-white/5">
        <div class="relative flex items-center">
          <input 
            type="text" 
            id="MAY_AI_Input"
            placeholder="e.g., How do I scale Meta ads? Or search Notion templates..."
            class="w-full bg-black/60 border border-brand-gold/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
          />
          <button id="MAY_AI_SearchBtn" class="absolute right-2 px-4 py-1.5 rounded-lg bg-brand-gold text-black text-xs font-bold hover:bg-brand-goldHover transition-colors">
            Search
          </button>
        </div>
      </div>

      <div id="MAY_AI_Content" class="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-zinc-300">
        <div class="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold leading-relaxed">
          <strong>Greetings! I am MAY AI.</strong> I can help you find growth playbooks, SOPs, Notion templates, blog insights, or recommend consulting options with Yash Agarwal.
        </div>

        <div>
          <span class="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block mb-2">Popular Prompt Shortcuts:</span>
          <div class="flex flex-wrap gap-2">
            <button class="may-ai-chip px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold text-zinc-300 transition-colors">Zero-Budget PR Framework</button>
            <button class="may-ai-chip px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold text-zinc-300 transition-colors">Scaling Meta Ads to ₹3Cr</button>
            <button class="may-ai-chip px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold text-zinc-300 transition-colors">Notion CMO Operating System</button>
            <button class="may-ai-chip px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold text-zinc-300 transition-colors">Book 1-on-1 Advisory Session</button>
          </div>
        </div>

        <div id="MAY_AI_Results" class="space-y-3 pt-2"></div>
      </div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(modal);

  // Toggle handlers
  const openModal = () => modal.classList.add('active');
  const closeModal = () => modal.classList.remove('active');

  fab.addEventListener('click', openModal);
  document.getElementById('MAY_AI_Close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Query processing logic
  const input = document.getElementById('MAY_AI_Input');
  const resultsDiv = document.getElementById('MAY_AI_Results');

  function handleQuery(query) {
    if (!query.trim()) return;
    const cms = getCmsData();
    const q = query.toLowerCase();

    resultsDiv.innerHTML = `
      <div class="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
        <div class="w-3 h-3 rounded-full border-2 border-brand-gold border-t-transparent animate-spin"></div>
        <span>AI Analyzing Platform Knowledge Base for "${query}"...</span>
      </div>
    `;

    setTimeout(() => {
      let matches = [];

      // Products search
      (cms.digitalProducts || []).forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
          matches.push({ type: 'STORE PRODUCT', title: p.title, price: `₹${p.discountPrice}`, url: `store.html`, desc: p.desc });
        }
      });

      // Blogs search
      (cms.blogs || []).forEach(b => {
        if (b.heading.toLowerCase().includes(q) || b.snippet.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)) {
          matches.push({ type: 'BLOG ARTICLE', title: b.heading, price: 'FREE READ', url: `blog.html?slug=${b.slug}`, desc: b.snippet });
        }
      });

      // Consulting options
      (cms.consultingOptions || []).forEach(c => {
        if (c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)) {
          matches.push({ type: 'EXECUTIVE ADVISORY', title: c.title, price: `₹${c.discountPrice}`, url: `speaking.html`, desc: c.desc });
        }
      });

      let aiResponseText = '';
      if (q.includes('pr') || q.includes('press') || q.includes('forbes')) {
        aiResponseText = "Yash Agarwal's Zero-Budget PR Framework relies on macroeconomic newsjacking and original proprietary data to secure Forbes & Business Standard features without $50k agency retainers.";
      } else if (q.includes('meta') || q.includes('ad') || q.includes('scale') || q.includes('roas')) {
        aiResponseText = "To scale performance ad funnels past ₹1Cr/month, focus on creative velocity (testing 50+ hooks/week) and 60-day cash payback ROAS rather than micro-bidding.";
      } else if (q.includes('book') || q.includes('godfather')) {
        aiResponseText = "'No Godfather' is Yash Agarwal's forthcoming book detailing 12+ years of first-hand growth marketing leadership and building an empire without corporate patronage.";
      } else {
        aiResponseText = `Here is what I found in Yash Agarwal's platform repository for "${query}":`;
      }

      let html = `
        <div class="p-4 rounded-xl bg-black/60 border border-brand-gold/30 space-y-2">
          <span class="text-[10px] font-mono text-brand-gold uppercase font-bold">MAY AI Synthesis</span>
          <p class="text-zinc-200 leading-relaxed">${aiResponseText}</p>
        </div>
      `;

      if (matches.length > 0) {
        html += `<div class="text-[10px] font-mono text-zinc-500 uppercase font-bold mt-3">Matched Platform Assets (${matches.length})</div>`;
        matches.slice(0, 4).forEach(m => {
          html += `
            <a href="${m.url}" class="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold transition-all group">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[9px] font-mono font-bold text-brand-gold">${m.type}</span>
                <span class="text-[10px] font-bold text-white">${m.price}</span>
              </div>
              <div class="font-bold text-white text-xs group-hover:text-brand-gold transition-colors">${m.title}</div>
              <div class="text-[11px] text-zinc-400 line-clamp-1 mt-1">${m.desc}</div>
            </a>
          `;
        });
      } else {
        html += `
          <div class="text-xs text-zinc-400 p-3 bg-white/5 rounded-xl border border-white/10">
            Recommended: Explore the <a href="store.html" class="text-brand-gold underline font-bold">Digital Products Store</a> or book a <a href="speaking.html" class="text-brand-gold underline font-bold">1-on-1 Advisory Call</a>.
          </div>
        `;
      }

      resultsDiv.innerHTML = html;
    }, 400);
  }

  document.getElementById('MAY_AI_SearchBtn').addEventListener('click', () => handleQuery(input.value));
  input.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleQuery(input.value); });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('may-ai-chip')) {
      input.value = e.target.innerText;
      handleQuery(e.target.innerText);
    }
  });
})();
