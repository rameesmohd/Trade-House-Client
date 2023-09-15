/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html', 
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  darkMode: false,
  theme: {
    extend: {
      // screens: {
      //   'lg': '1024px', // You can adjust this value
      // }
    },
    fontFamily: {
    poppins: ['Poppins', 'sans'],
    'body': [
    'Montserrat', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
    'sans': [
    'Montserrat', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    }
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    require("tw-elements-react/dist/plugin.cjs"),
    require('@tailwindcss/forms')
],
}
