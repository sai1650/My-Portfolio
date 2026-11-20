import React, { useState } from 'react';
import { Bot, Zap, Search, Layers, ShieldCheck, Wrench, Lock, Check, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface ClientExperienceProps {
  onSelectEngagement: (title: string) => void;
}

interface EngagementMode {
  id: string;
  number: string;
  category: 'STARTUPS' | 'ENTERPRISE' | 'RESEARCH';
  title: string;
  badge: string;
  headline: string;
  desc: string;
  icon: React.ReactNode;
  deliverables: string[];
  techStack: string[];
  timeline: string;
}

export const ClientExperience: React.FC<ClientExperienceProps> = ({ onSelectEngagement }) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'STARTUPS' | 'ENTERPRISE' | 'RESEARCH'>('ALL');

  const engagementModes: EngagementMode[] = [
    {
      id: 'ai-product',
      number: '01',
      category: 'STARTUPS',
      title: 'AI Product Development & SaaS MVP',
      badge: 'Zero to Launch',
      headline: 'From Raw Algorithmic Concept to Scalable, Market-Ready Product',
      desc: 'Architecting turnkey AI products from scratch. Complete end-to-end delivery combining reactive React 19 frontends, asynchronous FastAPI microservices, and fine-tuned model inference.',
      icon: <Bot className="w-5 h-5 text-[#ff5500]" />,
      deliverables: [
        'Production web application & responsive UI',
        'Normalized PostgreSQL / pgvector schemas',
        'Asynchronous Python API contracts & auth',
        '100% full source code & repository handover',
      ],
      techStack: ['React 19', 'FastAPI', 'Docker', 'PostgreSQL', 'Tailwind'],
      timeline: '3 - 6 Weeks',
    },
    {
      id: 'ai-agents',
      number: '02',
      category: 'ENTERPRISE',
      title: 'Autonomous Multi-Agent Workflows',
      badge: 'Agentic Systems',
      headline: 'Stateful Graph Reasoning Loops & MCP Tool Execution',
      desc: 'Engineering autonomous agent systems that execute multi-step workflows, tool calls, and self-correcting logic via LangGraph and the Model Context Protocol (MCP).',
      icon: <Zap className="w-5 h-5 text-[#ccff00]" />,
      deliverables: [
        'LangGraph multi-agent cognitive graph',
        'Custom Model Context Protocol (MCP) servers',
        'Deterministic guardrails & JSON schema validators',
        'Memory stores & persistent checkpointing',
      ],
      techStack: ['LangGraph', 'Python', 'Claude 3.5 Sonnet', 'MCP', 'Redis'],
      timeline: '2 - 4 Weeks',
    },
    {
      id: 'rag-apps',
      number: '03',
      category: 'ENTERPRISE',
      title: 'Enterprise RAG & Knowledge Engines',
      badge: 'Knowledge Retrieval',
      headline: 'Sub-50ms Hybrid Search with Zero-Hallucination Thresholds',
      desc: 'Retrieval-Augmented Generation that connects proprietary document repositories to LLMs using hybrid dense/sparse vector retrieval, contextual reranking, and citation provenance.',
      icon: <Search className="w-5 h-5 text-[#ff5500]" />,
      deliverables: [
        'ChromaDB & FAISS vector search pipelines',
        'Hybrid dense + sparse cross-encoder reranking',
        'Automated document ingestion & chunking scrapers',
        'Citation provenance & evaluation telemetry',
      ],
      techStack: ['ChromaDB', 'FAISS', 'OpenAI', 'Hugging Face', 'FastAPI'],
      timeline: '2 - 4 Weeks',
    },
    {
      id: 'saas-web',
      number: '04',
      category: 'STARTUPS',
      title: 'Full-Stack Web Engineering',
      badge: 'Full-Stack Modernization',
      headline: 'Ultra-High-Framerate Interactive Web Platforms',
      desc: 'Building responsive web platforms with fluid WebGL graphics, sub-100ms API responses, and rock-solid relational backends designed for enterprise reliability.',
      icon: <Layers className="w-5 h-5 text-[#ccff00]" />,
      deliverables: [
        'React 19 single-page application with modern UI',
        'RESTful / GraphQL API services with OpenAPI specs',
        'Role-Based Access Control (RBAC) & security',
        'CI/CD GitHub Actions automated deployment pipelines',
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS'],
      timeline: '3 - 5 Weeks',
    },
    {
      id: 'research-imp',
      number: '05',
      category: 'RESEARCH',
      title: 'Research Implementation & Reproducibility',
      badge: 'Lab to Code',
      headline: 'Bridging Theoretical Mathematics to Typed Python Systems',
      desc: 'Translating academic papers, novel architectures, and loss formulations into benchmarked codebases backed by empirical validation.',
      icon: <ShieldCheck className="w-5 h-5 text-[#ff5500]" />,
      deliverables: [
        'Clean, modular PyTorch model implementation',
        'Benchmark evaluation scripts against baselines',
        'Detailed documentation of tensor dimensions',
        'Comprehensive technical report / LaTeX drafting',
      ],
      techStack: ['PyTorch', 'Transformers', 'LaTeX', 'NumPy', 'Matplotlib'],
      timeline: '2 - 4 Weeks',
    },
    {
      id: 'qa-auto',
      number: '06',
      category: 'ENTERPRISE',
      title: 'QA Automation & Playwright Engineering',
      badge: 'Zero-Regression Shield',
      headline: 'Autonomous Testing Suites with Self-Healing Selectors',
      desc: 'Constructing robust end-to-end testing frameworks that eradicate regressions, automate UI validation across viewports, and integrate seamlessly into CI/CD.',
      icon: <Wrench className="w-5 h-5 text-[#ccff00]" />,
      deliverables: [
        'Playwright test automation architecture',
        'Self-healing dynamic selector utilities',
        'Visual regression screenshot comparison',
        'CI/CD pipeline integration and HTML reporting',
      ],
      techStack: ['Playwright', 'TypeScript', 'Python', 'GitHub Actions', 'Docker'],
      timeline: '1 - 3 Weeks',
    },
  ];

  const filteredModes = engagementModes.filter(
    (m) => activeCategory === 'ALL' || m.category === activeCategory
  );

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#0e1017] border-b border-[#232734]">
      {/* Perimeter Coordinates */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between font-mono text-[10px] text-[#9da4b2] tracking-widest uppercase border-b border-[#232734] pb-3 chamber-datum-bar reveal-init">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff5500]" />
          CHAMBER 09 // CLIENT ENGAGEMENT BLUEPRINT &amp; SLA GUARANTEES
        </span>
        <span className="hidden sm:inline">CONTRACT FORMULATION // INTERNATIONAL SPRINT SPEC</span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal-init">
          <div>
            <div className="font-mono text-xs text-[#ff5500] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
              <span>[ CONTRACT MODES // SPRINT SIZES ]</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f3f4ee] tracking-tight">
              FREELANCE BLUEPRINT.
            </h2>
            <p className="text-[#9da4b2] text-sm sm:text-base font-light mt-3 max-w-2xl">
              Turnkey engineering sprints designed for international clients and high-growth technology founders.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(['ALL', 'STARTUPS', 'ENTERPRISE', 'RESEARCH'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  activeCategory === cat
                    ? 'bg-[#ff5500] text-black font-bold border-[#ff5500]'
                    : 'bg-[#13161f] text-[#9da4b2] hover:text-[#f3f4ee] border-[#232734]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Engagement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 stagger-init">
          {filteredModes.map((mode) => {
            return (
              <div
                key={mode.id}
                className="bg-[#13161f] border border-[#232734] p-6 flex flex-col justify-between hover:border-[#ff5500]/50 transition-colors relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span className="text-[#ff5500] font-bold">SPRINT {mode.number}</span>
                    <span className="text-[#ccff00] bg-[#1b1f2b] px-2 py-0.5 border border-[#232734]">
                      {mode.timeline}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#f3f4ee] mb-2">
                    {mode.title}
                  </h3>

                  <p className="text-xs text-[#9da4b2] font-light leading-relaxed mb-4">
                    {mode.desc}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-1.5 pt-3 border-t border-[#232734]">
                    <span className="font-mono text-[10px] text-[#9da4b2] uppercase block mb-1">
                      Deliverables Handover
                    </span>
                    {mode.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#f3f4ee]">
                        <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#232734] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {mode.techStack.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-[#9da4b2] bg-[#0c0d11] px-1.5 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectEngagement(mode.title);
                    }}
                    className="text-xs font-mono text-[#ff5500] hover:text-[#e04b00] font-bold flex items-center gap-1"
                  >
                    <span>Engage</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Ironclad Engineering Guarantees */}
        <div className="bg-[#13161f] border border-[#2d323f] p-8">
          <div className="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ccff00]" />
            <span>CONTRACTUAL INTEGRITY &amp; ENGINEERING STANDARDS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="font-display font-bold text-base text-[#f3f4ee]">100% IP Ownership</div>
              <p className="text-xs text-[#9da4b2] font-light leading-relaxed">
                Full copyright and source code repository transfer upon milestone completion. Zero vendor lock-in.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-display font-bold text-base text-[#f3f4ee]">Direct Senior Engineer</div>
              <p className="text-xs text-[#9da4b2] font-light leading-relaxed">
                No intermediaries or account managers. You work directly with the engineer designing and writing the code.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-display font-bold text-base text-[#f3f4ee]">Milestone Velocity</div>
              <p className="text-xs text-[#9da4b2] font-light leading-relaxed">
                Clear two-week deliverables with staging previews so you verify functionality in real-time.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-display font-bold text-base text-[#f3f4ee]">30-Day Post-Launch SLA</div>
              <p className="text-xs text-[#9da4b2] font-light leading-relaxed">
                Every project includes 30 days of active post-launch bug fixing, telemetry monitoring, and warranty support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
