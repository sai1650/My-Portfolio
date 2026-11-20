import type { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'ai-agents-rag',
    number: '01',
    title: 'AI Agents & RAG Systems',
    tagline: 'Autonomous cognitive architectures and enterprise knowledge engines',
    description: 'I design and deploy resilient autonomous AI agents and Retrieval-Augmented Generation (RAG) pipelines that can reason, plan, use external tools via MCP, and access proprietary vector stores with sub-second accuracy.',
    capabilities: [
      'Multi-agent orchestration using LangGraph, LangChain, and CrewAI',
      'Production RAG with hybrid dense-sparse search, contextual reranking, and metadata filtering',
      'Model Context Protocol (MCP) tool integrations and custom server creation',
      'Vector database architecture (ChromaDB, FAISS, Pinecone, pgvector)',
      'Autonomous browser agents and API execution loops with self-reflection',
      'Guardrails, hallucination detection, and structured schema enforcement'
    ],
    technologies: ['LangChain', 'LangGraph', 'LlamaIndex', 'ChromaDB', 'FAISS', 'FastAPI', 'MCP', 'Ollama'],
    highlight: 'Production-ready agents with deterministic safety guardrails & latency optimization',
    iconName: 'Bot'
  },
  {
    id: 'full-stack-engineering',
    number: '02',
    title: 'Full-Stack Engineering',
    tagline: 'High-performance web applications built for speed, scale, and luxury aesthetics',
    description: 'From rock-solid backend services to fluid, reactive frontend interfaces, I build production-grade web systems from day zero to deployment with clean architecture and strict typing.',
    capabilities: [
      'Modern reactive frontends in React 19, Next.js, and TypeScript with Tailwind CSS',
      'High-throughput asynchronous backends using Python (FastAPI, Django) and Node.js',
      'Relational and document database modeling with PostgreSQL, MySQL, and Redis caching',
      'Robust RESTful and GraphQL APIs with OAuth2, JWT authentication, and rate limiting',
      'Containerized infrastructure with Docker and automated CI/CD deployments'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'FastAPI', 'Python', 'Node.js', 'PostgreSQL', 'Docker'],
    highlight: 'Clean architecture, sub-second responses, and pixel-perfect responsive execution',
    iconName: 'Layers'
  },
  {
    id: 'generative-ai-solutions',
    number: '03',
    title: 'Generative AI Solutions',
    tagline: 'Bespoke LLM integrations, document intelligence, and cognitive workflow automation',
    description: 'Transforming foundational models from OpenAI, Anthropic, and Groq into high-value business engines. I build custom copilots, intelligent document processing pipelines, and AI workflows tailored to your proprietary data.',
    capabilities: [
      'Enterprise API integrations across OpenAI GPT-4o, Claude 3.5 Sonnet, and ultra-fast Groq Llama 3',
      'Intelligent document extraction (PDF, DOCX, scans) with optical layout grounding',
      'Conversational AI chatbots with persistent memory and state management',
      'Prompt engineering frameworks, few-shot prompting, and evaluation harnesses',
      'Cost and token optimization reducing API expenditure by up to 60%'
    ],
    technologies: ['OpenAI API', 'Anthropic Claude', 'Groq', 'DSPy', 'Whisper', 'JSON Mode', 'Token Optimization'],
    highlight: 'Enterprise privacy, zero data leaks, and aggressive latency/cost reduction',
    iconName: 'Sparkles'
  },
  {
    id: 'machine-learning-deep-learning',
    number: '04',
    title: 'Machine Learning & Deep Learning',
    tagline: 'Predictive intelligence, computer vision, and transformer model training',
    description: 'Building custom machine learning models and deep neural architectures that extract actionable signals from complex tabular, visual, and sequential data.',
    capabilities: [
      'Predictive machine learning pipelines (Random Forests, Gradient Boosting, SVMs, Ensemble models)',
      'Computer Vision systems with CNNs, YOLO, and Vision Transformers (ViT)',
      'Natural Language Processing pipelines with fine-tuned Hugging Face Transformers',
      'Data preparation, synthetic augmentation, class balancing, and feature selection',
      'Model quantization, ONNX conversion, and low-latency edge deployment'
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'OpenCV', 'Pandas', 'NumPy'],
    highlight: 'Rigorous mathematical evaluation and robust cross-validation standards',
    iconName: 'Brain'
  },
  {
    id: 'research-technical-writing',
    number: '05',
    title: 'Research & Technical Writing',
    tagline: 'Scholarly paper development assistance, literature synthesis, and scientific writing',
    description: 'Empowering academic researchers and R&D teams with comprehensive research assistance, literature mapping, empirical evaluation benchmarks, and publication-ready manuscript formatting.',
    capabilities: [
      'Systematic literature review synthesis and state-of-the-art methodology benchmarking',
      'Experimental design, evaluation metrics computation, and statistical significance testing',
      'Conference and journal paper preparation assistance (IEEE, Springer, Elsevier formats)',
      'Publication-grade LaTeX manuscript formatting, Overleaf collaboration, and high-DPI vector diagrams',
      'Comprehensive technical documentation and open-source project architecture whitepapers'
    ],
    technologies: ['LaTeX', 'Overleaf', 'Google Scholar', 'IEEE Formatting', 'BibTeX', 'Matplotlib', 'Statistical Analysis'],
    highlight: 'Ethical scholarly assistance upholding academic integrity without guaranteed outcomes',
    iconName: 'BookOpen'
  },
  {
    id: 'qa-software-automation',
    number: '06',
    title: 'Automation & Software Testing',
    tagline: 'Resilient end-to-end test suites and intelligent browser automation',
    description: 'Eliminate manual QA bottlenecks. I engineer scalable automated testing frameworks that protect your production code against silent regressions and edge-case failures.',
    capabilities: [
      'Cross-browser end-to-end automation with Playwright and modern TypeScript',
      'Enterprise Selenium test automation suites with Java and Page Object Model (POM)',
      'Automated REST API functional and contract testing with Postman, Pytest, and Newman',
      'Continuous integration test pipelines integrated directly into GitHub Actions',
      'AI-assisted test generation and self-healing selector strategies'
    ],
    technologies: ['Playwright', 'Selenium', 'Java', 'Pytest', 'TypeScript', 'GitHub Actions', 'Postman'],
    highlight: 'Zero flaky tests, fast parallel execution, and automated regression shields',
    iconName: 'CheckCircle2'
  }
];
