import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Bot, Database, Layers, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

interface ProductShowcase3DProps {
  onSelectArchitecture: (title: string) => void;
}

type ShowcaseMode = 'agents' | 'rag' | 'fullstack';

interface DemoStage {
  step: string;
  name: string;
  headline: string;
  technicalDetails: string;
  telemetry: string;
}

const AGENT_STAGES: DemoStage[] = [
  {
    step: '01',
    name: 'User Request',
    headline: 'Natural Language Task Ingestion',
    technicalDetails: 'User provides an open-ended goal. The request is sanitized, tokenized, and passed to the LangGraph supervisor node with conversation memory context.',
    telemetry: 'LATENCY: 12ms // TOKEN_COUNT: 142 // STATUS: RECEIVED',
  },
  {
    step: '02',
    name: 'Agent Reasoning',
    headline: 'Cognitive Decomposition & Routing',
    technicalDetails: 'The supervisory agent executes a chain-of-thought reflection step, breaking the prompt into atomic sub-tasks and determining necessary tool calls.',
    telemetry: 'CYCLE: 1/3 // PLAN: [VECTOR_SEARCH, CODE_EXEC] // MODEL: CLAUDE_3.5_SONNET',
  },
  {
    step: '03',
    name: 'Tool Selection',
    headline: 'Model Context Protocol (MCP) Bridge',
    technicalDetails: 'Autonomous matching against registered MCP servers. The agent dynamically binds tool parameters against strictly validated Pydantic JSON schemas.',
    telemetry: 'MCP_TARGET: postgres_query_tool // PARAMS_VALID: 100% // STATUS: BOUND',
  },
  {
    step: '04',
    name: 'Execution',
    headline: 'Isolated Sandbox & Remote API Execution',
    technicalDetails: 'The selected tool executes asynchronously within a secure environment, capturing raw results, stdout, and error codes without blocking the orchestrator.',
    telemetry: 'SANDBOX_ID: worker-node-04 // EXEC_TIME: 44ms // CODE: 0_OK',
  },
  {
    step: '05',
    name: 'Result & Verification',
    headline: 'Deterministic Schema Evaluation',
    technicalDetails: 'The agent reviews tool output against hallucination guardrails, formats a structured response, and commits final checkpoint state to Redis memory.',
    telemetry: 'VERIFICATION: PASSED // CITATION_PROVENANCE: 1.00 // DISPATCH: COMPLETE',
  },
];

const RAG_STAGES: DemoStage[] = [
  {
    step: '01',
    name: 'Document Upload',
    headline: 'Heterogeneous Corpus Ingestion',
    technicalDetails: 'Unstructured technical documentation, PDFs, and database dumps are ingested via automated scrapers with metadata extraction.',
    telemetry: 'FILE_TYPES: [.pdf, .md, .sql] // BATCH_SIZE: 1.2MB // OCR: ACTIVE',
  },
  {
    step: '02',
    name: 'Semantic Chunking',
    headline: 'Context-Aware Sliding Window',
    technicalDetails: 'Documents are partitioned into overlapping 512-token semantic segments preserving sentence boundaries, headers, and code blocks.',
    telemetry: 'CHUNKS_GENERATED: 284 // OVERLAP: 64_TOKENS // DENSITY: OPTIMIZED',
  },
  {
    step: '03',
    name: 'Embeddings Generation',
    headline: 'High-Dimensional Vector Projection',
    technicalDetails: 'Text chunks are processed through transformer embedding backbones, producing 1536-dimensional dense vectors with cosine normalized vectors.',
    telemetry: 'DIMENSIONS: 1536 // BATCH_LATENCY: 85ms // GPU_CORE: CUDA_FP16',
  },
  {
    step: '04',
    name: 'Vector Retrieval',
    headline: 'Hybrid Dense + Sparse Search',
    technicalDetails: 'Reciprocal Rank Fusion (RRF) combines dense ChromaDB/FAISS vector similarity with sparse BM25 keyword matching and cross-encoder reranking.',
    telemetry: 'TOP_K: 5 // SIMILARITY_THRESHOLD: 0.88 // RERANK_SCORE: 0.94',
  },
  {
    step: '05',
    name: 'LLM Synthesis',
    headline: 'Contextual Grounding & In-Context Learning',
    technicalDetails: 'Retrieved verified chunks are injected into the LLM system prompt alongside strict negative-constraint directives to prevent fabrication.',
    telemetry: 'PROMPT_TOKENS: 1,840 // HALLUCINATION_RISK: ZERO // STREAM: ACTIVE',
  },
  {
    step: '06',
    name: 'Citation Response',
    headline: 'Attributed Factual Response Output',
    technicalDetails: 'The user receives an accurate, low-latency synthesized response with exact footnote references linked to original source documents.',
    telemetry: 'TOTAL_LATENCY: 38ms // CITATIONS: [DOC_04_P12, SPEC_02] // VERIFIED',
  },
];

