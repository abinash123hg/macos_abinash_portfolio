import React, { useState, useRef, useEffect } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { Terminal, Send, Cpu, MemoryStick as Memory, Zap, HardDrive } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const SystemInfoApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Abinash Swain iOS Terminal v18.0.0 (darwin-arm64)' },
    { id: '2', type: 'system', text: 'Type "help" to see available portfolio inspection commands.' },
  ]);
  const [command, setCommand] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim();
    if (!cmd) return;

    sound.keyboardType();
    const newLines: TerminalLine[] = [
      ...lines,
      { id: Date.now().toString(), type: 'input', text: `$ ${cmd}` },
    ];

    const lower = cmd.toLowerCase();
    if (lower === 'clear') {
      setLines([]);
      setCommand('');
      return;
    } else if (lower === 'help') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Available Commands:
  about      - Display executive biography and credentials
  skills     - List Python, ML & Data Analytics stack
  projects   - Show flagship models (5G KPI, SafeDrive AI)
  certs      - View Oracle, Tata & Deloitte credentials
  stats      - Display live model accuracy benchmarks
  contact    - Print verified contact endpoints
  clear      - Clear the console buffer`,
      });
    } else if (lower === 'about') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Name: ${portfolioData.name}
Role: ${portfolioData.title}
College: ${portfolioData.college} (CGPA: 8.32, 2023-2027)
Location: ${portfolioData.location}`,
      });
    } else if (lower === 'skills') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Core Stack: Python, Pandas, NumPy, Scikit-learn, SQL, Streamlit, Agentic AI, EDA`,
      });
    } else if (lower === 'projects') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `1. 5G Small-Cell KPI Management (96.2% Acc, Random Forest)
2. SafeDrive AI (Accident Severity Classifier)
3. CSV Intelligence Platform (Automated EDA)`,
      });
    } else if (lower === 'certs') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `• Oracle Certified Associate - Agentic AI (103519150AAI26OFA)
• Tata GenAI Powered Data Analytics
• Deloitte Data Analytics
• Skill India / NSDC Smart Inventory AI`,
      });
    } else if (lower === 'stats') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Telemetry Records: 5,000 | Model Accuracy: 96.2% | F1 Score: 96.5% | Inference: < 45ms`,
      });
    } else if (lower === 'contact') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Email: ${portfolioData.email} | Phone: ${portfolioData.phone} | GitHub: ${portfolioData.github}`,
      });
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `zsh: command not found: ${cmd}. Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setCommand('');
  };

  return (
    <AppWindow
      id="systeminfo"
      title="Terminal"
      subtitle="zsh — 80x24"
      icon={<Terminal className="w-4 h-4 text-emerald-400" />}
      backgroundClass="bg-black"
      headerClass="bg-neutral-900/90 text-white border-b border-neutral-800"
      noPadding
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-full h-full flex flex-col justify-between bg-black text-emerald-400 font-mono text-[12px] p-3 select-text cursor-text"
      >
        <div className="flex-1 overflow-y-auto space-y-1.5 no-scrollbar">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'input'
                  ? 'text-white font-bold'
                  : line.type === 'error'
                  ? 'text-rose-400'
                  : line.type === 'system'
                  ? 'text-cyan-400'
                  : 'text-emerald-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-neutral-800">
          <span className="text-cyan-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type command (e.g. help)..."
            autoFocus
            className="flex-1 bg-transparent text-white outline-none font-mono text-[12px]"
          />
        </form>
      </div>
    </AppWindow>
  );
};
