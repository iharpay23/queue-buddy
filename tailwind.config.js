/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shine': 'shine 4s ease infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-200%) rotate(-45deg)' },
          '100%': { transform: 'translateX(200%) rotate(-45deg)' }
        },
      }
    }
  },
  plugins: [],
}