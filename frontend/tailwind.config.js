/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      backgroundColor: {
        "glass-light": "rgba(255, 255, 255, 0.2)",
        "glass-dark": "rgba(0, 0, 0, 0.2)",
      },
      borderColor: {
        "glass-light": "rgba(255, 255, 255, 0.2)",
        "glass-dark": "rgba(0, 0, 0, 0.2)",
      },
      boxShadow: {
        "custom-black": "1px 6px 15px -5px black",
      },
      colors: {
        gold: "#FFD700",
      },
      keyframes: {
        "border-spin": {
          "100%": {
            tranform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
