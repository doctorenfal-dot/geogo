/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        seterra: {
          green: "#22c55e",
          yellow: "#eab308",
          orange: "#f97316",
          red: "#ef4444",
          darkred: "#991b1b",
        }
      },
      keyframes: {
        flash: {
          '0%, 100%': { fill: '#ef4444', opacity: '1' },
          '50%': { fill: '#fbbf24', opacity: '0.3' },
        }
      },
      animation: {
        flash: 'flash 0.8s infinite',
      }
    },
  },
  plugins: [],
}
