/** @type {import('tailwindcss').Config }  **/

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#010851",
        secondary: "#9A7AF1",
        tartiarty: "#707070",
        pink: "#EE9AE5",
        light: "rgba(255,255,255,0.17)",
      },
      boxShadow: {
        "3xl": "0 10px 50px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
