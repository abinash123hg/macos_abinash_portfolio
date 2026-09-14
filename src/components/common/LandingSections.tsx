/**
 * Below-the-fold landing sections (About, Expertise, Systems, Workflow,
 * Projects, Experience, Certifications, Contact).
 *
 * This module is code-split and loaded lazily from LandingScreen so the
 * hero/above-the-fold content stays in the smallest possible initial chunk.
 */
import React from 'react';
import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  SearchCode,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

const capabilities = [
  { icon: BrainCircuit, label: 'LLMs' },
  { icon: SearchCode, label: 'RAG & Vector Search' },
  { icon: Bot, label: 'MCP & AI Agents' },
  { icon: ChartNoAxesCombined, label: 'Machine Learning' },
  { icon: Database, label: 'Data Analytics' },
  { icon: GraduationCap, label: 'B.Tech CSE (AI & ML)' },
  { icon: BriefcaseBusiness, label: 'InternPe Data Analyst Intern' },
  { icon: GraduationCap, label: 'TutorialsPoint AI/ML Developer' },
];

const expertise = [
  {
    icon: BrainCircuit,
    title: 'AI & LLM Applications',
    text: 'LLM-powered applications, AI assistants, structured generation, and practical intelligent workflows.',
  },
  {
    icon: SearchCode,
    title: 'RAG & Knowledge Systems',
    text: 'Document-based AI applications using embeddings, vector search, semantic retrieval, and grounded responses.',
  },
  {
    icon: Bot,
    title: 'MCP & AI Agents',
    text: 'Tool-using AI systems built with MCP, structured tool calling, and agent-based workflows.',
  },
];

const mlDataAreas = [
  {
    title: 'Machine Learning',
    text: 'I work with data preprocessing, feature engineering, classification, regression, neural networks, model training, and evaluation to build predictive solutions.',
  },
  {
    title: 'Data Analytics',
    text: 'I use Python, SQL, Pandas, NumPy, exploratory analysis, and visualization to understand datasets, identify patterns, and turn data into useful insights.',
  },
];

const systems = [
  { title: 'LLM Applications', text: 'LLMs · Prompt Engineering · Generative AI · AI Assistants' },
  { title: 'RAG Systems', text: 'Embeddings · Vector Search · Vector Databases · Semantic Retrieval' },
  { title: 'MCP & Agentic AI', text: 'MCP · AI Agents · Tool Calling · Workflow Automation' },
  { title: 'Machine Learning', text: 'Python · Scikit-learn · Neural Networks · Model Evaluation' },
  { title: 'Data Analytics', text: 'Python · SQL · Pandas · NumPy · Data Visualization' },
];

const workflow = [
  { step: '01', name: 'Understand', text: 'Analyze the problem, data, documents, requirements, and expected outcome.' },
  { step: '02', name: 'Build', text: 'Develop the ML model, RAG pipeline, LLM application, MCP server, or AI-agent workflow.' },
  { step: '03', name: 'Evaluate', text: 'Measure model performance, retrieval quality, reliability, and output quality using appropriate evaluation methods.' },
  { step: '04', name: 'Improve', text: 'Refine prompts, retrieval, models, workflows, and user experience based on evaluation results.' },
  { step: '05', name: 'Deliver', text: 'Turn the solution into a usable application or interactive system.' },
];

const projects = [
  {
    projectNumber: '01',
    name: 'MCP Server for Local ML Operations',
    description: 'A Python MCP server built with the MCP FastMCP SDK for local machine-learning workflows, including dataset profiling, model training, hyperparameter optimization, evaluation, and tool-based interaction with AI applications.',
    technologies: ['Python', 'MCP', 'FastMCP', 'Scikit-learn', 'Pandas'],
    githubUrl: 'https://github.com/abinash123hg/agentic-mlops-mcp-engine.git',
    projectUrl: '',
  },
  {
    projectNumber: '02',
    name: 'RAG Knowledge Assistant',
    description: 'A retrieval-based AI application that processes documents, creates embeddings, searches relevant content, and uses an LLM to generate grounded answers.',
    technologies: ['Python', 'LLM', 'RAG', 'Embeddings', 'Vector Database'],
    githubUrl: 'https://github.com/abinash123hg/docurag-engine',
    projectUrl: '',
  },
  {
    projectNumber: '03',
    name: 'LLM-Powered Data Analyst',
    description: 'An AI analytics application that allows users to ask questions about datasets in natural language and receive structured analytical insights and visual exploration support.',
    technologies: ['Python', 'LLM', 'Pandas', 'SQL', 'Data Visualization'],
    githubUrl: '',
    projectUrl: '',
  },
  {
    projectNumber: '04',
    name: 'AI Agent System',
    description: 'A tool-using AI workflow that combines an LLM, structured tools, contextual information, and task execution for multi-step workflows.',
    technologies: ['Python', 'LLM', 'AI Agents', 'Tool Calling', 'MCP'],
    githubUrl: 'https://github.com/abinash123hg/team-copilot-agent',
    projectUrl: '',
  },
  {
    projectNumber: '05',
    name: 'Smart Inventory AI',
    description: 'An AI/ML project focused on inventory analysis and prediction using data-driven techniques to support inventory-related decisions.',
    technologies: ['Python', 'Machine Learning', 'Pandas', 'Data Analytics'],
    githubUrl: '',
    projectUrl: '',
  },
];

