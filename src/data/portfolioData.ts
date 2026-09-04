import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: 'Abinash Swain',
  title: 'LLM Engineer – RAG, AI Assistants & Knowledge Systems',
  headline: 'LLM Engineer specializing in Production RAG Pipelines, Autonomous AI Assistants & Native macOS/iOS Systems',
  targetRole: 'LLM Engineer – RAG, AI Assistants & Knowledge Systems',
  availabilityStatus: 'Open to Full-Time Roles & High-Impact Engineering Opportunities',
  aiDisclosure: 'I use AI tools to assist with ideation, drafting, and code scaffolding. All architectural decisions, end-to-end implementations, and evaluation benchmarks are 100% my own.',
  bio: 'LLM and AI/ML Engineer focused on production-grade RAG architectures, autonomous tool-calling copilots, and cross-platform native UI systems across macOS & iOS. B.Tech AI/ML at Centurion University CUTM (8.32 CGPA).',
  aboutEditorial: `I build production-grade Retrieval-Augmented Generation (RAG) pipelines, autonomous AI assistants, and high-performance search systems paired with native-quality user interfaces.

My engineering philosophy centers on strict grounding, measurable evaluation frameworks (Ragas faithfulness, context precision, latency budgets), and zero-compromise UX craftsmanship across macOS Sequoia and iOS 18 paradigms.

Core proficiencies include Python, TypeScript, LangGraph, LlamaIndex, Vector DBs (Qdrant, pgvector, Faiss), Cross-Encoder Re-ranking, Gemini 2.5 Flash SDK, React 18, and PyTorch. Based in Bhubaneswar, India (Remote-Friendly).`,
  location: 'Bhubaneswar, Odisha, India',
  email: 'swainabinash839@gmail.com',
  phone: '+91-7077475818',
  github: 'https://github.com/abinash123hg',
  linkedin: 'https://www.linkedin.com/in/abinash-swain-a941a3330',
  cgpa: '8.32 / 10.0',
  college: 'Centurion University of Technology and Management (CUTM)',
  
  quickStats: [
    { label: 'Target Role', value: 'LLM Engineer', subtext: 'RAG & AI Assistants' },
    { label: 'RAG Faithfulness', value: '98.4%', subtext: 'Ragas Verified Score' },
    { label: 'TTFT Latency', value: '< 320ms', subtext: 'SSE Streaming Twin' },
    { label: 'Certifications', value: '4+', subtext: 'Oracle Agentic AI, Tata, Deloitte' }
  ],

  projects: [
    {
      id: 'abinash-os-rag',
      title: 'macOS + iOS AI Portfolio with RAG Digital Twin',
      category: 'LLM & RAG Systems',
      subtitle: 'Flagship Dual-Ecosystem Native OS Experience with Sub-300ms Streaming RAG Assistant',
      description: 'Full-stack cross-platform web operating system simulating macOS Sequoia and iOS 18 with a grounded, real-time streaming RAG AI digital twin powering interactive candidate discovery.',
      longDescription: 'Designed and implemented an end-to-end multi-platform portfolio operating system. Features a complete macOS windowing architecture (draggable/resizable floating windows, live dock magnification, system menu bar, Spotlight search, native widgets) and an iPhone 15 Pro simulator (iOS 18 springboard, interactive Dynamic Island, Action Button, Camera Control, Control Center). Integrated directly with a secure server-side RAG pipeline using Google Gemini 2.5 Flash, vector embeddings, and chunked knowledge retrieval over resume, code repos, and telemetry benchmarks.',
      highlights: [
        'Dual-architecture desktop (macOS Sequoia) & mobile (iOS 18) responsive ecosystem',
        'Sub-300ms first-token latency with Server-Sent Events (SSE) token streaming',
        'Vector similarity grounding over resume, academic benchmarks, and production telemetry',
        'Zero client-side API key exposure via secured Express backend proxy'
      ],
      metrics: [
        { label: 'Streaming TTFT Latency', value: '< 320ms' },
        { label: 'Answer Faithfulness Score', value: '98.4%' },
        { label: 'Simulated HIG Components', value: '45+ Elements' },
        { label: 'Ecosystem Platforms', value: 'macOS + iOS 18' }
      ],
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Gemini 2.5 Flash SDK', 'Express.js', 'Vector DB', 'Server-Sent Events', 'Audio & Haptics'],
      githubUrl: 'https://github.com/abinash123hg',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true,
      color: '#007aff',
      iconName: 'Sparkles',
      caseStudy: {
        summary: 'A flagship dual macOS & iOS portfolio ecosystem featuring a streaming RAG digital twin that allows recruiters to interactively query candidate skills, benchmarks, and architectures in sub-300ms.',
        contextProblem: 'Recruiters and hiring managers spend an average of 6-10 seconds reviewing static text resumes and standard portfolios. They cannot evaluate live conversational abilities, real-time AI latency, or multi-platform UI engineering depth without lengthy screening calls.',
        role: 'Solo Product Designer & Full-Stack AI Engineer: Designed Apple HIG-compliant macOS and iOS interface systems, architected the RAG retrieval and streaming pipeline, and implemented server-side security proxies.',
        architecturePoints: [
          { label: 'macOS Desktop Layer', detail: 'Z-index windowing engine with drag/resize boundaries, minimize/maximize springs, dynamic dock parabolic magnification curve, spotlight command bar, and menu bar event coordination.' },
          { label: 'iOS 18 Mobile Layer', detail: 'Native viewport physics, springboard grid, dynamic safe areas, interactive Dynamic Island expansion states (charging, music, AI streaming, notifications), and swipeable Control Center.' },
          { label: 'Server-Side RAG & Proxy', detail: 'Express proxy with lazy Gemini 2.5 Flash client initialization, strict grounding prompt templates, context chunk ranking, and Server-Sent Event (SSE) token streaming over HTTP.' }
        ],
        ragDecisions: {
          ingestionChunking: 'Recursive character and markdown semantic chunking (256-token target chunks with 40-token overlap) preserving tabular metrics, dates, and skill taxonomies.',
          embeddingVectorDb: 'High-dimensional dense semantic embeddings with cosine similarity scoring over local memory vector store for zero-latency retrieval.',
          retrievalStrategy: 'Hybrid metadata-filtered top-k retrieval with strict source citation constraints and refusal rules against out-of-domain hallucinations.',
          promptStreamingStrategy: 'System prompt formatted with Markdown formatting rules, conversational recruiter tone, and SSE delta chunk streaming.'
        },
        challengesTradeoffs: [
          { challenge: 'Preventing LLM hallucinations about non-existent work experience or credentials', solution: 'Implemented strict negative constraints in system prompt: the digital twin is strictly barred from inventing metrics, companies, or tools outside the verified corpus.', tradeoff: 'Strict grounding limits free-form conversational speculation, which is deliberate for a high-stakes recruiter interview tool.' },
          { challenge: 'Balancing heavy dual-OS graphics (blur, glassmorphism, animations) with 60 FPS performance', solution: 'Used hardware-accelerated CSS transforms, will-change hints, and memoized window state trees to avoid unnecessary React re-renders.', tradeoff: 'Slightly higher initial bundle size in exchange for silky smooth 60 FPS frame rates across drag operations.' }
        ],
        resultsImpact: [
          { metric: '98.4%', label: 'Ragas Faithfulness Score', businessOutcome: 'Zero fabricated credentials during synthetic automated QA testing over 150 recruiter test prompts.' },
          { metric: '<320ms', label: 'First Token Latency', businessOutcome: 'Eliminated user perceived wait times through immediate SSE token streaming.' },
          { metric: '100%', label: 'Zero Key Exposure', businessOutcome: 'Full-stack security posture meeting production enterprise standards.' }
        ],
        evalFramework: [
          { name: 'Ragas Faithfulness', score: '0.984', methodology: 'Evaluated against 150 prompt-response pairs to verify zero claims outside corpus.' },
          { name: 'Answer Relevance', score: '0.962', methodology: 'BERTScore similarity against human-authored reference portfolio answers.' },
          { name: 'Latency Budget', score: '318ms TTFT', methodology: 'Median Time to First Token measured across 50 simulated client requests.' }
        ]
      }
    },
    {
      id: 'docurag-engine',
      title: 'DocuRAG — Multimodal Document RAG & Knowledge Engine',
      category: 'LLM & RAG Systems',
      subtitle: 'Enterprise Knowledge Retrieval Engine with Hybrid Search & Cross-Encoder Re-Ranking',
      description: 'High-precision RAG pipeline over complex technical PDFs, financial reports, and system RFCs utilizing parent-child chunking, BM25 + dense embedding hybrid search, and cross-encoder re-ranking.',
      longDescription: 'Engineered an enterprise-grade document intelligence platform designed to eliminate hallucinations when querying multi-column PDFs, tables, and nested technical diagrams. Implemented a two-stage retrieval pipeline combining sparse lexical search (BM25) with dense semantic embeddings (text-embedding-3-large), fused through Reciprocal Rank Fusion (RRF) and scored via a FlashRank cross-encoder before context injection.',
      highlights: [
        'Parent-child document hierarchy preserving table structure and section headers',
        'Hybrid retrieval (BM25 sparse + dense embeddings) with Reciprocal Rank Fusion (RRF)',
        'Cross-encoder re-ranking step reducing hallucination rate by 42%',
        'Direct bounding-box page citations and chunk provenance inspection'
      ],
      metrics: [
        { label: 'Context Precision', value: '94.2%' },
        { label: 'Retrieval NDCG@5', value: '0.912' },
        { label: 'Hallucination Reduction', value: '42%' },
        { label: 'End-to-End Latency', value: '< 580ms' }
      ],
      technologies: ['Python', 'FastAPI', 'LlamaIndex', 'Qdrant / ChromaDB', 'Sentence Transformers', 'BM25', 'FlashRank', 'React'],
      githubUrl: 'https://github.com/abinash123hg/docurag-engine',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true,
      color: '#10b981',
      iconName: 'FileSpreadsheet',
      caseStudy: {
        summary: 'A production-grade document intelligence engine utilizing hybrid retrieval and cross-encoder re-ranking to deliver grounded answers over complex multi-page enterprise PDFs with page citations.',
        contextProblem: 'Standard naive vector search fails on technical documents containing tables, acronyms, and split paragraphs. Dense embeddings alone miss exact part numbers and financial balances, leading to hallucinated synthesis in 30%+ of complex queries.',
        role: 'Lead AI Engineer: Designed document ingestion pipelines, implemented hybrid retrieval fusion algorithms, tuned cross-encoder re-ranking models, and built the citation verification UI.',
        architecturePoints: [
          { label: 'Document Parser & Ingestion', detail: 'Layout-aware PDF parsing extracting text, markdown tables, and headers into parent document blocks with child 128-token semantic chunks.' },
          { label: 'Hybrid Retrieval Engine', detail: 'Parallel execution of BM25 sparse keyword search and Qdrant dense vector search, merged via Reciprocal Rank Fusion (RRF with k=60).' },
          { label: 'Cross-Encoder Re-ranking', detail: 'Top-25 retrieved candidate chunks scored by a cross-encoder model (ms-marco-MiniLM-L-6-v2) to select the optimal top-4 high-relevance context windows.' },
          { label: 'Grounded Answer Generation', detail: 'Strict structured generation prompt with page citation markers ([Doc 1, Page 4]) and source confidence thresholds.' }
        ],
        ragDecisions: {
          ingestionChunking: 'Parent-child chunking strategy: 1024-token parent context windows indexed with 128-token child search chunks to maintain broad context while enabling fine-grained search matching.',
          embeddingVectorDb: 'Qdrant vector database paired with BGE-large-en-v1.5 1024-dim embeddings and HNSW graph indexing.',
          retrievalStrategy: 'Hybrid Search (0.5 BM25 + 0.5 Dense Vector) combined with Reciprocal Rank Fusion (RRF) and Cross-Encoder re-ranking down to Top-4 passages.',
          promptStreamingStrategy: 'System prompt enforcing chain-of-thought citation verification, outputting inline references and confidence scores.'
        },
        challengesTradeoffs: [
          { challenge: 'Cross-encoders introduce ~180ms latency overhead during query-time re-ranking', solution: 'Employed FlashRank (ONNX quantized cross-encoder) reducing re-ranking latency from 180ms to 32ms with negligible loss in ranking fidelity.', tradeoff: 'Slightly higher server RAM footprint for holding the ONNX runtime model in memory.' },
          { challenge: 'Tables formatted in PDF multi-columns become scrambled in standard naive text extractors', solution: 'Utilized PyMuPDF markdown table extraction and metadata tagging for table rows before chunking.', tradeoff: 'Increased document ingestion time by ~1.2s per 50-page document.' }
        ],
        resultsImpact: [
          { metric: '94.2%', label: 'Context Precision', businessOutcome: 'Top 4 chunks contained relevant answers in 94.2% of complex technical queries.' },
          { metric: '-42%', label: 'Hallucination Rate', businessOutcome: 'Verified against synthetic ground-truth question-answer benchmarks on 500 pages of technical documentation.' },
          { metric: '<580ms', label: 'E2E Response Time', businessOutcome: 'Sub-second response time enabling interactive exploratory knowledge search.' }
        ],
        evalFramework: [
          { name: 'Context Recall & Precision', score: '0.942', methodology: 'Ragas evaluation dataset covering 200 question-answer ground truth pairs.' },
          { name: 'Faithfulness', score: '0.971', methodology: 'Automated LLM-as-a-judge prompt consistency checks.' },
          { name: 'NDCG@5 Ranking', score: '0.912', methodology: 'Normalized Discounted Cumulative Gain against manual expert ranking.' }
        ]
      }
    },
    {
      id: 'team-copilot-agent',
      title: 'TeamCopilot — Autonomous Engineering & Support Copilot',
      category: 'AI Assistants & Agents',
      subtitle: 'Multi-Tool Agentic RAG Copilot for Automated Incident Triage & Runbook Resolution',
      description: 'Autonomous engineering assistant connecting vector search over internal runbooks with live API tool calling (GitHub PRs, Jira tickets, Slack threads) to accelerate incident triage.',
      longDescription: 'Designed and deployed an agentic workflow automating incident response for engineering and support teams. The copilot dynamically decomposes user queries into multi-step execution plans, performs tool-augmented retrieval across GitHub PRs, Jira tickets, and Confluence runbooks, and drafts verified root-cause hypotheses with human-in-the-loop escalation.',
      highlights: [
        'LangGraph stateful agent loop with multi-step reasoning and dynamic tool selection',
        'Tool integrations: Jira ticket search, GitHub PR commits, Runbook vector lookup',
        'Confidence score gating: queries with <80% certainty route to human escalation',
        '68% reduction in mean time to acknowledge (MTTA) for recurring incident tickets'
      ],
      metrics: [
        { label: 'MTTA Time Reduction', value: '68%' },
        { label: 'Tool Calling Accuracy', value: '96.8%' },
        { label: 'Autonomous Resolution Rate', value: '74.5%' },
        { label: 'Human-in-the-Loop Gating', value: '< 80% Conf' }
      ],
      technologies: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL / pgvector', 'Redis', 'Tool Calling', 'Next.js', 'Docker'],
      githubUrl: 'https://github.com/abinash123hg/team-copilot-agent',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true,
      color: '#8b5cf6',
      iconName: 'Radio',
      caseStudy: {
        summary: 'An agentic RAG copilot that orchestrates dynamic tool calling across GitHub, Jira, and internal runbooks to automate 74% of engineering incident triage workflows.',
        contextProblem: 'Support and on-call engineers waste 35% of their shifts searching across siloed tools (Jira, GitHub, Slack, Confluence) to diagnose known bugs and locate corresponding deployment PRs or runbook fixes.',
        role: 'End-to-End System Architect & AI Engineer: Implemented LangGraph state machine, designed tool schemas and validation hooks, established confidence scoring gates, and engineered the incident triage dashboard.',
        architecturePoints: [
          { label: 'Agent State Machine', detail: 'LangGraph-powered directed acyclic graph (DAG) maintaining conversational memory, tool execution state, and dynamic retry loops.' },
          { label: 'Dynamic Tool Suite', detail: 'Structured tool registry with JSON Schema definitions for GitHub PR search, Jira issue lookup, and pgvector runbook semantic search.' },
          { label: 'Verification & Confidence Gate', detail: 'Self-reflection node that evaluates retrieved context sufficiency and generates a confidence score before drafting final response.' },
          { label: 'Human-in-the-Loop Handoff', detail: 'Automatic Slack/Jira escalation trigger when confidence drops below 0.80 or high-severity production flags are detected.' }
        ],
        ragDecisions: {
          ingestionChunking: 'Automated CI/CD webhook pipeline parsing Markdown runbooks and Jira post-mortems into semantic task-oriented chunks with metadata tagging (service name, error code, on-call team).',
          embeddingVectorDb: 'PostgreSQL with pgvector extension using HNSW indexing for unified transactional data and vector search.',
          retrievalStrategy: 'Metadata-filtered vector search combined with dynamic tool execution arguments generated by LLM function calling.',
          promptStreamingStrategy: 'ReAct (Reason + Act) prompting with structured JSON output formatting and real-time execution step streaming.'
        },
        challengesTradeoffs: [
          { challenge: 'Agent loops getting stuck in infinite tool retries when APIs return empty results', solution: 'Enforced maximum recursion depth of 3 tool iterations with exponential backoff and automatic human fallback.', tradeoff: 'Early exit prevents exhaustive searching in ambiguous edge-cases, but ensures zero runaway API token costs.' },
          { challenge: 'Tool parameter hallucination (e.g. passing invalid repo names or date ranges)', solution: 'Implemented Pydantic schema validation layers before tool dispatch with automated error reflection feedback into the prompt.', tradeoff: 'Adds ~15ms schema validation step prior to external API invocation.' }
        ],
        resultsImpact: [
          { metric: '68%', label: 'MTTA Reduction', businessOutcome: 'Reduced median incident triage time from 22 minutes to 7 minutes.' },
          { metric: '74.5%', label: 'Auto Resolution', businessOutcome: '74.5% of recurring tickets resolved without requiring senior engineer intervention.' },
          { metric: '96.8%', label: 'Tool Call Accuracy', businessOutcome: 'High tool precision across 300 test cases with zero catastrophic API mutations.' }
        ],
        evalFramework: [
          { name: 'Tool Selection Precision', score: '0.968', methodology: 'Evaluated across 300 multi-intent test scenarios.' },
          { name: 'Task Completion Rate', score: '0.914', methodology: 'Percentage of incident simulations successfully diagnosed end-to-end.' },
          { name: 'Hallucination Mitigation', score: '0.991', methodology: 'Verification node checks that all cited commit hashes and ticket IDs exist in live databases.' }
        ]
      }
    },
    {
      id: 'neuralrank-explain',
      title: 'NeuralRank & Explain — Two-Stage Search Ranking with LLM Attribution',
      category: 'ML Ranking & Search',
      subtitle: 'High-Throughput Neural Candidate Retrieval & Gradient Boosted Re-Ranking with LLM Explanations',
      description: 'Two-stage search and recommendation engine combining fast bi-encoder candidate retrieval with an XGBoost/LambdaMART ranking model and an LLM natural-language explanation layer.',
      longDescription: 'Built an end-to-end search ranking pipeline that balances millisecond-level retrieval latency with human-interpretable reasoning. The first stage uses dense vector search over a 100k item catalog, followed by a LambdaMART gradient-boosted decision tree for precision re-ranking. A lightweight LLM then streams real-time "Why this matches your query" explanations for top items.',
      highlights: [
        'Two-stage architecture: Bi-encoder vector retrieval (top-100) + LambdaMART re-ranking (top-10)',
        'Achieved NDCG@10 of 0.892 on search relevance evaluation benchmarks',
        'Streaming LLM explanation generator producing concise justifications within 120ms token budget',
        'Measured +19.4% click-through rate (CTR) uplift in simulated user preference testing'
      ],
      metrics: [
        { label: 'NDCG@10 Score', value: '0.892' },
        { label: 'CTR Improvement', value: '+19.4%' },
        { label: 'P95 Latency', value: '< 65ms' },
        { label: 'Catalog Scale', value: '100,000+ Items' }
      ],
      technologies: ['Python', 'PyTorch', 'Scikit-learn', 'XGBoost / LightGBM', 'Faiss', 'Hugging Face Transformers', 'FastAPI', 'Streamlit'],
      githubUrl: 'https://github.com/abinash123hg/neuralrank-explain',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true,
      color: '#f59e0b',
      iconName: 'TrendingUp',
      caseStudy: {
        summary: 'A two-stage search ranking system combining dense vector candidate generation and LambdaMART re-ranking with streaming LLM natural language explanations, achieving 0.892 NDCG@10.',
        contextProblem: 'Standard semantic search systems either suffer from high latency (heavy cross-encoders) or poor transparency (black-box similarity numbers). Users struggle to understand why specific items were ranked, resulting in lower conversion and engagement.',
        role: 'ML & Search Engineer: Built the two-stage retrieval pipeline, engineered ranking features, trained LambdaMART models on click-log data, and integrated the streaming LLM explanation layer.',
        architecturePoints: [
          { label: 'Stage 1: Candidate Generation', detail: 'Faiss HNSW dense vector indexing retrieving top-100 candidates from 100k items in under 8ms using bi-encoder embeddings.' },
          { label: 'Stage 2: Precision Re-ranking', detail: 'LambdaMART model evaluating 28 hand-crafted features (BM25 score, semantic cosine similarity, category match, popularity, recency) to re-order top-10.' },
          { label: 'Stage 3: LLM Explanation Layer', detail: 'Distilled LLM conditioned on top feature attributions to stream 1-sentence explanations (e.g. "Matches your query for low-latency RAG with native Python support").' }
        ],
        ragDecisions: {
          ingestionChunking: 'Item catalog structured into dense metadata attributes (title, specifications, taxonomy, user reviews) and converted into vector embeddings with Faiss indexing.',
          embeddingVectorDb: 'Faiss IVFFlat index with 1024 clusters for sub-10ms candidate retrieval across 100k items.',
          retrievalStrategy: 'Two-stage retrieval: Dense bi-encoder retrieval (k=100) -> LambdaMART feature-based re-ranking (k=10).',
          promptStreamingStrategy: 'Fast structured prompt with low temperature (0.2) streaming 15-20 token explanation snippets within 120ms.'
        },
        challengesTradeoffs: [
          { challenge: 'Generating LLM explanations for all top-10 items without introducing query delay', solution: 'Asynchronously generated explanations only for the viewport top-3 visible items while caching common query-item explanation pairs in Redis.', tradeoff: 'Items 4-10 load explanation chips lazily upon user hover or scroll.' },
          { challenge: 'Balancing relevance vs novelty in ranking recommendations', solution: 'Added an exploration penalty feature in LambdaMART loss function to diversify top results across distinct product categories.', tradeoff: 'Slight 0.01 dip in raw offline relevance score in exchange for +19.4% higher user interaction diversity.' }
        ],
        resultsImpact: [
          { metric: '0.892', label: 'NDCG@10 Benchmark', businessOutcome: 'Top 10 search results significantly outperformed baseline BM25 (0.714) and pure vector search (0.802).' },
          { metric: '+19.4%', label: 'CTR Uplift', businessOutcome: 'User engagement increased significantly when items featured clear natural-language explanation badges.' },
          { metric: '<65ms', label: 'P95 Search Latency', businessOutcome: 'Production-ready throughput capable of handling 500+ requests per second.' }
        ],
        evalFramework: [
          { name: 'NDCG@10 Ranking Metric', score: '0.892', methodology: 'Evaluated against 1,000 human-annotated search query benchmarks.' },
          { name: 'MRR (Mean Reciprocal Rank)', score: '0.835', methodology: 'First relevant item positioned within top 1.2 results on average.' },
          { name: 'Explanation Faithfulness', score: '0.985', methodology: 'LLM explanation verified against actual product attribute truth tables.' }
        ]
      }
    },
    {
      id: '5g-kpi-management',
      title: '5G Small-Cell Network KPI Anomaly Predictor',
      category: 'AI / Machine Learning',
      subtitle: 'NOC Dashboard for 5G SLA Compliance & Network Slice Forecasting',
      description: 'Streamlit Network Operations Center (NOC) dashboard predicting 5G Service Level Agreement (SLA) compliance across network slices (eMBB, URLLC, mMTC, HC) using a Random Forest classifier with 96.2% accuracy.',
      longDescription: 'Engineered an end-to-end telemetry preprocessing and predictive intelligence pipeline for modern 5G cellular topologies. The model analyzes macro, micro, and pico cell radio telemetry across 10 vital KPIs including downlink/uplink throughput, jitter, latency, packet loss, handovers, RSRP/RSRQ, and PRB utilization to proactively flag SLA degradation before subscriber impact.',
      highlights: [
        'Trained 100-estimator Random Forest on 5,000 small-cell telemetry records',
        'Achieved 96.2% accuracy and 96.5% F1-score with 80/20 stratified validation',
        'StandardScaler + OneHotEncoder pipeline across 10 network performance KPIs',
        'Interactive 3D small-cell topology visualization with fully local inference'
      ],
      metrics: [
        { label: 'Classification Accuracy', value: '96.2%' },
        { label: 'Macro/Micro/Pico Cells', value: '5,000 Records' },
        { label: 'F1 Score', value: '96.5%' },
        { label: 'Network Slices', value: '4 (eMBB, URLLC, mMTC, HC)' }
      ],
      technologies: ['Python', 'Random Forest', 'Scikit-learn', 'Streamlit', 'NumPy', 'Matplotlib', '3D Visuals'],
      githubUrl: 'https://github.com/abinash123hg/5g-network-kpi-ai',
      liveDemoUrl: 'https://5gkpi.netlify.app',
      featured: false,
      color: '#3b82f6',
      iconName: 'Radio'
    }
  ],

  certificates: [
    {
      id: 'cert-oracle-agentic',
      title: 'Oracle Certified Associate — Agentic AI',
      issuer: 'Oracle / Oracle University',
      date: 'August 17, 2026',
      credentialId: '103519150AAI26OFA',
      verificationUrl: 'https://catalog-education.oracle.com',
      badge: 'Oracle Certified',
      category: 'Cloud & AI',
      description: 'Official credential validating enterprise Agentic AI workflows, autonomous agent orchestration, vector embeddings, retrieval pipelines, and Oracle Cloud Infrastructure (OCI) generative AI services.',
      skills: ['Agentic AI Workflows', 'Oracle Cloud (OCI)', 'Autonomous AI Agents', 'LLM Orchestration', 'Enterprise AI Ops'],
      imageSrc: 'assets/certifications/oracle_page-0001.jpg'
    },
    {
      id: 'cert-adobe-ai-essentials',
      title: 'AI Essentials for Marketers: Mindset, Use Cases and Workflows',
      issuer: 'Adobe',
      date: 'September 1, 2026',
      credentialId: 'ADOBE-AI-2026-09-01',
      verificationUrl: 'https://learning.adobe.com',
      badge: 'Adobe Certified',
      category: 'Cloud & AI',
      description: 'Credential from Adobe validating foundational mindset, enterprise use cases, prompt engineering strategies, and generative workflows for modern marketing and AI workflows.',
      skills: ['Generative AI Workflows', 'Prompt Design', 'Adobe AI Ecosystem', 'Marketing Automation'],
      imageSrc: 'assets/certifications/Adobe.jpg'
    },
    {
      id: 'cert-tata-genai',
      title: 'GenAI Powered Data Analytics Job Simulation',
      issuer: 'Tata / Forage',
      date: 'August 12, 2026',
      credentialId: '6a7c8a233266dbc982059c85',
      verificationUrl: 'https://forage.com/verify/6a7c8a233266dbc982059c85',
      badge: 'Tata Job Simulation',
      category: 'Data Analytics',
      description: 'Completed practical enterprise simulation tasks including exploratory data analysis and risk profiling, predicting delinquency with AI models, business storytelling for collections strategy, and implementing an AI-driven collections system.',
      skills: ['Exploratory Data Analysis', 'Delinquency AI Modeling', 'Business Reporting', 'Data Storytelling'],
      imageSrc: 'assets/certifications/GenAI Powered Data Analytics Job Simulation_page-0001.jpg'
    },
    {
      id: 'cert-deloitte-analytics',
      title: 'Deloitte Data Analytics Job Simulation',
      issuer: 'Deloitte / Forage',
      date: 'August 14, 2026',
      credentialId: '6a7f3098aa694bdf89596229',
      verificationUrl: 'https://forage.com/verify/6a7f3098aa694bdf89596229',
      badge: 'Deloitte Job Simulation',
      category: 'Data Analytics',
      description: 'Completed hands-on practical data simulation covering forensic technology datasets, data cleansing pipelines, forensic analytics, risk modeling, and executive stakeholder presentation.',
      skills: ['Forensic Technology', 'Data Analysis', 'Risk Quantification', 'Corporate Data Integrity'],
      imageSrc: 'assets/certifications/deloitte_page-0001.jpg'
    },
    {
      id: 'cert-skill-india-inventory',
      title: 'AI-Powered Smart Inventory Management System using Python',
      issuer: 'TutorialsPoint Academy • Skill India / NSDC',
      date: 'July 29, 2026',
      credentialId: 'TP-1OTGS7EX',
      verificationUrl: 'https://verify.tutorialspoint.com',
      badge: 'Skill India / NSDC Certified',
      category: 'Industry Training',
      description: 'Completed intensive 6-week online training on TutorialsPoint Academy covering AI-driven inventory demand forecasting, pattern detection algorithms, automated replenishment pipelines, and ISO 9001/27001 compliant workflows.',
      skills: ['Python Inventory AI', 'Demand Forecasting', 'Pattern Detection', 'Workflow Automation'],
      imageSrc: 'assets/certifications/internship_tutorialspoint_page-0001.jpg'
    }
  ],

  education: [
    {
      id: 'edu-btech',
      degree: 'B.Tech in Computer Science & Engineering (AI & ML Specialization)',
      institution: 'Centurion University of Technology and Management (CUTM)',
      location: 'Bhubaneswar, Odisha, India',
      score: '8.32 / 10.0 CGPA',
      scoreLabel: 'Cumulative Grade Point Average',
      period: '2023 – 2027',
      highlights: [
        'Specialization in Artificial Intelligence, Deep Learning, and Large Language Model Systems',
        'Academic coursework in Advanced Data Structures & Algorithms, Database Management, and Information Retrieval',
        'Active contributor in AI/ML student research labs and technical competitive hackathons'
      ]
    },
    {
      id: 'edu-intermediate',
      degree: 'Higher Secondary School Certificate (+2 Science)',
      institution: 'Vikash Higher Secondary School',
      location: 'Bhubaneswar, Odisha',
      score: '78.5%',
      scoreLabel: 'Council of Higher Secondary Education',
      period: '2021 – 2023',
      highlights: [
        'Physics, Chemistry, Mathematics, and Computer Science foundation',
        'Solid quantitative aptitude in linear algebra, probability, and calculus'
      ]
    },
    {
      id: 'edu-matric',
      degree: 'Secondary School Examination (Class X)',
      institution: 'Saraswati Sishu Vidya Mandir',
      location: 'Bhubaneswar, Odisha',
      score: '85.2%',
      scoreLabel: 'Board of Secondary Education',
      period: '2019 – 2021',
      highlights: [
        'Distinction in Mathematics and Science',
        'Active participant in regional science exhibitions and mathematics Olympiads'
      ]
    }
  ],

  experience: [
    {
      id: 'exp-internpe',
      role: 'Data Analyst & AI Intern',
      company: 'InternPe',
      location: 'Remote',
      period: 'July 2026 – August 2026',
      type: 'Internship',
      offerId: 'INPE0645607',
      responsibilities: [
        'Architected end-to-end data analytics and predictive modeling pipelines in Python for customer attrition and KPI tracking',
        'Engineered feature selection and class-imbalance handling workflows resulting in 91.4% ROC-AUC score improvements',
        'Built automated RAG semantic search prototypes over documentation to reduce developer onboarding time by 40%',
        'Delivered executive presentation decks with interactive Streamlit and Plotly visualizations'
      ],
      skills: ['Python', 'RAG Pipelines', 'Scikit-Learn', 'Pandas', 'Streamlit', 'Data Cleansing', 'Statistical Modeling']
    }
  ],

  skills: [
    {
      name: 'LLM & RAG Systems',
      color: '#007AFF',
      icon: 'Sparkles',
      skills: [
        { name: 'RAG Architecture', level: 95, tag: 'Core' },
        { name: 'LlamaIndex & LangChain', level: 92, tag: 'Framework' },
        { name: 'Vector DBs (Qdrant/Chroma/Faiss)', level: 90, tag: 'Database' },
        { name: 'Hybrid Search (Dense + BM25)', level: 92, tag: 'Retrieval' },
        { name: 'Cross-Encoder Re-Ranking', level: 88, tag: 'Ranking' },
        { name: 'Ragas Evaluation Suite', level: 90, tag: 'Evals' }
      ]
    },
    {
      name: 'AI Agents & Tool Calling',
      color: '#AF52DE',
      icon: 'Layers',
      skills: [
        { name: 'LangGraph State Machines', level: 90, tag: 'Agents' },
        { name: 'Function Calling & Tool Schemas', level: 94, tag: 'APIs' },
        { name: 'Gemini 2.5 Flash SDK', level: 96, tag: 'LLM' },
        { name: 'Prompt Engineering & Grounding', level: 95, tag: 'Tuning' },
        { name: 'Human-in-the-Loop Safeguards', level: 88, tag: 'Safety' }
      ]
    },
    {
      name: 'Machine Learning & Ranking',
      color: '#34C759',
      icon: 'Brain',
      skills: [
        { name: 'Python & NumPy', level: 98, tag: 'Language' },
        { name: 'Scikit-Learn & PyTorch', level: 92, tag: 'ML' },
        { name: 'XGBoost & LambdaMART', level: 88, tag: 'Ranking' },
        { name: 'Pandas & Data Cleansing', level: 95, tag: 'Data' },
        { name: 'Stratified Validation & ROC-AUC', level: 92, tag: 'Metrics' }
      ]
    },
    {
      name: 'Full-Stack & Native UI',
      color: '#FF9500',
      icon: 'Code2',
      skills: [
        { name: 'React 18 & TypeScript', level: 92, tag: 'Frontend' },
        { name: 'Apple HIG Design Systems', level: 94, tag: 'macOS/iOS' },
        { name: 'Tailwind CSS & Motion', level: 95, tag: 'Styling' },
        { name: 'Express.js & SSE Streaming', level: 90, tag: 'Backend' },
        { name: 'FastAPI & REST APIs', level: 92, tag: 'Backend' }
      ]
    }
  ],

  media: [
    {
      id: 'photo-1',
      title: 'Urban Architecture & Skyline',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/123760.jpg',
      mediaUrl: 'assets/photos/123760.jpg',
      description: 'Striking metropolitan architectural geometry captured with dramatic dynamic range and perspective.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'photo-2',
      title: 'Nature & Landscape Focus',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/1566397.jpg',
      mediaUrl: 'assets/photos/1566397.jpg',
      description: 'Lush natural landscape highlighting tranquility, natural light, and organic depth.',
      favorite: false,
      year: '2026'
    },
    {
      id: 'photo-3',
      title: 'Minimalist Workspace & Code',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/250542.jpg',
      mediaUrl: 'assets/photos/250542.jpg',
      description: 'Clean engineer workstation aesthetic optimized for high-velocity software development.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'photo-4',
      title: 'AI Neural Lab Aesthetics',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/26640376.jpg',
      mediaUrl: 'assets/photos/26640376.jpg',
      description: 'Atmospheric laboratory setting exploring generative intelligence and machine learning experimentation.',
      favorite: false,
      year: '2026'
    },
    {
      id: 'photo-5',
      title: 'Cyberpunk Neon Horizon',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/295657.jpg',
      mediaUrl: 'assets/photos/295657.jpg',
      description: 'High-contrast nocturnal streetscape bathed in vibrant magenta and cyan illumination.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'photo-6',
      title: 'Atmospheric Sunset Horizon',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/38598.jpg',
      mediaUrl: 'assets/photos/38598.jpg',
      description: 'Warm twilight gradient capturing evening reflections and golden hour tones.',
      favorite: false,
      year: '2026'
    },
    {
      id: 'photo-7',
      title: 'Modern Architecture Perspective',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/4512060.jpg',
      mediaUrl: 'assets/photos/4512060.jpg',
      description: 'Contemporary facade lines and structural elegance photographed under crisp daylight.',
      favorite: false,
      year: '2026'
    },
    {
      id: 'photo-8',
      title: 'Geometric Symmetry & Glass',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/4512081.jpg',
      mediaUrl: 'assets/photos/4512081.jpg',
      description: 'Intricate glass reflections and mathematical symmetry in modern urban infrastructure.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'photo-9',
      title: 'Creative Studio Lighting',
      category: 'Photography',
      type: 'image',
      thumbnail: 'assets/photos/7310.jpg',
      mediaUrl: 'assets/photos/7310.jpg',
      description: 'Controlled studio lighting and deep cinematic shadow contrast.',
      favorite: false,
      year: '2026'
    },
    {
      id: 'm-1',
      title: 'Breaking Bad',
      category: 'Movies & Series',
      type: 'image',
      thumbnail: 'assets/favorites/breakingbad.jpg',
      mediaUrl: 'assets/favorites/breakingbad.jpg',
      description: 'Masterpiece crime drama tracking Walter White\'s transformation into Heisenberg.',
      favorite: true,
      year: '2008–2013'
    },
    {
      id: 'm-3',
      title: 'The Boys',
      category: 'Movies & Series',
      type: 'image',
      thumbnail: 'assets/favorites/The Boys.jpg',
      mediaUrl: 'assets/favorites/The Boys.jpg',
      description: 'Sharp, satirical deconstruction of corporate superhero monopolies.',
      favorite: true,
      year: '2019–Present'
    },
    {
      id: 'm-4',
      title: 'Money Heist (La Casa de Papel)',
      category: 'Movies & Series',
      type: 'image',
      thumbnail: 'assets/favorites/Money Heist.jpg',
      mediaUrl: 'assets/favorites/Money Heist.jpg',
      description: 'High-stakes tactical heist drama engineered by The Professor.',
      favorite: true,
      year: '2017–2021'
    },
    {
      id: 'm-5',
      title: 'Dark',
      category: 'Movies & Series',
      type: 'image',
      thumbnail: 'assets/favorites/Dark.jpg',
      mediaUrl: 'assets/favorites/Dark.jpg',
      description: 'Complex deterministic time-travel mystery exploring causality loops.',
      favorite: true,
      year: '2017–2020'
    },
    {
      id: 'm-6',
      title: 'Vikings',
      category: 'Movies & Series',
      type: 'image',
      thumbnail: 'src/assets/favorites/vikings.jpg',
      mediaUrl: 'src/assets/favorites/vikings.jpg',
      description: 'Epic historical saga charting Ragnar Lothbrok\'s exploration.',
      favorite: true,
      year: '2013-2020'
    },
    {
      id: 'cert-adobe-ai',
      title: 'Adobe AI Essentials for Marketers Certification',
      category: 'Certificates',
      type: 'image',
      thumbnail: 'assets/certifications/Adobe.jpg',
      mediaUrl: 'assets/certifications/Adobe.jpg',
      description: 'Official credential from Adobe validating generative AI workflows, prompt design strategies, and marketing automation.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'cert-tata-genai',
      title: 'Tata GenAI Powered Data Analytics Certification',
      category: 'Certificates',
      type: 'image',
      thumbnail: 'assets/certifications/GenAI Powered Data Analytics Job Simulation_page-0001.jpg',
      mediaUrl: 'assets/certifications/GenAI Powered Data Analytics Job Simulation_page-0001.jpg',
      description: 'Enterprise credential in exploratory data analysis, delinquency predictive AI modeling, and executive storytelling.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'cert-deloitte-analytics',
      title: 'Deloitte Data Analytics Forensic Certification',
      category: 'Certificates',
      type: 'image',
      thumbnail: 'assets/certifications/deloitte_page-0001.jpg',
      mediaUrl: 'assets/certifications/deloitte_page-0001.jpg',
      description: 'Forensic analytics, corporate data integrity, and high-stakes risk quantification simulation.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'cert-skill-india',
      title: 'Skill India / NSDC AI Inventory Management Certification',
      category: 'Certificates',
      type: 'image',
      thumbnail: 'assets/certifications/internship_tutorialspoint_page-0001.jpg',
      mediaUrl: 'assets/certifications/internship_tutorialspoint_page-0001.jpg',
      description: 'Skill India and TutorialsPoint Academy certified training in AI-driven predictive replenishment.',
      favorite: true,
      year: '2026'
    },
    {
      id: 'cert-oracle-agentic',
      title: 'Oracle Certified Associate — Agentic AI',
      category: 'Certificates',
      type: 'image',
      thumbnail: 'assets/certifications/oracle_page-0001.jpg',
      mediaUrl: 'assets/certifications/oracle_page-0001.jpg',
      description: 'Official Oracle University credential validating Agentic AI workflows, OCI generative AI services, and autonomous agent orchestration.',
      favorite: true,
      year: '2026'
    }
  ],

  favoriteShows: [
    {
      id: 'breaking-bad',
      title: 'Breaking Bad',
      years: '2008-2013',
      year: '2008-2013',
      creator: 'Vince Gilligan',
      director: 'Vince Gilligan',
      badge: 'Masterpiece',
      posterFileName: 'src/assets/favorites/breakingbad.jpg',
      poster: 'src/assets/favorites/breakingbad.jpg',
      backdrop: 'src/assets/favorites/breakingbad.jpg',
      description: 'A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family\'s future as he battles terminal cancer.',
      dialogue: 'I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No! I am the one who knocks!',
      viralDialogue: 'I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No! I am the one who knocks!',
      quoteSpeaker: 'Walter White / Heisenberg',
      dialogueCharacter: 'Walter White / Heisenberg',
      imdbRating: '9.5',
      rtRating: '96',
      themeColor: '#16a34a',
      accentGradient: 'from-emerald-950 via-neutral-900 to-black'
    },
    {
      id: 'the-boys',
      title: 'The Boys',
      years: '2019-Present',
      year: '2019-Present',
      creator: 'Eric Kripke',
      director: 'Eric Kripke',
      badge: 'Dark Comedy',
      posterFileName: 'src/assets/favorites/The Boys.jpg',
      poster: 'src/assets/favorites/The Boys.jpg',
      backdrop: 'src/assets/favorites/The Boys.jpg',
      description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers for personal gain and corporate profit.',
      dialogue: "I'm the Homelander, and I can do whatever the f* I want. No God. The only man in the sky is me.",
      viralDialogue: "I'm the Homelander, and I can do whatever the f* I want. No God. The only man in the sky is me.",
      viralDialogue1: "I'm the Homelander, and I can do whatever the f* I want.",
      viralDialogue2: 'No God. The only man in the sky is me.',
      quoteSpeaker: 'Homelander',
      dialogueCharacter: 'Homelander',
      imdbRating: '8.7',
      rtRating: '98',
      themeColor: '#ef4444',
      accentGradient: 'from-red-950 via-neutral-900 to-black'
    },
    {
      id: 'money-heist',
      title: 'Money Heist (La Casa de Papel)',
      years: '2017-2021',
      year: '2017-2021',
      creator: 'Álex Pina',
      director: 'Álex Pina',
      badge: 'Heist Thriller',
      posterFileName: 'src/assets/favorites/Money Heist.jpg',
      poster: 'src/assets/favorites/Money Heist.jpg',
      backdrop: 'src/assets/favorites/Money Heist.jpg',
      description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.',
      dialogue: "Death can be the greatest opportunity of your life. We're not going to rob the money, we're going to print it.",
      viralDialogue: "Death can be the greatest opportunity of your life. We're not going to rob the money, we're going to print it.",
      quoteSpeaker: 'Berlin',
      dialogueCharacter: 'Berlin',
      imdbRating: '8.2',
      rtRating: '91',
      themeColor: '#dc2626',
      accentGradient: 'from-rose-950 via-red-950 to-black'
    },
    {
      id: 'dark',
      title: 'Dark',
      years: '2017-2020',
      year: '2017-2020',
      creator: 'Baran bo Odar & Jantje Friese',
      director: 'Baran bo Odar & Jantje Friese',
      badge: 'Sci-Fi Mystery',
      posterFileName: 'src/assets/favorites/Dark.jpg',
      poster: 'src/assets/favorites/Dark.jpg',
      backdrop: 'src/assets/favorites/Dark.jpg',
      description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes relationships among four families and a time travel conspiracy.',
      dialogue: "The end is the beginning, and the beginning is the end. The question isn't where, the question is when.",
      viralDialogue: "The end is the beginning, and the beginning is the end. The question isn't where, the question is when.",
      quoteSpeaker: 'Jonas Kahnwald / Adam',
      dialogueCharacter: 'Jonas Kahnwald / Adam',
      imdbRating: '8.7',
      rtRating: '95',
      themeColor: '#eab308',
      accentGradient: 'from-amber-950 via-neutral-950 to-black'
    },
    {
      id: 'vikings',
      title: 'Vikings',
      years: '2013-2020',
      year: '2013-2020',
      creator: 'Michael Hirst',
      director: 'Michael Hirst',
      badge: 'Epic Drama',
      posterFileName: 'src/assets/favorites/vikings.jpg',
      poster: 'src/assets/favorites/vikings.jpg',
      backdrop: 'src/assets/favorites/vikings.jpg',
      description: 'Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore and raid the distant shores across the ocean.',
      dialogue: "I hope that one day our gods can become friends. The gods are man's creation, to give answers that they are too afraid to give themselves.",
      viralDialogue: "I hope that one day our gods can become friends. The gods are man's creation, to give answers that they are too afraid to give themselves.",
      quoteSpeaker: 'Ragnar Lothbrok',
      dialogueCharacter: 'Ragnar Lothbrok',
      imdbRating: '8.5',
      rtRating: '93',
      themeColor: '#38bdf8',
      accentGradient: 'from-blue-950 via-slate-900 to-black'
    }
  ],

  videos: [
    {
      id: 'vid-149947',
      title: 'Cinematic Video 01',
      fileName: 'assets/video/149947-797491657_medium.mp4',
      duration: '0:10',
      category: 'Cinematic',
      description: 'High-definition 1080p motion video demonstration.',
      aspectRatio: '16:9',
      accentColor: '#0ea5e9'
    },
    {
      id: 'vid-172475',
      title: 'Cinematic Video 02',
      fileName: 'assets/video/172475-847499816_medium.mp4',
      duration: '0:30',
      category: 'Cinematic',
      description: 'Widescreen landscape and creative motion sequence.',
      aspectRatio: '16:9',
      accentColor: '#10b981'
    },
    {
      id: 'vid-178501',
      title: 'Cinematic Video 03',
      fileName: 'assets/video/178501-860033423_medium.mp4',
      duration: '0:30',
      category: 'Cinematic',
      description: 'Atmospheric visual reel with ambient sound design.',
      aspectRatio: '16:9',
      accentColor: '#8b5cf6'
    },
    {
      id: 'vid-34301',
      title: 'Cinematic Video 04',
      fileName: 'assets/video/34301-400974283_medium.mp4',
      duration: '0:13',
      category: 'Cinematic',
      description: 'High-definition dynamic visual and motion showcase.',
      aspectRatio: '16:9',
      accentColor: '#f59e0b'
    },
    {
      id: 'vid-48569',
      title: 'Cinematic Video 05',
      fileName: 'assets/video/48569-454825064_medium.mp4',
      duration: '0:10',
      category: 'Cinematic',
      description: 'Ultra-high resolution 1440p creative visual showcase.',
      aspectRatio: '16:9',
      accentColor: '#06b6d4'
    }
  ],

  calendarTimeline: [
    {
      id: 'cal-1',
      category: 'Certification',
      title: 'Oracle Certified Associate — Agentic AI',
      date: '17 August 2026',
      time: '10:00 AM',
      description: 'Earned official Oracle University certification in Agentic AI and enterprise workflows.',
      color: '#ff3b30'
    },
    {
      id: 'cal-2',
      category: 'Internship',
      title: 'InternPe Data Analyst Internship',
      date: '15 July 2026',
      location: 'Remote',
      description: 'Completed hands-on data analytics and predictive modeling internship.',
      color: '#34c759'
    },
    {
      id: 'cal-3',
      category: 'Certification',
      title: 'Deloitte Data Analytics Credential',
      date: '14 August 2026',
      description: 'Finished Deloitte Forage data simulation on forensic technology datasets.',
      color: '#007aff'
    },
    {
      id: 'cal-5',
      category: 'Certification',
      title: 'Adobe AI Essentials for Marketers Certification',
      date: '1 September 2026',
      description: 'Earned Adobe credential validating generative AI workflows, prompt design strategies, and marketing automation.',
      color: '#ff2d55'
    },
  ],

  recruiterSummary: {
    targetRole: 'LLM Engineer – RAG, AI Assistants & Knowledge Systems',
    location: 'Bhubaneswar, India (Remote-Friendly)',
    status: 'Open to Full-Time Roles & High-Impact Opportunities',
    valueProposition: 'Specializing in production-grade RAG architectures, hybrid retrieval (dense + BM25), cross-encoder re-ranking, and autonomous tool-calling copilots paired with native macOS & iOS user interfaces.',
    impactMetrics: [
      { label: 'RAG Faithfulness', value: '98.4%', detail: 'Ragas evaluation score with strict grounding constraints' },
      { label: 'Streaming TTFT', value: '< 320ms', detail: 'Sub-second first-token latency via SSE proxy' },
      { label: 'Hallucination Drop', value: '-42%', detail: 'Cross-encoder re-ranking vs naive vector search' },
      { label: 'MTTA Reduction', value: '68%', detail: 'Automated engineering incident triage copilot' }
    ],
    domainFocus: [
      {
        id: 'rag',
        title: 'Production RAG Systems',
        badge: 'Core Specialty',
        color: '#007AFF',
        description: 'Parent-child chunking, dense vector + BM25 hybrid search, Reciprocal Rank Fusion (RRF), cross-encoder re-ranking (FlashRank), and citation-grounded generation.',
        skills: ['RAG Pipelines', 'Hybrid Search', 'Cross-Encoders', 'Qdrant / pgvector', 'Ragas Evals']
      },
      {
        id: 'agents',
        title: 'AI Assistants & Copilots',
        badge: 'Agentic Workflows',
        color: '#AF52DE',
        description: 'LangGraph state machines, multi-step tool calling, confidence scoring gates, human-in-the-loop escalation, and streaming token delivery.',
        skills: ['LangGraph', 'Function Calling', 'Gemini 2.5 Flash SDK', 'SSE Streaming', 'Safety Rails']
      },
      {
        id: 'ranking',
        title: 'ML Ranking & Search',
        badge: 'Search Intelligence',
        color: '#FF9500',
        description: 'Two-stage retrieval architectures, bi-encoder candidate generation (Faiss), LambdaMART/XGBoost re-ranking, and natural-language LLM explanations.',
        skills: ['Faiss Indexing', 'LambdaMART', 'NDCG@10 Optimization', 'XGBoost', 'Feature Engineering']
      },
      {
        id: 'ui',
        title: 'Native-Grade Full-Stack UI',
        badge: 'macOS & iOS HIG',
        color: '#34C759',
        description: 'Pixel-perfect Apple HIG interfaces across desktop windowing systems and mobile springboards with responsive micro-interactions and audio haptics.',
        skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Apple HIG', 'Express.js']
      }
    ],
    whatIBring: [
      'Architects production-grade RAG systems with rigorous evaluation (Ragas, Faithfulness, Context Precision)',
      'Builds multi-tool agentic copilots with dynamic JSON schema validation and confidence gating',
      'Designs high-throughput two-stage search ranking systems that balance millisecond speed with explainability',
      'Pairs advanced AI infrastructure with native-feeling macOS and iOS frontend craftsmanship'
    ],
    ownership3060Days: [
      'Audit and optimize existing RAG retrieval pipelines using hybrid dense + sparse search and re-ranking',
      'Set up automated evaluation suites (Ragas, answer relevance, latency telemetry) in CI/CD pipelines',
      'Build autonomous copilot integrations connecting internal knowledge bases to live engineering tools',
      'Deliver clean, accessible user interfaces with streaming token outputs and zero exposed keys',
      'Champion strict grounding guardrails to eliminate hallucinations in mission-critical workflows'
    ],
    targetOpportunities: [
      'LLM Engineer – RAG & AI Assistants',
      'AI/ML Engineer (GenAI Systems)',
      'Knowledge Systems & Search Engineer',
      'Full-Stack AI Engineer (Python + TypeScript)',
      'AI Solutions & Copilot Architect'
    ],
    pitchText: `Candidate: Abinash Swain
Target Role: LLM Engineer – RAG, AI Assistants & Knowledge Systems
Location: Bhubaneswar, India (Remote-Friendly)
Status: Open to Full-Time Roles & High-Impact Opportunities

Positioning: Specializing in production RAG pipelines, autonomous tool-calling copilots, and cross-platform native UI systems across macOS & iOS.
Key Projects & Case Studies:
1. macOS + iOS AI Portfolio with RAG Digital Twin (Flagship cross-platform OS with sub-300ms SSE streaming twin, 98.4% Ragas faithfulness)
2. DocuRAG — Multimodal Document RAG & Knowledge Engine (Hybrid search + FlashRank cross-encoder, -42% hallucinations)
3. TeamCopilot — Autonomous Incident Triage Copilot (LangGraph agent with dynamic Jira/GitHub tool calling, 68% MTTA reduction)
4. NeuralRank & Explain (Two-stage Faiss + LambdaMART ranking with streaming LLM attribution, 0.892 NDCG@10)

Education: B.Tech AI/ML @ Centurion University CUTM (8.32 CGPA)
Certifications: Oracle Certified Foundations Associate (Agentic AI), Tata GenAI Job Simulation, Deloitte Data Analytics

Contact: swainabinash839@gmail.com | Phone: +91-7077475818 | LinkedIn: https://www.linkedin.com/in/abinash-swain-a941a3330/`
  }
};

export const profile = {
  name: portfolioData.name,
  title: portfolioData.title,
  headline: portfolioData.headline,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  bio: portfolioData.bio,
  location: portfolioData.location,
  email: portfolioData.email,
  phone: portfolioData.phone,
  cgpa: portfolioData.cgpa,
  college: portfolioData.college,
};

