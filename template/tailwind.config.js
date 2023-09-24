const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  mode: 'jit',
  plugins: [],
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
};
