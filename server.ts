import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "./src/data/portfolioData";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const contactDailyLimit = 2;
const contactWindowMs = 24 * 60 * 60 * 1000;
const apiError = (res: express.Response, status: number, code: string, message: string) => {
  res.status(status).json({ success: false, error: { code, message } });
};
const apiSuccess = (res: express.Response, data: Record<string, unknown> = {}) => {
  res.json({ success: true, ...data });
};

// Security headers for the self-hosted (Express) production server.
// Netlify deployments get equivalent headers from netlify.toml.
if (process.env.NODE_ENV === "production") {
  app.use((_req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set("X-Frame-Options", "DENY");
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.set("Permissions-Policy", "camera=(self), microphone=(), geolocation=()");
    next();
  });
}

// Serve static assets directly with streaming & range support
const assetsDir = path.join(process.cwd(), "assets");
const publicAssetsDir = path.join(process.cwd(), "public/assets");
const longCache = { maxAge: "365d", immutable: true as const };
if (fs.existsSync(assetsDir)) {
  app.use("/assets", express.static(assetsDir, longCache));
  app.use("/favorites", express.static(path.join(assetsDir, "favorites"), longCache));
  app.use("/photos", express.static(path.join(assetsDir, "photos"), longCache));
  app.use("/video", express.static(path.join(assetsDir, "video")));
  app.use("/videos", express.static(path.join(assetsDir, "video")));
  app.use("/music", express.static(path.join(assetsDir, "music")));
  app.use("/certifications", express.static(path.join(assetsDir, "certifications"), longCache));
} else if (fs.existsSync(publicAssetsDir)) {
  app.use("/assets", express.static(publicAssetsDir, longCache));
}
app.use(express.static(path.join(process.cwd(), "public")));

// API health endpoint
app.get("/api/health", (_req, res) => {
  apiSuccess(res, {
    status: "ok",
    system: "Abinash OS & iOS Hub",
    timestamp: new Date().toISOString()
  });
});
app.all("/api/health", (_req, res) => {
  res.set("Allow", "GET");
  apiError(res, 405, "METHOD_NOT_ALLOWED", "This request method is not supported.");
});

