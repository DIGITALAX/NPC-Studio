import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        frio: "#1100ff",
      },
      colors: {
        cielo: "#2E91D4",
        ballena: "#7AB3DD",
        naranja: "#ED5700",
        frita: "#D76645",
        viola: "#F700DB",
        lime: "#10FF90",
      },
      fontFamily: {
        rain: "Internal Rainbows",
        mana: "Manaspace",
        at: "at01",
        leco: "Leco",
      },
    },
  },
  plugins: [],
};
export default config;
