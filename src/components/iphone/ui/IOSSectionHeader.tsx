import React, { ReactNode } from 'react';

export interface IOSSectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export const IOSSectionHeader: React.FC<IOSSectionHeaderProps> = ({
  title,
  action,
  className = ''
}) => {
  return (
    <div className={`w-full flex items-center justify-between px-1 mb-2 mt-4 first:mt-1 ${className}`}>
      <h2 className="text-[13px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
        {title}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
};
