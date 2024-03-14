/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'green1': '#62ad1e',
        'green2': '#7ec119',
        'green3': '#96d534',
        'loginColor': '#3ab399',
        'profileColor': '#13687c',
      }
    },
  },  
  plugins: [],
  
}

