/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include JSX files
    './public/index.html', // Include your HTML file
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
}