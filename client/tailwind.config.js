/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { 
            transform: 'translate(20px, -20px) scale(1)',
            opacity: 0.8,
          },
          '50%': { 
            transform: 'translate(20px, -20px) scale(1.05)',
            opacity: 1,
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease infinite',
      },
      colors:{
        primary:"#e0c521"
      }
    },
  },
  plugins: [],
};
