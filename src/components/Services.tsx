import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle, Wrench, Package, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  problem: string;
  whatIBuild: string[];
  whatYouReceive: string[];
  technologies: string[];
  architectureTitle: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-agents',
    num: '01',
    title: 'AI AGENTS & AGENTIC SYSTEMS',
    shortDesc: 'Custom AI agents, multi-agent workflows, tool-calling systems, and autonomous workflow automation.',
    problem: 'Businesses struggle with repetitive manual workflows, brittle automation scripts, and LLM implementations that lack state, deterministic guardrails, or access to external tools.',
    whatIBuild: [
      'Custom autonomous AI agents with cyclic reflection loops',
      'Multi-agent graph workflows using LangGraph and LangChain',
      'Tool-calling systems integrating with external APIs and databases',
      'Model Context Protocol (MCP) custom server bridges',
      'Deterministic output guardrails with structured JSON schemas',
    ],
    whatYouReceive: [
      'Production-ready agent orchestration codebase',
      'Custom MCP server integrations and tool definitions',
      'Stateful checkpointing and memory store architecture',
      '100% full source code ownership and technical documentation',
    ],
    technologies: ['LangGraph', 'LangChain', 'Python', 'MCP Protocol', 'Claude 3.5 Sonnet', 'GPT-4o', 'Redis'],
    architectureTitle: 'COGNITIVE MULTI-AGENT STATE GRAPH',
  },
  {
    id: 'rag-knowledge',
    num: '02',
    title: 'RAG & KNOWLEDGE SYSTEMS',
    shortDesc: 'Retrieval-Augmented Generation, document intelligence, semantic search, and vector database systems.',
    problem: 'Companies sit on massive proprietary document repositories, wikis, and technical manuals that employees cannot query accurately without hallucination risks or privacy leaks.',
    whatIBuild: [
      'Production RAG pipelines with semantic document chunking',
      'Hybrid dense and sparse vector retrieval with cross-encoder reranking',
      'Domain-specific knowledge assistants grounded in proprietary data',
      'Automated ingestion scrapers for PDFs, Markdown, and SQL stores',
      'Retrieval evaluation harnesses with provenance citation tracking',
    ],
    whatYouReceive: [
      'Sub-50ms hybrid vector search architecture',
      'ChromaDB / FAISS indexed vector pipelines',
      'Zero-hallucination citation provenance mechanism',
      'FastAPI ingestion and retrieval microservice endpoints',
    ],
    technologies: ['ChromaDB', 'FAISS', 'OpenAI Embeddings', 'Hugging Face', 'FastAPI', 'pgvector'],
    architectureTitle: 'HYBRID DENSE-SPARSE RAG TOPOLOGY',
  },
  {
    id: 'full-stack-app',
    num: '03',
    title: 'FULL-STACK APPLICATION DEVELOPMENT',
    shortDesc: 'SaaS platforms, responsive web applications, high-throughput APIs, and database architecture.',
    problem: 'Founders and companies need complete, market-ready web applications that combine modern reactive frontends with robust, high-performance backends and clean security contracts.',
    whatIBuild: [
      'Modern, responsive web applications using React 19 and Next.js',
      'High-throughput asynchronous backend APIs using FastAPI and Node.js',
      'Normalized PostgreSQL database schemas with connection pooling',
      'Role-Based Access Control (RBAC), JWT authentication, and OAuth2',
      'Containerized cloud deployments with automated Docker workflows',
    ],
    whatYouReceive: [
      'Complete production web application with accessible UI',
      'Documented RESTful / GraphQL API endpoints with OpenAPI specs',
      'Production-tested relational database migrations and models',
      'Docker Compose orchestration and cloud staging deployment',
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind'],
    architectureTitle: 'SCALABLE EDGE & CLOUD PLATFORM',
  },
  {
    id: 'gen-ai-integration',
    num: '04',
    title: 'GENERATIVE AI INTEGRATION',
    shortDesc: 'OpenAI, Azure AI, and Groq model integrations, AI copilots, and structured output workflows.',
    problem: 'Off-the-shelf generative AI models generate unstructured text, suffer from latency bottlenecks, and incur excessive API costs without custom prompt optimization or structured schemas.',
    whatIBuild: [
      'Direct OpenAI, Anthropic, Azure AI, and Groq API integrations',
      'Low-latency inference pipelines utilizing LPUs (Groq / Llama-3)',
      'Context-aware conversational copilots with semantic caching',
      'Structured JSON schema enforcement ensuring deterministic payloads',
      'Token optimization strategies reducing enterprise API overhead up to 60%',
    ],
    whatYouReceive: [
      'Custom LLM orchestration microservice with token telemetry',
      'Hardened prompt defense layers and output validators',
      'Streaming token responses for zero perceptual latency',
      'Production API keys, environment templates, and test suites',
    ],
    technologies: ['Groq LPU', 'OpenAI API', 'Anthropic Claude', 'LiteLLM', 'Python', 'FastAPI', 'Pydantic'],
    architectureTitle: 'STREAMING INFERENCE PIPELINE',
  },
  {
    id: 'ml-solutions',
    num: '05',
    title: 'MACHINE LEARNING & DEEP LEARNING',
    shortDesc: 'Custom ML models, computer vision, NLP classifiers, and predictive analytics pipelines.',
    problem: 'Standard foundation models cannot solve specialized domain problems requiring custom fine-tuning, computer vision classification, or local inference with privacy guarantees.',
    whatIBuild: [
      'Custom deep learning architectures (CNNs, Vision Transformers, BERT)',
      'Multimodal emotion recognition and sentiment extraction systems',
      'Predictive health and demographic risk models (SVM, Gradient Boosting)',
      'Low-resource Neural Machine Translation pipelines (Indic / Telugu)',
      'Model quantization (ONNX, TensorRT) for efficient edge deployment',
    ],
    whatYouReceive: [
      'Trained model weights with reproducibility training scripts',
      'Comprehensive benchmark evaluation reports with ROC/AUC metrics',
      'Dockerized inference container with sub-100ms response targets',
      'Jupyter notebooks detailing exploratory data analysis and validation',
    ],
    technologies: ['PyTorch', 'Hugging Face', 'Transformers', 'scikit-learn', 'OpenCV', 'Pandas', 'ONNX'],
    architectureTitle: 'NEURAL TENSOR COMPUTATION PIPELINE',
  },
  {
    id: 'research-writing',
    num: '06',
    title: 'RESEARCH IMPLEMENTATION & TECHNICAL WRITING',
    shortDesc: 'Translating academic AI papers into production code, experimental validation, and technical documentation.',
    problem: 'Academic research papers rarely provide clean, production-grade code, leaving engineering teams struggling to reproduce published results or validate novel AI architectures.',
    whatIBuild: [
      'End-to-end implementation of research papers from arXiv / IEEE',
      'Rigorous experimental replication and hyperparameter ablation studies',
      'Publication-grade LaTeX manuscripts and mathematical formulations',
      'Comprehensive technical whitepapers, architecture docs, and RFCs',
      'Empirical dataset preprocessing and synthetic augmentation pipelines',
    ],
    whatYouReceive: [
      'Clean, typed Python codebase implementing the target research paper',
      'Ablation benchmark comparison against published baselines',
      'Formatted LaTeX publication drafts or comprehensive RFC documents',
      'Reproducible synthetic or augmented benchmark evaluation sets',
    ],
    technologies: ['LaTeX', 'Overleaf', 'PyTorch', 'Google Scholar', 'IEEE Standards', 'BibTeX', 'Matplotlib'],
    architectureTitle: 'EMPIRICAL RESEARCH BENCHMARK MATRIX',
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICES_DATA[activeIdx];

  const handleSelectService = (idx: number) => {
    sound.playHover();
    setActiveIdx(idx);
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#0e1017] border-b border-[#232734]">
      {/* Perimeter Coordinates */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between font-mono text-[10px] text-[#9da4b2] tracking-widest uppercase border-b border-[#232734] pb-3 chamber-datum-bar reveal-init">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ccff00]" />
          CHAMBER 03 // STRUCTURAL DISCIPLINES &amp; COMMISSIONS
        </span>
        <span className="hidden sm:inline">6 DEPLOYABLE ENGINEERING CAPABILITIES</span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 reveal-init">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13161f] border border-white/10 font-mono text-xs text-[#ff5500] uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
            <span>COMMISSIONED DISCIPLINES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#f3f4ee] tracking-tight">
            Engineering Scopes &amp;{' '}
            <span className="italic font-serif font-normal text-[#ff5500]">
              System Capabilities
            </span>
          </h2>
          <p className="text-[#9da4b2] text-sm sm:text-base font-light mt-3 max-w-2xl">
            I don't sell speculative buzzwords. I design, build, and deliver verifiable software architectures that resolve concrete operational bottlenecks.
          </p>
        </div>

        {/* Full Architectural Folio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Discipline Selector */}
          <div className="lg:col-span-5 space-y-2.5 stagger-init">
            {SERVICES_DATA.map((srv, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <div
                  key={srv.id}
                  onClick={() => handleSelectService(idx)}
                  className={`p-5 border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#13161f] border-[#ff5500] text-[#f3f4ee]'
                      : 'bg-[#0c0d11] border-[#232734] text-[#9da4b2] hover:border-[#2d323f] hover:text-[#f3f4ee]'
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff5500]" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-xs ${
                          isSelected ? 'text-[#ff5500] font-bold' : 'text-[#9da4b2]'
                        }`}
                      >
                        {srv.num}
                      </span>
                      <div>
                        <h3
                          className={`font-display font-bold text-base sm:text-lg tracking-tight ${
                            isSelected ? 'text-[#f3f4ee]' : 'text-[#9da4b2]'
                          }`}
                        >
                          {srv.title}
                        </h3>
                        <p className="text-xs text-[#9da4b2] font-light mt-1 line-clamp-2">
                          {srv.shortDesc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-[#ff5500] translate-x-1' : 'text-[#9da4b2]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Discipline Blueprint Dossier */}
          <div className="lg:col-span-7 bg-[#13161f] border border-[#2d323f] p-6 sm:p-8 relative reveal-init">
            {/* Top Perimeter Notch */}
            <div className="flex items-center justify-between border-b border-[#232734] pb-4 mb-6 font-mono text-xs text-[#9da4b2]">
              <span className="text-[#ff5500] font-semibold tracking-wider">
                SPECIFICATION // {activeService.architectureTitle}
              </span>
              <span className="text-[#ccff00]">DISCIPLINE {activeService.num} / 06</span>
            </div>

            <div className="space-y-6">
              {/* Headline */}
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#f3f4ee] tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-sm text-[#9da4b2] mt-2 font-light leading-relaxed">
                  {activeService.shortDesc}
                </p>
              </div>

              {/* The Business Bottleneck Solved */}
              <div className="p-4 bg-[#0e1017] border border-[#232734]">
                <div className="font-mono text-[10px] text-[#ff5500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  THE OPERATIONAL BOTTLENECK
                </div>
                <p className="text-xs text-[#f3f4ee] font-sans leading-relaxed">
                  {activeService.problem}
                </p>
              </div>

              {/* Two Column Breakdown: What I Build vs What You Receive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* What I Build */}
                <div className="p-4 bg-[#0e1017] border border-[#232734]">
                  <div className="font-mono text-[10px] text-[#ccff00] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    CORE ENGINEERING SCOPE
                  </div>
                  <ul className="space-y-2 text-xs font-sans text-[#9da4b2]">
                    {activeService.whatIBuild.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#ccff00] font-mono mt-0.5">&gt;</span>
                        <span className="text-[#f3f4ee]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What You Receive */}
                <div className="p-4 bg-[#0e1017] border border-[#232734]">
                  <div className="font-mono text-[10px] text-[#ff5500] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    TANGIBLE DELIVERABLES
                  </div>
                  <ul className="space-y-2 text-xs font-sans text-[#9da4b2]">
                    {activeService.whatYouReceive.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                        <span className="text-[#f3f4ee]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Implemented */}
              <div className="pt-2">
                <div className="font-mono text-[10px] text-[#9da4b2] uppercase tracking-wider mb-2">
                  PRODUCTION STACK &amp; PROTOCOLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-[#1b1f2b] border border-[#2d323f] text-[11px] font-mono text-[#f3f4ee]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Commission Button */}
              <div className="pt-4 border-t border-[#232734] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-xs text-[#9da4b2]">
                  Scope ready for 2-week to 6-week contract sprints.
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectServiceForInquiry(activeService.title);
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-[#ff5500] hover:bg-[#e04b00] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>COMMISSION THIS DISCIPLINE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
