const colors = require('tailwindcss/colors'); // ✅ import colors

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,     // lowercase 'gray'
        slate: colors.slate,
        stone: colors.stone,
        blue: colors.sky,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
