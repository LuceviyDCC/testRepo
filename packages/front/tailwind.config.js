/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      primary: "#ea667b",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      fontFamily: {
        primary: "Manrope",
      },
      colors: {
        normal: "#212129",
        light: '#7f7f7f',
      },
    },
  },
  plugins: [],
};

