/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        italicBold: ['boschItalicBold, sans-serif'],
        italic: ['boschItalic, sans-serif'],
        medium: ['boschMedium, sans-serif'],
        sans: ['boschRegular', 'sans-serif'],
        bold: ['boschBold', 'sans-serif'], // Adicione sua fonte aqui
      },
      colors: {
        lightBackground: "#FFFFFF", 
        darkBackground: "#2E3033",
        lightText: "#000000", 
        darkText: "#e0e0e0", 
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
