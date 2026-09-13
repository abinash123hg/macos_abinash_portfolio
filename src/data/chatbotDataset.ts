export const chatbotDataset = [
  {
    id: "intro_1",
    keywords: ["about", "who is", "introduce", "tell me about", "summary", "overview"],
    answer: "Abinash Swain is a 3rd-year B.Tech CSE (AI & ML) student at Centurion University of Technology and Management (CUTM), Bhubaneswar, Odisha. He is currently working as a Data Analyst Intern at InternPe. His core focus areas are Machine Learning, Retrieval-Augmented Generation (RAG), MLOps, and building Autonomous Data Agents."
  },
  {
    id: "intro_2",
    keywords: ["30s", "in 30 seconds", "quick intro", "elevator pitch", "short intro"],
    answer: "Abinash Swain – 3rd-year AI/ML student at CUTM + Data Analyst Intern at InternPe. Builds production-grade RAG systems, Autonomous Agents with MCP, and end-to-end ML pipelines. Strong in Python, LangChain, PyTorch, and MLOps."
  },
  {
    id: "intro_3",
    keywords: ["background", "profile", "who are you"],
    answer: "Abinash is an applied AI/ML engineer in the making. He combines strong academic grounding in Artificial Intelligence & Machine Learning with hands-on experience building multimodal RAG systems, autonomous agents, and real-time computer vision solutions."
  },
  {
    id: "roles_1",
    keywords: ["roles", "fit for", "suitable roles", "what roles", "job roles", "position", "which role"],
    answer: "Abinash is a strong fit for Machine Learning Engineer, RAG Engineer, MLOps Engineer, AI Engineer, Autonomous Agent Developer, and Data Scientist roles. His practical experience with MCP, DocuRAG, and production ML pipelines makes him especially suitable for GenAI and applied AI teams."
  },
  {
    id: "roles_2",
    keywords: ["best role", "ideal role", "recommended role"],
    answer: "Ideal roles: RAG / LLM Application Engineer, MLOps Engineer, or Autonomous Agent Engineer. He already has working experience building multimodal document RAG, tool-using agents via MCP, and end-to-end ML systems."
  },
  {
    id: "projects_all",
    keywords: ["projects", "top projects", "all projects", "list projects", "project list"],
    answer: "Abinash’s key projects (in order of priority):\n1. MCP Agent – Autonomous Data Agent using Model Context Protocol\n2. DocuRAG – Multimodal Document RAG & Knowledge Engine\n3. SafeVision RAG – Real-time driver drowsiness detection with RAG layer\n4. DataRAG Agent – Conversational CSV/Excel intelligence with self-correcting RAG\n5. ViralRAG Predictor – Multimodal social engagement forecasting\n6. JARVIS-RAG – Voice-first personal AI agent with memory and tools\n7. NetPulse RAG – 5G KPI analytics dashboard with retrieval-augmented insights"
  },
  {
    id: "mcp_1",
    keywords: ["mcp", "mcp agent", "model context protocol", "autonomous data agent"],
    answer: "MCP Agent is Abinash’s flagship Autonomous Data Agent built on the Model Context Protocol. It can discover tools, call external APIs, maintain context, and perform multi-step reasoning. The project focuses on reliable tool-use, error recovery, and production-ready agent orchestration."
  },
  {
    id: "mcp_2",
    keywords: ["autonomous agent", "agentic", "tool calling"],
    answer: "The MCP-based Autonomous Data Agent allows the system to dynamically discover and use tools, maintain long-running context, and execute complex data workflows without constant human intervention. It is designed with MLOps principles for reliability and observability."
  },
  {
    id: "docurag_1",
    keywords: ["docurag", "document rag", "multimodal rag", "knowledge engine"],
    answer: "DocuRAG is a Multimodal Document RAG & Knowledge Engine. It handles complex PDFs, tables, charts, and images. The system combines advanced chunking, hybrid retrieval, and reranking to deliver high-accuracy answers grounded in the source documents."
  },
  {
    id: "docurag_2",
    keywords: ["rag system", "document qa", "pdf rag"],
    answer: "DocuRAG focuses on production-grade multimodal retrieval. It supports text + visual understanding of documents and is built for accurate, citation-backed responses. This is one of Abinash’s strongest projects in the RAG domain."
  },
  {
    id: "safevision_1",
    keywords: ["safedrive", "safevision", "drowsiness", "driver fatigue", "fatigue detection"],
    answer: "SafeVision RAG (upgraded from SafeDrive AI) is a real-time computer vision system that detects driver drowsiness using facial landmarks and Eye Aspect Ratio (EAR). A lightweight RAG layer adds context-aware alerting and logging. It achieves 98.4% accuracy with only 14 ms latency and runs at 60+ FPS."
  },
  {
    id: "safevision_2",
    keywords: ["computer vision", "opencv", "mediapipe", "eye aspect ratio"],
    answer: "SafeVision RAG uses MediaPipe and OpenCV for real-time facial landmark detection. It calculates Eye Aspect Ratio and Mouth Aspect Ratio to detect micro-sleeps and yawning, then triggers alerts. The RAG component helps personalize thresholds and maintain session context."
  },
  {
    id: "datarag_1",
    keywords: ["csv", "datarag", "csv intelligence", "conversational data", "excel analysis"],
    answer: "DataRAG Agent (evolved from CSV Intelligence) is a conversational data analysis system. Users upload CSV or Excel files and ask questions in natural language. The agent generates safe Pandas code, executes it in a sandbox, and uses RAG to provide accurate statistical insights, charts, and summaries."
  },
  {
    id: "datarag_2",
    keywords: ["pandas agent", "data analysis agent", "self-correcting"],
    answer: "DataRAG Agent features a self-correcting loop: it generates code, validates it, runs it safely, and retries with fixes if needed. It supports missing-value handling, outlier detection, correlation analysis, and interactive Plotly visualizations."
  },
  {
    id: "viralrag_1",
    keywords: ["viral", "viralrag", "engagement", "predictor", "social media prediction"],
    answer: "ViralRAG Predictor is a multimodal engagement forecasting system. It combines RoBERTa embeddings for text understanding with XGBoost and LightGBM models. A RAG layer retrieves similar high-performing content styles. Trained on 250,000+ posts, it achieves 0.89 R² score and provides SHAP explanations."
  },
  {
    id: "viralrag_2",
    keywords: ["xgboost", "lightgbm", "engagement score"],
    answer: "ViralRAG uses gradient boosting (XGBoost + LightGBM) on top of semantic embeddings. It predicts virality probability and optimal posting time. SHAP values make the model decisions transparent for content creators and marketers."
  },
  {
    id: "jarvis_1",
    keywords: ["jarvis", "jarvis-rag", "personal assistant", "voice assistant", "ai assistant"],
    answer: "JARVIS-RAG is a voice-first personal AI agent. It supports speech-to-text, intent classification, long-term memory via RAG, task automation, and extensible tool calling. Users can talk to it naturally and it maintains context across sessions."
  },
  {
    id: "jarvis_2",
    keywords: ["voice", "speech", "personal ai"],
    answer: "JARVIS-RAG combines speech recognition, NLP, and retrieval-augmented memory. It can set reminders, answer personal knowledge questions, and call external tools. Designed as a modular agent with plugin support."
  },
  {
    id: "netpulse_1",
    keywords: ["5g", "netpulse", "kpi", "network dashboard", "telecom"],
    answer: "NetPulse RAG is a real-time 5G network KPI analytics dashboard. It ingests live metrics such as latency, throughput, packet loss, and signal strength. A RAG layer allows engineers to ask natural language questions about network performance and historical trends."
  },
  {
    id: "netpulse_2",
    keywords: ["network analytics", "real-time dashboard"],
    answer: "NetPulse RAG supports real-time WebSocket streaming, interactive charts, threshold-based alerts, and multi-tower comparison. The retrieval component helps answer complex diagnostic questions quickly."
  },
  {
    id: "skills_1",
    keywords: ["skills", "tech stack", "technologies", "tools", "languages"],
    answer: "Core technical skills: Python, PyTorch, Scikit-learn, LangChain, RAG pipelines, MLOps, FastAPI, Docker, OpenCV, MediaPipe, XGBoost, LightGBM, Hugging Face Transformers, Streamlit, React, TypeScript, SQL, and vector databases."
  },
  {
    id: "skills_2",
    keywords: ["daily tools", "tools he uses", "stack"],
    answer: "Daily tools and libraries Abinash works with: Python, PyTorch, LangChain, OpenCV, MediaPipe, Scikit-learn, XGBoost, FastAPI, Docker, Streamlit, React, and modern RAG components (embeddings, vector stores, rerankers)."
  },
  {
    id: "skills_3",
    keywords: ["machine learning", "deep learning", "ml skills"],
    answer: "Strong in classical Machine Learning (Scikit-learn, XGBoost, LightGBM) and Deep Learning (PyTorch). Experienced in computer vision (OpenCV + MediaPipe), NLP embeddings, and building hybrid RAG + ML systems."
  },
  {
    id: "llm_rag_exp",
    keywords: ["llm", "llms", "rag experience", "has he worked with", "experience with rag", "experience with llm"],
    answer: "Yes. Abinash has solid hands-on experience building Multimodal RAG systems (DocuRAG), Autonomous Agents with MCP tool calling, conversational data agents, and production ML pipelines that incorporate LLMs. He understands chunking strategies, hybrid retrieval, reranking, and grounding."
  },
  {
    id: "education_1",
    keywords: ["education", "college", "university", "study", "student", "degree"],
    answer: "Abinash is pursuing B.Tech in Computer Science & Engineering with specialization in Artificial Intelligence and Machine Learning at Centurion University of Technology and Management (CUTM), Bhubaneswar. He is currently in his 3rd year (started August 2024)."
  },
  {
    id: "education_2",
    keywords: ["cgpa", "marks", "academic"],
    answer: "Abinash is a 3rd-year B.Tech CSE (AI & ML) student at CUTM, Bhubaneswar. His academic focus includes Python, Artificial Intelligence, Machine Learning, Data Analytics, Data Structures, Algorithms, and Database Management Systems."
  },
  {
    id: "experience_1",
    keywords: ["experience", "internship", "intern", "work experience", "internpe"],
    answer: "Abinash is currently working as a Data Analyst Intern at InternPe. His responsibilities include data analysis, risk analysis, exploratory data analysis, and delivering insights through data storytelling."
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "courses", "certificates"],
    answer: "Relevant certifications include: AI-powered Smart Inventory Management System using Python, GenAI Powered Data Analytics Job Simulation, and TutorialsPoint certified credentials in related technologies."
  },
  {
    id: "location",
    keywords: ["location", "where", "city", "based"],
    answer: "Abinash is based in Bhubaneswar, Odisha, India. He is open to remote opportunities as well as on-site roles."
  },
  {
    id: "hire_1",
    keywords: ["hire", "contact", "email", "how can i hire", "reach", "connect"],
    answer: "You can contact Abinash at swainabinash839@gmail.com. LinkedIn: https://www.linkedin.com/in/abinash-swain-a941a3330/. GitHub: https://github.com/abinash123hg. He is open to full-time, internship, and freelance opportunities in AI/ML and RAG systems."
  },
  {
    id: "hire_2",
    keywords: ["available", "availability", "open to work", "joining"],
    answer: "Abinash is actively looking for opportunities in Machine Learning, RAG engineering, MLOps, and Autonomous Agent development. Feel free to reach out via email or LinkedIn for roles, collaborations, or interviews."
  },
  {
    id: "strengths",
    keywords: ["strengths", "strong points", "what is he good at"],
    answer: "Key strengths: building end-to-end RAG systems, autonomous agents with tool calling (MCP), real-time computer vision pipelines, clean code, and turning complex data into actionable insights. He combines research understanding with practical implementation."
  },
  {
    id: "weakness",
    keywords: ["weakness", "weaknesses", "improvement areas"],
    answer: "Like most early-career engineers, Abinash continues to deepen expertise in large-scale distributed training and advanced LLM fine-tuning. He actively works on these areas while already delivering strong results in RAG and agentic systems."
  },
  {
    id: "future",
    keywords: ["future", "goals", "ambition", "next", "plans"],
    answer: "Abinash aims to become a strong AI Engineer specializing in production RAG systems and reliable Autonomous Agents. He wants to contribute to real-world GenAI products and continue improving MLOps practices."
  },
  {
    id: "python",
    keywords: ["python"],
    answer: "Python is Abinash’s primary language. He uses it extensively for Machine Learning, RAG pipelines, computer vision, data analysis, FastAPI backends, and automation scripts."
  },
  {
    id: "pytorch",
    keywords: ["pytorch", "deep learning framework"],
    answer: "Abinash has practical experience with PyTorch for deep learning models, especially in computer vision and embedding generation tasks that feed into his RAG systems."
  },
  {
    id: "langchain",
    keywords: ["langchain"],
    answer: "LangChain is one of the key frameworks Abinash uses for building RAG pipelines and agentic workflows, including tool calling and structured output handling."
  },
  {
    id: "mlops",
    keywords: ["mlops", "deployment", "production"],
    answer: "Abinash pays attention to MLOps principles: reproducible pipelines, containerization with Docker, API serving with FastAPI, monitoring, and reliable deployment of RAG and ML systems."
  },
  {
    id: "computer_vision",
    keywords: ["computer vision", "cv", "vision"],
    answer: "Strong computer vision experience through SafeVision RAG – real-time facial landmark detection, Eye Aspect Ratio calculation, and low-latency inference using OpenCV and MediaPipe."
  },
  {
    id: "data_analysis",
    keywords: ["data analysis", "data analytics", "eda"],
    answer: "As a Data Analyst Intern at InternPe and through DataRAG Agent, Abinash is experienced in exploratory data analysis, statistical insights, risk analysis, and translating data into clear stories and visualizations."
  },
  {
    id: "fallback_1",
    keywords: [],
    answer: "I can help you with Abinash’s projects (MCP Agent, DocuRAG, SafeVision RAG, DataRAG Agent, ViralRAG, JARVIS-RAG, NetPulse RAG), skills, experience, education, or how to contact him. What would you like to know?"
  },
  {
    id: "fallback_2",
    keywords: [],
    answer: "Ask me anything about Abinash’s RAG systems, Autonomous Agents, Machine Learning projects, tech stack, or availability for roles."
  },
  {
    id: "fallback_3",
    keywords: [],
    answer: "Try asking about specific projects like DocuRAG or MCP Agent, his skills, internship experience, or the best way to reach him."
  },
  {
    id: "fallback_4",
    keywords: [],
    answer: "I have detailed information on Abinash’s AI/ML work, projects, and background. Please ask a specific question about projects, skills, roles, or contact details."
  },
  {
    id: "fallback_5",
    keywords: [],
    answer: "Abinash specializes in RAG, Autonomous Agents, and applied Machine Learning. You can ask about any of his major projects or professional background."
  }
];
