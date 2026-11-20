import React, { useState, useEffect, useRef } from 'react';
import { Search, Cpu, Code2, Shield, Sparkles, Layers, Server } from 'lucide-react';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';
import { ThreeOrb } from './ThreeOrb';

interface TechNode {
  name: string;
  category: 'Programming' | 'AI & ML' | 'AI Engineering' | 'Backend' | 'Frontend' | 'Infrastructure & Tools';
  runtime: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'PRODUCTION';
  specialty: string;
}

const TECH_NODES: TechNode[] = [
  // Programming
  { name: 'Python', category: 'Programming', runtime: 'v3.12+', status: 'PRODUCTION', specialty: 'AI Models, Machine Learning & Asynchronous APIs' },
  { name: 'Java', category: 'Programming', runtime: 'JDK 17+', status: 'ACTIVE', specialty: 'Object-Oriented Architecture & Automation Frameworks' },
  { name: 'TypeScript', category: 'Programming', runtime: 'v5.5+', status: 'PRODUCTION', specialty: 'Type-Safe Full-Stack Development' },
  { name: 'JavaScript', category: 'Programming', runtime: 'ESNext', status: 'PRODUCTION', specialty: 'Modern Web Runtimes & DOM Manipulation' },
  { name: 'SQL', category: 'Programming', runtime: 'ANSI SQL', status: 'PRODUCTION', specialty: 'Relational Schemas, Constraints & Query Optimization' },

  // AI & ML
  { name: 'Machine Learning', category: 'AI & ML', runtime: 'Scikit-Learn', status: 'PRODUCTION', specialty: 'Supervised/Unsupervised Algorithms, Ensemble & SVM' },
  { name: 'Deep Learning', category: 'AI & ML', runtime: 'PyTorch / TF', status: 'PRODUCTION', specialty: 'Neural Architecture Design & Tensor Computation' },
  { name: 'NLP', category: 'AI & ML', runtime: 'Hugging Face', status: 'PRODUCTION', specialty: 'Transformers, Subword Tokenization & Translation' },
  { name: 'Computer Vision', category: 'AI & ML', runtime: 'OpenCV / ViT', status: 'PRODUCTION', specialty: 'Vision Transformers, Self-Attention & Image Grading' },
  { name: 'Multimodal AI', category: 'AI & ML', runtime: 'Cross-Attention', status: 'PRODUCTION', specialty: 'Heterogeneous Fusion of Text, Audio & Image Tensors' },

  // AI Engineering
  { name: 'LangChain', category: 'AI Engineering', runtime: 'Chains & LCEL', status: 'PRODUCTION', specialty: 'Cognitive Pipelines, Prompt Templates & Tool Callers' },
  { name: 'LangGraph', category: 'AI Engineering', runtime: 'Stateful Graphs', status: 'PRODUCTION', specialty: 'Multi-Agent Cyclic Loops & Memory Checkpointing' },
  { name: 'RAG', category: 'AI Engineering', runtime: 'Hybrid Search', status: 'PRODUCTION', specialty: 'Retrieval-Augmented Generation & Cross-Encoder Rerank' },
  { name: 'Vector Databases', category: 'AI Engineering', runtime: 'Chroma / FAISS', status: 'PRODUCTION', specialty: 'Dense Cosine Similarity & Sub-50ms Embeddings' },
  { name: 'Prompt Engineering', category: 'AI Engineering', runtime: 'DSPy / Few-Shot', status: 'PRODUCTION', specialty: 'Structured JSON Schemas & Hallucination Guardrails' },
  { name: 'LLM Integration', category: 'AI Engineering', runtime: 'OpenAI / Claude', status: 'PRODUCTION', specialty: 'Low-Latency Streaming APIs & Groq Inference' },

  // Backend
  { name: 'FastAPI', category: 'Backend', runtime: 'ASGI / Uvicorn', status: 'PRODUCTION', specialty: 'High-Throughput Asynchronous REST & Streaming APIs' },
  { name: 'Flask', category: 'Backend', runtime: 'WSGI', status: 'ACTIVE', specialty: 'Lightweight Microservices & Model Serving' },
  { name: 'Django', category: 'Backend', runtime: 'DRF / ORM', status: 'ACTIVE', specialty: 'Role-Based Backends, Admin Portals & Auth' },
  { name: 'Node.js', category: 'Backend', runtime: 'V8 Engine', status: 'PRODUCTION', specialty: 'Event-Driven Services & Microservices' },

  // Frontend
  { name: 'React', category: 'Frontend', runtime: 'React 19 / Fiber', status: 'PRODUCTION', specialty: 'Component Architecture & Accessible State Systems' },
  { name: 'HTML', category: 'Frontend', runtime: 'HTML5 Semantic', status: 'PRODUCTION', specialty: 'Accessible DOM Structures & Microdata' },
  { name: 'CSS', category: 'Frontend', runtime: 'Tailwind v4 / CSS3', status: 'PRODUCTION', specialty: 'Design Systems, Fluid Layouts & GPU Shaders' },
  { name: 'TypeScript (UI)', category: 'Frontend', runtime: 'Strict TS', status: 'PRODUCTION', specialty: 'Type-Safe Reactive State & Prop Contracts' },

  // Infrastructure and Tools
  { name: 'MySQL', category: 'Infrastructure & Tools', runtime: 'InnoDB / ACID', status: 'PRODUCTION', specialty: 'Normalized Enterprise Relational Schemas' },
  { name: 'PostgreSQL', category: 'Infrastructure & Tools', runtime: 'pgvector / ACID', status: 'PRODUCTION', specialty: 'Connection-Pooled Relational & Vector Stores' },
  { name: 'Docker', category: 'Infrastructure & Tools', runtime: 'Containers', status: 'PRODUCTION', specialty: 'Multi-Stage Builds & Isolated Reproducible Stacks' },
  { name: 'Git', category: 'Infrastructure & Tools', runtime: 'VCS / GitHub', status: 'PRODUCTION', specialty: 'Continuous Integration (CI/CD) & Versioning' },
  { name: 'AWS', category: 'Infrastructure & Tools', runtime: 'EC2 / S3 / Lambda', status: 'ACTIVE', specialty: 'Cloud Compute, Object Storage & Deployments' },
];

