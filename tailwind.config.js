const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)", ...fontFamily.sans],
      },
      boxShadow: {
        stripe:
          "0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color), 0 -20px 25px -5px var(--tw-shadow-color), 0 -8px 10px -6px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
};
