/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#07080f',
          panel: 'rgba(11,13,24,0.82)',
          card: 'rgba(14,16,28,0.9)',
        },
        cyan: {
          DEFAULT: '#60e8ff',
          dim: 'rgba(96,232,255,0.15)',
          glow: 'rgba(96,232,255,0.35)',
        },
        violet: {
          DEFAULT: '#8e55ff',
          dim: 'rgba(142,85,255,0.15)',
          glow: 'rgba(142,85,255,0.4)',
        },
        pink: {
          DEFAULT: '#cb72ff',
          glow: 'rgba(203,114,255,0.4)',
        },
        success: '#39d98a',
        danger: '#ff4f6a',
        warning: '#ffd166',
        gold: '#ffd700',
        muted: 'rgba(160,168,220,0.55)',
        border: {
          DEFAULT: 'rgba(96,232,255,0.12)',
          bright: 'rgba(96,232,255,0.35)',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'hunter-gradient': 'linear-gradient(135deg, #07080f 0%, #0d0e1f 50%, #100d1a 100%)',
        'cyan-violet': 'linear-gradient(90deg, #60e8ff, #8e55ff)',
        'violet-pink': 'linear-gradient(90deg, #8e55ff, #cb72ff)',
        'title-gradient': 'linear-gradient(180deg, #ffffff, #d5ddff, #8ab7ff)',
      },
      boxShadow: {
        panel: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(96,232,255,0.08)',
        'panel-hover': '0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(96,232,255,0.22)',
        'cyan-glow': '0 0 16px rgba(96,232,255,0.35)',
        'violet-glow': '0 0 16px rgba(142,85,255,0.45)',
        'pink-glow': '0 0 16px rgba(203,114,255,0.4)',
        'card-open': 'inset 3px 0 0 rgba(96,232,255,0.5)',
        'card-done': 'inset 3px 0 0 rgba(142,85,255,0.38)',
        btn: '0 0 0 1px rgba(96,232,255,0.3), 0 4px 16px rgba(96,232,255,0.1)',
        'btn-hover': '0 0 0 1px rgba(96,232,255,0.6), 0 4px 24px rgba(96,232,255,0.25)',
      },
      borderRadius: {
        panel: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(96,232,255,0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(96,232,255,0.7)' },
        },
        'character-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'character-level-up': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.15)' },
          '60%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'rank-pop': {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '70%': { transform: 'scale(1.15) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bar-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-30px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-in-left': 'slide-in-left 0.35s ease forwards',
        'scale-in': 'scale-in 0.3s ease forwards',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'character-float': 'character-float 3.5s ease-in-out infinite',
        'character-level-up': 'character-level-up 0.6s ease',
        'rank-pop': 'rank-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'toast-in': 'toast-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'live-dot': 'pulse 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
