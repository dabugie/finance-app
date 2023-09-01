/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "gray-color": "#1f22250f",
        "gray-color-200": "#1f22250f",
      },
      textColor: {
        "gray-text-color": "#1f2225e6",
        "gray-text-color-200": "#1f22250f",
      },
      boxShadow: {
        "custom-shadow": "#1f22250f 0px 0px 0px 1px inset",
      },
      borderColor: {
        "gray-border-color": "rgba(243, 244, 246, 1)",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
      textColor: ["hover"],
      boxShadow: ["hover"],
      borderColor: ["hover"],
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
