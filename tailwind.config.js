/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cyberpunk",
      "luxury",
      "dracula",
      "cmyk",
      "winter",
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
