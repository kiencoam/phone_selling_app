/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#D70018', // Màu chủ đạo giống TGDĐ
          secondary: '#3E3E3F',
          accent: '#F8C806',
          light: '#F3F3F3',
          dark: '#222222',
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  