const experience = [
  {
    title: 'Data Analyst Intern',
    organization: 'InternPe',
    range: 'August 2026 – Present',
    icon: BriefcaseBusiness,
    text: 'Data preprocessing, exploratory data analysis, machine learning models, predictive analytics, and project development.',
  },
  {
    title: 'AI/ML Developer',
    organization: 'TutorialsPoint',
    range: 'June 2026 – Present',
    icon: GraduationCap,
    text: 'AI/ML development, RAG, deep learning, LLM-related systems, and intelligent applications.',
  },
];

const certifications = [
  {
    organization: 'Oracle',
    title: 'Oracle Agentic AI Foundations Associate',
    issuer: 'Oracle',
    credential: '1Z0-1157-26',
    date: 'August 17, 2026',
    description: 'Oracle Agentic AI Foundations Associate credential.',
  },
  {
    organization: 'Adobe',
    title: 'AI Essentials for Marketers: Mindset, Use Cases and Workflows',
    issuer: 'Adobe',
    credential: '',
    date: '',
    description: 'Adobe AI essentials learning credential for marketing workflows and generative AI use cases.',
  },
  {
    organization: 'Deloitte',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    credential: '',
    date: '',
    description: 'Deloitte data analytics job simulation focused on practical analytics and interpretation.',
  },
  {
    organization: 'Tata / Forage',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata / Forage',
    credential: '',
    date: '',
    description: 'GenAI-powered data analytics job simulation covering practical analytics and insight workflows.',
  },
  {
    organization: 'TutorialsPoint',
    title: 'AI/ML Developer',
    issuer: 'TutorialsPoint Academy',
    credential: '',
    date: 'June 2026 – Present',
    description: 'AI/ML development, RAG, deep learning, LLM-related systems, and intelligent applications.',
  },
  {
    organization: 'InternPe',
    title: 'Data Analyst Internship Certificate',
    issuer: 'InternPe',
    credential: '',
    date: 'August 2026 – Present',
    description: 'Data analytics internship certificate covering preprocessing, exploratory analysis, machine learning, and predictive analytics.',
  },
];

