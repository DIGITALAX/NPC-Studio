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

export const SCENE_LIST: {
  key: string;
  cover: string;
  sprites: { key: string; cover: string; address: string; idiomas: string[] }[];
}[] = [
  {
    key: "estudio abierto de trabajo",
    cover: "QmcWnwXob7yRrZg4gUJyqo3Vtsabk8jWL5eL7NEn5HhDe7",
    sprites: [
      {
        key: "Gabriel",
        cover: "QmTCBXgfaCfuSGk856U9jJ4bzvUEXSuSrXdubfAokANsEH",
        address: "0x87dD364f74f67f1e13126D6Fd9a31b7d78C2cC12",
        idiomas: ["א", "us", "ук", "د"],
      },
      {
        key: "Anaya",
        cover: "QmcTk99fd9G4GnPjZLS3UGgMCiNN3ehBk5PxYdH8brXCu4",
        address: "0x9bBca90ea8F188403fAB15Cd5bad4F9a46f56257",
        idiomas: ["ع", "us", "es"],
      },
      {
        key: "Carlos",
        cover: "QmWvDJ4LasewR1xL7KUE6nTSuHCjemH2MYZ5n215LxYUxc",
        address: "0xa8ac1e95a53c79Eae348491f678A1Cf0c2F2519e",
        idiomas: ["د", "br", "es"],
      },

      {
        key: "Ethan",
        cover: "QmRJe57Z48CXSi5n952a5gJsqHeyQLej8NEgt34nm7uX9H",
        address: "0x8241Ee5A9f23611Ef6535B6c7E71ae24913306EC",
        idiomas: ["א", "د"],
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
        address: "0x7AFA88bbe634222793bC032A313F8dE69f308b7f",
        idiomas: ["ع", "us", "es"],
      },
      {
        key: "Scarlett",
        cover: "QmbbAkD2Rump8ZmrH8jtJQqq9ctLpaheyv4C9pmF9fqP9W",
        address: "0x903A9e429b05Df2B43123dDDb24070b4CAA97071",
        idiomas: ["א", "us", "ук", "د"],
      },
      {
        key: "Suri",
        cover: "Qmd6JDDg7C6WVcjqL6MmmfEbjNW4ZjLGeGJsvzRYPy8SBQ",
        address: "0x0de44745d42987d8a75b8baA3De26F5392aDa6f2",
        idiomas: ["us", "br"],
      },
      {
        key: "Aidan",
        cover: "QmbxGzm42DUZ8ZWkMSKwAxx2Cn9RWWNkau8ptsnZPSkGwb",
        address: "0x6Ca4c8d959c28a2c53e33DE41763626E6070af7b",
        idiomas: ["us", "ук", "es", "א"],
      },
      {
        key: "Bruno",
        cover: "QmPJWpz8WoiaHECbtaUMJCzWoyvKnGpAYNyfivHDvCx83v",
        address: "0x5619E1957d4F29dad2dfE671820A00699A01378c",
        idiomas: ["es", "us", "د", "ع", "br"],
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
        address: "0x97c0aF228dc98490f5065cbd7C418Bf92744C6fe",
        idiomas: ["ук", "א", "es", "ع"],
      },
      {
        key: "Kai",
        cover: "QmP8HcbyqnK6uPvwf7uhtUvhLa8qoGhhq9eoB6BYEUJsTK",
        address: "0xe03f6680D76f3eae65d1530e49E8dfd74e9883D5",
        idiomas: ["د", "es", "ع", "א"],
      },
      {
        key: "Yasmine",
        cover: "QmNpaCRmYnGEkVE6WnTiLWPwd4QgFtZewhbvkJyZZcJoDc",
        address: "0x5b516De55d685C9A39C14B3d1FC09F2cC45Fbc0c",
        idiomas: ["es", "א", "د", "us"],
      },
      {
        key: "Luca",
        cover: "QmcP8dNu5nQomXugLdi4JX9MkrUpiGED17Xi9arb7BY1Tu",
        address: "0x7d6e91A790513CF0Eb9b8b3d8D9315626EB5041E",
        idiomas: ["us", "es"],
      },
    ],
  },
  {
    key: "boutique de ropa callejera",
    cover: "QmUBJqUtcHZQRsrGHr8sM4UoCuKQWTUuhrXrpuVPyZBsBc",

    sprites: [
      {
        key: "Freya",
        cover: "QmPAdDHaWvUQTgN6pBRDMVTqduxkAxkjieFsYotY48B4tP",
        address: "0x8679a4b7a63A6b033eD76C550dBDb1C5E963b055",
        idiomas: ["es", "א", "د", "us"],
      },
      {
        key: "Amira",
        cover: "QmRcgYCHbTUj9e7dpbhnuPHbGt6pZMHQM9QNWybM9FJ4Mp",
        address: "0x1f2DbfB6efD6Dfdb9958440bBC1e9ffC8Add3EcA",
        idiomas: ["ع", "us", "es", "ук", "א"],
      },
      {
        key: "Sophia",
        cover: "QmdiDhhh43hgQTtM2st2WEiLeA5FfEcK7rmiCaWTj5STN6",
        address: "0x585437325dd4F40Ed174337524838Ac25f2D2A64",
        idiomas: ["ук", "br"],
      },
      {
        key: "Hana",
        cover: "QmSaPNWyUg66cCpxLXmH9zUkiGny1oRhVkGjYDHGMRS7aa",
        address: "0x81D413fFfd9a653Dbc71d1B63D93D68FC9e6DF51",
        idiomas: ["es"],
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
        address: "0xDD7EFff44f427eF3376362b3f46a9dEAa90c8107",
        idiomas: ["د", "es", "ع", "א"],
      },
      {
        key: "Ingrid",
        cover: "QmUKj6vj42hcZTKbMwgREvGNjv3wcLYt7YC2xJzMFkvrcH",
        address: "0x6bbf051ab98B443a106F97B8fEbf48276d54770f",
        idiomas: ["א", "us"],
      },
      {
        key: "Tariq",
        cover: "QmVfB7tN8NGuywnaZjnYAhj3MNRXU9A2XYyAycBEAo6X4H",
        address: "0x544262c15a8805132D5ACC7Ec9736dE111C1C40d",
        idiomas: ["br", "es"],
      },
      {
        key: "Leila",
        cover: "QmUKY1ggLv96zZd4biQAcao9ATgdHRJwVczy79JoN9Yj2t",
        address: "0x255459176eca08A7154081856e06C260C962e16F",
        idiomas: ["ук", "us", "br"],
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
        address: "0x90ea1623BCBb4C97bfDe4e52231bE7E9568D4791",
        idiomas: ["us", "es"],
      },
      {
        key: "Mila",
        cover: "QmZa1J3Jxb2rSkNzB6wA2wDHYWqKb9grKA5jLib2dMzYiL",
        address: "0xBEb2e25c86986dfe84f92134B7b0f89D6C21b37A",
        idiomas: ["us", "ук", "es", "א"],
      },
      {
        key: "Kostas",
        cover: "QmNoxKkxsMExxnhtZ5upEqJ7ybqZpw888Xgp1y5dMmeJNg",
        address: "0x1AEF1a90bbC9e2F9Ac5CAb2FD5E7DdF1d67C9B94",
        idiomas: ["ع", "us", "es"],
      },
      {
        key: "Johan",
        cover: "QmTenjfSkubgHViE7niuydW3WU5edS11Dg52mfEg3aPZar",
        address: "0x8F7A91b5e758a808Bfaa0F872f3aF088c9620390",
        idiomas: ["br"],
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
        address: "0xb0A406B18EA1D1292cb1b2d116D8C605272c65c1",
        idiomas: ["ук", "us", "د", "א"],
      },

      {
        key: "Isabella",
        cover: "QmYVwEAfBm2BiXtLhJWATASUL1wHEyYBL6PnQS89Ng3LQT",
        address: "0xF04AfA536d2ae262970250cA1020a19f83Bcc64E",
        idiomas: ["ук", "br"],
      },

      {
        key: "Xander",
        cover: "QmXmbDMMTE6AP4VgKgyZRLBbQuGKd7mapsg65praaTA28i",
        address: "0x41a6199d25EEb7146466cD91b5e107A3ab7CDb69",
        idiomas: ["us", "br"],
      },
      {
        key: "Felix",
        cover: "QmRyy64v2qboYZYVbK2x99KM2i5PgFdDiSCCwS5CopqqRT",
        address: "0x230100B048d019861625D8f60cb54D52730936DB",
        idiomas: ["א", "د"],
      },
      {
        key: "Zaid",
        cover: "QmaVPG2gbi9xn1YchwZYMJ1CG85qXSf2DJZb8D9o27K5uS",
        address: "0x82576a9C2340649A0AC3e1CA26Ea703C8a415dA0",
        idiomas: ["es", "us", "د", "ع", "br"],
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
        address: "0x48C9e8AE1C97BebeF4a5eFf86b6701D8a7ceF553",
        idiomas: ["es", "א", "د", "us"],
      },
      {
        key: "Mia",
        cover: "QmZXAwJJ881tkEXo44dBSkvyF7EFVMQPnPGGGrMdTKRU7p",
        address: "0x3C664C6e4adBDF56CfE06726fA767aeafbc7A121",
        idiomas: ["es", "us", "ук"],
      },
      {
        key: "Liam",
        cover: "Qmdz9Viu3pHyk3arQn7HxH8kvHaQVCeHV7vvzrg7AeSzHL",
        address: "0x0eFdFDEe179199E49f03013Bf4a03Ce6540468bd",
        idiomas: ["ук", "us", "br"],
      },

      {
        key: "Zane",
        cover: "QmWV48sZfC3FwYDpeRkRU9A7PjrZ3crdvCvYUvg7D4azgZ",
        address: "0x497A8714F440Af228c4ba83c5659D63a15A4800A",
        idiomas: ["د", "es", "ع", "א"],
      },
      {
        key: "Wendy",
        cover: "Qme9j8B6UtQ8jpEf5Xmdn17dX37Rzyy1jTGFBSA5QoYG5F",
        address: "0x57859141f97691604cC8dE8b03eBE000c780E2d6",
        idiomas: ["us", "es"],
      },
    ],
  },
];

export const LENS_HUB_PROXY: `0x${string}` =
  "0xA2574D9DdB6A325Ad2Be838Bd854228B80215148";

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
