import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'neofetch',
      output: (
        <div className="font-mono text-xs text-neutral-300 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 bg-neutral-900/40 rounded-xl border border-neutral-800">
          <div className="text-cyan-400 font-bold">
            <pre className="text-[10px] leading-tight">
{`    /\_/\  
   ( o.o )  Abinash OS 15.4
    > ^ <   Neural Edition`}
            </pre>
          </div>
          <div className="space-y-0.5 text-[11px]">
            <div><span className="text-cyan-400 font-semibold">User:</span> abinash@centurion</div>
            <div><span className="text-cyan-400 font-semibold">Degree:</span> B.Tech AI/ML</div>
            <div><span className="text-cyan-400 font-semibold">CGPA:</span> 8.32 / 10.0</div>
            <div><span className="text-cyan-400 font-semibold">Flagship ML:</span> 5G SLA (96.2%) & SafeDrive AI</div>
            <div><span className="text-cyan-400 font-semibold">Shell:</span> zsh 5.9 (x86_64-apple-darwin24)</div>
            <div className="text-neutral-400 pt-1">Type <span className="text-yellow-400">help</span> to list all commands.</div>
          </div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>(['neofetch']);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    sound.tap();

    if (!cmd) return;

    setCommandList(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <div className="text-cyan-400 font-bold">Available Commands:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[11px] font-mono">
              <div><span className="text-yellow-400">about</span> — Bio & summary</div>
              <div><span className="text-yellow-400">projects</span> — Flagship AI models</div>
              <div><span className="text-yellow-400">skills</span> — Tech stack & levels</div>
              <div><span className="text-yellow-400">certs</span> — Oracle & Tata creds</div>
              <div><span className="text-yellow-400">edu</span> — CUTM B.Tech info</div>
              <div><span className="text-yellow-400">exp</span> — Internship details</div>
              <div><span className="text-yellow-400">contact</span> — Email, phone, socials</div>
              <div><span className="text-yellow-400">neofetch</span> — System specs</div>
              <div><span className="text-yellow-400">clear</span> — Wipe terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="text-xs text-neutral-300 space-y-1 leading-relaxed">
            <div className="font-bold text-white">{portfolioData.name} — {portfolioData.title}</div>
            <div>{portfolioData.bio}</div>
            <div className="text-cyan-400">Location: {portfolioData.location} | CGPA: {portfolioData.cgpa}</div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            {portfolioData.projects.map(p => (
              <div key={p.id} className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="font-bold text-cyan-300">{p.title}</div>
                <div className="text-neutral-400 text-[11px]">{p.description}</div>
                <div className="text-yellow-400 font-mono text-[10px] mt-1">{p.liveDemoUrl || p.githubUrl}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            {portfolioData.skills.map(s => (
              <div key={s.name}>
                <span className="text-cyan-400 font-bold">{s.name}: </span>
                <span className="text-neutral-300">{s.skills.map(k => `${k.name} (${k.level}%)`).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certificates':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            {portfolioData.certificates.map(c => (
              <div key={c.id} className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-bold text-amber-400">{c.title}</div>
                <div className="text-neutral-400 text-[11px]">{c.issuer} • ID: {c.credentialId}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'edu':
      case 'education':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            {portfolioData.education.map(e => (
              <div key={e.id} className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-bold text-white">{e.degree}</div>
                <div className="text-neutral-400 text-[11px]">{e.institution} ({e.period}) • {e.scoreLabel}: {e.score}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
      case 'experience':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            {portfolioData.experience.map(x => (
              <div key={x.id} className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-bold text-white">{x.role} @ {x.company}</div>
                <div className="text-cyan-400 text-[11px]">{x.period} • {x.type}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 font-mono">
            <div>Email: <a href={`mailto:${portfolioData.email}`} className="text-cyan-400 underline">{portfolioData.email}</a></div>
            <div>Phone: {portfolioData.phone}</div>
            <div>GitHub: <a href={portfolioData.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolioData.github}</a></div>
            <div>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolioData.linkedin}</a></div>
          </div>
        );
        break;

      case 'neofetch':
        outputNode = (
          <div className="font-mono text-xs text-neutral-300 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 bg-neutral-900/40 rounded-xl border border-neutral-800">
            <div className="text-cyan-400 font-bold">
              <pre className="text-[10px] leading-tight">
{`    /\_/\  
   ( o.o )  Abinash OS 15.4
    > ^ <   Neural Edition`}
              </pre>
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div><span className="text-cyan-400 font-semibold">User:</span> abinash@centurion</div>
              <div><span className="text-cyan-400 font-semibold">Degree:</span> B.Tech AI/ML</div>
              <div><span className="text-cyan-400 font-semibold">CGPA:</span> 8.32 / 10.0</div>
              <div><span className="text-cyan-400 font-semibold">Flagship ML:</span> 5G SLA (96.2%) & SafeDrive AI</div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs text-red-400">
            zsh: command not found: {rawCmd}. Type <span className="text-yellow-400">help</span> for commands.
          </div>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output: outputNode
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="h-full w-full bg-black/95 text-emerald-400 font-mono p-4 overflow-y-auto select-text cursor-text"
    >
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-cyan-400 font-bold">abinash@macbook ~ %</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div>{item.output}</div>
          </div>
        ))}

        {/* Input Prompt */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-cyan-400 font-bold">abinash@macbook ~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none font-mono"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
