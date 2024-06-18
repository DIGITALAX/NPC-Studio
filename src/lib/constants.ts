export const INFURA_GATEWAY: string = "https://thedial.infura-ipfs.io";
export const BASE_URL: string = "	https://api-v2-amoy.lens.dev";
export const IPFS_REGEX: RegExp = /\b(Qm[1-9A-Za-z]{44}|ba[A-Za-z2-7]{57})\b/;

export const IDIOMAS: { cover: string; key: string }[] = [
  { key: "א", cover: "Qmdyd6iUPYNruEi5BJaYnoJ8H4FDwqxJF4EAzLvYZfxgXE" },
  { key: "ع", cover: "Qmb2rQi84hLXtiY673VaBHMTB32Lo1Xe1ah4Q7mG2fKf4J" },
  { key: "ук", cover: "QmW1QzS8AfYEaV4Kc6YtwXSUXRUatP6VozLy1HB61DTy27" },
  { key: "es", cover: "QmY43U5RovVkoGrkLiFyA2VPMnGxf5e3NgYZ95u9aNJdem" },
  { key: "د", cover: "QmTchZ7B2vrTnkKKBpqoYcmLQ8H9wxiNet7DWtmQeVzMdM" },
  { key: "us", cover: "QmXdyvCYjZ7FkPjgFX5BPi98WTpPdJT5FHhzhtbyzkJuNs" },
  { key: "br", cover: "QmQce4gWKLj9xWySjxUVsHKorX5rDL45JiaU4y1TBqjLVa" },
];

export const SCENE_LIST: {
  key: string;
  cover: string;
  sprites: { key: string; cover: string }[];
}[] = [
  {
    key: "estudio abierto de trabajo",
    cover: "QmcWnwXob7yRrZg4gUJyqo3Vtsabk8jWL5eL7NEn5HhDe7",
    sprites: [
      {
        key: "muchacho-estudio",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-estudio",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
      {
        key: "dama-estudio",
        cover: "QmZW3DWmPRT65ctLHzpsBkFR8wUkSfD7z6twDtyhHCusg7",
      },
    ],
  },
  {
    key: "ático de intercambio de varianza",
    cover: "Qmab76vqVsvmTeDFH3YTNRBijE7fujSkyqsEqDz4vH7quH",

    sprites: [
      {
        key: "muchacho-atico",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-atico",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "lote de graffiti",
    cover: "QmVA8di3khf9Fbb1a2JLDk21UdQ4zRoBPLEwRwEwtmQYyp",

    sprites: [
      {
        key: "muchacho-lote",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-lote",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "boutique de ropa callejera",
    cover: "QmUBJqUtcHZQRsrGHr8sM4UoCuKQWTUuhrXrpuVPyZBsBc",

    sprites: [
      {
        key: "muchacho-boutique",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-boutique",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "microfábrica",
    cover: "QmXvZeMcQMdEHkKZL9U2CLpocMaKJvrfq644Zcsaybu5Q2",

    sprites: [
      {
        key: "muchacho-micro",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-micro",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "agencia de llms",
    cover: "QmTs6DvEjiMzJHuXmtJBR13t53wo9TedjkymcFAT88qX78",

    sprites: [
      {
        key: "muchacho-agencia",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-agencia",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "pub en ruinas",
    cover: "QmWQMu5z5ho4prQv43Hdv27xtUtoUh78HukEPgCVEx3aLP",

    sprites: [
      {
        key: "muchacho-pub",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-pub",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
  {
    key: "marketing de contenido",
    cover: "Qmdriz9gdKL7riwkwagguFZLCZ56fPRo171i8MhvXuUAdx",

    sprites: [
      {
        key: "muchacho-contenido",
        cover: "QmXME5CUW3PdBVqsGx9JJznB1dWYUBbem1cmQgtEBX2vp7",
      },
      {
        key: "chica-contenido",
        cover: "QmczmZzdHG7fmYtCUDS58faHs1d1pzENEa3x8WxscyNhRH",
      },
    ],
  },
];

export const LENS_HUB_PROXY: `0x${string}` =
  "0xA2574D9DdB6A325Ad2Be838Bd854228B80215148";

export const AUTOGRAPH_DATA: `0x${string}` =
  "0x6988e02B2da42b1eB4DAfbD09edb2457AE783dE4";

export const AUTOGRAPH_ACCESS_CONTROLS: `0x${string}` =
  "0xe57438297515C4B7c62FE13957413085A7e1763c";

  export const AUTOGRAPH_MARKET: `0x${string}` =
  "0xb019C80e1762C95c3C903D67c65DC5A4F04402aa";

export const AUTOGRAPH_COLLECTION: `0x${string}` =
  "0xAC8DD4eB5c24ffa83cE85Df9aDC99209768083b0";

export const DIGITALAX_ADDRESS: `0x${string}` =
  "0xAA3e5ee4fdC831e5274FE7836c95D670dC2502e6";

  export const AUTOGRAPH_OPEN_ACTION: `0x${string}` =
  "0x45B1C90fD728AF86965221788677b1110869E112";

export const ACCEPTED_TOKENS: string[][] = [
  [
    "QmYYUQ8nGDnyuk8jQSung1WmTksvLEQBXjnCctdRrKtsNk",
    "WMATIC",
    "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  ],
  [
    "QmZRhUgjK6bJM8fC7uV145yf66q2e7vGeT7CLosw1SdMdN",
    "WETH",
    "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  ],
  [
    "QmSbpsDRwxSCPBWPkwWvcb49jViSxzmNHjYy3AcGF3qM2x",
    "USDT",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  ],
  [
    "QmS6f8vrNZok9j4pJttUuWpNrjsf4vP9RD5mRL36z6UdaL",
    "MONA",
    "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
  ],
];

export const ACCEPTED_TOKENS_AMOY: string[][] = [
  [
    "QmYYUQ8nGDnyuk8jQSung1WmTksvLEQBXjnCctdRrKtsNk",
    "WMATIC",
    "0x1f83476ed25e5ca2e32df06b8d1e59da38f25cca",
  ],
  [
    "QmZRhUgjK6bJM8fC7uV145yf66q2e7vGeT7CLosw1SdMdN",
    "WETH",
    "0xc4414eba4caa899f52463aa232e451ac31d00ed3",
  ],
  [
    "QmS6f8vrNZok9j4pJttUuWpNrjsf4vP9RD5mRL36z6UdaL",
    "MONA",
    "0x5dd9a1636b221b45043b040a72f4229f8d66e40d",
  ],
  [
    "QmSbpsDRwxSCPBWPkwWvcb49jViSxzmNHjYy3AcGF3qM2x",
    "USDT",
    "0x29244d4cb549c35a9e634b262e62a49aa7a14b80",
  ],
];

export const autographTypeToNumber: { [key in string]: number } = {
  ["NFT"]: 0,
  ["Hoodie"]: 1,
  ["Shirt"]: 2,
  ["Catalog"]: 3,
  ["Mix"]: 4,
};

export const numberToAutograph: { [key in number]: string } = {
  [0]: "NFT",
  [1]: "Hoodie",
  [2]: "Shirt",
  [3]: "Catalog",
  [4]: "Mix",
};