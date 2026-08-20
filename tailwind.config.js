/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#061257", // TODO: change with your color
      },
      fontFamily: {
        sans: ["BricolageGrotesque-Regular"],
        extralight: ["BricolageGrotesque-ExtraLight"],
        light: ["BricolageGrotesque-Light"],
        regular: ["BricolageGrotesque-Regular"],
        medium: ["BricolageGrotesque-Medium"],
        semibold: ["BricolageGrotesque-SemiBold"],
        bold: ["BricolageGrotesque-Bold"],
        extrabold: ["BricolageGrotesque-ExtraBold"],
      },
      fontWeight: {
        thin: "200",
        extralight: "200",
        light: "300",
        normal: "400",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};
