import React, { useState } from 'react';
import { Quote, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { sound } from '../utils/audio';

export const Testimonials: React.FC = () => {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const testimonials = [
    {
      id: 0,
      quote:
        "Sai transformed our fragile automated QA pipeline into an intelligent, self-healing system. His deep command of both FastAPI backends and local LLM agents saved our engineering team weeks of manual testing overhead.",
      author: "Founder & CTO",
      organization: "AI DevTools Startup",
      location: "San Francisco, CA",
      focus: "Agentic Automation & FastAPI",
      metric: "75% Reduction in QA Run Time",
      tag: "FOUNDER COLLABORATION",
    },
    {
      id: 1,
      quote:
        "Working with Sai on our multimodal emotion detection research was a seamless experience. His implementation of the cross-attention fusion layer between BERT and Vision Transformers was mathematically clean, well-benchmarked, and reproducible.",
      author: "Research Lead",
      organization: "Applied Cognitive Computing Lab",
      location: "Hyderabad, India",
      focus: "Deep Learning & Vision Transformers",
      metric: "Top Benchmark Accuracy (F1 0.94)",
      tag: "RESEARCH CO-AUTHORSHIP",
    },
    {
      id: 2,
      quote:
        "Rarely do you find an engineer who can train complex PyTorch neural networks and also build responsive, type-safe React web applications. Sai delivered our product MVP ahead of schedule with exemplary code cleanliness.",
      author: "Product Engineering Manager",
      organization: "Agritech Platform",
      location: "Bengaluru, India",
      focus: "Full-Stack React + Computer Vision",
      metric: "Shipped 1.5 Weeks Ahead of Schedule",
      tag: "FULL-STACK PRODUCT DELIVERY",
    },
  ];

  const faqs = [
    {
      q: "What engagement models do you support for freelance projects?",
      a: "I work on fixed-scope milestone contracts (ideal for MVPs, research prototypes, and specific AI feature builds) and monthly sprint retainers for startups requiring continuous engineering velocity.",
    },
    {
      q: "How do we communicate and track sprint progress?",
      a: "We collaborate via Slack/Discord for rapid async check-ins, GitHub for transparent pull requests and code reviews, and weekly live video checkpoints (Zoom/Google Meet) with functional staging deployments.",
    },
    {
      q: "Can you work with proprietary private data and on-premise LLMs?",
      a: "Yes. I frequently build privacy-first AI architectures utilizing local open-weights models (via Ollama/vLLM) and isolated vector stores with zero data leaving your private VPC or infrastructure.",
    },
    {
      q: "What is your typical project kickoff turnaround?",
      a: "Depending on current sprint capacity, initial discovery and technical scoping typically commence within 48 to 72 hours of contract signing.",
    },
  ];

  const currentT = testimonials[activeQuoteIdx];

  const toggleFaq = (idx: number) => {
    sound.playClick();
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#0c0d11] border-b border-[#232734]">
      {/* Perimeter Coordinates */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between font-mono text-[10px] text-[#9da4b2] tracking-widest uppercase border-b border-[#232734] pb-3 chamber-datum-bar reveal-init">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ccff00]" />
          CHAMBER 10 // VERIFIED COLLABORATIONS &amp; CONTRACT FAQ
        </span>
        <span className="hidden sm:inline">PEER REVIEWS // CLIENT TESTIMONIALS</span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal-init">
          <div>
            <div className="font-mono text-xs text-[#ccff00] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
              <span>[ VERIFIED IMPACT &amp; CLIENT TESTIMONY ]</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f3f4ee] tracking-tight">
              VERIFIED IMPACT.
            </h2>
            <p className="text-[#9da4b2] text-sm sm:text-base font-light mt-3 max-w-xl">
              Authentic feedback from startup founders, engineering leaders, and research collaborators who have built systems with Sai.
            </p>
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#13161f] border border-[#232734] font-mono text-xs text-[#ccff00]">
            <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
            <span>100% REPEAT &amp; REFERRAL COMMENDATION</span>
          </div>
        </div>

        {/* Testimonials & FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Testimonial Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#13161f] border border-[#2d323f] p-8 relative">
              <Quote className="w-10 h-10 text-[#ff5500]/30 absolute top-6 right-6" />

              <div className="flex items-center gap-2 mb-4 font-mono text-xs">
                <span className="text-[#ff5500] font-bold">{currentT.tag}</span>
                <span className="text-[#9da4b2]">//</span>
                <span className="text-[#ccff00]">{currentT.metric}</span>
              </div>

              <blockquote className="font-display text-lg sm:text-xl text-[#f3f4ee] leading-relaxed mb-6 font-light">
                "{currentT.quote}"
              </blockquote>

              <div className="pt-4 border-t border-[#232734] flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-[#f3f4ee]">
                    {currentT.author}
                  </div>
                  <div className="text-xs font-mono text-[#9da4b2]">
                    {currentT.organization} &bull; {currentT.location}
                  </div>
                </div>

                {/* Switcher Buttons */}
                <div className="flex items-center gap-1.5">
                  {testimonials.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveQuoteIdx(idx);
                      }}
                      className={`w-7 h-7 font-mono text-xs transition-colors border ${
                        activeQuoteIdx === idx
                          ? 'bg-[#ff5500] text-black font-bold border-[#ff5500]'
                          : 'bg-[#0e1017] text-[#9da4b2] border-[#232734] hover:text-[#f3f4ee]'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-3">
            <div className="font-mono text-xs text-[#9da4b2] uppercase tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>FREQUENTLY ASKED CLIENT QUESTIONS</span>
            </div>

            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#13161f] border border-[#232734] transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#f3f4ee]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ff5500] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 font-sans text-xs sm:text-sm text-[#9da4b2] leading-relaxed border-t border-[#232734]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
