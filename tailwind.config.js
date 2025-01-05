/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bass-thump":
          "bass-thump var(--pulse-duration, 0.54s) cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "bass-thump": {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          },
          "40%": {
            transform: "scale(1.02)",
            boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
  },
  plugins: [],
};