app.all("/api/contact", (req, res, next) => {
  if (req.method !== "POST") {
    res.set("Allow", "POST");
    apiError(res, 405, "METHOD_NOT_ALLOWED", "This request method is not supported.");
    return;
  }
  next();
});
app.post("/api/contact", async (req, res) => {
  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";
  const subject = typeof body.subject === "string" ? body.subject : "";
  const message = typeof body.message === "string" ? body.message : "";
  const website = typeof body.website === "string" ? body.website : "";

  if (website.trim()) {
    res.status(204).end();
    return;
  }

  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const usage = contactAttempts.get(clientIp);
  const activeUsage = usage && usage.resetAt > now ? usage : { count: 0, resetAt: now + contactWindowMs };
  if (activeUsage.count >= contactDailyLimit) {
    res.set("Retry-After", String(Math.ceil((activeUsage.resetAt - now) / 1000)));
    apiError(res, 429, "RATE_LIMITED", "Too many requests. Please wait a moment and try again.");
    return;
  }

  const values = [name, email, subject, message];
  if (values.some(value => !value.trim())) {
    apiError(res, 422, "VALIDATION_ERROR", "Some information is missing or invalid.");
    return;
  }

  if (name.trim().length > 120 || subject.trim().length > 200 || message.trim().length > 5000 || email.trim().length > 254) {
    apiError(res, 422, "VALIDATION_ERROR", "Some information is missing or invalid.");
    return;
  }

  const normalizedEmail = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    apiError(res, 422, "VALIDATION_ERROR", "Some information is missing or invalid.");
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.MAIL_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    apiError(res, 503, "SERVICE_UNAVAILABLE", "This service is temporarily unavailable. Please try again shortly.");
    return;
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${process.env.MAIL_FROM_NAME || "Abinash Swain Portfolio"} <${fromEmail}>`,
        to: [process.env.CONTACT_RECEIVER_EMAIL || process.env.MAIL_TO_EMAIL || "swainabinash839@gmail.com"],
        reply_to: normalizedEmail,
        subject: `Portfolio contact: ${subject.trim()}`,
        text: `Name: ${name.trim()}\nReply email: ${normalizedEmail}\n\n${message.trim()}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name.trim())}</p><p><strong>Reply email:</strong> ${escapeHtml(normalizedEmail)}</p><p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>`,
        headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend API Error:", errorBody);
      apiError(res, 502, "BAD_GATEWAY", "A connected service returned an invalid response.");
      return;
    }

    contactAttempts.set(clientIp, { count: activeUsage.count + 1, resetAt: activeUsage.resetAt });
    apiSuccess(res);
  } catch (error) {
    console.error("Contact email error:", error);
    apiError(res, 502, "BAD_GATEWAY", "A connected service returned an invalid response.");
  }
});

function buildDeterministicReply(message: string): string {
  const q = message.toLowerCase();

  if (q.includes("30 second") || q.includes("tell me about") || q.includes("who is abinash") || q.includes("summary") || q.includes("overview")) {
    return `Abinash is pursuing B.Tech AI/ML at ${portfolioData.college} with CGPA ${portfolioData.cgpa}. He focuses on predictive ML, document intelligence, and agentic AI workflows.\n\nCore strengths: end-to-end data pipelines, trustworthy model evaluation, RAG retrieval, and AI workflow automation.\nFlagship work spans MLOps & Autonomous Data Agent with MCP and DocuRAG — Multimodal Document RAG & Knowledge Engine.\nHe is open to Data Analyst, AI/ML Engineer, LLM/RAG Engineer, and Analytics Engineer roles.\n\nIf you'd like, I can share project deep dives or connect you directly with Abinash at ${portfolioData.email}.`;
  }

  if (q.includes("role") || q.includes("fit") || q.includes("position") || q.includes("job")) {
    return `Abinash is a strong fit for several role paths:\n\n• Data Analyst — SQL, Pandas, NumPy, statistical studies, and exploratory analytics.\n• AI/ML Engineer — Scikit-learn, Random Forest workflows, evaluation metrics, and feature pipelines.\n• LLM/RAG Engineer — Agentic AI, prompt engineering, RAG retrieval concepts, and grounded answer systems.\n• Analytics Engineer — Dashboard storytelling, data product thinking, and measurable business insight delivery.\n\nHe is open to full-time roles and internships. Would you like contact details?`;
  }

  if (q.includes("project") || q.includes("mcp") || q.includes("docurag") || q.includes("top project")) {
    return `Abinash's top projects are the MLOps & Autonomous Data Agent with MCP and DocuRAG — Multimodal Document RAG & Knowledge Engine.\n\nThe MCP project automates dataset profiling, preprocessing, model training, evaluation, and reporting with Python, Pandas, NumPy, Scikit-learn, ChromaDB, RAG, Ollama, FastMCP, and Streamlit.\n\nDocuRAG focuses on grounded document intelligence with hybrid retrieval, BM25, vector search, cross-encoder reranking, and citation-aware answers.\n\nThese are the strongest proof points for his AI/ML and RAG engineering direction.`;
  }

  if (q.includes("skill") || q.includes("tool") || q.includes("language") || q.includes("stack") || q.includes("python") || q.includes("sql")) {
    return `Abinash's technical toolbelt is grounded in practical AI and data workflows:\n\n• Languages: Python and SQL.\n• Data & ML: Pandas, NumPy, Scikit-learn, data profiling, EDA, statistical hypothesis testing, classification and regression, and metric evaluation.\n• AI / LLM: Agentic AI workflows, RAG concepts, prompt engineering, retrieval grounding, and LLM-assisted automation.\n• Visualization and app work: Streamlit dashboards and lightweight web UI demos.\n\nHis toolkit is Git/GitHub, Jupyter, VS Code, and Google Colab.`;
  }

  if (q.includes("llm") || q.includes("rag") || q.includes("agent") || q.includes("genai") || q.includes("mcp")) {
    return `Yes, Abinash has direct experience with modern GenAI and agentic workflows.\n\nHe holds the Oracle Certified Foundations Associate in Agentic AI credential and completed the Tata GenAI Powered Data Analytics Job Simulation. His work includes RAG retrieval concepts, vector search, prompt engineering, MCP automation, and multi-step agentic orchestration using grounded context.`;
  }

  if (q.includes("cert") || q.includes("oracle") || q.includes("tata") || q.includes("deloitte") || q.includes("credential")) {
    return `Abinash's credentials reflect both technical depth and analytical breadth:\n\n• Oracle Certified Foundations Associate in Agentic AI.\n• Tata GenAI Powered Data Analytics Job Simulation.\n• Deloitte Forensic Analytics.\n• Skill India / NSDC Python Smart Inventory Management.\n\nThese credentials align with his work in AI workflows, analytics, and ML systems.`;
  }

  if (q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("available") || q.includes("reach") || q.includes("when")) {
    return `You can contact Abinash directly through the portfolio channel:\n\n• Email: ${portfolioData.email}\n• Phone: ${portfolioData.phone}\n• Location: ${portfolioData.location}\n• Availability: Open to full-time roles and high-impact engineering opportunities immediately or soon after graduation.\n\nHe is ready for interview discussions and project-fit evaluation.`;
  }

  if (q.includes("ml vs") || q.includes("software engineering") || q.includes("engineering")) {
    return `Abinash bridges machine learning and applying data systems to real product workflows.\n\nHis ML strengths include feature work, model training, evaluation metrics, and statistical testing. His software strengths include data pipelines, dashboard generation, and end-to-end workflow delivery with Python and streamlit-style app outputs.`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("cutm") || q.includes("cgpa")) {
    return `Abinash is pursuing B.Tech AI/ML at ${portfolioData.college} and currently records a CGPA of ${portfolioData.cgpa}.`;
  }

  return `Abinash is pursuing B.Tech AI/ML at ${portfolioData.college}, with focus areas in predictive ML, RAG systems, agentic workflows, and analytics automation.\n\nYou can ask about his MLOps & Autonomous Data Agent with MCP, DocuRAG, technical skills, or hiring availability. If you need details beyond this answer, reach him at ${portfolioData.email}.`;
}

