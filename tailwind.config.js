/** @type {import('tailwindcss').Config }  **/
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],

  theme: {
    extend: {
      colors: {
        primary: "#010851",
        secondary: "#4299E1",
        tartiarty: "#CBD5E0",
        pink: "#EE9AE5",
        light: "rgba(255,255,255,0.17)",
        neutralSilver: "#F5F7FA",
        neutralDgrey: "#4D4D4D",
        brandPrimary: "#4CAF4F",
        neutralGrey: "#717171",
      },
      boxShadow: {
        "3xl": "0 10px 50px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
