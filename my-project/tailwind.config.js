/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem', // Custom size
        '8xl': '6rem', // Custom size
        '9xl': '7rem', // Custom size
      }
    },
  },
  plugins: [],
}