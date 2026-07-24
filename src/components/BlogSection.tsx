import React, { useState } from 'react';
import { Language, BlogPost } from '../types';
import { translations } from '../i18n/translations';
import { Search, Clock, Share2, Tag, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  currentLang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts: BlogPost[] = [
    {
      id: 'b-1',
      title: 'The 2026 AI Growth Architecture: Replacing Legacy Marketing Agencies',
      excerpt: 'How generative AI agents and automated attribution pipelines allow lean marketing teams to outperform 50-person agencies.',
      category: 'AI Marketing',
      readTime: '6 min read',
      date: 'July 20, 2026',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      content: 'Detailed breakdown of programmatic ad creation, real-time creative iteration, and LLM-driven audience segmentation...'
    },
    {
      id: 'b-2',
      title: 'Mastering High-Ticket CAC Reduction on Meta & TikTok Ads',
      excerpt: 'A mathematical approach to creative hook testing, ad frequency caps, and custom LTV-based bidding strategies.',
      category: 'Performance Marketing',
      readTime: '8 min read',
      date: 'June 14, 2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      content: 'Step-by-step breakdown of scaling daily spend past $50k while maintaining positive unit economics...'
    },
    {
      id: 'b-3',
      title: 'Executive Personal Branding: The Apple & Porsche Storytelling Playbook',
      excerpt: 'Why C-level leaders must position themselves as media entities to attract capital, talent, and enterprise deals.',
      category: 'Brand Strategy',
      readTime: '5 min read',
      date: 'May 08, 2026',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      content: 'Analyzing how Steve Jobs and Elon Musk mastered minimalist, high-impact public narratives...'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Thought Leadership & Insights
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.blogTitle}
          </h2>
          <p className="text-zinc-400 text-sm">
            Deep-dive essays on AI growth stacks, performance marketing math, and executive brand positioning.
          </p>
        </div>

        {/* AI Filter & Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search strategy articles or AI topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#101014] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/50"
            />
          </div>

          <div className="flex gap-2">
            {['All', 'AI Marketing', 'Performance Marketing', 'Brand Strategy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-black font-bold'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl bg-[#101014] border border-white/10 hover:border-gold-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-2 shadow-2xl"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-bold text-gold-400 uppercase tracking-widest backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-gold-400">
                <span>Read Full Blueprint</span>
                <div className="flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-zinc-500 hover:text-white" />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
