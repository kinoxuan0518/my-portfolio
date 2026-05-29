/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--c-bg) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        ink: 'rgb(var(--c-text) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-text-2) / <alpha-value>)',
        'ink-soft': 'rgb(var(--c-muted-1) / <alpha-value>)',
        'ink-faint': 'rgb(var(--c-muted-2) / <alpha-value>)',
        'ink-ghost': 'rgb(var(--c-muted-3) / <alpha-value>)',
        seal: 'rgb(var(--c-accent) / <alpha-value>)',
        gold: 'rgb(var(--c-accent-2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fraunces', '"Playfair Display"', '"Noto Serif SC"', 'Georgia', 'serif'],
        serif: ['Newsreader', '"Noto Serif SC"', '"Songti SC"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
