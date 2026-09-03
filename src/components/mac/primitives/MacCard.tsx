import React from 'react';

interface MacCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'frosted' | 'solid' | 'controlModule' | 'subtle';
}

export const MacCard: React.FC<MacCardProps> = ({
  children,
  variant = 'frosted',
  className = '',
  ...props
}) => {
  const variantStyles = {
    frosted: 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]',
    solid: 'bg-white border border-neutral-200/80 shadow-sm',
    controlModule: 'bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_6px_20px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]',
    subtle: 'bg-black/[0.03] border border-black/[0.04]'
  }[variant];

  return (
    <div
      className={`rounded-[14px] p-3 text-neutral-800 ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
