/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      colors: {
        ink: '#000000',
        panel: '#111111',
      },
      boxShadow: {
        glow: '0 0 60px rgba(255, 255, 255, 0.18)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 1.2s infinite',
        pulseGlow: 'pulseGlow 3.4s ease-in-out infinite',
        grid: 'grid 18s linear infinite',
        burstDrift: 'burstDrift 8s ease-in-out infinite',
        iconOrbit: 'iconOrbit 9s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.65', filter: 'blur(0)' },
          '50%': { opacity: '1', filter: 'blur(1px)' },
        },
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(44px)' },
        },
        burstDrift: {
          '0%, 100%': {
            opacity: '0.38',
            transform: 'translate(var(--x), var(--y)) rotate(var(--r)) scale(1)',
          },
          '50%': {
            opacity: '0.78',
            transform: 'translate(calc(var(--x) * 1.08), calc(var(--y) * 1.08)) rotate(calc(var(--r) + 24deg)) scale(1.15)',
          },
        },
        iconOrbit: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotateX(0deg)' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotateX(8deg)' },
        },
      },
    },
  },
  plugins: [],
};
