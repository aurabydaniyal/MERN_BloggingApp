/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: {
          50: '#fdf8f0',
          100: '#f9edcc',
          200: '#f5e0a8',
          300: '#f1d384',
          400: '#edc660',
          500: '#e9b93c',
          600: '#d4a732',
          700: '#bf9528',
          800: '#aa831e',
          900: '#957114',
        },
        dark: {
          100: '#f0f0f0',
          200: '#d4d4d4',
          300: '#b8b8b8',
          400: '#9c9c9c',
          500: '#808080',
          600: '#666666',
          700: '#4c4c4c',
          800: '#323232',
          900: '#191919',
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}