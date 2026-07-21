/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, trustworthy palette
        sage: {
          50: '#f6f7f4',
          100: '#e8ebe4',
          200: '#d2d7cb',
          300: '#b3bdab',
          400: '#94a08a',
          500: '#778570',
          600: '#5e6b58',
          700: '#4b5547',
          800: '#3d453a',
          900: '#343b32',
        },
        warm: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d9b6',
          300: '#e8be88',
          400: '#dd9d58',
          500: '#d48438',
          600: '#c56d2d',
          700: '#a45527',
          800: '#844526',
          900: '#6b3a22',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf1dc',
          300: '#f5e5be',
          400: '#eed49a',
          500: '#e5c076',
          600: '#d4a352',
          700: '#b18540',
          800: '#8f6b37',
          900: '#755831',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          'Georgia',
          'serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
