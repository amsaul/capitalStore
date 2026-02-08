/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom colors if you want to use them later
        brandBlue: '#1d4ed8',
        brandOrange: '#f97316',
      }
    },
  },
  plugins: [],
}