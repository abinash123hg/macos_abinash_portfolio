import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, Zap } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const SUGGESTIONS = [
  'Tell me about Abinash in 30 seconds',
  'What roles is he a strong fit for?',
  'What are his top projects?',
  'What tools & languages does he use daily?',
  'Has he worked with LLMs or RAG?',
  'How can I hire or interview him?'
];

export const AiAssistantApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: "Hello! I am Abinash's AI Portfolio Assistant. I'm here to help recruiters, hiring managers, and technical interviewers quickly evaluate Abinash's background, skills, projects, and fit for roles. How can I help you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    sound.tap();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Abinash is pursuing B.Tech AI/ML at Centurion University (CGPA 8.32). Feel free to reach him at swainabinash839@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
      sound.notificationPing();
    } catch {
      const fallbackReply: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Abinash is pursuing B.Tech AI/ML at Centurion University (CGPA 8.32) targeting Data Analyst, AI/ML Engineer, LLM/RAG, and Analytics roles.\n\n• Top Projects: 5G Small-Cell KPI Management (96.2% accuracy, Random Forest) & SafeDrive AI.\n• Core Stack: Python, SQL, Scikit-learn, Pandas, Streamlit, Agentic AI.\n• Contact: swainabinash839@gmail.com | +91-7077475818.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-950/90 text-neutral-100 overflow-hidden select-text">
      {/* AI Header */}
      <div className="p-3.5 border-b border-neutral-800 bg-neutral-900/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white flex items-center gap-1.5">
              <span>Abinash AI Assistant</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Gemini 2.5
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online & Grounded in Resume Data
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            sound.tap();
            setMessages([messages[0]]);
          }}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors text-xs"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  isUser ? 'bg-cyan-500 text-neutral-950' : 'bg-neutral-800 text-cyan-400 border border-neutral-700'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                    : 'bg-neutral-900/80 border border-neutral-800 text-neutral-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{m.text}</div>
                <div className={`text-[9px] mt-1 text-right font-mono ${isUser ? 'text-cyan-200' : 'text-neutral-500'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/60 p-3 rounded-2xl w-fit border border-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Analyzing neural portfolio records...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-3 py-2 border-t border-neutral-800/80 bg-neutral-900/30 flex items-center gap-1.5 overflow-x-auto shrink-0">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(s)}
            className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-cyan-500/40 text-[11px] text-neutral-300 hover:text-cyan-300 transition-all whitespace-nowrap cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-neutral-800 bg-neutral-900/50 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask Abinash AI anything..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-neutral-950 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
