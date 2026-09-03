import React from 'react';

export interface MacSidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface MacSidebarSection {
  title?: string;
  items: MacSidebarItem[];
}

interface MacListProps {
  sections: MacSidebarSection[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const MacList: React.FC<MacListProps> = ({
  sections,
  selectedId,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`w-full py-2 space-y-4 select-none ${className}`}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-0.5">
          {section.title && (
            <div className="px-3 py-1 text-[11px] font-semibold text-neutral-500 tracking-tight">
              {section.title}
            </div>
          )}
          <div className="space-y-[1px] px-2">
            {section.items.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`w-full flex items-center justify-between px-2 py-[4.5px] rounded-[6px] text-[13px] font-normal transition-colors cursor-pointer group text-left ${
                    isSelected
                      ? 'bg-[#007aff] text-white font-medium shadow-[0_1px_2px_rgba(0,122,255,0.3)]'
                      : 'text-neutral-700 hover:bg-black/[0.05] active:bg-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {item.icon && (
                      <span className={`w-4 h-4 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'text-white' : 'text-[#007aff]'
                      }`}>
                        {item.icon}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'text-white/90 bg-white/20' : 'text-neutral-400 bg-black/5'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
