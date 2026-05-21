/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--c-bg) / <alpha-value>)',
        'neon-green': 'rgb(var(--c-accent-1) / <alpha-value>)',
        'neon-pink': 'rgb(var(--c-accent-2) / <alpha-value>)',
        'vintage-white': 'rgb(var(--c-text) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Noto Serif SC"', '"Songti SC"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
