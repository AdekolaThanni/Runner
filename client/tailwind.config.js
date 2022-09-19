/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svg}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Inter", "serif"],
      },
      spacing: {
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "5rem",
        xl: "7rem",
      },
    },
  },
  plugins: [],
};
