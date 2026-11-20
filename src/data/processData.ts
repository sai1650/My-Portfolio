import type { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategic Alignment',
    duration: 'Phase 1',
    description: 'We explore your vision, business objectives, target users, and technical constraints. Through detailed technical questioning, we pinpoint potential bottlenecks early and define quantifiable success metrics.',
    deliverables: [
      'Technical requirements document (PRD)',
      'Feasibility evaluation & LLM cost modeling',
      'High-level system architecture outline',
      'Milestone timeline & delivery scope'
    ],
    clientRole: 'Share product vision, data samples, and priority objectives'
  },
  {
    number: '02',
    title: 'Research, Architecture & Prototyping',
    duration: 'Phase 2',
    description: 'I design the data flow, database schemas, model selection strategy (e.g., local vs cloud LLMs), and API contracts. A fast interactive spike or proof-of-concept is built to de-risk core algorithms.',
    deliverables: [
      'Interactive architecture diagram & API spec',
      'Vector indexing & schema definitions',
      'Algorithm benchmark & latency verification',
      'Figma wireframes / UI design tokens (if applicable)'
    ],
    clientRole: 'Review architecture blueprint and approve milestone deliverables'
  },
  {
    number: '03',
    title: 'Design & Agile Development',
    duration: 'Phase 3',
    description: 'Production-grade engineering using modular, clean code. Iterative weekly sprints with continuous staging environments so you can touch and test the working product as it evolves.',
    deliverables: [
      'Modular TypeScript frontend with Tailwind CSS',
      'Async FastAPI / Node.js backend services',
      'LangGraph multi-agent & RAG orchestration logic',
      'Weekly staging preview deployments'
    ],
    clientRole: 'Weekly sync or asynchronous review on staging previews'
  },
  {
    number: '04',
    title: 'Testing, Hardening & Optimization',
    duration: 'Phase 4',
    description: 'Comprehensive QA across unit, integration, and E2E test suites with Playwright. Rigorous LLM safety audits, hallucination evaluations, prompt stress-testing, and latency profiling.',
    deliverables: [
      'Automated Playwright regression test suite',
      'API load testing & latency audit reports',
      'LLM output guardrails and schema validation',
      'Cross-device responsive visual verification'
    ],
    clientRole: 'User acceptance testing (UAT) and feedback logging'
  },
  {
    number: '05',
    title: 'Deployment, Handover & Documentation',
    duration: 'Phase 5',
    description: 'Production deployment with zero downtime via Docker, cloud platforms (AWS, Vercel, Railway), full source code repository handover, clear READMEs, and optional post-launch support.',
    deliverables: [
      'Production deployment with SSL & monitoring',
      'Full source code repository & IP ownership transfer',
      'Comprehensive developer documentation & API guides',
      'Walkthrough video & 30-day post-launch warranty support'
    ],
    clientRole: 'Receive full ownership, deployment credentials, and enjoy launch!'
  }
];
