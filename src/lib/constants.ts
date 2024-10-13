export const INFURA_GATEWAY: string = "https://thedial.infura-ipfs.io";
export const BASE_URL: string = "https://api-v2.lens.dev";
export const IPFS_REGEX: RegExp = /\b(Qm[1-9A-Za-z]{44}|ba[A-Za-z2-7]{57})\b/;

export const IDIOMAS: { cover: string; key: string; title: string }[] = [
  {
    key: "א",
    cover: "Qmdyd6iUPYNruEi5BJaYnoJ8H4FDwqxJF4EAzLvYZfxgXE",
    title: "Hebrew",
  },
  {
    key: "ع",
    cover: "Qmb2rQi84hLXtiY673VaBHMTB32Lo1Xe1ah4Q7mG2fKf4J",
    title: "Arabic",
  },
  {
    key: "ук",
    cover: "QmW1QzS8AfYEaV4Kc6YtwXSUXRUatP6VozLy1HB61DTy27",
    title: "Ukranian",
  },
  {
    key: "es",
    cover: "QmY43U5RovVkoGrkLiFyA2VPMnGxf5e3NgYZ95u9aNJdem",
    title: "Spanish",
  },
  {
    key: "د",
    cover: "QmTchZ7B2vrTnkKKBpqoYcmLQ8H9wxiNet7DWtmQeVzMdM",
    title: "Farsi",
  },
  {
    key: "us",
    cover: "QmXdyvCYjZ7FkPjgFX5BPi98WTpPdJT5FHhzhtbyzkJuNs",
    title: "English",
  },
  {
    key: "br",
    cover: "QmQce4gWKLj9xWySjxUVsHKorX5rDL45JiaU4y1TBqjLVa",
    title: "Portuguese",
  },
];

export const LENS_HUB_PROXY: `0x${string}` =
  "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export const AUTOGRAPH_DATA: `0x${string}` =
  "0xd52dA212D5C7Ec8f7Bb3594372530b19f3e5f37E";

export const AUTOGRAPH_ACCESS_CONTROLS: `0x${string}` =
  "0xcD70E5C79b1a199af92134CD8F9f1583963e6CC9";

export const AUTOGRAPH_MARKET: `0x${string}` =
  "0x9D38850465982be54372B68eD2067d92aD6F817F";

export const AUTOGRAPH_COLLECTION: `0x${string}` =
  "0x899aa7B4BC98fe8c55437d4B7EEdaE12156F1736";

export const DIGITALAX_ADDRESS: `0x${string}` =
  "0xAA3e5ee4fdC831e5274FE7836c95D670dC2502e6";

export const AUTOGRAPH_OPEN_ACTION: `0x${string}` =
  "0x749Da95bC493AF77A695dEc621C733d6317aa8Fc";

export const NPC_SPECTATE: `0x${string}` =
  "0x6B92Fb260e98dAEb1c4C613b16CC9D4bc5d6F184";

export const NPC_RENT: `0x${string}` =
  "0x7fb6f7EF8dfFb0bB8d82b64E6b90BcC5162621F6";

export const ACCEPTED_TOKENS: string[][] = [
  [
    "QmcyKazTx7gQAmFLrX4uwM5pub1LmNQRngM4ns6ydoETkZ",
    "WMATIC",
    "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  ],
  [
    "QmfXXgwqWCZpvwGQM3fUXhJcDJU8tRbhtRm8UK6GJ7JztR",
    "WETH",
    "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  ],
  [
    "QmdcG3aNe911JrHhkZWVSc61tadeQBgDHX96zG2vZBaits",
    "USDT",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  ],
  [
    "Qmc4tP96CPmzpxURjdk5jvnkB2uWSbb7qA6LYm8LCCGrRt",
    "MONA",
    "0x6968105460f67c3bf751be7c15f92f5286fd0ce5",
  ],
  [
    "QmQUrVWFVT2rSYT8KPr8iJ7C3aE8qPpDcjsLy143i3o2St",
    "BONSAI",
    "0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
  ],
];

export const ACCEPTED_TOKENS_AMOY: string[][] = [
  [
    "QmcyKazTx7gQAmFLrX4uwM5pub1LmNQRngM4ns6ydoETkZ",
    "WMATIC",
    "0x1f83476ed25e5ca2e32df06b8d1e59da38f25cca",
  ],
  [
    "QmfXXgwqWCZpvwGQM3fUXhJcDJU8tRbhtRm8UK6GJ7JztR",
    "WETH",
    "0xc4414eba4caa899f52463aa232e451ac31d00ed3",
  ],
  [
    "Qmc4tP96CPmzpxURjdk5jvnkB2uWSbb7qA6LYm8LCCGrRt",
    "MONA",
    "0x5dd9a1636b221b45043b040a72f4229f8d66e40d",
  ],
  [
    "QmdcG3aNe911JrHhkZWVSc61tadeQBgDHX96zG2vZBaits",
    "USDT",
    "0x29244d4cb549c35a9e634b262e62a49aa7a14b80",
  ],
  [
    "QmQUrVWFVT2rSYT8KPr8iJ7C3aE8qPpDcjsLy143i3o2St",
    "BONSAI",
    "0xa77B3743Aa61844FbEA890Ba092d405caA473203",
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

export const CARTAS: string[] = [
  "QmYXGJb9yWMEWtJZxnPaUGZSgUBzmNQeELUpko2KQyDBVW",
  "QmW3SzU5UGctz3DSTT27wu6YjBWs5hunqKDjM4mRMv3Hku",
  "QmW9P6WVXuPJHeP2e5VDkFCz2SnpLqr4eDTAim6ZKYyCMR",
  "QmbyKikfdGvUyDx2gncTSfEpAF5JXgqkYphSReYtQEBPUu",
  "QmPLVvFpczsAqWgZpi1h8dDXKXUFukFKi5JdFCqBn5bjUL",
  "QmVtJzwqiTvgXntQx1iPpy1aNrdJPTF6L5xdrmAvczTxuf",
  "QmbWvJ5s13qjGt1B7uS1ADMNBKkPbJbsuaEkK6z8VvPACJ",
  "QmYxKdnVPkATDXLXvdS1y4EZwjLk5upmrzjYXhY9VkmgU8",
  "QmdUBA6YXaCTNuhxCsJribUDSVA59rXGJGnCKtvpiytNNj",
];
