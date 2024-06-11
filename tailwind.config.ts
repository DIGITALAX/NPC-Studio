import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/[pages]/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
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
        amarillo: "#F8FF6F",
        dorado: "#F5C652",
        offNegro: "#0F1015",

      },
      fontSize: {
        xxs: "0.6rem",
      },
      fontFamily: {
        rain: "Internal Rainbows",
        mana: "Manaspace",
        at: "at01",
        leco: "Leco",
        abad: "Abaddon",
        arc: "Arcade Classic",
        vcr: "Vcr",
      },
      backgroundImage: {
        esterilla: `url("https://thedial.infura-ipfs.io/ipfs/QmR5EfV2Ck8owQSmstmNbNUzcd4BToJnj3GnukDhP3n5J3")`,
      },
      zIndex: {
        "100": "100",
      },
    },
  },
  plugins: [],
};
export default config;
