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
        key: "Liam",
        cover: "Qmdz9Viu3pHyk3arQn7HxH8kvHaQVCeHV7vvzrg7AeSzHL",
      },
      {
        key: "Isabella",
        cover: "QmYVwEAfBm2BiXtLhJWATASUL1wHEyYBL6PnQS89Ng3LQT",
      },
      {
        key: "Aidan",
        cover: "QmbxGzm42DUZ8ZWkMSKwAxx2Cn9RWWNkau8ptsnZPSkGwb",
      },
    ],
  },
  {
    key: "ático de intercambio de varianza",
    cover: "Qmab76vqVsvmTeDFH3YTNRBijE7fujSkyqsEqDz4vH7quH",

    sprites: [
      {
        key: "Harper",
        cover: "QmUw577TnSrF8E7YpMLgwxBVTwMXKSBuoe7wATJEQ962Nj",
      },
      {
        key: "Scarlett",
        cover: "QmbbAkD2Rump8ZmrH8jtJQqq9ctLpaheyv4C9pmF9fqP9W",
      },
      {
        key: "Suri",
        cover: "Qmd6JDDg7C6WVcjqL6MmmfEbjNW4ZjLGeGJsvzRYPy8SBQ",
      },
    ],
  },
  {
    key: "lote de graffiti",
    cover: "QmVA8di3khf9Fbb1a2JLDk21UdQ4zRoBPLEwRwEwtmQYyp",

    sprites: [
      {
        key: "Henry",
        cover: "QmfQ9LbgRkS9iZxbESChnnWkMf38YkpJBLoBsb1CY1pjwx",
      },
      {
        key: "Kai",
        cover: "QmP8HcbyqnK6uPvwf7uhtUvhLa8qoGhhq9eoB6BYEUJsTK",
      },
      {
        key: "Yasmine",
        cover: "QmNpaCRmYnGEkVE6WnTiLWPwd4QgFtZewhbvkJyZZcJoDc"
      }
    ],
  },
  {
    key: "boutique de ropa callejera",
    cover: "QmUBJqUtcHZQRsrGHr8sM4UoCuKQWTUuhrXrpuVPyZBsBc",

    sprites: [
      {
        key: "Freya",
        cover: "QmPAdDHaWvUQTgN6pBRDMVTqduxkAxkjieFsYotY48B4tP",
      },
      {
        key: "Amira",
        cover: "QmRcgYCHbTUj9e7dpbhnuPHbGt6pZMHQM9QNWybM9FJ4Mp",
      },
      {
        key: "Sophia",
        cover: "QmdiDhhh43hgQTtM2st2WEiLeA5FfEcK7rmiCaWTj5STN6",
      },
    ],
  },
  {
    key: "microfábrica",
    cover: "QmXvZeMcQMdEHkKZL9U2CLpocMaKJvrfq644Zcsaybu5Q2",

    sprites: [
      {
        key: "Hugo",
        cover: "QmagLVfiWwZTK6K3xUUioF7WF6FJVTA6wAeM4buJMvgVf9",
      },
      {
        key: "Ingrid",
        cover: "QmUKj6vj42hcZTKbMwgREvGNjv3wcLYt7YC2xJzMFkvrcH",
      },
      {
        key: "Tariq",
        cover: "QmVfB7tN8NGuywnaZjnYAhj3MNRXU9A2XYyAycBEAo6X4H",
      },
    ],
  },
  {
    key: "agencia de llms",
    cover: "QmTs6DvEjiMzJHuXmtJBR13t53wo9TedjkymcFAT88qX78",

    sprites: [
      {
        key: "Javi",
        cover: "QmVBfTtaBVNUfWwDUR96tx53zZA82uGxq2i6N42upj5pEe",
      },
      {
        key: "Anaya",
        cover: "QmcTk99fd9G4GnPjZLS3UGgMCiNN3ehBk5PxYdH8brXCu4",
      },
      {
        key: "Kostas",
        cover: "QmNoxKkxsMExxnhtZ5upEqJ7ybqZpw888Xgp1y5dMmeJNg",
      },
    ],
  },
  {
    key: "pub en ruinas",
    cover: "QmWQMu5z5ho4prQv43Hdv27xtUtoUh78HukEPgCVEx3aLP",

    sprites: [
      {
        key: "Dimitra",
        cover: "QmVeHZbx4xKpziHd15J6VjKschSfodm2bwzTV7HAac8Q7D",
      },
      {
        key: "Mila",
        cover: "QmZa1J3Jxb2rSkNzB6wA2wDHYWqKb9grKA5jLib2dMzYiL",
      },
    ],
  },
  {
    key: "marketing de contenido",
    cover: "Qmdriz9gdKL7riwkwagguFZLCZ56fPRo171i8MhvXuUAdx",

    sprites: [
      {
        key: "Rafael",
        cover: "Qmc5KHgbKNAr3TZmFSjsEsqB1xJmq1u7WisZYA14ytPZXz",
      },
      {
        key: "Mia",
        cover: "QmZXAwJJ881tkEXo44dBSkvyF7EFVMQPnPGGGrMdTKRU7p",
      },
    ],
  },
];

export const LENS_HUB_PROXY: `0x${string}` =
  "0xA2574D9DdB6A325Ad2Be838Bd854228B80215148";

export const AUTOGRAPH_DATA: `0x${string}` =
  "0xe24e2baA8e53B06820952d82538b495C2A3fA247";
  
export const AUTOGRAPH_ACCESS_CONTROLS: `0x${string}` =
  "0xe57438297515C4B7c62FE13957413085A7e1763c";

  export const AUTOGRAPH_MARKET: `0x${string}` =
  "0x660617C0c6cb1C3aF285c96F9B06985875fcf660";

export const AUTOGRAPH_COLLECTION: `0x${string}` =
  "0x6bD72588E49D703Ef84A36E9082E13Bd16c284D8";

export const DIGITALAX_ADDRESS: `0x${string}` =
  "0xAA3e5ee4fdC831e5274FE7836c95D670dC2502e6";

  export const AUTOGRAPH_OPEN_ACTION: `0x${string}` =
  "0x2FE2758468ccf32a3e8819c79c62FaA155d9b190";

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
    "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c",
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