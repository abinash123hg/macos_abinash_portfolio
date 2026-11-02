import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Database, ExternalLink, FileText, Flame, Github, GraduationCap, Layers3, Linkedin, Mail, MapPin, Menu, Network, Orbit, ShieldCheck, Sparkles, X } from "lucide-react";

type Project = { id: string; code: string; title: string; subtitle: string; description: string; category: "RAG" | "Agents" | "ML"; tags: string[]; status: string; url?: string; detail: string };

const projects: Project[] = [
  { id:"doculens", code:"S-01", title:"DocuLens", subtitle:"Retrieval-Augmented Vision AI Assistant for Image Analytics", description:"A local document assistant that reads PDFs and scanned pages, then answers with page-level sources instead of guessing.", category:"RAG", tags:["FastAPI","FAISS","Ollama","OCR","Hybrid retrieval"], status:"Core mission", url:"https://github.com/abinash123hg/retrieval-augmented-vision-ai-assistant", detail:"DocuLens combines OCR and document extraction with FAISS dense retrieval, a lightweight lexical reranking stage, grounded answer generation and page-level citations. It is designed to refuse when the uploaded material does not contain enough evidence." },
  { id:"handwriting", code:"S-02", title:"Document Understanding Agent", subtitle:"Handwritten Text Recognition", description:"A private, local document Q&A workflow built around reading handwritten pages and keeping answers tied to the selected file.", category:"RAG", tags:["TrOCR","Tesseract","Dense + BM25","Python","Ollama"], status:"Core mission", url:"https://github.com/abinash123hg/document-understanding-agent", detail:"The pipeline prepares page images, recognises handwriting, normalises and chunks the text, then retrieves evidence with dense and lexical signals. Answers are checked and linked back to source excerpts. Real-handwriting accuracy is not claimed without a measured transcript." },
  { id:"mcp", code:"A-03", title:"MLOps MCP Engine", subtitle:"Model Context Protocol Server", description:"An offline MCP server that exposes practical tools for dataset profiling, model training, tuning and evaluation.", category:"Agents", tags:["MCP","Python","scikit-learn","TensorFlow","MLOps"], status:"Core mission", url:"https://github.com/abinash123hg/agentic-mlops-mcp-engine", detail:"The server provides nine tools for dataset cleaning, classical ML and neural-network training, hyperparameter optimisation, metric plots and report generation. It uses local files and keeps protocol output separate from operational logs." },
  { id:"inventory", code:"B-04", title:"Smart Inventory System", subtitle:"AI-powered Smart Inventory Management", description:"A Python project focused on using data and machine-learning ideas to support inventory decisions.", category:"ML", tags:["Python","Machine Learning","Data analysis"], status:"Training project", detail:"A project completed as part of the TutorialsPoint Academy work. This entry stays at summary level rather than adding unverified performance figures." },
  { id:"prediction", code:"B-05", title:"Prediction Lab", subtitle:"Car Price & IPL Prediction", description:"Applied machine-learning exercises covering price estimation and sports-outcome prediction.", category:"ML", tags:["Random Forest","Python","Google Colab","ML workflow"], status:"Practice missions", detail:"The work includes a Random Forest car-price prediction exercise and an IPL prediction project. No accuracy or performance figure is shown because a verified benchmark was not supplied." }
];

const skills = [
  {name:"RAG & Knowledge Systems",icon:Network},{name:"LLM Applications",icon:BrainCircuit},{name:"MCP & AI Agents",icon:Orbit},{name:"Vector Databases",icon:Database},{name:"Machine Learning",icon:Layers3},{name:"Python & TypeScript",icon:Code2}
];
const certificates = [
  {name:"Oracle Agentic AI Foundations Associate",issuer:"Oracle",note:"Certification"},
  {name:"Adobe AI Essentials for Marketers",issuer:"Adobe",note:"Certificate"},
  {name:"GenAI Powered Data Analytics",issuer:"TATA · Forage",note:"Job simulation"},
  {name:"Data Analytics Job Simulation",issuer:"Deloitte · Forage",note:"Job simulation"}
];
const filters = ["All","RAG","Agents","ML"];

