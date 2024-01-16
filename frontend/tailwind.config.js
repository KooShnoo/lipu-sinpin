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
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

