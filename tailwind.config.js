module.exports = {
  mode: 'jit',
  purge: {
    content: ['./**/*.{js,jsx,ts,tsx,vue}'],
    safeList: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
