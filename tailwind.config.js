/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        funnel: ['"Funnel Display"', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        text: '#e8ecf3',
        background: '#1c4da0',
        backgroundLight: '#e0e0e0',
        primary: '#e0e0e0',
        secondary: '#a8aecc',
        accent: '#4373c7',
        glossy: 'rgba(255,255,255,0.7)',
        glossyDark: 'rgba(30,41,59,0.7)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