const FULLSTACK_STAGES: DemoStage[] = [
  {
    step: '01',
    name: 'Client Interface',
    headline: 'Type-Safe React 19 Frontend',
    technicalDetails: 'User triggers an action on a responsive React application built with TypeScript, Tailwind CSS, and TanStack query for optimistic state updates.',
    telemetry: 'CLIENT_PAYLOAD: JSON // TLS: v1.3 // EDGE_NODE: BANGALORE_IN',
  },
  {
    step: '02',
    name: 'API Gateway',
    headline: 'High-Throughput Asynchronous FastAPI',
    technicalDetails: 'Incoming requests pass through rate limiters, JWT validation, and Pydantic request models in under 4ms before reaching service logic.',
    telemetry: 'AUTH: JWT_HS256 // RATE_LIMIT: 120req/min // OVERHEAD: 3.2ms',
  },
  {
    step: '03',
    name: 'Business Logic',
    headline: 'Decoupled Microservice Domain Workers',
    technicalDetails: 'Core business domain logic processes transactions with idempotent key verification, caching intermediate query payloads in Redis.',
    telemetry: 'WORKER_POOL: 8 // CACHE_HIT_RATIO: 94.2% // WORKFLOW: RUNNING',
  },
  {
    step: '04',
    name: 'Database Engine',
    headline: 'PostgreSQL Relational Storage & pgvector',
    technicalDetails: 'ACID transactions execute against indexed PostgreSQL tables with connection pooling, structured migrations, and sub-10ms query execution.',
    telemetry: 'POOL_CONNECTIONS: 20/50 // IOPS: 4,200 // TRANS_STATE: COMMITTED',
  },
];

