import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Brain, 
  BarChart3, 
  Cpu, 
  FolderGit2, 
  ShieldCheck,
  Send,
  UserCheck
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';

export const HRPolitelyApp: React.FC = () => {
  const { openDesktopWindow } = useDevice();
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects' | 'education' | 'contact'>('overview');

  const handleCopyPitch = () => {
    sound.tap();
    const pitch = `Candidate Profile: ${portfolioData.name} - ${portfolioData.title}\n` +
      `Education: ${portfolioData.education[0]?.degree} at ${portfolioData.college} (CGPA: ${portfolioData.cgpa})\n` +
      `Key Strengths: RAG Pipelines, AI Agents, Data Analytics, Python, PyTorch, React & TypeScript\n` +
      `Contact: ${portfolioData.email} | ${portfolioData.phone} | ${portfolioData.location}\n` +
      `LinkedIn: ${portfolioData.linkedin}\n` +
      `GitHub: ${portfolioData.github}`;
    navigator.clipboard.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const handleCopyText = (text: string, type: string) => {
    sound.tap();
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  return (
    <div className="h-full w-full bg-neutral-950 text-neutral-100 flex flex-col overflow-hidden select-text font-sans">
      {/* Top Recruiter Header Bar */}
      <div className="h-14 px-5 border-b border-white/10 bg-neutral-900/90 backdrop-blur-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <UserCheck className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[13.5px] font-bold text-white tracking-tight">HR Politely</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">Executive Candidate Overview for Recruiters & Hiring Managers</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[11.5px] font-medium border border-white/10 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copiedPitch ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied Summary</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-300" />
                <span>Copy 1-Page Summary</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              sound.tap();
              openDesktopWindow('recruiter');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11.5px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Resume PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="px-5 py-2.5 bg-neutral-900/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[12px] shrink-0">
        {[
          { id: 'overview', label: 'Candidate Overview', icon: UserCheck },
          { id: 'skills', label: 'Technical & AI Skills', icon: Cpu },
          { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
          { id: 'education', label: 'Education & Certs', icon: GraduationCap },
          { id: 'contact', label: 'Contact & Links', icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.tap();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Hero Candidate Profile Card */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-neutral-900 to-neutral-900 border border-blue-800/30 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-md shrink-0">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g"
                      alt={portfolioData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-bold text-white">{portfolioData.name}</h2>
                    <p className="text-[13px] font-semibold text-cyan-400">{portfolioData.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-neutral-400" /> {portfolioData.location}</span>
                      <span>•</span>
                      <span>CGPA {portfolioData.cgpa}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-neutral-300 transition-colors border border-white/10"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={portfolioData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-neutral-700 text-neutral-300 transition-colors border border-white/10"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600 text-neutral-300 transition-colors border border-white/10"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Headline / Summary */}
              <p className="text-[12.5px] text-neutral-300 leading-relaxed border-t border-white/10 pt-3">
                {portfolioData.headline}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium">Primary Focus</div>
                <div className="text-[14px] font-bold text-white mt-0.5">Data Analytics & ML</div>
                <div className="text-[9.5px] text-cyan-400 mt-0.5">RAG & Knowledge Systems</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium">Academic CGPA</div>
                <div className="text-[14px] font-bold text-amber-300 mt-0.5">8.32 / 10.0</div>
                <div className="text-[9.5px] text-neutral-400 mt-0.5">B.Tech CSE (AI & ML)</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium">Model Accuracy (5G KPI)</div>
                <div className="text-[14px] font-bold text-emerald-400 mt-0.5">96.2% F1-Score</div>
                <div className="text-[9.5px] text-neutral-400 mt-0.5">Random Forest Telemetry</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium">Certifications</div>
                <div className="text-[14px] font-bold text-purple-400 mt-0.5">4+ Credentials</div>
                <div className="text-[9.5px] text-neutral-400 mt-0.5">Oracle, Tata, Deloitte</div>
              </div>
            </div>

            {/* Who I Am / Editorial */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-[13px] font-bold text-white">Who I Am & Professional Background</h3>
              </div>
              <p className="text-[12.5px] text-neutral-300 leading-relaxed">
                {portfolioData.bio}
              </p>
              <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/5 text-[12px] text-neutral-300 leading-relaxed">
                <span className="font-semibold text-white">Engineering Philosophy: </span>
                Strict grounding, measurable evaluation benchmarks (latency budgets, precision, recall), and high-craftsmanship user interfaces across web and native paradigms.
              </div>
            </div>

            {/* Practical Work Experience (Internship) */}
            {portfolioData.experience.length > 0 && (
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <h3 className="text-[13px] font-bold text-white">Practical Experience</h3>
                </div>
                {portfolioData.experience.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[13px] text-white">{exp.role}</div>
                        <div className="text-[11px] text-cyan-400">{exp.company} • {exp.type} ({exp.location})</div>
                      </div>
                      <span className="text-[10.5px] text-neutral-400 font-mono">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-inside text-[11.5px] text-neutral-300 space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="leading-relaxed">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: TECHNICAL SKILLS ===================== */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* AI / Machine Learning Skills */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <h3 className="text-[13px] font-bold text-white">AI & Machine Learning</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'RAG Pipelines', 'LangGraph', 'LlamaIndex', 'Vector Databases (Qdrant, Faiss)', 
                    'Scikit-Learn', 'PyTorch', 'XGBoost', 'Random Forest', 
                    'Cross-Encoder Re-ranking', 'Prompt Grounding', 'Ragas Evaluation'
                  ].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11.5px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Analytics & Modeling */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-[13px] font-bold text-white">Data Analytics & Statistics</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Pandas', 'NumPy', 'Exploratory Data Analysis (EDA)', 'Statistical Modeling', 
                    'KPI Dashboards', 'Streamlit', 'Matplotlib / Seaborn', 'Data Cleansing & Preprocessing',
                    'ROC-AUC & F1 Validation', 'Forensic Data Analysis'
                  ].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11.5px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programming & Databases */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <h3 className="text-[13px] font-bold text-white">Programming & Development</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Python (Advanced)', 'TypeScript', 'JavaScript (ES6+)', 'SQL / Database Queries', 
                    'FastAPI', 'Express.js', 'REST APIs', 'Git & GitHub', 'Bash / Terminal'
                  ].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11.5px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* UI & Software Engineering */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <h3 className="text-[13px] font-bold text-white">Frontend & System Design</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'React 18', 'Tailwind CSS', 'Apple HIG Design Systems', 'Full-Stack Architecture', 
                    'Server-Sent Events (SSE)', 'Performance Optimization', 'Component Modularity'
                  ].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11.5px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: FEATURED PROJECTS ===================== */}
        {activeTab === 'projects' && (
          <div className="space-y-3.5">
            {portfolioData.projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 transition-all space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{proj.category}</span>
                    <h3 className="text-[15px] font-bold text-white mt-0.5">{proj.title}</h3>
                    <p className="text-[12px] text-neutral-400 font-medium">{proj.subtitle}</p>
                  </div>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-blue-600 text-white text-[11px] font-medium flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <p className="text-[12px] text-neutral-300 leading-relaxed">{proj.description}</p>

                {/* Key Highlights */}
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                  {proj.highlights.slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-neutral-800 text-[10.5px] text-neutral-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== TAB 4: EDUCATION & CERTS ===================== */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {/* Education Section */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <GraduationCap className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-[13px] font-bold text-white">Formal Academic Background</h3>
              </div>
              <div className="space-y-3">
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-[13px] text-white">{edu.degree}</div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10.5px] font-bold font-mono self-start sm:self-auto">
                        {edu.score}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-cyan-400">{edu.institution} ({edu.location})</div>
                    <div className="text-[10.5px] text-neutral-400 font-mono">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <Award className="w-4.5 h-4.5 text-amber-400" />
                <h3 className="text-[13px] font-bold text-white">Verified Industry Certifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {portfolioData.certificates.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-400">{cert.issuer}</span>
                        <span className="text-[10px] text-neutral-400">{cert.date}</span>
                      </div>
                      <h4 className="font-bold text-[12px] text-white mt-0.5">{cert.title}</h4>
                      <p className="text-[10.5px] text-neutral-300 mt-1 leading-snug">{cert.description}</p>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[10px] text-neutral-400">
                      <span>ID: {cert.credentialId}</span>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: CONTACT & RECRUITER ACTIONS ===================== */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <h3 className="text-[13px] font-bold text-white">Get in Touch with Abinash</h3>
              </div>
              <p className="text-[12px] text-neutral-300">
                Available for interviews, technical screenings, and high-impact data analytics / AI engineering roles.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {/* Email */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400">Direct Email</div>
                      <a href={`mailto:${portfolioData.email}`} className="text-[12px] font-semibold text-white truncate block hover:underline">
                        {portfolioData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyText(portfolioData.email, 'email')}
                    className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedContact === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400">Direct Phone</div>
                      <a href={`tel:${portfolioData.phone}`} className="text-[12px] font-semibold text-white truncate block hover:underline">
                        {portfolioData.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyText(portfolioData.phone, 'phone')}
                    className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                    title="Copy Phone"
                  >
                    {copiedContact === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400">LinkedIn Profile</div>
                      <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-cyan-400 truncate block hover:underline">
                        in/abinash-swain-a941a3330
                      </a>
                    </div>
                  </div>
                  <a
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* GitHub */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Github className="w-4 h-4 text-purple-400 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400">GitHub Repositories</div>
                      <a href={portfolioData.github} target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-cyan-400 truncate block hover:underline">
                        github.com/abinash123hg
                      </a>
                    </div>
                  </div>
                  <a
                    href={portfolioData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Status Footer */}
      <div className="h-10 px-5 border-t border-white/10 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between text-[11px] text-neutral-400 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified candidate data from Centurion University of Technology and Management (CUTM)</span>
        </div>
        <div className="font-mono text-cyan-400">
          Status: {portfolioData.availabilityStatus.split(' ')[0]}
        </div>
      </div>
    </div>
  );
};
