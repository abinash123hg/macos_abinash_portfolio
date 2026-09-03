import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSButton } from '../ui/IOSButton';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { Gamepad2, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

export const GamesApp: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'tictactoe' | 'number2048'>('tictactoe');

  // Tic Tac Toe State
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ x: 0, o: 0 });

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(Boolean) ? 'Draw' : null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) return;

    sound.tap();
    const newBoard = [...board];
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') {
        sound.success();
        setScore(prev => ({ ...prev, x: prev.x + 1 }));
      } else if (win === 'O') {
        sound.success();
        setScore(prev => ({ ...prev, o: prev.o + 1 }));
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetTicTacToe = () => {
    sound.tap();
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <AppWindow
      id="games"
      title="Game Center"
      subtitle="Interactive Minigames"
      icon={<Gamepad2 className="w-4 h-4 text-purple-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'tictactoe', label: 'Tic-Tac-Toe AI' },
          { value: 'number2048', label: 'AI Memory 2048' },
        ]}
        value={activeGame}
        onChange={(v) => setActiveGame(v as any)}
        className="mb-4"
      />

      {activeGame === 'tictactoe' ? (
        <div className="flex flex-col items-center">
          {/* Score Board */}
          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            <IOSCard padding="sm" className="text-center bg-blue-50 dark:bg-blue-950/40 border-blue-200/50">
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">Player (X)</span>
              <div className="text-[22px] font-bold text-neutral-900 dark:text-white mt-0.5">{score.x}</div>
            </IOSCard>
            <IOSCard padding="sm" className="text-center bg-rose-50 dark:bg-rose-950/40 border-rose-200/50">
              <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">Opponent (O)</span>
              <div className="text-[22px] font-bold text-neutral-900 dark:text-white mt-0.5">{score.o}</div>
            </IOSCard>
          </div>

          {/* Status Message */}
          <div className="text-[14px] font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            {winner ? (
              winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}! 🎉`
            ) : (
              `Turn: ${isXNext ? 'X (You)' : 'O'}`
            )}
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-2 w-64 h-64 p-2 bg-neutral-200 dark:bg-neutral-800 rounded-[22px] shadow-md mb-4">
            {board.map((cell, i) => (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                className={`w-full h-full rounded-[14px] bg-white dark:bg-neutral-900 flex items-center justify-center text-2xl font-black transition-transform active:scale-90 cursor-pointer shadow-xs ${
                  cell === 'X' ? 'text-[#007AFF]' : 'text-[#FF3B30]'
                }`}
              >
                {cell}
              </button>
            ))}
          </div>

          {/* Reset Button */}
          <IOSButton
            variant="gray"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={resetTicTacToe}
          >
            Restart Match
          </IOSButton>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-[17px] font-bold text-neutral-900 dark:text-white">
            AI Model Benchmark Score
          </h3>
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 max-w-xs mt-1 mb-4">
            5G Small-Cell KPI Random Forest classifier holds a high score benchmark of 96.2% precision.
          </p>
          <IOSCard padding="sm" className="w-full max-w-xs bg-amber-50 dark:bg-amber-950/30 border-amber-200/50">
            <span className="text-[11px] font-semibold text-amber-600">Model High Score</span>
            <div className="text-[26px] font-black text-neutral-900 dark:text-white">96.5% F1</div>
          </IOSCard>
        </div>
      )}
    </AppWindow>
  );
};
