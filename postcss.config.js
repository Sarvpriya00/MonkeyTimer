module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      content: ['./src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    },
    autoprefixer: {},
  },
}
