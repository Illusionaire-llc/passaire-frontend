/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: "#753370 ",
          200: "#298096  ",
        },
      },
      screens: {
        xs: "468px",
        tablet: "992px",
      },
    },
  },
  plugins: [],
};
