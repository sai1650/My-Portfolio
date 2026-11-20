import React, { useState, useEffect, useRef } from 'react';
import { Check, UserCheck, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

interface ProcessStep {
  number: string;
  code: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  clientRole: string;
}

const WORK_STEPS: ProcessStep[] = [
  {
    number: '01',
    code: 'DISCOVERY',
    title: 'Understand the Problem & Business Constraints',
    duration: 'Sprint 01',
    description: 'Understand the core operational bottlenecks, domain goals, target users, and architectural boundaries. We establish quantifiable performance metrics and identify algorithmic risks early.',
    deliverables: [
      'Technical requirements document & constraints matrix',
      'Feasibility evaluation & LLM token cost modeling',
      'High-level system topology outline',
      'Milestone roadmap & delivery scope',
    ],
    clientRole: 'Share product vision, data samples, and priority objectives',
  },
  {
    number: '02',
    code: 'STRATEGY',
    title: 'Define the Architecture & Schema Contracts',
    duration: 'Sprint 02',
    description: 'Define the system scope, database schemas, model selection strategy (local open-weights vs cloud APIs), vector retrieval pipeline, and API contracts. A fast interactive spike de-risks core functionality.',
    deliverables: [
      'Interactive architecture diagram & API spec',
      'Vector indexing & schema definitions',
      'Algorithm benchmark & latency verification',
      'UI wireframes and design system tokens',
    ],
    clientRole: 'Review architecture blueprint and approve milestone deliverables',
  },
  {
    number: '03',
    code: 'DEVELOPMENT',
    title: 'Build the Solution & High-Velocity Sprints',
    duration: 'Sprint 03',
    description: 'Build and integrate the solution with clean, modular, scalable code. Fast iterative weekly sprints with continuous staging environments so you can test the working software as it evolves.',
    deliverables: [
      'Modular TypeScript frontend with Tailwind CSS',
      'Async FastAPI / Node.js backend services',
      'LangGraph multi-agent & RAG orchestration logic',
      'Weekly staging preview deployments',
    ],
    clientRole: 'Weekly sync or asynchronous review on staging previews',
  },
  {
    number: '04',
    code: 'VALIDATION',
    title: 'Test, Validate & Automated QA Verification',
    duration: 'Sprint 04',
    description: 'Test and optimize. Comprehensive automated QA test suites with Playwright, rigorous LLM output safety guardrails, hallucination audits, and latency profiling under concurrent load.',
    deliverables: [
      'Automated Playwright regression test suite',
      'API load testing & latency audit reports',
      'LLM output guardrails and schema validation',
      'Cross-device responsive visual verification',
    ],
    clientRole: 'User acceptance testing (UAT) and feedback logging',
  },
  {
    number: '05',
    code: 'DELIVERY',
    title: 'Deploy, Handover & Production Support',
    duration: 'Sprint 05',
    description: 'Deploy and hand over the finished product with zero downtime via Docker, cloud platforms (AWS, Vercel, Railway), full source code repository handover, clear documentation, and 30-day post-launch warranty.',
    deliverables: [
      'Production deployment with SSL & monitoring',
      'Full source code repository & IP ownership transfer',
      'Comprehensive developer documentation & API guides',
      'Walkthrough video & 30-day post-launch warranty support',
    ],
    clientRole: 'Receive full ownership, deployment credentials, and enjoy launch!',
  },
];

export const WorkProcess: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORK_STEPS[activeStepIndex];
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const detailCardRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger Animations for Process Section
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.process-header',
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

      // 2. Interactive Scroll Progress Bar Fill
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.4,
            },
          }
        );
      }

      // 3. Staggered Step Buttons Reveal
      gsap.fromTo(
        '.process-step-btn',
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.process-steps-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Dossier Card entrance
      gsap.fromTo(
        '.process-detail-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.process-detail-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth crossfade on step switch
  useEffect(() => {
    if (prefersReducedMotion() || !detailCardRef.current) return;
    gsap.fromTo(
      detailCardRef.current,
      { opacity: 0.75, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeStepIndex]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="process-header mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#FF5722] uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span>• 3D SPRINT WORKFLOW</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.0]">
            The 5-Phase Blueprint &amp;{' '}
            <span className="italic font-serif font-normal text-[#FF5722]">
              Sprint Delivery
            </span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal mt-3 max-w-xl leading-relaxed">
            A structured, predictable 5-phase engineering protocol from raw problem discovery to verified production deployment and full IP handover.
          </p>

          {/* Real-time Interactive Scroll Progress Indicator Line */}
          <div className="mt-8 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#FF5722] via-orange-400 to-[#7C3AED] rounded-full shadow-[0_0_12px_#FF5722]"
            />
          </div>
        </div>

        {/* 5-Phase Horizontal Timeline Strip */}
        <div className="process-steps-grid grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
          {WORK_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => {
                  sound.playClick();
                  setActiveStepIndex(idx);
                }}
                className={`process-step-btn p-4 text-left border rounded-[20px] transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 border-[#FF5722] text-slate-900 shadow-md -translate-y-1'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:-translate-y-0.5 shadow-sm'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-4 right-4 h-1 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]" />
                )}

                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className={isActive ? 'text-[#FF5722] font-bold' : 'text-slate-400'}>
                    PHASE {step.number}
                  </span>
                  <span className="text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full font-medium border border-slate-200">{step.duration}</span>
                </div>

                <div className="font-display font-bold text-sm tracking-tight leading-snug text-slate-900">
                  {step.title.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep-Dive Architectural Dossier */}
        <div
          ref={detailCardRef}
          className="process-detail-card bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-6 font-mono text-xs gap-2">
            <span className="text-[#FF5722] font-semibold tracking-wider">
              PHASE SPECIFICATION // {activeStep.code} &bull; PHASE {activeStep.number} OF 05
            </span>
            <span className="text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
              {activeStep.duration}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {activeStep.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {activeStep.description}
              </p>

              {/* Client Involvement Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-[18px] flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-600">
                  <span className="text-[#FF5722] font-semibold uppercase block mb-0.5">
                    Client Collaboration Role
                  </span>
                  <span className="text-slate-900 font-sans font-medium">{activeStep.clientRole}</span>
                </div>
              </div>
            </div>

            {/* Deliverables Column */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-[20px] p-5 space-y-3">
              <div className="font-mono text-xs text-[#FF5722] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>PHASE {activeStep.number} DELIVERABLES</span>
              </div>

              <ul className="space-y-2 text-xs font-sans text-slate-700">
                {activeStep.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
