import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  RotateCw, 
  Sparkles, 
  Zap, 
  Cpu, 
  Brain, 
  Database, 
  Code2, 
  CheckCircle2 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import confetti from 'canvas-confetti';
import { QuizApp } from './QuizApp';

type GameMode = 'quiz' | 'memory' | 'tictactoe';

export const GamesApp: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameMode>('quiz');

  // Memory Game State
  const MEMORY_ICONS = ['Python', 'SQL', 'Scikit-learn', 'Streamlit', 'RandomForest', 'Pandas', 'NumPy', '5G-KPI'];
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initMemoryGame = () => {
    const deck = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((val, idx) => ({ id: idx, value: val, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    if (activeGame === 'memory') {
      initMemoryGame();
    }
  }, [activeGame]);

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length === 2 || cards[idx].flipped || cards[idx].matched) return;

    sound.tap();
    const newCards = [...cards];
    newCards[idx].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newCards[first].value === newCards[second].value) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedIndices([]);
        sound.notificationPing();

        // Check if all matched
        if (newCards.every(c => c.matched)) {
          confetti({ particleCount: 80, spread: 60 });
        }
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Tic Tac Toe State
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    if (b.every(x => x !== null)) return 'Draw';
    return null;
  };

  const handleTttClick = (i: number) => {
    if (board[i] || winner) return;
    sound.tap();
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') confetti({ particleCount: 60 });
      return;
    }

    // AI Move
    setTimeout(() => {
      const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
      if (emptyIndices.length > 0) {
        const aiPick = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        newBoard[aiPick] = 'O';
        setBoard([...newBoard]);
        const aiWin = checkWinner(newBoard);
        if (aiWin) setWinner(aiWin);
      }
    }, 300);
  };

  const resetTtt = () => {
    sound.tap();
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn('X');
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-950/90 text-neutral-100 overflow-hidden select-text">
      {/* Game Selector Bar */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Apple Game Center</span>
        </div>

        <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => { sound.tap(); setActiveGame('quiz'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeGame === 'quiz' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Quiz (30 Qs)</span>
          </button>
          <button
            onClick={() => { sound.tap(); setActiveGame('memory'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeGame === 'memory' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Neural Match
          </button>
          <button
            onClick={() => { sound.tap(); setActiveGame('tictactoe'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeGame === 'tictactoe' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            AI Tic-Tac-Toe
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="flex-1 overflow-hidden">
        {activeGame === 'quiz' ? (
          <QuizApp />
        ) : activeGame === 'memory' ? (
          <div className="h-full overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-4 text-center">
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>Moves: <strong className="text-white font-mono">{moves}</strong></span>
              <button
                onClick={initMemoryGame}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-400 flex items-center gap-1 text-xs cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                Restart
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {cards.map((card, idx) => {
                const isRevealed = card.flipped || card.matched;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    className={`aspect-square rounded-xl text-xs font-bold border transition-all flex items-center justify-center p-1 cursor-pointer ${
                      card.matched
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 scale-95 shadow-xs'
                        : isRevealed
                        ? 'bg-neutral-800 border-cyan-500 text-cyan-300'
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-600'
                    }`}
                  >
                    {isRevealed ? card.value : '?'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        ) : (
          /* Tic Tac Toe */
          <div className="h-full overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs space-y-4 text-center">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                <span>Playing vs: <strong className="text-cyan-400">Abinash AI</strong></span>
                <button
                  onClick={resetTtt}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-400 flex items-center gap-1 text-xs cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-neutral-900 p-3 rounded-2xl border border-neutral-800">
                {board.map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTttClick(idx)}
                    className="aspect-square rounded-xl bg-neutral-950 border border-neutral-800 hover:border-cyan-500/50 text-2xl font-black transition-all flex items-center justify-center cursor-pointer text-white"
                  >
                    <span className={cell === 'X' ? 'text-cyan-400' : 'text-amber-400'}>{cell}</span>
                  </button>
                ))}
              </div>

              {winner && (
                <div className="p-3 rounded-xl bg-neutral-900 border border-cyan-500/40 text-xs font-bold text-cyan-300">
                  {winner === 'Draw' ? 'Game ended in a Draw!' : winner === 'X' ? '🎉 You defeated Abinash AI!' : '🤖 Abinash AI wins this round!'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
