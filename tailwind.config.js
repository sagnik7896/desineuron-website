/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#1A1A1A',
        'brand-dark-light': '#2C2C2C',
        'brand-light': '#F5F5F5',
        'brand-primary': '#00BFFF',
        'brand-secondary': '#FFD700',
        'brand-red-hot': '#D10000',
        'brand-red-warn': '#FF4500',
      },
    },
  },
  plugins: [],
};