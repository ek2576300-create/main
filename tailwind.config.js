/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'Arial', 'sans-serif'] },
      boxShadow: { card: '0 1px 2px rgba(0,0,0,.04)' },
    },
  },
  plugins: [],
};
