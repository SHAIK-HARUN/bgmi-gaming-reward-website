/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgmi: {
          black: "#0a0b0d",
          dark: "#121418",
          card: "#1a1d24",
          gold: "#e6ac00",
          yellow: "#ffcc00",
          orange: "#ff5722",
          red: "#8b0000",
          gray: "#262b36",
          lightGray: "#383f4f",
        }
      },
      fontFamily: {
        gaming: ['Teko', 'Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(230, 172, 0, 0.4)',
        'red-glow': '0 0 15px rgba(139, 0, 0, 0.6)',
        'orange-glow': '0 0 15px rgba(255, 87, 34, 0.5)',
      }
    },
  },
  plugins: [],
}