function Mark(){return <span className="konoha-mark" aria-hidden="true"><span className="mark-ring"/><span className="mark-comma">◔</span></span>}
function Heading({index,eyebrow,title,copy}:{index:string;eyebrow:string;title:string;copy:string}){return <div className="section-heading"><div className="section-index">{index}</div><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-copy">{copy}</p></div></div>}

export default function App(){
  const [mobileOpen,setMobileOpen]=useState(false);
  const [activeFilter,setActiveFilter]=useState("All");
  const [selected,setSelected]=useState<Project|null>(null);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>24);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
  useEffect(()=>{document.body.style.overflow=selected?"hidden":"";return()=>{document.body.style.overflow=""}},[selected]);
  const visible=useMemo(()=>activeFilter==="All"?projects:projects.filter(p=>p.category===activeFilter),[activeFilter]);
  const close=()=>setMobileOpen(false);
  return <div className="shinobi-site">
    <div className="grain" aria-hidden="true"/>
    <header className={scrolled?"site-header is-scrolled":"site-header"}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={close}><Mark/><span>ABINASH<span className="brand-dot">.</span></span></a>
        <div className="desktop-nav"><a href="#about">Profile</a><a href="#missions">Missions</a><a href="#arsenal">Arsenal</a><a href="#field">Field log</a><a href="#contact">Contact</a></div>
        <a className="nav-cta" href="#contact">Recruiter access <ArrowUpRight size={15}/></a>
        <button className="mobile-toggle" onClick={()=>setMobileOpen(!mobileOpen)} aria-label={mobileOpen?"Close menu":"Open menu"} aria-expanded={mobileOpen}>{mobileOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </nav>
      {mobileOpen&&<div className="mobile-nav">{["about","missions","arsenal","field","contact"].map(item=><a key={item} href={"#"+item} onClick={close}>{item==="field"?"Field log":item}</a>)}</div>}
    </header>
    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="status-line"><span className="status-dot"/> HIDDEN LEAF · AI / ML DIVISION <span className="status-rule"/></div>
          <p className="hero-overline">THE NEXT MISSION STARTS WITH A QUESTION</p>
          <h1>Building intelligent systems<span className="title-mark">.</span><br/><em>One mission at a time.</em></h1>
          <p className="hero-intro">I'm <strong>Abinash Swain</strong> — an AI/ML developer focused on RAG, LLM applications, MCP and practical machine-learning systems.</p>
          <p className="hero-tagline">Building practical AI systems from data to intelligent decisions.</p>
          <div className="hero-actions"><a className="button button-primary" href="#missions">Explore missions <ArrowRight size={16}/></a><a className="button button-ghost" href="https://github.com/abinash123hg" target="_blank" rel="noreferrer"><Github size={16}/> GitHub profile <ArrowUpRight size={14}/></a></div>
          <div className="hero-meta"><span><MapPin size={14}/> Bhubaneswar, Odisha</span><span className="meta-divider"/><span><GraduationCap size={15}/> B.Tech CSE · AI & ML</span></div>
        </div>
        <div className="hero-art" aria-label="Original ninja village inspired illustration">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="moon-disc"><span className="moon-cut"/></div>
          <div className="village-label"><span>木ノ葉</span><small>WILL OF FIRE</small></div>
          <div className="mountain mountain-back"/><div className="mountain mountain-front"/>
          <div className="torii"><i/><i/><b/><b/><span/></div><div className="art-vertical">木ノ葉隠れの里</div>
          <div className="art-caption"><span>FIELD RECORD 001</span><span>EST. BY CURIOSITY</span></div>
          <div className="hero-seal"><Mark/><span>AI / ML</span></div>
        </div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></div>
      </section>
      <section className="field-strip" aria-label="Portfolio overview"><div className="strip-inner">
        <div className="strip-item"><span className="strip-number">05</span><span><b>Featured missions</b><small>Selected builds & projects</small></span></div><div className="strip-separator"/>
        <div className="strip-item"><span className="strip-number">03</span><span><b>Core focus areas</b><small>RAG · Agents · Machine learning</small></span></div><div className="strip-separator"/>
        <div className="strip-item"><span className="strip-number">01</span><span><b>Working principle</b><small>Build useful things. Verify the work.</small></span></div>
      </div></section>

      <section className="about-section section-wrap" id="about">
        <Heading index="01" eyebrow="SHINOBI PROFILE" title="A little about the developer." copy="Curiosity starts the work. Clear evidence and useful outcomes keep it honest."/>
        <div className="about-grid">
          <article className="id-card"><div className="id-card-top"><span>HIDDEN LEAF · PERSONNEL FILE</span><span className="file-stamp">ACTIVE</span></div>
            <div className="id-main"><div className="id-avatar"><div className="avatar-sun"/><div className="avatar-silhouette"><i/><b/></div><span>AS</span></div>
              <div className="id-name"><p>SHINOBI ID · 001</p><h3>Abinash<br/>Swain</h3><span>AI / ML DEVELOPER</span></div></div>
            <div className="id-divider"><span/><Mark/><span/></div>
            <div className="id-details"><div><small>VILLAGE</small><b>Bhubaneswar, India</b></div><div><small>DISCIPLINE</small><b>Computer Science · AI & ML</b></div><div><small>RANK</small><b>Developer · 3rd-year student</b></div><div><small>FOCUS</small><b>RAG · LLMs · MCP · ML</b></div></div>
            <div className="id-card-bottom"><span>DATA CLASSIFICATION: PUBLIC</span><span>AS / 2026</span></div>
          </article>
          <div className="about-story"><p className="story-lead">I like building systems that solve a real problem — not just demos that look impressive.</p>
            <p>My work sits around document intelligence, retrieval systems, local AI and machine-learning workflows. I enjoy understanding how the pieces fit together: from extracting useful data to retrieving the right context and producing an answer that can be checked.</p>
            <p>I'm pursuing a B.Tech in Computer Science and Engineering (AI & ML) at Centurion University of Technology and Management. Alongside academics, I've worked on applied projects and data-focused internship tasks.</p>
            <div className="experience-list">
              <div className="experience-row"><span className="exp-icon"><Code2 size={17}/></span><div><b>AI/ML Developer</b><small>TutorialsPoint Academy · Profile role</small></div><span className="exp-arrow">↗</span></div>
              <div className="experience-row"><span className="exp-icon"><Database size={17}/></span><div><b>Data Analyst Intern</b><small>InternPe · Data and ML project work</small></div><span className="exp-arrow">↗</span></div>
              <div className="experience-row"><span className="exp-icon"><GraduationCap size={17}/></span><div><b>B.Tech CSE · AI & ML</b><small>Centurion University · 3rd year</small></div><span className="exp-arrow">↗</span></div>
            </div>
            <a className="text-link" href="https://www.linkedin.com/in/abinash-swain-a941a3330" target="_blank" rel="noreferrer">View professional profile <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      <section className="missions-section section-wrap" id="missions">
        <Heading index="02" eyebrow="MISSION BOARD" title="Work from the field." copy="A selection of projects I've worked on — each one a different problem to understand and solve."/>
        <div className="mission-toolbar"><div className="mission-note"><Flame size={15}/> TEAM 07 · S-RANK / A-RANK MISSIONS</div><div className="filter-tabs" role="group" aria-label="Filter projects">{filters.map(f=><button key={f} className={activeFilter===f?"filter-tab active":"filter-tab"} onClick={()=>setActiveFilter(f)}>{f}</button>)}</div></div>
        <div className="mission-grid">{visible.map((p,i)=><button className={"mission-card "+(i===0?"mission-featured":"")} key={p.id} onClick={()=>setSelected(p)}>
          <div className="mission-top"><span className="mission-code">{p.code} / {p.category}</span><span className="mission-status"><span/>{p.status}</span></div>
          <div className="mission-symbol">{p.id==="doculens"?<FileText size={26}/>:p.id==="handwriting"?<Layers3 size={26}/>:p.id==="mcp"?<Orbit size={26}/>:p.id==="inventory"?<Database size={26}/>:<BrainCircuit size={26}/>}</div>
          <div className="mission-content"><p className="mission-subtitle">{p.subtitle}</p><h3>{p.title}</h3><p className="mission-description">{p.description}</p></div>
          <div className="mission-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          <div className="mission-bottom"><span>OPEN MISSION BRIEF</span><ArrowUpRight size={17}/></div>
        </button>)}</div>
        <p className="mission-footnote">Project descriptions are kept to the work documented in repositories and training records. No unverified performance claims are displayed.</p>
      </section>

      <section className="arsenal-section section-wrap" id="arsenal">
        <Heading index="03" eyebrow="NINJA ARSENAL" title="Tools I work with." copy="A practical toolkit across AI applications, retrieval, data and product development."/>
        <div className="arsenal-grid">
          <div className="arsenal-map"><div className="map-header"><span>SKILL RADAR · CONSTELLATION</span><span>FIELD MAP · 06 NODES</span></div>
            <div className="constellation"><div className="constellation-ring ring-a"/><div className="constellation-ring ring-b"/><div className="constellation-ring ring-c"/>
              <svg viewBox="0 0 420 340" className="constellation-lines" aria-hidden="true"><path d="M210 45 L335 115 L335 245 L210 300 L85 245 L85 115 Z M210 45 L210 300 M85 115 L335 245 M335 115 L85 245"/></svg>
              <div className="constellation-core"><Mark/><span>CORE</span></div>
              {skills.map((s,i)=>{const Icon=s.icon;return <div className={"skill-node node-"+i} key={s.name}><span><Icon size={17}/></span><b>{s.name}</b></div>})}
            </div><div className="map-legend"><span><i/> CORE DISCIPLINES</span><span><i/> CONNECTED TOOLING</span></div>
          </div>
          <div className="toolkit">
            <div className="toolkit-group"><p className="toolkit-label">AI & KNOWLEDGE</p><div className="tool-pills"><span>RAG</span><span>LLM Applications</span><span>Prompt Design</span><span>Vector Databases</span><span>FAISS</span><span>BM25</span><span>NLP</span><span>OCR</span></div></div>
            <div className="toolkit-group"><p className="toolkit-label">AGENTS & BACKEND</p><div className="tool-pills"><span>MCP</span><span>AI Agents</span><span>Python</span><span>FastAPI</span><span>Ollama</span><span>REST APIs</span></div></div>
            <div className="toolkit-group"><p className="toolkit-label">ML & PRODUCT</p><div className="tool-pills"><span>Machine Learning</span><span>scikit-learn</span><span>TensorFlow</span><span>React</span><span>TypeScript</span><span>Git & GitHub</span></div></div>
            <div className="arsenal-callout"><ShieldCheck size={19}/><p><b>My working rule</b><span>Ground the answer. Check the source. Be clear about limits.</span></p></div>
          </div>
        </div>
      </section>

      <section className="field-section section-wrap" id="field">
        <Heading index="04" eyebrow="STATS FROM THE FIELD" title="The work behind the profile." copy="A quick look at the areas that shape my projects and the way I approach them."/>
        <div className="field-grid">
          <div className="field-stat"><span className="stat-icon"><Network size={19}/></span><strong>RAG</strong><b>Meaningful retrieval</b><p>Dense search, lexical signals, reranking and grounded answers.</p></div>
          <div className="field-stat"><span className="stat-icon"><BrainCircuit size={19}/></span><strong>LLM</strong><b>Evidence-first AI</b><p>Local models, bounded context and clear refusal when evidence is missing.</p></div>
          <div className="field-stat"><span className="stat-icon"><Orbit size={19}/></span><strong>MCP</strong><b>Useful tool workflows</b><p>Structured tools that connect models with practical ML tasks.</p></div>
          <div className="field-stat"><span className="stat-icon"><Database size={19}/></span><strong>ML</strong><b>Data to decisions</b><p>Profiling, model training, evaluation and clear reporting.</p></div>
        </div>
        <div className="village-panel"><div className="village-copy"><p className="eyebrow">CONTRIBUTION VILLAGE</p><h3>Small commits.<br/><em>Steady progress.</em></h3><p>My public GitHub activity, shown directly from my GitHub profile.</p><a className="text-link" href="https://github.com/abinash123hg" target="_blank" rel="noreferrer">Visit the village <ArrowUpRight size={15}/></a></div>
          <div className="contribution-wrap"><div className="contribution-top"><span>GITHUB CONTRIBUTIONS</span><span>LIVE PROFILE GRAPH</span></div><img src="https://ghchart.rshah.org/abinash123hg" alt="GitHub contribution graph for abinash123hg" loading="lazy"/><div className="contribution-bottom"><span>LESS</span><i/><i/><i/><i/><i/><span>MORE</span></div></div>
        </div>
      </section>

      <section className="cert-section section-wrap"><Heading index="05" eyebrow="SCROLLS & CERTIFICATIONS" title="Learning, documented." copy="A few credentials and job simulations completed along the way."/>
        <div className="cert-grid">{certificates.map((c,i)=><article className="cert-card" key={c.name}><div className="cert-icon"><FileText size={18}/></div><div className="cert-info"><span>{c.issuer} · {c.note}</span><h3>{c.name}</h3></div><span className="cert-number">0{i+1}</span></article>)}</div>
      </section>

      <section className="contact-section section-wrap" id="contact"><div className="contact-frame"><div className="contact-seal"><Mark/></div><p className="eyebrow">NEXT MISSION · YOUR TEAM?</p><h2>Let's build something<br/><em>worth shipping.</em></h2><p className="contact-copy">Open to conversations around AI/ML projects, internships and opportunities where I can build, learn and contribute.</p>
        <a className="button button-primary contact-button" href="mailto:swainabinash839@gmail.com">Send a message <ArrowUpRight size={16}/></a>
        <div className="contact-links"><a href="https://github.com/abinash123hg" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href="https://www.linkedin.com/in/abinash-swain-a941a3330" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href="mailto:swainabinash839@gmail.com"><Mail size={16}/> Email</a></div>
      </div></section>
    </main>
    <footer className="site-footer"><a className="footer-brand" href="#top"><Mark/> ABINASH SWAIN</a><span>Built with curiosity, patience and a little chakra.</span><span>© 2026 · HIDDEN LEAF / AI DIVISION</span></footer>
    {selected&&<div className="modal-backdrop" role="presentation" onClick={()=>setSelected(null)}><section className="mission-modal" role="dialog" aria-modal="true" aria-labelledby="mission-modal-title" onClick={e=>e.stopPropagation()}>
      <div className="modal-top"><span>{selected.code} / MISSION BRIEF</span><button onClick={()=>setSelected(null)} aria-label="Close mission brief"><X size={20}/></button></div>
      <div className="modal-symbol"><Sparkles size={23}/></div><p className="eyebrow">{selected.category} · {selected.status}</p><h2 id="mission-modal-title">{selected.title}</h2><p className="modal-subtitle">{selected.subtitle}</p><p className="modal-detail">{selected.detail}</p>
      <div className="mission-tags modal-tags">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="modal-actions">{selected.url?<a className="button button-primary" href={selected.url} target="_blank" rel="noreferrer">View repository <ExternalLink size={15}/></a>:<span className="modal-note">Project record · Training work</span>}<button className="button button-ghost" onClick={()=>setSelected(null)}>Close brief</button></div>
    </section></div>}
  </div>;
}
