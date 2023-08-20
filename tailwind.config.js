/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}",
    "./src/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // cardBgColor: "#A0CFFA",
        // bodyBgColor: "#66A3E0",
        // movieBorderColor: "#C0C0C0",
        // castNameCardBgColor: "#ECECEC",
        // headingsTextColor: "#333333",

        cardBgColor: "white",
        bodyBgColor: "#baa88f",
        movieBorderColor: "#d7d6d6",
        castNameCardBgColor: "#e1dede",
        headingsTextColor: "black",

        // headingsValueTextColor: "#a7a7a7",
        // bodyBgColor: "#070628",
      },
    },
  },
  plugins: [],
}