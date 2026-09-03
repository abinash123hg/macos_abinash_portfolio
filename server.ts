import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Serve static assets directly with streaming & range support
const assetsDir = path.join(process.cwd(), "assets");
const publicAssetsDir = path.join(process.cwd(), "public/assets");
if (fs.existsSync(assetsDir)) {
  app.use("/assets", express.static(assetsDir));
  app.use("/favorites", express.static(path.join(assetsDir, "favorites")));
  app.use("/photos", express.static(path.join(assetsDir, "photos")));
  app.use("/video", express.static(path.join(assetsDir, "video")));
  app.use("/videos", express.static(path.join(assetsDir, "video")));
  app.use("/music", express.static(path.join(assetsDir, "music")));
  app.use("/certifications", express.static(path.join(assetsDir, "certifications")));
} else if (fs.existsSync(publicAssetsDir)) {
  app.use("/assets", express.static(publicAssetsDir));
}
app.use(express.static(path.join(process.cwd(), "public")));

// API health endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    system: "Abinash OS & iOS 18 Hub",
    timestamp: new Date().toISOString()
  });
});

// Gemini AI Chat Assistant Endpoint for "Ask Abinash AI"
app.post("/api/chat", async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const systemInstruction = `You are Abinash's AI Portfolio Assistant. Your job is to help recruiters, HR, hiring managers, and technical interviewers quickly understand Abinash's background, skills, projects, and fit for roles.

## Your knowledge base (use ONLY this info; do not invent anything)

- Name: Abinash
- Education: 3rd-year B.Tech CSE (AI & ML), Centurion University (CUTM), CGPA 8.32
- Target roles: Data Analyst, AI/ML Engineer, LLM/RAG Engineer, Analytics Engineer
- Location & availability: Bhubaneswar, Odisha, India. Open to full-time roles & high-impact opportunities immediately / upon graduation.
- Contact: email = swainabinash839@gmail.com, phone = +91-7077475818

### Key Projects

1. **5G Small-Cell KPI Management System**
   - Built a 5G Small-Cell Network KPI Management system.
   - Used a Random Forest classifier with ~100 estimators.
   - Dataset: ~5,000 small-cell telemetry records.
   - Monitors 10 critical KPIs across 4 network slices: eMBB, URLLC, mMTC, HC.
   - Achieved ~96.2% accuracy and ~96.5% F1-score.
   - Tech: Python, Pandas, NumPy, Scikit-learn, Streamlit for dashboards.

2. **SafeDrive AI – Accident Severity Prediction**
   - Predicts traffic accident severity: Slight, Serious, Fatal.
   - Uses real-time geospatial risk heatmaps and alternative route suggestions.
   - Tech: Python, Scikit-learn, Streamlit, geospatial data.

3. **Additional analytics / ML projects**
   - Use generic descriptions if user asks broadly: "predictive ML, telemetry analytics, interactive dashboards, classification/regression models, EDA, statistical testing".
   - CSV Intelligence: Conversational automated EDA and statistical testing.
   - Viral Predictor / SEO Checker AI: Predictive content scoring and NLP optimization.

### Skills

- Languages: Python (strong), SQL (MySQL/SQLite)
- Data & ML: Pandas, NumPy, Scikit-learn, EDA, statistical hypothesis testing, classification/regression, model evaluation (accuracy, F1, etc.)
- AI/LLM: Agentic AI workflow orchestration, RAG concepts, prompt engineering, basic LLM integration
- Visualization & Apps: Streamlit interactive dashboards, basic web UI for demos
- Tools: Git/GitHub, Jupyter, VS Code, Google Colab

### Certifications

- Oracle Certified Foundations Associate in Agentic AI (Credential ID: 103519150AAI26OFA)
- Tata: GenAI Powered Data Analytics Job Simulation
- Deloitte: Forensic Analytics
- Skill India / NSDC certifications (Python Smart Inventory Management)

### Strengths & Positioning

- Strong in predictive machine learning and high-precision telemetry analytics.
- Comfortable building end-to-end data pipelines: data cleaning → EDA → modeling → dashboard.
- Interested in LLM/RAG systems and AI assistants for knowledge work.
- Good communicator; can explain technical work clearly to non-technical stakeholders.

## How to answer

1. **Always be truthful and grounded.**
   - Only use information from this knowledge base.
   - If something is not covered, say: "I don't have that detail here, but you can ask Abinash directly at swainabinash839@gmail.com."

2. **Adapt to the asker:**
   - If the question sounds like it's from **HR/recruiter**:
     - Focus on role fit, skills, projects, impact, availability, and how to hire.
     - Keep answers concise, business-friendly, and outcome-focused.
   - If the question sounds **technical** (ML engineer, data scientist, AI lead):
     - Include more detail: algorithms, metrics, data size, features, evaluation, trade-offs.
   - If the question is **general** (student, visitor):
     - Give a clear, friendly overview of Abinash's background and interests.

3. **Vary your wording naturally.**
   - Do NOT repeat the exact same sentence every time.
   - For similar questions, rephrase using different structures and examples while keeping facts consistent.
   - Use 1–2 short paragraphs or 3–6 bullet points max per answer.

4. **Structure your answers clearly:**
   - Start with a 1–2 sentence direct answer.
   - Then add 2–5 key points (bullets or short sentences) with:
     - Project name
     - Problem solved
     - Approach/tech
     - Impact/metrics (accuracy, F1, users, etc.)
   - End with a short line like:
     - "If you'd like, I can share more details or connect you directly with Abinash."

5. **Handle common recruiter questions explicitly:**
   - "Tell me about Abinash in 30 seconds."
   - "What roles is he a strong fit for?"
   - "What are his top 3 projects?"
   - "How strong is he in ML vs software engineering?"
   - "Has he worked with LLMs or RAG?"
   - "What tools and languages does he use daily?"
   - "Is he available for full-time roles? When?"
   - "How can I hire him?"

6. **Tone & style**
   - Professional, confident, and friendly.
   - No exaggeration; no fake companies or clients.
   - Avoid jargon unless the question is technical.
   - Keep answers easy to scan in under 30 seconds.

7. **If asked about something outside your scope**
   - Politely say you don't have that detail here.
   - Offer contact info: email (swainabinash839@gmail.com) and phone (+91-7077475818).`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Grounded deterministic fallback based on the knowledge base
      const q = message.toLowerCase();
      let reply = "Hello! I am Abinash's AI Portfolio Assistant. I'm here to help recruiters and hiring teams explore Abinash's technical background, ML projects, skills, and role fit. What would you like to know?";

      if (q.includes("30 second") || q.includes("tell me about") || q.includes("who is abinash") || q.includes("summary") || q.includes("overview")) {
        reply = "Abinash is a 3rd-year B.Tech CSE (AI & ML) student at Centurion University (CUTM) with an 8.32 CGPA, focused on predictive ML, telemetry analytics, and intelligent systems.\n\n• **Core Strengths:** End-to-end data pipelines, Random Forest classification, and agentic AI workflows.\n• **Flagship Work:** 5G Small-Cell KPI Management (96.2% accuracy across 5,000 telemetry records) and SafeDrive AI.\n• **Credentials:** Oracle Certified Associate in Agentic AI, Tata GenAI Analytics, and Deloitte Forensic Analytics.\n• **Target Roles:** Data Analyst, AI/ML Engineer, LLM/RAG Engineer, and Analytics Engineer.\n\nIf you'd like, I can share project deep dives or connect you directly with Abinash at swainabinash839@gmail.com.";
      } else if (q.includes("role") || q.includes("fit") || q.includes("position") || q.includes("job")) {
        reply = "Abinash is a strong fit for the following roles:\n\n• **Data Analyst:** Strong proficiency in SQL, Pandas, NumPy, statistical hypothesis testing, and exploratory data analysis.\n• **AI/ML Engineer:** Hands-on experience with Scikit-learn, Random Forest classification/regression, model evaluation (accuracy, F1), and feature engineering.\n• **LLM/RAG Engineer:** Certified in Oracle Agentic AI with hands-on knowledge in prompt engineering, RAG retrieval concepts, and AI copilot integration.\n• **Analytics Engineer:** Skilled in transforming raw telemetry records into interactive Streamlit dashboards and actionable decision metrics.\n\nHe is open to full-time roles and internships. Would you like his contact details?";
      } else if (q.includes("project") || q.includes("5g") || q.includes("safedrive") || q.includes("top project")) {
        reply = "Here are Abinash's top projects:\n\n1. **5G Small-Cell KPI Management System**\n   - Problem: Proactive SLA compliance monitoring across network slices.\n   - Approach: 100-estimator Random Forest classifier trained on 5,000 small-cell telemetry records monitoring 10 critical KPIs across eMBB, URLLC, mMTC, and HC slices.\n   - Impact: Achieved 96.2% accuracy and 96.5% F1-score with an interactive Streamlit NOC dashboard.\n\n2. **SafeDrive AI – Accident Severity Prediction**\n   - Problem: Real-time traffic hazard identification and injury severity prevention.\n   - Approach: Multi-class Scikit-learn predictive models with real-time geospatial risk heatmaps and dynamic alternate routing.\n   - Impact: Classifies Slight, Serious, and Fatal risk zones on interactive maps.\n\n3. **Analytics & Exploratory Tools**\n   - Built CSV Intelligence for conversational automated EDA and Viral Predictor for content optimization.\n\nWould you like more technical details on any of these systems?";
      } else if (q.includes("skill") || q.includes("tool") || q.includes("language") || q.includes("stack") || q.includes("python") || q.includes("sql")) {
        reply = "Abinash's technical toolbelt includes:\n\n• **Languages:** Python (strong), SQL (MySQL/SQLite)\n• **Data & ML:** Pandas, NumPy, Scikit-learn, EDA, statistical hypothesis testing, classification/regression, model evaluation (accuracy, F1-score)\n• **AI / LLM:** Agentic AI workflow orchestration, RAG concepts, prompt engineering, basic LLM integration\n• **Visualization & Apps:** Streamlit interactive dashboards, basic web UI for demos\n• **Tools:** Git/GitHub, Jupyter Notebook, VS Code, Google Colab\n\nHe uses Python and SQL daily for data cleaning, modeling, and dashboard construction.";
      } else if (q.includes("llm") || q.includes("rag") || q.includes("agent") || q.includes("genai")) {
        reply = "Yes! Abinash has practical knowledge in modern Generative AI and agentic workflows:\n\n• **Oracle Certified Foundations Associate in Agentic AI** (Credential ID: 103519150AAI26OFA).\n• **Tata GenAI Powered Data Analytics Job Simulation** on LLM data interpretation.\n• **Technical Competencies:** RAG retrieval concepts, vector search foundations, prompt engineering, and agentic multi-step tool orchestration.\n\nHe is actively building AI assistants and knowledge systems to automate complex analytical workflows.";
      } else if (q.includes("cert") || q.includes("oracle") || q.includes("tata") || q.includes("deloitte") || q.includes("credential")) {
        reply = "Abinash holds verified industry credentials:\n\n• **Oracle Certified Foundations Associate in Agentic AI** (Credential ID: 103519150AAI26OFA)\n• **Tata:** GenAI Powered Data Analytics Job Simulation\n• **Deloitte:** Forensic Analytics Simulation\n• **Skill India / NSDC:** Python Smart Inventory Management (TutorialsPoint)\n\nAll credentials verify his hands-on competencies in AI workflows, statistical testing, and enterprise analytics.";
      } else if (q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("available") || q.includes("reach") || q.includes("when")) {
        reply = "You can easily hire or contact Abinash directly:\n\n• **Email:** swainabinash839@gmail.com\n• **Phone:** +91-7077475818\n• **Location:** Bhubaneswar, Odisha, India\n• **Availability:** Open to full-time roles and high-impact engineering opportunities immediately / upon graduation.\n\nHe is ready to schedule screening calls and technical interviews right away!";
      } else if (q.includes("ml vs") || q.includes("software engineering") || q.includes("engineering")) {
        reply = "Abinash bridges machine learning and practical application engineering:\n\n• **ML Depth:** Strong in mathematical feature engineering, Random Forest hyperparameter tuning, model evaluation (accuracy, precision, recall, F1), and statistical testing.\n• **Software & Delivery:** Comfortable building full end-to-end data pipelines: ingestion → cleaning → modeling → interactive Streamlit dashboards and web UI integration.\n\nHe can both train reliable models and deliver them into production dashboards.";
      } else if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("cutm") || q.includes("cgpa")) {
        reply = "Abinash is currently a 3rd-year B.Tech student in Computer Science & Engineering (AI & ML) at Centurion University of Technology and Management (CUTM), Bhubaneswar, holding an impressive **CGPA of 8.32 / 10.0**.";
      } else {
        reply = "Abinash is a 3rd-year B.Tech CSE (AI & ML) candidate at Centurion University (CGPA 8.32), specializing in predictive ML, 5G telemetry analytics, and agentic AI systems.\n\nFeel free to ask about his 5G KPI project, SafeDrive AI, technical skills, or hiring availability. If you need details not covered here, you can reach him directly at swainabinash839@gmail.com.";
      }

      res.json({ reply });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
      ],
    });

    const reply = response.text || "I am here to assist with any questions regarding Abinash's portfolio.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({
      reply: "Abinash is a Data Analyst Intern & AI/ML Engineer with a 8.32 CGPA in B.Tech CSE (AI & ML) at Centurion University. He specializes in Python, SQL, predictive modeling, 5G SLA management, and accident prediction systems. Feel free to explore the apps on screen!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Resolve dist folder whether running from workspace root or inside dist/
    let distPath = path.join(process.cwd(), "dist");
    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      distPath = __dirname;
    }
    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      distPath = path.resolve(".");
    }

    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send("<!DOCTYPE html><html><head><title>Abinash Swain Portfolio</title></head><body><div id='root'></div></body></html>");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Abinash Portfolio OS server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
