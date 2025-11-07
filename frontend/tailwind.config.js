/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f1117",
        darkCard: "#1a1c23",
        accent: "#1677ff",
        danger: "#ff4d4f",
        success: "#52c41a",
      },
    },
  },
  plugins: [],
};
