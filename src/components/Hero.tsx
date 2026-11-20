import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

interface HeroProps {
  onExploreWork: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContact }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scene2Ref = useRef<HTMLElement | null>(null);

  // 3D Mouse Parallax on Desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Entrance & ScrollTrigger Animations
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Load Master Timeline for Scene 01
      const tl = gsap.timeline({ defaults: { ease: EASINGS.luxury } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.2 }
      )
        .fromTo(
          '.hero-title-line',
          { opacity: 0, y: 50, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.15, duration: 1.0 },
          '-=0.4'
        )
        .fromTo(
          '.hero-paragraph',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: EASINGS.snappy },
          '-=0.5'
        )
        .fromTo(
          '.hero-portrait-container',
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: EASINGS.expo },
          '-=1.0'
        )
        .fromTo(
          '.hero-discipline-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(
          '.hero-scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        );

      // Continuous subtle breathing bounce for scroll indicator
      gsap.to('.hero-scroll-indicator', {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 1.3,
      });

      // 2. Scene 02 ScrollTrigger: Headline & 3 Floating Cards
      if (scene2Ref.current) {
        gsap.fromTo(
          scene2Ref.current.querySelector('.scene2-header'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: EASINGS.luxury,
            scrollTrigger: {
              trigger: scene2Ref.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          scene2Ref.current.querySelectorAll('.scene2-card'),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: EASINGS.luxury,
            scrollTrigger: {
              trigger: scene2Ref.current.querySelector('.scene2-cards-grid'),
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#FAFAFA] text-slate-900 overflow-hidden select-none"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-400/10 via-purple-400/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-blue-400/10 via-orange-400/5 to-transparent blur-[120px] pointer-events-none" />

      {/* ========================================================= */}
      {/* HERO SCENE 01: Top Viewport with Sai Gaddam Portrait       */}
      {/* ========================================================= */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
        {/* Layer 0: Sai Gaddam Portrait in Light Luxury Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Desktop Right-aligned portrait */}
          <div
            className="hero-portrait-container absolute right-0 sm:right-6 lg:right-10 top-16 sm:top-12 lg:top-8 w-[320px] sm:w-[460px] lg:w-[560px] aspect-square flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`,
            }}
          >
            {/* Luminous Warm Orange & Violet Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5722]/20 via-purple-500/15 to-transparent blur-[80px] animate-pulse" />

            {/* Cutout Portrait Image */}
            <img
              src="/images/sai-portrait-cutout-soft.png"
              alt="Sai Gaddam AI Engineer"
              className="relative z-10 w-full h-full object-contain filter contrast-105 drop-shadow-[0_20px_50px_rgba(255,87,34,0.25)]"
            />
          </div>
        </div>

        {/* Foreground Content: Title & High-Ticket Manifesto */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Greeting & Huge Bold Title */}
          <div className="lg:col-span-8">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-xs font-mono text-[#FF5722] mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
              <span>SAI GADDAM // PRINCIPAL AI ARCHITECT</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] tracking-tight text-slate-900 leading-[0.93]">
              <span className="hero-title-line block">AI Engineer &amp;</span>
              <span className="hero-title-line block text-[#FF5722]">
                Researcher
              </span>
            </h1>

            <p className="hero-paragraph text-base sm:text-lg text-slate-600 leading-relaxed mt-6 max-w-xl font-normal">
              Great intelligence should feel invisible. From neural transformer models to autonomous multi-agent loops, I engineer digital systems that connect, reason, and convert.
            </p>

            {/* CTA Buttons in Light Luxury */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => {
                  sound.playClick();
                  onExploreWork();
                }}
                className="hero-cta flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-wide transition-all cursor-pointer group shadow-[0_10px_25px_rgba(15,23,42,0.2)]"
              >
                <span>Explore 3D Projects</span>
                <div className="w-7 h-7 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onContact();
                }}
                className="hero-cta flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#ff6838] text-white font-bold text-xs tracking-wide shadow-[0_10px_25px_rgba(255,87,34,0.35)] transition-all cursor-pointer group"
              >
                <span>Commission AI System</span>
                <div className="w-7 h-7 rounded-full bg-white text-[#FF5722] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: 4-Column Numbered Disciplines + Continuous Scroll Indicator */}
        <div className="relative z-10 border-t border-slate-200/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono text-xs text-slate-500 w-full md:w-auto">
            <div className="hero-discipline-item flex items-center gap-2">
              <span className="text-[#FF5722] font-bold">#01</span>
              <span className="text-slate-800 font-medium">Autonomous AI Agents</span>
            </div>
            <div className="hero-discipline-item flex items-center gap-2">
              <span className="text-[#FF5722] font-bold">#02</span>
              <span className="text-slate-800 font-medium">RAG Knowledge Engines</span>
            </div>
            <div className="hero-discipline-item flex items-center gap-2">
              <span className="text-[#FF5722] font-bold">#03</span>
              <span className="text-slate-800 font-medium">Full-Stack Web Systems</span>
            </div>
            <div className="hero-discipline-item flex items-center gap-2">
              <span className="text-[#FF5722] font-bold">#04</span>
              <span className="text-slate-800 font-medium">Vision &amp; Deep Learning</span>
            </div>
          </div>

          {/* Continuous Subtle Scroll Indicator */}
          <div
            onClick={() => {
              sound.playClick();
              onExploreWork();
            }}
            className="hero-scroll-indicator hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400 hover:text-[#FF5722] transition-colors cursor-pointer shrink-0"
          >
            <span>SCROLL DOWN</span>
            <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">
              <ChevronDown className="w-3.5 h-3.5 text-[#FF5722]" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* HERO SCENE 02: Middle Section + 3 Floating Luxury Cards   */}
      {/* ========================================================= */}
      <section
        ref={scene2Ref}
        className="relative w-full py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10 border-t border-slate-200/80"
      >
        {/* Headline */}
        <div className="scene2-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5722] mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>• BEHIND THE SYSTEMS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.05]">
              Shaping Intelligence
              <br />
              That Makes Life{' '}
              <span className="italic font-serif font-normal text-[#FF5722]">
                Simpler
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
              I engineer clean, autonomous multi-agent systems and full-stack platforms that turn complex AI research into high-ticket production software.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onContact();
              }}
              className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-900 hover:bg-black text-white font-semibold text-xs tracking-tight transition-all cursor-pointer group shadow-sm"
            >
              <span>Get in touch</span>
              <div className="w-5 h-5 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* 3 Floating Luxury Cards in Light Luxury Theme with Staggered Scroll Reveal */}
        <div className="scene2-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* Card 1: Cybernetic Sphere */}
          <div
            onClick={() => {
              sound.playClick();
              onExploreWork();
            }}
            className="scene2-card group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#FF5722]/50 cursor-pointer"
          >
            <img
              src="/images/card-1.jpg"
              alt="Autonomous AI Agents"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider block mb-1">
                  System 01 // Cognitive
                </span>
                <h3 className="font-display font-bold text-lg text-white">Autonomous Agents</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#FF5722] group-hover:border-[#FF5722] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Studio Headphones */}
          <div
            onClick={() => {
              sound.playClick();
              onExploreWork();
            }}
            className="scene2-card group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#FF5722]/50 cursor-pointer"
          >
            <img
              src="/images/card-2.jpg"
              alt="RAG Knowledge Engines"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider block mb-1">
                  System 02 // Retrieval
                </span>
                <h3 className="font-display font-bold text-lg text-white">RAG Knowledge Engines</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#FF5722] group-hover:border-[#FF5722] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Dropper Bottle */}
          <div
            onClick={() => {
              sound.playClick();
              onExploreWork();
            }}
            className="scene2-card group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#FF5722]/50 cursor-pointer"
          >
            <img
              src="/images/card-3.jpg"
              alt="Vision & Deep Learning"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider block mb-1">
                  System 03 // Perception
                </span>
                <h3 className="font-display font-bold text-lg text-white">Vision &amp; Deep Learning</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#FF5722] group-hover:border-[#FF5722] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
