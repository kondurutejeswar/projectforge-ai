import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#080B14', // near-black void — primary background
          900: '#0D1220',
          800: '#131A2C',
          700: '#1B2338',
        },
        signal: {
          blue: '#3E7BFA',   // electric blue — links, info, secondary CTA
          green: '#22D3A6',  // signal green — primary CTA, "success/deploy" color
          violet: '#8B6BFA', // violet — AI/GenAI accent, gradients
        },
        slate: {
          50: '#F4F6FB',
          200: '#C7CEDE',
          400: '#8892A8',
          600: '#5B6580',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(62,123,250,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(139,107,250,0.12), transparent 40%), radial-gradient(circle at 50% 100%, rgba(34,211,166,0.10), transparent 40%)',
        'terminal-grid':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-16': '16px 16px',
      },
      boxShadow: {
        'glow-blue': '0 0 0 1px rgba(62,123,250,0.4), 0 0 24px rgba(62,123,250,0.25)',
        'glow-green': '0 0 0 1px rgba(34,211,166,0.4), 0 0 24px rgba(34,211,166,0.25)',
        'glow-violet': '0 0 0 1px rgba(139,107,250,0.4), 0 0 24px rgba(139,107,250,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
