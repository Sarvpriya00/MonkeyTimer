/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e2b714',
          light: '#f0d780',
          dark: '#b5930a',
        },
        secondary: {
          DEFAULT: '#d1d0c5',
          light: '#e8e7e2',
          dark: '#a8a79d',
        },
        background: {
          DEFAULT: '#323437',
          light: '#4a4d51',
          dark: '#1a1b1e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
