/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          industrial: {
            black: '#0A0A0A',
            dark: '#1A1A1A',
            charcoal: '#2D2D2D',
            gray: '#4A4A4A',
            lightgray: '#B0B0B0',
            offwhite: '#F5F5F5',
            yellow: '#FFC107',
            yellowhover: '#E6AC00',
            beige: '#E8DCC4',
          }
        },
        fontFamily: {
          heading: ['Montserrat', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
          mono: ['Roboto Mono', 'monospace'],
        },
      },
    },
    plugins: [],
  }