interface LandingSectionsProps {
  showSystemHud?: boolean;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ showSystemHud = false }) => {
  return (
    <>
      {!showSystemHud && (
        <section className="portfolio-capabilities">
          <div className="portfolio-section-title">
            <span className="portfolio-kicker">Core Capabilities</span>
          </div>
          <div className="portfolio-capability-grid">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article className="portfolio-capability" key={capability.label}>
                  <Icon size={18} />
                  <span>{capability.label}</span>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section id="about" className="portfolio-section portfolio-about">
        <div className="portfolio-section-heading">
          <span className="portfolio-kicker">About</span>
          <h2>About Abinash</h2>
        </div>
        <div className="portfolio-about-grid">
          <div className="portfolio-about-copy">
            <p>I am a B.Tech Computer Science &amp; Engineering student specializing in Artificial Intelligence &amp; Machine Learning at Centurion University of Technology and Management. I work on machine learning, data analytics, LLM applications, RAG systems, MCP-based tooling, and AI agents, with a focus on building practical solutions.</p>
            <div className="portfolio-profile-facts">
              <div><span className="fact-label">B.Tech CSE — AI &amp; ML</span></div>
              <div><span className="fact-label">Centurion University of Technology and Management</span></div>
              <div><span className="fact-label">Data Analyst Intern — InternPe</span></div>
              <div><span className="fact-label">AI/ML Developer — TutorialsPoint</span></div>
            </div>
          </div>
        </div>
      </section>
<section id="expertise" className="portfolio-section portfolio-expertise">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Expertise</span>
          <h2>What I Build</h2>
        </div>
        <div className="portfolio-expertise-grid">
          {expertise.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="portfolio-expertise-card" key={item.title}>
                <span className="portfolio-card-number">0{index + 1}</span>
                <span className="portfolio-expertise-icon"><Icon size={24} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="portfolio-expertise-ml-data">
          <div className="portfolio-section-heading centered">
            <span className="portfolio-kicker">How I Work With ML &amp; Data</span>
          </div>
          <div className="portfolio-expertise-ml-data-grid">
            {mlDataAreas.map((item) => (
              <article className="portfolio-expertise-ml-data-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-systems">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Technology Stack</span>
          <h2>Technology Stack</h2>
        </div>
        <div className="portfolio-systems-grid">
          {systems.map((item, index) => (
            <article className="portfolio-system-card" key={item.title}>
              <span className="portfolio-system-card__number">0{index + 1}</span>
              <div className="portfolio-system-card__content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-workflow">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Workflow</span>
          <h2>How I Build AI Solutions</h2>
        </div>
        <div className="portfolio-workflow-grid">
          {workflow.map((item) => (
            <article className="portfolio-workflow-step" key={item.step}>
              <span className="portfolio-workflow-step__number">{item.step}</span>
              <div className="portfolio-workflow-step__content">
                <span className="portfolio-workflow-step__name">{item.name}</span>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="portfolio-section portfolio-work">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Portfolio</span>
          <h2>Featured Work</h2>
          <p>A selection of projects focused on practical AI, machine learning, retrieval systems, data analysis, and intelligent automation.</p>
        </div>
        <div className="portfolio-project-grid">
          {projects.map((project) => (
            <article className="portfolio-project-card" key={project.name}>
              <div className="portfolio-project-preview">
                <div className="portfolio-project-preview__top">
                  <span className="portfolio-project-number">{project.projectNumber}</span>
                  <Sparkles size={16} />
                </div>
                <div className="portfolio-project-preview__code">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className="portfolio-project-body">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tag-row">
                  {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <div className="portfolio-project-actions">
                  {project.projectUrl && (
                    <a className="portfolio-button portfolio-button--tiny" href={project.projectUrl}>
                      <span>View Project</span><ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      className="portfolio-button portfolio-button--ghost"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <Github size={14} />GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-experience">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Experience</span>
          <h2>Experience</h2>
        </div>
        <div className="portfolio-experience-grid">
          {experience.map((item) => {
            const Icon = item.icon;
            return (
              <article className="portfolio-experience-card" key={item.title}>
                <span className="portfolio-experience-icon"><Icon size={24} /></span>
                <div>
                  <span className="portfolio-experience-title">{item.title}</span>
                  <span className="portfolio-experience-org">{item.organization}</span>
                  <span className="portfolio-experience-range">{item.range}</span>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="portfolio-section portfolio-certifications">
        <div className="portfolio-section-heading centered">
          <span className="portfolio-kicker">Certifications &amp; Learning</span>
          <h2>Certifications &amp; Learning</h2>
          <p>Certifications and practical learning across AI, data analytics, and emerging technologies.</p>
        </div>
        <div className="portfolio-certification-grid">
          {certifications.map((item) => (
            <article className="portfolio-certification-card" key={item.title}>
              <div className="portfolio-certification-card__body">
                <span className="portfolio-certification-issuer">{item.organization}</span>
                <h3 className="portfolio-certification-title">{item.title}</h3>
                <div className="portfolio-certification-meta">
                  <span className="portfolio-certification-label">Issuer</span>
                  <span className="portfolio-certification-value">{item.issuer}</span>
                </div>
                {item.credential && (
                  <div className="portfolio-certification-meta">
                    <span className="portfolio-certification-label">Credential</span>
                    <span className="portfolio-certification-value">{item.credential}</span>
                  </div>
                )}
                {item.date && (
                  <div className="portfolio-certification-meta">
                    <span className="portfolio-certification-label">Date</span>
                    <span className="portfolio-certification-value">{item.date}</span>
                  </div>
                )}
                <p className="portfolio-certification-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="portfolio-section portfolio-contact">
        <div className="portfolio-contact-box">
          <div className="portfolio-contact-copy">
            <span className="portfolio-kicker">Contact</span>
            <h2>Let&rsquo;s Build Something Practical</h2>
            <p>Interested in AI/ML projects, LLM applications, RAG systems, MCP tooling, data analytics, internships, or collaboration? Feel free to get in touch.</p>
            <div className="portfolio-contact-actions">
              <a className="portfolio-button portfolio-button--primary" href={`mailto:${portfolioData.email}`} aria-label={`Email Abinash Swain at ${portfolioData.email}`}>
                <Mail size={16} />Email Me
              </a>
              <a className="portfolio-button portfolio-button--secondary" href={portfolioData.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Abinash Swain's LinkedIn profile">
                <Linkedin size={16} />LinkedIn
              </a>
              <a className="portfolio-button portfolio-button--secondary" href={portfolioData.github} target="_blank" rel="noreferrer" aria-label="Visit Abinash Swain's GitHub profile">
                <Github size={16} />GitHub
              </a>
              <a className="portfolio-button portfolio-button--secondary" href="/Abinash-Swain-Resume.pdf" download aria-label="Download Abinash Swain's resume (PDF)">
                <Download size={16} />View Resume
              </a>
            </div>
          </div>
          <div className="portfolio-contact-side">
            <div className="portfolio-contact-icon"><Mail size={30} /></div>
            <span className="portfolio-contact-orbit"></span>
          </div>
        </div>
      </section>
    </>
  );
};