/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "cyberpunk",
      "valentine",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "winter",
      "dim",
      "sunset",
    ],

    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
