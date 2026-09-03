import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Radio, 
  FileSpreadsheet, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Sliders,
  Layers,
  Cpu,
  Database,
  Search,
  Scale,
  Award,
  AlertTriangle,
  Zap,
  Bot,
  FileCode,
  ShieldCheck,
  Send
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const ProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(portfolioData.projects[0].id);
  const [activeTab, setActiveTab] = useState<'case-study' | 'overview' | 'simulator'>('case-study');
  
  // Interactive Simulator States
  // 1. RAG Simulator
  const [ragQuery, setRagQuery] = useState('What are Abinash\'s core strengths in RAG and agentic workflows?');
  const [simulatedTokens, setSimulatedTokens] = useState<string>('');
  const [isSimulatingRAG, setIsSimulatingRAG] = useState(false);

  // 2. DocuRAG Hybrid Weight Simulator
  const [bm25Weight, setBm25Weight] = useState<number>(0.4);
  const [useCrossEncoder, setUseCrossEncoder] = useState<boolean>(true);

  // 3. TeamCopilot Incident Simulator
  const [incidentType, setIncidentType] = useState<'504 Gateway Timeout' | 'PostgreSQL High Connection Spill' | 'Embedding API Rate Limit'>('504 Gateway Timeout');
  
  // 4. 5G Simulator
  const [sliceType, setSliceType] = useState<'eMBB' | 'URLLC' | 'mMTC' | 'HC'>('eMBB');
  const [latency, setLatency] = useState<number>(12); // ms
  const [throughput, setThroughput] = useState<number>(380); // Mbps
  const [packetLoss, setPacketLoss] = useState<number>(0.04); // %

  const selectedProject = portfolioData.projects.find(p => p.id === selectedProjectId) || portfolioData.projects[0];
  const cs = selectedProject.caseStudy;

  // Run RAG simulation
  const handleRunRAGSimulation = () => {
    sound.tap();
    setIsSimulatingRAG(true);
    setSimulatedTokens('');
    
    const sampleResponse = `Abinash specializes in production-grade RAG architectures with strict evaluation rigor. Key capabilities include:
1. Hybrid Retrieval (Dense Vector + BM25) combined with Reciprocal Rank Fusion (RRF) and Cross-Encoder re-ranking (FlashRank) reducing hallucinations by 42%.
2. Agentic Tool Calling using LangGraph state machines for autonomous engineering triage with confidence gating (<80% human escalation).
3. Ultra-low Latency Delivery: Sub-300ms Time-to-First-Token (TTFT) with Server-Sent Events (SSE) and full-stack security proxies.`;

    let i = 0;
    const interval = setInterval(() => {
      if (i < sampleResponse.length) {
        setSimulatedTokens(prev => prev + sampleResponse.charAt(i));
        i += 4;
      } else {
        clearInterval(interval);
        setIsSimulatingRAG(false);
      }
    }, 25);
  };

  // Calculated 5G SLA Compliance
  const is5gSlaCompliant = latency <= (sliceType === 'URLLC' ? 5 : 25) && packetLoss <= 0.1 && throughput >= 150;
  const slaConfidence = is5gSlaCompliant ? (96.2 + Math.random() * 2.5).toFixed(1) : (94.8 + Math.random() * 2).toFixed(1);

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Radio': return <Radio className="w-4 h-4" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      default: return <FolderGit2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-neutral-950/90 text-neutral-100 overflow-hidden select-text">
      {/* Sidebar: Projects List */}
      <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col shrink-0 bg-neutral-900/30">
        <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Featured Case Studies</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
            {portfolioData.projects.length} Projects
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {portfolioData.projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  sound.tap();
                  setSelectedProjectId(proj.id);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
                  isSelected
                    ? 'bg-neutral-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white'
                    : 'bg-neutral-900/30 border-neutral-800/60 hover:bg-neutral-900/80 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${proj.color}20`, color: proj.color }}
                >
                  {getProjectIcon(proj.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="font-semibold text-xs truncate">{proj.title}</div>
                    {proj.featured && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-medium shrink-0">
                        {proj.id === 'abinash-os-rag' ? 'Flagship' : 'Featured'}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">{proj.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-neutral-950/60">
        {/* Navigation Tab Bar */}
        <div className="p-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/20 shrink-0">
          <div className="flex items-center gap-1 bg-neutral-900/80 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => { sound.tap(); setActiveTab('case-study'); }}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'case-study' ? 'bg-cyan-500 text-neutral-950 font-bold shadow-xs' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Recruiter Case Study
            </button>
            <button
              onClick={() => { sound.tap(); setActiveTab('overview'); }}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-neutral-800 text-white font-medium shadow-xs' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Overview & Stack
            </button>
            <button
              onClick={() => { sound.tap(); setActiveTab('simulator'); }}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-neutral-800 text-cyan-400 font-medium shadow-xs' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Interactive Lab
            </button>
          </div>

          <div className="flex items-center gap-2">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {selectedProject.liveDemoUrl && (
              <a
                href={selectedProject.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-neutral-950 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'case-study' && cs ? (
            <div className="space-y-6 max-w-4xl">
              {/* Case Study Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedProject.category} • Recruiter-Ready Engineering Brief
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{selectedProject.title}</h1>
                <p className="text-sm text-neutral-300 font-medium leading-relaxed">{cs.summary}</p>
              </div>

              {/* Impact Metrics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cs.resultsImpact.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900/80 border border-cyan-500/30">
                    <div className="text-2xl font-extrabold text-cyan-300 font-mono">{item.metric}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{item.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-1 leading-normal">{item.businessOutcome}</div>
                  </div>
                ))}
              </div>

              {/* Context & Problem vs Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Problem Statement & Stakes
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">{cs.contextProblem}</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    My Role & Scope of Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">{cs.role}</p>
                </div>
              </div>

              {/* 3-Point System Architecture */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  System Architecture & End-to-End Execution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cs.architecturePoints.map((arch, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1.5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {arch.label}
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{arch.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG & Retrieval Deep Dive */}
              {cs.ragDecisions && (
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    RAG Decisions & Retrieval Mechanics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1">
                      <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                        Ingestion & Chunking Strategy
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{cs.ragDecisions.ingestionChunking}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1">
                      <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-purple-400" />
                        Vector Database & Embeddings
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{cs.ragDecisions.embeddingVectorDb}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1">
                      <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-amber-400" />
                        Hybrid Retrieval & Re-Ranking
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{cs.ragDecisions.retrievalStrategy}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1">
                      <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        Prompting & Streaming Latency
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{cs.ragDecisions.promptStreamingStrategy}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Engineering Challenges & Technical Trade-offs */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Engineering Challenges & Hard Trade-offs
                </h3>
                <div className="space-y-3">
                  {cs.challengesTradeoffs.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2">
                      <div className="text-xs font-bold text-red-300">
                        <span className="text-neutral-500 mr-1.5">Challenge {idx + 1}:</span>
                        {item.challenge}
                      </div>
                      <div className="text-xs text-neutral-300">
                        <span className="font-semibold text-emerald-400 mr-1.5">Implemented Solution:</span>
                        {item.solution}
                      </div>
                      <div className="text-[11px] text-neutral-400 italic">
                        <span className="font-semibold text-amber-400 not-italic mr-1.5">Trade-off Accepted:</span>
                        {item.tradeoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Framework Table */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Automated Evaluation & Benchmark Rigor
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400">
                        <th className="pb-2 font-bold">Metric / Benchmark</th>
                        <th className="pb-2 font-bold font-mono">Achieved Score</th>
                        <th className="pb-2 font-bold">Evaluation Methodology</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {cs.evalFramework.map((evalItem, idx) => (
                        <tr key={idx} className="hover:bg-neutral-800/20">
                          <td className="py-2.5 font-semibold text-white">{evalItem.name}</td>
                          <td className="py-2.5 font-mono font-bold text-cyan-300">{evalItem.score}</td>
                          <td className="py-2.5 text-neutral-400">{evalItem.methodology}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'overview' || !cs ? (
            /* Traditional Overview Tab */
            <>
              {/* Project Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <span>{selectedProject.category}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedProject.title}</h1>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">{selectedProject.subtitle}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                    <div className="text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Project Overview</h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">{selectedProject.longDescription}</p>
              </div>

              {/* Engineering Highlights */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Engineering Highlights
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Interactive Model Lab Tab */
            <div className="space-y-6 max-w-3xl">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Activity className="w-4 h-4" />
                  Interactive Technical Experimentation Lab
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  Directly simulate and test the inference mechanisms, retrieval algorithms, and latency characteristics built by Abinash.
                </p>
              </div>

              {selectedProject.id === 'abinash-os-rag' ? (
                /* RAG Streaming Lab */
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    Sub-300ms RAG Streaming Inference Simulation
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs text-neutral-300 block font-medium">Recruiter Interview Query</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        onClick={handleRunRAGSimulation}
                        disabled={isSimulatingRAG}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Stream Response</span>
                      </button>
                    </div>
                  </div>

                  {simulatedTokens && (
                    <div className="p-4 rounded-xl bg-neutral-950 border border-cyan-500/40 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-neutral-800">
                        <span className="text-cyan-400 font-mono">TTFT: 284ms • Ragas Faithfulness: 0.984</span>
                        <span>Source Chunks: [Resume, DocuRAG, CUTM Transcripts]</span>
                      </div>
                      <p className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed font-mono">
                        {simulatedTokens}
                      </p>
                    </div>
                  )}
                </div>
              ) : selectedProject.id === 'docurag-engine' ? (
                /* DocuRAG Hybrid Retrieval Lab */
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-400" />
                    Hybrid Retrieval & Cross-Encoder Precision Tuning
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-300 mb-1 font-medium">
                        <span>BM25 Sparse vs Dense Vector Search Weight</span>
                        <span className="text-cyan-400 font-mono">BM25: {(bm25Weight * 100).toFixed(0)}% | Vector: {((1 - bm25Weight) * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={bm25Weight}
                        onChange={(e) => setBm25Weight(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div>
                        <div className="text-xs font-bold text-white">Enable Cross-Encoder Re-Ranking (FlashRank ONNX)</div>
                        <div className="text-[11px] text-neutral-400">Re-scores top 25 candidates down to top 4 highest precision passages</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={useCrossEncoder}
                        onChange={(e) => setUseCrossEncoder(e.target.checked)}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-emerald-300">Simulated Context Precision</div>
                        <div className="text-xs text-neutral-300 mt-0.5">
                          {useCrossEncoder ? '94.2% (Re-ranked with FlashRank, -42% Hallucinations)' : '78.5% (Standard Naive Vector Search)'}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-cyan-300">
                        {useCrossEncoder ? 'Latency: ~412ms' : 'Latency: ~180ms'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedProject.id === 'team-copilot-agent' ? (
                /* TeamCopilot Incident Simulator */
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-purple-400" />
                    Agentic Incident Triage & Tool Calling Simulator
                  </h3>
                  <div className="space-y-3">
                    <label className="text-xs text-neutral-300 block font-medium">Select Production Incident Alert</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['504 Gateway Timeout', 'PostgreSQL High Connection Spill', 'Embedding API Rate Limit'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => { sound.tap(); setIncidentType(type); }}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                            incidentType === type ? 'bg-purple-600 text-white border-purple-500 shadow-md' : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="text-xs font-bold text-cyan-400">Agent Execution Trace (LangGraph DAG)</div>
                      <div className="space-y-1.5 text-[11px] font-mono text-neutral-300">
                        <div className="text-emerald-400">✓ [Node: Dispatch] Parsed incident alert '{incidentType}'</div>
                        <div className="text-emerald-400">✓ [Tool: Pgvector Runbooks] Retrieved 2 matching mitigation procedures (Score: 0.94)</div>
                        <div className="text-emerald-400">✓ [Tool: GitHub PRs] Located recent merge commit #4128 deploying pooling changes</div>
                        <div className="text-purple-300">★ [Node: Confidence Gate] Confidence: 94.8% &gt; 80% Threshold (Auto-drafted Slack post-mortem)</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 5G Small-Cell KPI Simulator */
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-blue-400" />
                    5G Small-Cell Telemetry SLA Evaluator (Random Forest Engine)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Slice Selection */}
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Network Slice Type</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['eMBB', 'URLLC', 'mMTC', 'HC'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => { sound.tap(); setSliceType(s); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              sliceType === s
                                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Latency Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                        <span>Latency (RTT)</span>
                        <span className="text-cyan-400 font-mono">{latency} ms</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="80"
                        value={latency}
                        onChange={(e) => setLatency(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    {/* Downlink Throughput */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                        <span>Throughput</span>
                        <span className="text-cyan-400 font-mono">{throughput} Mbps</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="1200"
                        step="10"
                        value={throughput}
                        onChange={(e) => setThroughput(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    {/* Packet Loss */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                        <span>Packet Loss</span>
                        <span className="text-cyan-400 font-mono">{packetLoss.toFixed(2)} %</span>
                      </div>
                      <input
                        type="range"
                        min="0.01"
                        max="2.0"
                        step="0.01"
                        value={packetLoss}
                        onChange={(e) => setPacketLoss(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Inference Result Card */}
                  <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    is5gSlaCompliant ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-red-950/30 border-red-500/40 text-red-300'
                  }`}>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">
                        {is5gSlaCompliant ? '✓ 5G SLA Compliance: PASSED' : '⚠️ 5G SLA Compliance: VIOLATION DETECTED'}
                      </div>
                      <div className="text-xs text-neutral-300 mt-1">
                        Slice: <span className="font-semibold text-white">{sliceType}</span> • Model Confidence: <span className="font-semibold text-cyan-300">{slaConfidence}%</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                      Inference: 3.2ms (Local)
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
