import React from 'react';

interface MacButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'toolbar' | 'pill' | 'segmented';
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const MacButton: React.FC<MacButtonProps> = ({
  children,
  variant = 'default',
  active = false,
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all select-none cursor-pointer active:scale-[0.98] outline-none';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-[5px] h-[22px]',
    md: 'text-[12px] px-3 py-1 rounded-[6px] h-[26px]',
    lg: 'text-[13px] px-4 py-1.5 rounded-[8px] h-[32px]',
  }[size];

  const variantStyles = {
    default: 'bg-white/80 hover:bg-white text-neutral-800 border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] active:bg-neutral-100',
    primary: 'bg-[#007aff] hover:bg-[#0071eb] text-white border border-[#0062cc] shadow-[0_1px_2px_rgba(0,122,255,0.3),inset_0_1px_0_rgba(255,255,255,0.25)]',
    toolbar: `text-neutral-700 hover:text-neutral-950 hover:bg-black/5 rounded-[6px] ${active ? 'bg-black/10 text-neutral-950 shadow-inner' : ''}`,
    pill: 'bg-white/70 hover:bg-white/90 text-neutral-800 rounded-full border border-black/8 shadow-sm backdrop-blur-md',
    segmented: `rounded-[5px] text-[11px] font-medium h-[22px] px-2.5 ${active ? 'bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)] font-semibold' : 'text-neutral-600 hover:text-neutral-900'}`
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className={children ? 'mr-1.5' : ''}>{icon}</span>}
      {children}
    </button>
  );
};
