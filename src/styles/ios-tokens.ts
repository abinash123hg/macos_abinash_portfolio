// iOS 18 Design System Tokens
// Mathematical ratios, modern translucency, San Francisco typography stack, and adaptive light/dark tokens

export const iosTokens = {
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    sizes: {
      largeTitle: 'text-[34px] leading-[41px] font-bold tracking-tight',
      title1: 'text-[28px] leading-[34px] font-bold tracking-tight',
      title2: 'text-[22px] leading-[28px] font-semibold tracking-tight',
      title3: 'text-[20px] leading-[25px] font-semibold tracking-tight',
      headline: 'text-[17px] leading-[22px] font-semibold',
      body: 'text-[16px] leading-[22px] font-normal',
      callout: 'text-[15px] leading-[20px] font-normal',
      subhead: 'text-[14px] leading-[19px] font-normal',
      footnote: 'text-[13px] leading-[18px] font-normal',
      caption1: 'text-[12px] leading-[16px] font-normal',
      caption2: 'text-[11px] leading-[13px] font-medium tracking-tight',
      appLabel: 'text-[11.5px] leading-[13px] font-medium tracking-tight',
    },
  },
  
  radii: {
    appIcon: 'rounded-[22.5%]', // iOS squircle ~22-26%
    widget: 'rounded-[24px]',
    appWindow: 'rounded-[44px]',
    card: 'rounded-[18px]',
    sheet: 'rounded-t-[28px]',
    pill: 'rounded-full',
    button: 'rounded-[12px]',
    buttonPill: 'rounded-full',
    controlTile: 'rounded-[20px]',
    island: 'rounded-full',
  },

  colors: {
    primary: '#007AFF', // iOS System Blue
    success: '#34C759', // iOS System Green
    warning: '#FF9500', // iOS System Orange
    destructive: '#FF3B30', // iOS System Red
    indigo: '#5856D6',
    purple: '#AF52DE',
    pink: '#FF2D55',
    teal: '#30B0C7',
    mint: '#00C7BE',
    cyan: '#32ADE6',
    yellow: '#FFCC00',
    gray: '#8E8E93',
  },

  materials: {
    // Ultra-thin & regular translucency for iOS 18 glassmorphic layers
    ultraThin: 'backdrop-blur-2xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-sm',
    thin: 'backdrop-blur-2xl bg-white/60 dark:bg-neutral-900/60 border border-white/20 dark:border-white/10 shadow-md',
    regular: 'backdrop-blur-3xl bg-white/75 dark:bg-neutral-900/80 border border-black/5 dark:border-white/10 shadow-lg',
    thick: 'backdrop-blur-3xl bg-white/90 dark:bg-neutral-900/95 border border-black/5 dark:border-white/10 shadow-xl',
    card: 'bg-white/80 dark:bg-neutral-900/85 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow',
    cardSolid: 'bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm',
    insetGroup: 'bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-[16px] overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80',
    headerGlass: 'backdrop-blur-2xl bg-neutral-100/75 dark:bg-neutral-950/75 border-b border-neutral-200/50 dark:border-neutral-800/50 sticky top-0 z-30',
  },

  transitions: {
    spring: 'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
    fast: 'transition-all duration-150 ease-out',
    smooth: 'transition-all duration-250 ease-in-out',
  }
};
