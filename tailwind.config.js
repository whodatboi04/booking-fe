/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axolotl: {
          50: "#f1f5f0",
          100: "#e2e8df",
          200: "#c9d4c2",
          300: "#a7b99d",
          400: "#879f7c",
          500: "#6a835f",
          600: "#4b5f43",
          700: "#40513a",
          800: "#364232",
          900: "#303a2d",
          950: "#171e15",
        },
      },
    },
  },

  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
