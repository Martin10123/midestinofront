/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin.js";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};