// Gemini AI Chat Assistant Endpoint for "Ask Abinash AI"
app.post("/api/chat", async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== "string") {
    apiError(res, 422, "VALIDATION_ERROR", "Some information is missing or invalid.");
    return;
  }

  const systemInstruction = `You are Abinash's AI Portfolio Assistant. Your job is to help recruiters, HR, hiring managers, and technical interviewers quickly understand Abinash's background, skills, projects, and fit for roles.

## Your knowledge base (use ONLY this info; do not invent anything)

- Name: Abinash
- Education: B.Tech AI/ML, Centurion University (CUTM), CGPA 8.32
- Target roles: Data Analyst, AI/ML Engineer, LLM/RAG Engineer, Analytics Engineer
- Location & availability: Bhubaneswar, Odisha, India. Open to full-time roles & high-impact opportunities immediately / upon graduation.
- Contact: email = swainabinash839@gmail.com, phone = +91-7077475818

### Key Projects

1. **MLOps & Autonomous Data Agent with MCP**
   - Built an AI/ML platform with an MCP server for VS Code, Cursor, and Claude Desktop.
   - Automates dataset profiling, preprocessing, model training, evaluation, RAG-based analysis, and reporting.
   - Tech stack includes Python, Pandas, NumPy, Scikit-learn, ChromaDB, RAG, Ollama, FastMCP, Streamlit, and Jinja2.

2. **DocuRAG — Multimodal Document RAG & Knowledge Engine**
   - Built a document intelligence engine with hybrid retrieval, BM25 search, vector search, and cross-encoder re-ranking.
   - Supports grounded document answers, context precision, and citation-aware knowledge retrieval.
   - Tech stack includes Python, FastAPI, LlamaIndex, Qdrant/ChromaDB, sentence-transformers, BM25, FlashRank, and React.

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
      const reply = buildDeterministicReply(message);
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
      reply: "Abinash is pursuing B.Tech AI/ML at Centurion University (CUTM) with CGPA 8.32 and focuses on Data Analyst, AI/ML Engineer, LLM/RAG, and Analytics roles. His current portfolio highlights MLOps & Autonomous Data Agent with MCP and DocuRAG — Multimodal Document RAG & Knowledge Engine. You can reach him at swainabinash839@gmail.com or +91-7077475818."
    });
  }
});
app.all("/api/chat", (_req, res) => {
  res.set("Allow", "POST");
  apiError(res, 405, "METHOD_NOT_ALLOWED", "This request method is not supported.");
});
app.all("/api/*", (_req, res) => {
  apiError(res, 404, "NOT_FOUND", "The requested resource could not be found.");
});

app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  if (error instanceof SyntaxError) {
    apiError(res, 400, "BAD_REQUEST", "Please check the information and try again.");
    return;
  }
  console.error("Unhandled API error:", error);
  apiError(res, 500, "INTERNAL_SERVER_ERROR", "Something went wrong on our side. Please try again later.");
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
