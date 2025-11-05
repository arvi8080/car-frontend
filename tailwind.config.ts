import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-dull": "#1F58D8",
        light: "#F1F5F9",
        borderColor: "#c4c7d3"
      },
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
export default config;
