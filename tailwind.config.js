/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0b0618",
        secondary: "#C824EC",
        accentGrad: "linear-gradient(90deg, #AA14F0 0%, #AA14F0 100%)",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'gradient-Radial': "radial-gradient(var(--tw-gradient-stops))",
        'email-form': "url('/src/assets/contour-lines.svg')",
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      penis:"1385px",
      xl: "1700px",
    },
  },
  plugins: [],
};