import React from 'react';
import { sound } from '../../../utils/audioHaptics';

export interface IOSSegmentOption<T extends string = string> {
  value: T;
  label: string;
  badge?: number | string;
}

export interface IOSSegmentedControlProps<T extends string = string> {
  options: IOSSegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function IOSSegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className = '',
  size = 'md'
}: IOSSegmentedControlProps<T>) {
  const handleSelect = (val: T) => {
    if (val === value) return;
    sound.tap();
    onChange(val);
  };

  return (
    <div className={`w-full flex items-center p-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-300/40 dark:border-neutral-700/40 ${className}`}>
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[9px] text-[13px] font-medium transition-all select-none cursor-pointer ${
              size === 'sm' ? 'py-1 text-[12px]' : 'py-1.5'
            } ${
              isSelected
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200'
              }`}>
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