export const ProductShowcase3D: React.FC<ProductShowcase3DProps> = ({ onSelectArchitecture }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeMode, setActiveMode] = useState<ShowcaseMode>('agents');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const stages = activeMode === 'agents' ? AGENT_STAGES : activeMode === 'rag' ? RAG_STAGES : FULLSTACK_STAGES;
  const currentStage = stages[currentStepIdx] || stages[0];

  const handleSelectStep = (idx: number) => {
    sound.playHover();
    setCurrentStepIdx(idx);
  };

  const handleNextStep = () => {
    sound.playClick();
    setCurrentStepIdx((prev) => (prev + 1) % stages.length);
  };

  // Three.js Interactive Architecture Visualizer
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xff5500, 3.5, 20);
    orangeLight.position.set(4, 5, 4);
    scene.add(orangeLight);

    const limeLight = new THREE.PointLight(0xccff00, 2.8, 20);
    limeLight.position.set(-4, -2, 3);
    scene.add(limeLight);

    const topLight = new THREE.DirectionalLight(0xf3f4ee, 1.2);
    topLight.position.set(0, 8, 3);
    scene.add(topLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Architectural Materials
    const titaniumDark = new THREE.MeshStandardMaterial({
      color: 0x13161f,
      metalness: 0.85,
      roughness: 0.3,
      flatShading: true,
    });

    const steelBeam = new THREE.MeshStandardMaterial({
      color: 0x232734,
      metalness: 0.7,
      roughness: 0.4,
      flatShading: true,
    });

    const laserOrange = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.9,
    });

    const laserLime = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.85,
    });

    // Model Generators
    const buildAgentModel = (group: THREE.Group) => {
      const coreGeo = new THREE.BoxGeometry(1.2, 1.8, 1.2);
      const coreMesh = new THREE.Mesh(coreGeo, titaniumDark);
      group.add(coreMesh);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.5, 1.55, 32),
        laserOrange
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      const satelliteCount = 4;
      for (let i = 0; i < satelliteCount; i++) {
        const satGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
        const satMesh = new THREE.Mesh(satGeo, steelBeam);
        const angle = (i * Math.PI * 2) / satelliteCount;
        const radius = 2.4;
        satMesh.position.set(Math.cos(angle) * radius, i % 2 === 0 ? 0.5 : -0.5, Math.sin(angle) * radius);
        satMesh.rotation.y = -angle;

        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(0.47, 0.05, 0.47),
          i % 2 === 0 ? laserOrange : laserLime
        );
        satMesh.add(cap);
        group.add(satMesh);

        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          satMesh.position,
        ]);
        const line = new THREE.Line(
          lineGeo,
          new THREE.LineBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.4 })
        );
        group.add(line);
      }
    };

    const buildRagModel = (group: THREE.Group) => {
      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const slabGeo = new THREE.CylinderGeometry(1.6 - i * 0.15, 1.6 - i * 0.15, 0.12, 6);
        const slab = new THREE.Mesh(slabGeo, i % 2 === 0 ? titaniumDark : steelBeam);
        slab.position.y = (i - 2) * 0.55;
        group.add(slab);

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.7 - i * 0.15, 1.73 - i * 0.15, 6),
          i === 2 ? laserOrange : laserLime
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = slab.position.y + 0.07;
        group.add(ring);
      }

      // Vertical central conduit
      const conduit = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 3.2, 16),
        laserOrange
      );
      group.add(conduit);
    };

    const buildFullStackModel = (group: THREE.Group) => {
      const tiers = [
        { name: 'CLIENT', y: 1.2, color: laserOrange },
        { name: 'GATEWAY', y: 0.3, color: laserLime },
        { name: 'DATABASE', y: -0.6, color: laserOrange },
      ];

      tiers.forEach((tier) => {
        const platGeo = new THREE.BoxGeometry(2.4, 0.15, 2.4);
        const plat = new THREE.Mesh(platGeo, titaniumDark);
        plat.position.y = tier.y;
        group.add(plat);

        const rimGeo = new THREE.BoxGeometry(2.44, 0.04, 2.44);
        const rim = new THREE.Mesh(rimGeo, tier.color);
        rim.position.y = tier.y + 0.08;
        group.add(rim);
      });
    };

    const reconstruct = () => {
      while (rootGroup.children.length > 0) {
        rootGroup.remove(rootGroup.children[0]);
      }
      if (activeMode === 'agents') buildAgentModel(rootGroup);
      else if (activeMode === 'rag') buildRagModel(rootGroup);
      else buildFullStackModel(rootGroup);
    };

    reconstruct();

    // Mouse drag rotation
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPos.x;
      const deltaY = e.clientY - prevPos.y;
      dragVelocity.x = deltaX * 0.005;
      dragVelocity.y = deltaY * 0.005;
      rootGroup.rotation.y += dragVelocity.x;
      rootGroup.rotation.x += dragVelocity.y;
      prevPos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let animId: number = 0;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        rootGroup.rotation.y += 0.003 + dragVelocity.x;
        rootGroup.rotation.x += 0.0008 + dragVelocity.y;
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
      }
      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause WebGL rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      if (isVisible) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animId) {
        cancelAnimationFrame(animId);
      }
      observer.disconnect();
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode]);

  // GSAP ScrollTrigger for 3D Showcase Section
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.showcase-header',
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

      // 2. 3D Canvas Box slides up from left
      gsap.fromTo(
        '.showcase-canvas-card',
        { opacity: 0, x: -30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.showcase-canvas-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Pipeline Stepper slides up from right
      gsap.fromTo(
        '.showcase-stepper-card',
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.showcase-stepper-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Folioblox Clean Section Header */}
        <div className="showcase-header flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5722] mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>• 3D INTERACTIVE SIMULATION</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.05]">
              Real-Time Architecture in{' '}
              <span className="italic font-serif font-normal text-[#FF5722]">
                3D
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal mt-3 max-w-xl leading-relaxed">
              Drag to rotate the live WebGL 3D structure. Inspect neural agent loops, hybrid RAG embeddings, and production-grade microservices in real time.
            </p>
          </div>

          {/* Mode Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('agents');
                setCurrentStepIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'agents'
                  ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI AGENTS 3D</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('rag');
                setCurrentStepIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'rag'
                  ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>RAG PIPELINE 3D</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('fullstack');
                setCurrentStepIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'fullstack'
                  ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>FULL-STACK</span>
            </button>
          </div>
        </div>

        {/* 3D Simulation Canvas & Stepper Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Canvas */}
          <div className="showcase-canvas-card lg:col-span-6 bg-white border border-slate-200 rounded-[28px] p-5 sm:p-7 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono text-[11px] text-slate-500 mb-3">
              <div className="flex items-center gap-2 text-[#FF5722]">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                <span className="font-semibold">3D SIMULATION ACTIVE // STAGE {currentStage.step} OF {stages.length}</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">CLICK &amp; DRAG TO ROTATE 3D</span>
            </div>

            <div
              ref={mountRef}
              className="w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing bg-gradient-to-br from-slate-100 to-slate-200 rounded-[20px] border border-slate-200 overflow-hidden"
              title="Click and drag to rotate the 3D model"
            />

            {/* Live Telemetry Bar */}
            <div className="p-3.5 bg-slate-50 rounded-[16px] border border-slate-200 font-mono text-xs mt-3">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>REAL-TIME SYSTEM METRICS</span>
                <span className="text-[#FF5722] font-semibold">OPTIMIZED</span>
              </div>
              <div className="text-slate-800 text-xs font-mono">{currentStage.telemetry}</div>
            </div>
          </div>

          {/* Right Column: Execution Stepper & Blueprint */}
          <div className="showcase-stepper-card lg:col-span-6 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between font-mono text-xs border-b border-slate-100 pb-3">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">
                EXECUTION PIPELINE STEPPER
              </span>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-1.5 text-[#FF5722] hover:text-[#ff6838] font-bold cursor-pointer"
              >
                <span>NEXT STAGE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {stages.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-3 rounded-[16px] text-left border transition-all cursor-pointer ${
                    currentStepIdx === idx
                      ? 'bg-orange-50 border-[#FF5722] text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="font-mono text-[10px] text-[#FF5722] font-bold">{st.step}</div>
                  <div className="text-xs font-display font-bold truncate mt-0.5">{st.name}</div>
                </button>
              ))}
            </div>

            {/* Active Stage Detail */}
            <div className="p-5 bg-slate-50 rounded-[20px] border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#FF5722] font-semibold">STAGE {currentStage.step} // {currentStage.name}</span>
                <span className="text-slate-400 text-[10px]">INSPECTION ACTIVE</span>
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">
                {currentStage.headline}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {currentStage.technicalDetails}
              </p>
            </div>

            {/* Commission Architecture Button */}
            <button
              onClick={() => {
                sound.playClick();
                onSelectArchitecture(
                  activeMode === 'agents'
                    ? 'AI Agent Environment'
                    : activeMode === 'rag'
                    ? 'RAG Knowledge System'
                    : 'Full-Stack Application Architecture'
                );
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#FF5722] hover:bg-[#ff6838] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-[0_10px_25px_rgba(255,87,34,0.35)] group"
            >
              <span>Commission This Architecture</span>
              <div className="w-6 h-6 rounded-full bg-white text-[#FF5722] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
