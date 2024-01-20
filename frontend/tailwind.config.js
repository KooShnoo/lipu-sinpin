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
        "fb-primary": "#242526",
        "fb-wash": "#18191A",
        "fb-wash-light": "#F0F2F5",
        "fb-primary-light": "rgb(240, 242, 245)",
        "fb-secondary-text": "#B0B3B8",
        "fb-secondary-text-light": "#65676B",
        "fb-comment-bg": "#3A3B3C",
        "fb-comment-bg-light": "#F0F2F5",

      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  darkMode: 'class',
};

