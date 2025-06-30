/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        orange: {
          100: '#fff7ed',
          200: '#ffedd5',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],

   extend: {
    animation: {
      'pulse-glow': 'pulseGlow 3s infinite',
      'ping-slow': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
    },
    keyframes: {
      pulseGlow: {
        '0%, 100%': { boxShadow: '0 0 10px #22c55e, 0 0 20px #22c55e' },
        '50%': { boxShadow: '0 0 20px #4ade80, 0 0 30px #4ade80' },
      },
    },
  },
}

