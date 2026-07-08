import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#0a0a0a',
          soft: '#121212',
          card: '#161513',
        },
        gold: {
          DEFAULT: '#c9a24b',
          light: '#e4c887',
          dark: '#8f7530',
        },
        beige: {
          DEFAULT: '#e8e1d3',
          soft: '#f4efe4',
        },
        ivory: '#f8f6f1',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8f7530 0%, #e4c887 45%, #c9a24b 70%, #8f7530 100%)',
        'noir-radial': 'radial-gradient(ellipse at top, #1a1a1a 0%, #0a0a0a 60%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 162, 75, 0.35)',
        soft: '0 20px 60px -15px rgba(0,0,0,0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
