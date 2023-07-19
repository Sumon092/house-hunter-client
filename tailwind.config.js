/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    darkSelector: false,
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
