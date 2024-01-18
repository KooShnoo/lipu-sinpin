/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fb-blue": "#1877F2",
        "fb-nav": "#242526",
        "fb-wash": "#18191A",
        "fb-wash-light": "#F0F2F5",

      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

