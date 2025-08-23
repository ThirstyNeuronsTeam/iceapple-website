import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",   // mobile
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "6rem",     // side spacing at 1536px
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1240px",
        "2xl": "1400px",  // max width stops at 1400px
      },
    },
    extend: {},
  },
  plugins: [],
};

export default config;
