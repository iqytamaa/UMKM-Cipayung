/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // TAMBAHKAN BLOK INI UNTUK ANIMASI
      keyframes: {
        slideUp: {
          "from": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "to": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideUp: "slideUp 0.6s ease-out forwards",
      },
      // AKHIR DARI TAMBAHAN
    },
  },
  plugins: [],
};