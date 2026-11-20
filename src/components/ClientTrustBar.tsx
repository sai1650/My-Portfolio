import React from 'react';
import { Cpu, Layers, Search, GraduationCap, Wrench, ShieldCheck } from 'lucide-react';

export const ClientTrustBar: React.FC = () => {
  const trustItems = [
    {
      code: 'STRUC-01',
      title: 'AI Engineering',
      desc: 'Autonomous Agentic Systems & Multi-Agent State Graphs',
      icon: <Cpu className="w-4 h-4 text-[#ff5500]" />,
      tag: 'PRODUCTION DEPLOYED',
    },
    {
      code: 'STRUC-02',
      title: 'Full-Stack Architecture',
      desc: 'React 19 & High-Throughput Asynchronous FastAPI',
      icon: <Layers className="w-4 h-4 text-[#ccff00]" />,
      tag: 'TYPE-SAFE RESILIENCE',
    },
    {
      code: 'STRUC-03',
      title: 'RAG & Vector Memory',
      desc: 'Hybrid Dense/Sparse Vector Retrieval & Custom MCP Bridges',
      icon: <Search className="w-4 h-4 text-[#ff5500]" />,
      tag: 'SUB-50MS LATENCY',
    },
    {
      code: 'STRUC-04',
      title: 'Empirical Research Lab',
      desc: '6 Google Scholar Publications (SR University ML Lab)',
      icon: <GraduationCap className="w-4 h-4 text-[#ccff00]" />,
      tag: 'PEER-REVIEWED',
    },
    {
      code: 'STRUC-05',
      title: 'Software Automation',
      desc: 'Playwright & Self-Healing Regression QA Frameworks',
      icon: <Wrench className="w-4 h-4 text-[#ff5500]" />,
      tag: 'ZERO REGRESSION',
    },
  ];

  return (
    <section className="relative z-20 border-y border-[#232734] bg-[#0e1017] py-6 select-none font-mono text-xs reveal-init chamber-datum-bar">
      {/* Perimeter Crosshair Markers */}
      <div className="absolute -top-[5px] left-8 text-[#ff5500] text-xs font-mono pointer-events-none">+</div>
      <div className="absolute -top-[5px] right-8 text-[#ff5500] text-xs font-mono pointer-events-none">+</div>
      <div className="absolute -bottom-[6px] left-8 text-[#ccff00] text-xs font-mono pointer-events-none">+</div>
      <div className="absolute -bottom-[6px] right-8 text-[#ccff00] text-xs font-mono pointer-events-none">+</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Trust Eyebrow Label */}
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#f3f4ee] tracking-widest shrink-0 uppercase border-b lg:border-b-0 lg:border-r border-[#232734] pb-3 lg:pb-0 lg:pr-6">
            <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
            <span className="font-bold tracking-[0.2em]">VERIFIED CAPABILITY DATUM</span>
            <span className="text-[#ff5500]">//</span>
          </div>

          {/* 5 Distinct Real Credential Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full stagger-init">
            {trustItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#13161f] border border-[#232734] hover:border-[#ff5500]/50 transition-colors flex flex-col justify-between group relative"
              >
                {/* Structural Corner Notch */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff5500]/40 group-hover:border-[#ff5500] transition-colors" />

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#1b1f2b] border border-[#2d323f]">
                      {item.icon}
                    </div>
                    <span className="text-[10px] text-[#9da4b2] font-mono">{item.code}</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#ccff00] tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-[#f3f4ee] text-xs sm:text-sm tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#9da4b2] font-sans font-light mt-0.5 line-clamp-1">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
