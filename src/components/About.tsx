import React, { useState, useEffect, useRef } from 'react';
import { Terminal, MapPin, Award, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { BRAND_CONFIG } from '../data/config';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

export const About: React.FC = () => {
  const [activeStoryline, setActiveStoryline] = useState<'mindset' | 'architecture' | 'research'>('mindset');
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger Animations for About Section
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Section Title Reveal
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Left Column Visual Elements enter from Left with Parallax Depth
      gsap.fromTo(
        '.about-portrait-monolith',
        { opacity: 0, x: -40, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.95,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.about-portrait-monolith',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Right Column Editorial & Narrative enters sequentially
      gsap.fromTo(
        '.about-narrative-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.about-narrative-column',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Metric Monolith Cards Stagger
      gsap.fromTo(
        '.about-metric-card',
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: EASINGS.smooth,
          scrollTrigger: {
            trigger: '.about-metrics-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth crossfade on Storyline Tab change
  useEffect(() => {
    if (prefersReducedMotion() || !tabContentRef.current) return;
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0.7, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeStoryline]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Headline */}
        <div className="about-header mb-12 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#FF5722] uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span>• PRINCIPAL BIOGRAPHY</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[0.98]">
            Code, Cognition &amp;{' '}
            <span className="italic font-serif font-normal text-[#FF5722]">
              Engineering Mindset
            </span>
          </h2>
        </div>

        {/* Asymmetrical Architectural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Steel-Framed Monolith Portrait */}
          <div className="about-portrait-monolith lg:col-span-5 relative group">
            <div className="relative bg-white border border-slate-200 rounded-[28px] p-5 shadow-xl transition-all duration-500 hover:border-[#FF5722]/50 hover:-translate-y-1">
              {/* Status Header Bar */}
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-700 bg-slate-100 rounded-full px-4 py-2 mb-4 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                  <span className="text-slate-900 font-semibold">SAI GADDAM</span>
                </div>
                <span className="text-[#FF5722] font-semibold">SR UNIVERSITY ML LAB</span>
              </div>

              {/* Verified Portrait Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src="/sai-portrait.jpg"
                  alt="Sai Gaddam - AI Engineer and Full-Stack Developer"
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Telemetry Hardware Metadata */}
              <div className="mt-4 p-4 rounded-[18px] bg-slate-50 border border-slate-200 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between text-slate-600 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>Khammam, India (IST / UTC+5:30)</span>
                  </div>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE &amp; ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">FOCUS</span>
                    <span className="text-slate-800 font-medium">Vision Transformers &amp; Multi-Agent Graphs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">STACK</span>
                    <span className="text-slate-800 font-medium">React 19 &bull; FastAPI &bull; PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Scholar Credential Plaque */}
            <div className="mt-4 p-4 rounded-[20px] bg-white border border-slate-200 shadow-md flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-50 border border-orange-200 text-[#FF5722]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider font-bold">
                  Empirical Research Authority
                </div>
                <div className="text-sm font-display font-bold text-slate-900">
                  6 Google Scholar Peer-Reviewed AI Publications
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Execution Pipeline & Structural Pillars */}
          <div className="about-narrative-column lg:col-span-7 space-y-8">
            {/* Narrative Editorial Text */}
            <div className="about-narrative-item space-y-4">
              <p className="text-xl sm:text-2xl text-slate-900 font-medium leading-snug font-display">
                {BRAND_CONFIG.aboutContent}
              </p>

              <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                Most AI solutions fail at the seam between research experimentation and software reliability. As an AI Engineer who actively conducts empirical research at SR University’s Machine Learning Laboratory, I build from the ground up: mathematically sound models wrapped in clean, asynchronous APIs and surfaced through responsive, accessible web interfaces.
              </p>
            </div>

            {/* The 5-Phase Working Approach Pipeline */}
            <div className="about-narrative-item p-6 bg-white border border-slate-200 rounded-[24px] shadow-sm relative">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                <span className="text-[#FF5722] font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  WORKING PIPELINE // ZERO GUESSWORK
                </span>
                <span className="text-slate-700 font-semibold">SPRINT PROTOCOL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { step: '01', name: 'Understand', desc: 'Requirements & Constraints' },
                  { step: '02', name: 'Architect', desc: 'System & Schema Design' },
                  { step: '03', name: 'Build', desc: 'High-Velocity Sprints' },
                  { step: '04', name: 'Validate', desc: 'Automated E2E Testing' },
                  { step: '05', name: 'Deliver', desc: 'Production Deployment' },
                ].map((st, i) => (
                  <div
                    key={st.step}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-[14px] hover:border-[#FF5722]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#FF5722] mb-1 font-bold">
                      <span>{st.step}</span>
                      {i < 4 && <span className="hidden sm:inline text-slate-400">&rarr;</span>}
                    </div>
                    <div className="font-display font-bold text-slate-900 text-xs">{st.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Metric Monoliths */}
            <div className="about-metrics-grid about-narrative-item grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="about-metric-card p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm">
                <div className="font-display font-black text-3xl text-[#FF5722]">6+</div>
                <div className="text-xs font-mono text-slate-900 uppercase mt-1 font-bold">Research Papers</div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">ViT, Attention, Biometrics</div>
              </div>

              <div className="about-metric-card p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm">
                <div className="font-display font-black text-3xl text-purple-600">0 to 1</div>
                <div className="text-xs font-mono text-slate-900 uppercase mt-1 font-bold">Full-Stack Velocity</div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">React 19 &bull; FastAPI &bull; Agents</div>
              </div>

              <div className="about-metric-card p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm">
                <div className="font-display font-black text-3xl text-emerald-600">100%</div>
                <div className="text-xs font-mono text-slate-900 uppercase mt-1 font-bold">IP Handover</div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">Full Source Code &bull; Zero Lock-in</div>
              </div>
            </div>

            {/* Interactive Engineering Dossier Tabs */}
            <div className="about-narrative-item p-6 bg-white border border-slate-200 rounded-[24px] shadow-sm">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4 mb-5 text-xs font-mono">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveStoryline('mindset');
                  }}
                  className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                    activeStoryline === 'mindset'
                      ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  01 // MINDSET
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveStoryline('architecture');
                  }}
                  className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                    activeStoryline === 'architecture'
                      ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  02 // ARCHITECTURE
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveStoryline('research');
                  }}
                  className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                    activeStoryline === 'research'
                      ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  03 // RESEARCH RIGOR
                </button>
              </div>

              {/* Tab Content Display */}
              <div
                ref={tabContentRef}
                className="space-y-3 font-sans text-sm text-slate-600 leading-relaxed"
              >
                {activeStoryline === 'mindset' && (
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base mb-2">
                      First-Principles Problem Solving Before Choosing Tools
                    </h4>
                    <p className="mb-3">
                      I don't shoehorn AI or complex architectures into places where simple code suffices. I analyze business bottlenecks, operational workflows, and real latency constraints. When AI is appropriate, it is implemented with strict guardrails, structured outputs, and observable tracing.
                    </p>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Pragmatic engineering over superficial novelty</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Clear communication and weekly production milestone demos</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeStoryline === 'architecture' && (
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base mb-2">
                      Modular, Type-Safe, Asynchronous Architecture
                    </h4>
                    <p className="mb-3">
                      My full-stack platforms are built for deterministic throughput. From non-blocking ASGI backends in FastAPI to strictly typed schemas and responsive React 19 frontends, every layer has clean interfaces and automated error recovery.
                    </p>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Sub-50ms vector query execution with pgvector / ChromaDB</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Cyclic reflection graphs with LangGraph and checkpointed stores</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeStoryline === 'research' && (
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base mb-2">
                      Empirically Grounded at SR University ML Lab
                    </h4>
                    <p className="mb-3">
                      With 6 peer-reviewed papers indexed on Google Scholar spanning Vision Transformers, Multimodal Emotion Recognition, and Neural Machine Translation, my practical software development is supported by deep theoretical understanding of gradient dynamics and attention mechanisms.
                    </p>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Published research in multimodal deep learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Rigorous experimental validation across benchmark datasets</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
