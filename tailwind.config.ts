import type { Config } from "tailwindcss";

const config: Config = {
  // Mode gelap aktif berdasarkan class 'dark' di tag html
  darkMode: 'class', 
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // === ANIMASI TAMBAHAN ===
      keyframes: {
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideUp: "slideUp 0.6s ease-out forwards",
      },
      // === AKHIR ANIMASI ===
    },
  },
  plugins: [],
};
export default config;