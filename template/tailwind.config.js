module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx', './index.js'],
  darkMode: ['class', '[data-mode="dark"]'],
  mode: 'jit',
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
      },
    },
  },
  variants: {
    extend: {},
  },
};
