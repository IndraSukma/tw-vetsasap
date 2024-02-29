/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{html,js,json}"],
  theme: {
    gray: {
      50: "#F9FAFB",
      100: "#F3F3F6",
      200: "#E5E6EB",
      300: "#D1D3DB",
      400: "#9C9FAF",
      500: "#6B6F80",
      600: "#4B4F63",
      700: "#373B51",
      800: "#1F2337",
      900: "#111527",
      950: "#080813",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "3.125rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "4.375rem",
        "2xl": "6.75rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)",
        md: "0 4px 10px -4px rgb(0 0 0 / 0.1), 0 0px 8px -4px rgb(0 0 0 / 0.1)",
        lg: "0 4px 16px -4px rgb(0 0 0 / 0.1), 0 2px 4px -6px rgb(0 0 0 / 0.1)",
        xl: "0 6px 32px -8px rgb(0 0 0 / 0.1), 0 4px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 10px 40px -16px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        vetsasap: {
          primary: "#EA2F9F",
          secondary: "#000080",
          accent: "#5E128C",
          neutral: "#080813",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#dc2626",
          "base-100": "#FFFFFF",
          "primary-content": "#FFFFFF",
          "secondary-content": "#FFFFFF",
          "accent-content": "#FFFFFF",
          "neutral-content": "#FFFFFF",
          "info-content": "#FFFFFF",
          "success-content": "#FFFFFF",
          "warning-content": "#FFFFFF",
          "error-content": "#FFFFFF",
          "base-content": "#080813",
          "--rounded-btn": "0.625rem",
        },
      },
    ],
  },
}
