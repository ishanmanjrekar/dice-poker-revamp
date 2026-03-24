/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parlor: {
          primary: '#3e4324', // Deep Olive
          secondary: '#ad3130', // Terracotta
          surface: '#f9fbee', // Cream
          'surface-low': '#f3f5e8',
          'surface-container': '#edefe2',
          'surface-highest': '#e1e4d7',
          'on-surface-variant': '#47473e',
        }
      },
      boxShadow: {
        'parlor': '0 20px 40px -10px rgba(62, 67, 36, 0.08), 0 10px 20px -5px rgba(62, 67, 36, 0.04)',
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
        display: ['Be Vietnam Pro', 'sans-serif'],
        mono: ['Public Sans', 'monospace'],
      },
    },
  },
  plugins: [],
}
