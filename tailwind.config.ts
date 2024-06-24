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
        ligero: "#F9FF90",
        oscuro: "#1F32EE",
        mar: "#0789D2",
        rojo: "#EE3075",
        rosa: "#F5E0E2",
        morado: "#7E68C6",
        brillo: "#FFFF0A",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      fontFamily: {
        rain: "Internal Rainbows",
        mana: "Manaspace",
        bit: "Bitblox",
        at: "at01",
        leco: "Leco",
        abad: "Abaddon",
        arc: "Arcade Classic",
        vcr: "Vcr",
        con: "Consolas",
      },
      backgroundImage: {
        esterilla: `url("https://thedial.infura-ipfs.io/ipfs/QmR5EfV2Ck8owQSmstmNbNUzcd4BToJnj3GnukDhP3n5J3")`,
      },
      zIndex: {
        100: "100",
        200: "200",
      },
      screens: {
        tab: "800px",
      },
    },
  },
  plugins: [],
};
export default config;