export const TechEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeNode, setActiveNode] = useState<TechNode>(TECH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.tech-header',
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

      // 2. 3D Orb Card slides from left
      gsap.fromTo(
        '.tech-orb-card',
        { opacity: 0, x: -30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.tech-orb-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Staggered Tech Nodes Grid
      gsap.fromTo(
        '.tech-node-card',
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.6,
          ease: EASINGS.smooth,
          scrollTrigger: {
            trigger: '.tech-nodes-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory, searchQuery]);

  const categories = [
    'All',
    'AI Engineering',
    'AI & ML',
    'Programming',
    'Backend',
    'Frontend',
    'Infrastructure & Tools',
  ];

  const filteredNodes = TECH_NODES.filter((node) => {
    const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    if (category.includes('AI Engineering')) return <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />;
    if (category.includes('AI & ML')) return <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />;
    if (category.includes('Programming')) return <Code2 className="w-3.5 h-3.5 text-[#FF5722]" />;
    if (category.includes('Backend')) return <Server className="w-3.5 h-3.5 text-[#7C3AED]" />;
    if (category.includes('Frontend')) return <Layers className="w-3.5 h-3.5 text-[#FF5722]" />;
    return <Shield className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <section
      id="laboratory"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Folioblox Header */}
        <div className="tech-header flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5722] mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>• 3D TECH CORE &amp; CAPABILITIES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.05]">
              Tech Stack &amp;{' '}
              <span className="italic font-serif font-normal text-[#FF5722]">
                3D Core
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal mt-3 max-w-xl leading-relaxed">
              Explore production tools, frameworks, and deep learning algorithms verified in real-world systems. Spin the interactive 3D WebGL neural orb to inspect active nodes.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack matrix..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Orb & Interactive Node Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D WebGL Neural Orb */}
          <div className="tech-orb-card lg:col-span-5 bg-white border border-slate-200 rounded-[28px] p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono text-[11px] text-slate-500 mb-2">
              <span className="text-[#FF5722] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                <span>3D NEURAL POINT-CLOUD ORB</span>
              </span>
              <span className="text-slate-400 text-[10px]">CLICK &amp; DRAG TO SPIN</span>
            </div>

            {/* Embedded Three.js 3D Orb */}
            <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-inner">
              <ThreeOrb />
            </div>

            {/* Selected Node Telemetry */}
            <div className="mt-4 p-4 rounded-[16px] bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="uppercase tracking-wider font-semibold">SELECTED NODE</span>
                <span className="text-[#FF5722] font-bold">{activeNode.status}</span>
              </div>
              <div className="text-slate-900 font-display font-bold text-base">{activeNode.name}</div>
              <p className="text-slate-600 text-xs leading-relaxed font-normal">{activeNode.specialty}</p>
            </div>
          </div>

          {/* Right Column: Interactive Node Grid */}
          <div className="tech-nodes-grid lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isActive = activeNode.name === node.name;

              return (
                <div
                  key={node.name}
                  onClick={() => {
                    sound.playClick();
                    setActiveNode(node);
                  }}
                  className={`tech-node-card p-4 rounded-[18px] border transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isActive
                      ? 'bg-orange-50 border-[#FF5722] text-slate-900 shadow-md'
                      : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
                        {getCategoryIcon(node.category)}
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                    </div>

                    <div className="font-display font-bold text-sm text-slate-900">
                      {node.name}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{node.category.split(' ')[0]}</span>
                    <span className="text-[#FF5722] font-semibold">{node.runtime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
