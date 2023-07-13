/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quantico: ["Quantico", "sans-serif"],
      },
      colors: {
        primary: "#4F75DD",
        color1: "#FFFFFFD9",
        color2: "#FFFFFF73",
        bg2: "#2A2C33",
        bg3: "#ccc",
      },
    },
  },

  plugins: [],
};
