/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,svg}"],
  theme: {
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
