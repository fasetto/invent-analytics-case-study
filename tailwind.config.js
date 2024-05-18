import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/assets/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
    },
    zIndex: {
      0: 0,
      auto: "auto",
      dropdown: 10,
      sticky: 20,
      banner: 30,
      overlay: 40,
      modal: 50,
      popover: 60,
      toast: 70,
      tooltip: 80,
    },
    extend: {},
  },
  plugins: [nextui(), slots()],
};

function slots() {
  return function ({ matchVariant }) {
    matchVariant("slot", (value) => `& [slot=${value}]`);
  };
}
