/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,svg}"],
  theme: {
    screens: {
      // 1200px
      xl: { max: "75em" },
      // 1000px
      lg: { max: "62.5em" },
      // 750px
      md: { max: "46.88em" },
      // 550px
      sm: { max: "34.38em" },
      // 450px
      xs: { max: "28.13em" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3.5rem",
        xl: "5rem",
        "2xl": "7rem",
      },
      colors: {
        lightGray: "#eeeeee",
        darkGray: "#515151",
        grayFaint: "#51515157",
        brown: "#8a7350",
      },
    },
    fontSize: {
      sm: "1.5rem",
      md: "2rem",
      lg: "2.5rem",
    },
  },
  plugins: [],
};
