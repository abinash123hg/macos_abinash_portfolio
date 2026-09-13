import React, { useState, useRef, useEffect } from 'react';
import { AppWindow } from '../ui/AppWindow';
import {
  Sparkles,
  Send,
} from 'lucide-react';
import { chatbotDataset } from '../../../data/chatbotDataset';
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  const quickPrompts = [
    'Tell me about Abinash in 30s',
    'What roles is he a fit for?',
    'Top Projects (MCP & DocuRAG)',
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
      await new Promise(resolve => setTimeout(resolve, 3000));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });
      const data = await res.json();

      const botReplyText = data.reply || `Abinash is pursuing B.Tech AI/ML at ${portfolioData.college} with CGPA ${portfolioData.cgpa}. Contact him at ${portfolioData.email}.`;

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
      const fallbackReply = `Abinash is pursuing B.Tech AI/ML at ${portfolioData.college} with CGPA ${portfolioData.cgpa}. His portfolio focuses on MLOps & Autonomous Data Agent with MCP and DocuRAG — Multimodal Document RAG & Knowledge Engine.\n\nYou can ask about his projects, skills, tools, certifications, and hiring availability. You can contact him at ${portfolioData.email} or ${portfolioData.phone}.`;

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        chatAreaRef.current?.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 40);
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
        <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 space-y-3">
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
            <div className="ai-loader-shell">
              <div className="ai-loader-top">
                <span className="ai-loader-spark" />
                <span className="ai-loader-label">Thinking</span>
              </div>
              <div className="ai-loader-shimmer">
                <span className="ai-loader-shimmer-line animate-gemini-loading" />
                <span className="ai-loader-shimmer-line animate-gemini-loading" />
                <span className="ai-loader-shimmer-line animate-gemini-loading" />
              </div>
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
            ref={inputRef}
            type="text"
            autoFocus
            placeholder="Ask about projects, skills, ML models..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setTimeout(() => {
                chatAreaRef.current?.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: 'smooth' });
              }, 10);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            onFocus={() => {
              setTimeout(() => {
                chatAreaRef.current?.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: 'smooth' });
              }, 120);
            }}
            className="flex-1 h-9 px-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[14px] text-neutral-900 dark:text-white placeholder-neutral-400 outline-none border border-neutral-200 dark:border-neutral-700 focus:border-[#007AFF]"
          />
          <button
            onClick={() => {
              handleSend();
              setTimeout(() => inputRef.current?.focus(), 20);
            }}
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
