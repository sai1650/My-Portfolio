import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, GraduationCap, Award, ArrowUpRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { publicationsData, researchStats } from '../data/researchData';
import type { Publication } from '../types';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';
import { Research3DCanvas } from './Research3DCanvas';

export const Research: React.FC = () => {
  const [activePubIdx, setActivePubIdx] = useState(0);
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);
  const [activeResearchDomain, setActiveResearchDomain] = useState<string>('All');
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  const researchDomains = [
    'All',
    'Vision Transformers',
    'Multimodal AI',
    'Machine Learning',
    'Biometrics',
    'Affective Computing',
  ];

  const filteredPubs = publicationsData.filter((pub) => {
    if (activeResearchDomain === 'All') return true;
    return (
      pub.keywords.some((kw) => kw.toLowerCase().includes(activeResearchDomain.toLowerCase())) ||
      pub.title.toLowerCase().includes(activeResearchDomain.toLowerCase())
    );
  });

  const currentPub: Publication = filteredPubs[activePubIdx] || filteredPubs[0] || publicationsData[0];

  const copyBibtex = (pub: Publication) => {
    sound.playSuccess();
    const bibtex = `@article{gaddam${pub.year}${pub.id.replace(/-/g, '')},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${pub.year}},
  url={${pub.scholarUrl}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  // GSAP ScrollTrigger Animations for Research Section
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.research-header',
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

      // 2. Lab Banner reveal
      gsap.fromTo(
        '.research-lab-banner',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.research-lab-banner',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Domain filter pills
      gsap.fromTo(
        '.research-domain-pill',
        { opacity: 0, y: 15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: EASINGS.smooth,
          scrollTrigger: {
            trigger: '.research-domains-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Paper Cards List stagger
      gsap.fromTo(
        '.research-paper-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.research-papers-container',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 5. Active 3D Attention deep dive
      gsap.fromTo(
        '.research-deepdive-panel',
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.research-deepdive-panel',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeResearchDomain]);

  // Cinematic crossfade when user switches active paper
  useEffect(() => {
    if (prefersReducedMotion() || !detailPanelRef.current) return;
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0.7, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activePubIdx]);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="research-header flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5722] mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>• 3D SCIENTIFIC RESEARCH &amp; PAPERS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.0]">
              Empirical AI Research &amp;{' '}
              <span className="italic font-serif font-normal text-[#FF5722]">
                Publications
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal mt-3 max-w-xl leading-relaxed">
              Peer-reviewed scientific contributions in Vision Transformers, self-attention architectures, and predictive machine learning indexed on Google Scholar.
            </p>
          </div>

          <a
            href={researchStats.scholarProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-mono transition-all self-start md:self-auto shadow-md group cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#FF5722]" />
            <span>GOOGLE SCHOLAR PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Academic Laboratory Highlight Banner */}
        <div className="research-lab-banner bg-white p-6 border border-slate-200 rounded-[24px] mb-10 flex flex-wrap items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-[#FF5722]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                SR University Machine Learning &amp; Deep Learning Lab
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary Investigator in Vision Transformer representations &amp; multimodal bio-signal diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 bg-slate-100 rounded-full text-slate-800 font-semibold border border-slate-200">
              6 Index Publications
            </div>
            <div className="px-3.5 py-1.5 bg-orange-50 rounded-full text-[#FF5722] font-semibold border border-orange-200">
              100% Peer-Reviewed
            </div>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="research-domains-container flex flex-wrap items-center gap-2 mb-10">
          {researchDomains.map((dom) => {
            const isActive = activeResearchDomain === dom;
            return (
              <button
                key={dom}
                onClick={() => {
                  sound.playClick();
                  setActiveResearchDomain(dom);
                  setActivePubIdx(0);
                }}
                className={`research-domain-pill px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                }`}
              >
                {dom}
              </button>
            );
          })}
        </div>

        {/* Research Split: Papers Selector + Active 3D Attention Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Publications List */}
          <div className="research-papers-container lg:col-span-5 space-y-3">
            {filteredPubs.map((pub, idx) => {
              const isSelected = activePubIdx === idx;

              return (
                <div
                  key={pub.id}
                  onClick={() => {
                    sound.playHover();
                    setActivePubIdx(idx);
                  }}
                  className={`research-paper-card p-5 rounded-[22px] border cursor-pointer transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-white border-[#FF5722] shadow-[0_15px_35px_rgba(255,87,34,0.15)] -translate-y-0.5'
                      : 'bg-white/80 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {/* Left Active Strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-[#FF5722] rounded-r-full shadow-[0_0_10px_#FF5722]" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#FF5722] font-semibold">
                      PAPER 0{idx + 1} &bull; {pub.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {pub.type}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-[#FF5722] transition-colors leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-slate-500 font-mono mt-1.5 truncate">
                    {pub.venue}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pub.keywords.slice(0, 3).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Paper Deep Dive WITH LIVE 3D ATTENTION CANVAS */}
          {currentPub && (
            <div
              ref={detailPanelRef}
              className="research-deepdive-panel lg:col-span-7 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-xl space-y-6"
            >
              {/* Paper Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="font-mono text-xs text-[#FF5722] tracking-wider uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                    <span>3D EMPIRICAL SPECIMEN // {currentPub.venue}</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 leading-snug">
                    {currentPub.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    Authors: {currentPub.authors} &bull; Published {currentPub.year}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyBibtex(currentPub)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-xs font-mono text-slate-700 transition-colors cursor-pointer"
                    title="Copy BibTeX Citation"
                  >
                    {copiedBibtexId === currentPub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>BIBTEX</span>
                      </>
                    )}
                  </button>

                  <a
                    href={currentPub.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FF5722] hover:bg-[#ff6838] text-white rounded-full text-xs font-mono transition-colors shadow-sm cursor-pointer"
                  >
                    <span>SCHOLAR</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* LIVE 3D INTERACTIVE RESEARCH CANVAS */}
              <div className="w-full">
                <Research3DCanvas paperId={currentPub.id} />
              </div>

              {/* Abstract */}
              <div className="p-5 bg-slate-50 rounded-[20px] border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#FF5722] font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>EXECUTIVE ABSTRACT</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">VERIFIED METHODOLOGY</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {currentPub.abstract}
                </p>
              </div>

              {/* Keywords Matrix */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                  RESEARCH KEYWORDS &amp; TAXONOMY
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPub.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 rounded-full font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
