import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Bot, Send, Mic, Sparkles, X, User, CornerDownLeft, RefreshCw, Zap, ThumbsUp } from 'lucide-react';

interface AiAssistantProps {
  currentLang: Language;
  onClose?: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ currentLang, onClose }) => {
  const t = translations[currentLang];
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Greetings! I am Yash Agarwal's executive AI assistant. Ask me anything about Yash's $50M+ growth track record, case studies, PR strategies, or advisory availability.",
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate intelligent streaming response generator
    setTimeout(() => {
      let reply = "Yash Agarwal is a Chief Marketing Officer with 8+ years experience scaling brands past $50M in revenue using performance ad funnels and AI CRM workflows.";

      const lower = query.toLowerCase();
      if (lower.includes('rate') || lower.includes('cost') || lower.includes('pricing') || lower.includes('consult')) {
        reply = "Yash accepts select high-impact growth advisory retainers starting at $10,000/month or executive consultation sessions. You can click 'Hire Yash' to book a private consultation directly.";
      } else if (lower.includes('roas') || lower.includes('roi') || lower.includes('result') || lower.includes('revenue')) {
        reply = "Across 120+ global campaigns, Yash has driven an average ROAS of 4.8x - 7.4x. Key highlights include $12.4M DTC revenue for Aura Luxury Watches and 5.2M Fintech users for PayPulse.";
      } else if (lower.includes('pr') || lower.includes('forbes') || lower.includes('media')) {
        reply = "Yash specializes in executive PR positioning and has secured over 500+ tier-1 media placements including Forbes, Business Standard, ANI, and The Week.";
      } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('who are you')) {
        reply = "Hello! I am Yash's AI partner. Feel free to ask about his portfolio, resume details, or how he can scale your brand's acquisition funnel!";
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleVoiceSimulate = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("What is Yash Agarwal's average ROAS performance?");
    }, 2000);
  };

  const quickPrompts = [
    "What is Yash's average ROAS?",
    "How can Yash help scale my brand?",
    "Tell me about the $12.4M watch campaign",
    "What are Yash's advisory rates?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-[#101014]/95 border border-gold-500/40 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white flex flex-col h-[560px]">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gold-500/20 via-amber-500/10 to-black border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{t.aiAssistantTitle}</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-gold-400/80">Online • GPT-4o Powered Knowledge Engine</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'ai'
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                  : 'bg-white/10 text-white'
              }`}
            >
              {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'ai'
                  ? 'bg-white/5 border border-white/10 text-zinc-200'
                  : 'bg-gold-500 text-black font-semibold'
              }`}
            >
              <p>{msg.text}</p>
              <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'ai' ? 'text-zinc-500' : 'text-black/60'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gold-400 p-2 bg-white/5 rounded-xl w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>AI Assistant is analyzing knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-2 border-t border-white/5 bg-black/40 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 border border-white/10 text-[10px] text-zinc-300 hover:text-gold-300 shrink-0 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#0a0a0c] border-t border-white/10 flex items-center gap-2">
        <button
          onClick={handleVoiceSimulate}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-gold-400'
          }`}
          title="Simulate Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={t.aiAssistantPlaceholder}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/50"
        />

        <button
          onClick={() => handleSend()}
          className="p-2.5 rounded-xl bg-gold-500 text-black font-bold hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
