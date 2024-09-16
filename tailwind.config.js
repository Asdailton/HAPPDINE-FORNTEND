/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        cursive: ["Pacifico", "cursive"],
      },
      colors: {
        lightBackground: "#FFFFFF", // Cor de fundo no modo claro
        darkBackground: "#2E3033", // Cor de fundo no modo escuro
        lightText: "#000000", // Cor do texto no modo claro
        darkText: "#e0e0e0", // Cor do texto no modo escuro
      },
    },
  },
  darkMode: 'class', // Habilita o modo escuro usando a classe 'dark'
  plugins: [],
}
