/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vphs: {
          darkest: '#050a14',
          dark: '#070e1e',
          navy: '#0b1329',
          surface: '#111c38',
          card: '#152244',
          border: '#1f2f58',
          gold: {
            DEFAULT: '#f59e0b',
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          blue: {
            light: '#38bdf8',
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(245, 158, 11, 0.15)',
        'gold-md': '0 4px 20px rgba(245, 158, 11, 0.25)',
        'gold-lg': '0 10px 30px rgba(245, 158, 11, 0.35)',
        'navy-sm': '0 2px 10px rgba(7, 14, 30, 0.4)',
        'navy-md': '0 8px 30px rgba(7, 14, 30, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
