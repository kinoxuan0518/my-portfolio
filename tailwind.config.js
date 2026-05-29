/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--c-bg) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        ink: 'rgb(var(--c-text) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-muted-1) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-muted-2) / <alpha-value>)',
        'ink-4': 'rgb(var(--c-muted-3) / <alpha-value>)',
        line: 'rgb(var(--c-muted-4) / <alpha-value>)',
        // Painterly pastel palette
        blue: '#8FAED6',
        green: '#9BC5C9',
        yellow: '#F2D688',
        lilac: '#C4B7E0',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
        serifcn: ['"Noto Serif SC"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
