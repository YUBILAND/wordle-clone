/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "500px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "380px" },
      // => @media (max-width: 380px) { ... }

      'max-h-sm': { max: '735px' }, // max-height 735px
    },
    extend: {},
  },
  plugins: [],
}

