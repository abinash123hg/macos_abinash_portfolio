import React, { useState, useRef, useEffect } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Radio, 
  Award, 
  Briefcase, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I am Abinash's AI Portfolio Assistant. I'm here to help recruiters, HR, hiring managers, and technical interviewers quickly evaluate Abinash's background, skills, projects, and fit for roles. How can I help you?`,
      timestamp: '9:41 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    'Tell me about Abinash in 30s',
    'What roles is he a fit for?',
    'Top Projects (5G KPI & SafeDrive)',
    'Daily Tools & Languages',
    'Has he worked with LLMs/RAG?',
    'How can I hire him?',
  ];

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    sound.tap();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });
      const data = await res.json();
      
      const botReplyText = data.reply || `Abinash is a 3rd-year B.Tech CSE (AI & ML) student at Centurion University (CUTM) with an 8.32 CGPA. Contact him at ${portfolioData.email}.`;
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      sound.tap();
    } catch {
      let reply = '';
      const q = queryText.toLowerCase();

      if (q.includes('30s') || q.includes('30 second') || q.includes('tell me about') || q.includes('who is abinash')) {
        reply = `Abinash is a 3rd-year B.Tech CSE (AI & ML) student at Centurion University (CUTM) with an 8.32 CGPA, focused on predictive ML, telemetry analytics, and intelligent systems.\n\n• Flagship: 5G Small-Cell KPI Management (96.2% accuracy) & SafeDrive AI.\n• Credentials: Oracle Certified Associate in Agentic AI, Tata GenAI, Deloitte Analytics.\n• Fit: Data Analyst, AI/ML Engineer, LLM/RAG Engineer, Analytics Engineer.\n\nContact: ${portfolioData.email} | ${portfolioData.phone}`;
      } else if (q.includes('role') || q.includes('fit') || q.includes('job') || q.includes('position')) {
        reply = `Abinash is a strong fit for:\n• Data Analyst (SQL, Pandas, NumPy, statistical testing)\n• AI/ML Engineer (Scikit-learn, Random Forest, model evaluation)\n• LLM/RAG Engineer (Oracle Agentic AI certified, prompt engineering, RAG concepts)\n• Analytics Engineer (Streamlit dashboards, telemetry pipelines)\n\nHe is open to full-time roles and internships immediately.`;
      } else if (q.includes('5g') || q.includes('kpi') || q.includes('telemetry') || q.includes('project')) {
        reply = `Abinash's key projects include:\n1. 5G Small-Cell Network KPI Management: 100-estimator Random Forest on 5,000 telemetry records monitoring 10 KPIs across 4 slices (eMBB, URLLC, mMTC, HC) with 96.2% accuracy and 96.5% F1.\n2. SafeDrive AI: Real-time traffic accident severity prediction (Slight, Serious, Fatal) with geospatial risk heatmaps.\n3. CSV Intelligence: Automated conversational EDA tool.\n\nWould you like more technical details?`;
      } else if (q.includes('skill') || q.includes('tool') || q.includes('language') || q.includes('stack') || q.includes('python')) {
        reply = `Abinash's core skills:\n• Languages: Python (strong), SQL (MySQL/SQLite)\n• Data & ML: Pandas, NumPy, Scikit-learn, EDA, statistical testing, classification/regression\n• AI/LLM: Agentic AI workflows, RAG concepts, prompt engineering\n• Visualization: Streamlit interactive dashboards\n• Tools: Git/GitHub, Jupyter, VS Code, Google Colab`;
      } else if (q.includes('llm') || q.includes('rag') || q.includes('agent')) {
        reply = `Abinash is Oracle Certified in Agentic AI (ID: 103519150AAI26OFA) and completed Tata's GenAI Data Analytics simulation. He works with RAG retrieval concepts, vector similarity grounding, and agentic multi-step tool orchestration.`;
      } else if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
        reply = `You can hire or contact Abinash directly:\n• Email: ${portfolioData.email}\n• Phone: ${portfolioData.phone}\n• Location: Bhubaneswar, Odisha, India\n• Availability: Open to full-time roles & high-impact engineering opportunities.`;
      } else {
        reply = `Abinash is a 3rd-year B.Tech CSE (AI & ML) student at Centurion University (CUTM) with an 8.32 CGPA. He specializes in predictive ML, telemetry analytics, and AI assistants.\n\nAsk me about his projects, skills, or email him at ${portfolioData.email}.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AppWindow
      id="ai"
      title="Abinash AI"
      subtitle="Intelligent Portfolio Guide"
      icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
      noPadding
    >
      <div className="w-full h-full flex flex-col justify-between bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-white">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${
                  isUser ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`p-3 rounded-[20px] text-[14px] leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#007AFF] text-white rounded-br-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-xs border border-neutral-200/60 dark:border-neutral-700/60'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-neutral-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-[20px] rounded-bl-xs bg-white dark:bg-neutral-800 text-neutral-400 max-w-[80px] border border-neutral-200/60 dark:border-neutral-700/60 shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="w-full px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200/60 dark:border-neutral-800">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[11.5px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 whitespace-nowrap active:scale-95 transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="w-full p-2.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border-t border-neutral-200/70 dark:border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about projects, skills, ML models..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 h-9 px-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[14px] text-neutral-900 dark:text-white placeholder-neutral-400 outline-none border border-neutral-200 dark:border-neutral-700 focus:border-[#007AFF]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-[#007AFF] text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppWindow>
  );
};
