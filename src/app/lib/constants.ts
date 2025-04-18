export const INFURA_GATEWAY: string = "https://thedial.infura-ipfs.io";
export const GROVE_GATEWAY: string = "https://api.grove.storage/";
export const IPFS_REGEX: RegExp = /\b(Qm[1-9A-Za-z]{44}|ba[A-Za-z2-7]{57})\b/;
export const AUTOGRAPH_ACCESS_CONTROLS: `0x${string}` =
  "0x91537f75dFa3239f5A77857AF924ccA7aFDCc810";
export const AUTOGRAPH_COLLECTION: `0x${string}` =
  "0x9840ed34cbC19fE414d5f17eA165214a65A1FC76";
export const AUTOGRAPH_MARKET: `0x${string}` =
  "0x67819a22df4232726C7B911C1D4d5c06Cf080Cf8";
export const INBOX_ID: string =
  "e0deaff9be0da5309d2b19bcb0c133397b2bb20be563ab038e265b0800ddcf57";
export const DIGITALAX_ADDRESS: `0x${string}` =
  "0xAA3e5ee4fdC831e5274FE7836c95D670dC2502e6";
export const AUTOGRAPH_ACTION: `0x${string}` =
  "0x92A1d3260559D755D7EdbFcb0A2280C7506937c7";
export const AU_ADDRESS: `0x${string}` =
  "0x187292F18E282a45d69b0aD20274918ed4f8e855";
export const SPECTATOR_REWARDS: `0x${string}` =
  "0xEBF04050D02F3Fa1a9428170e2E42e9608280a12";

export const DELTA_ADDRESS: `0x${string}` = "0x";
export const FASHION_ADDRESS: `0x${string}` = "0x";
export const PODE_ADDRESS: `0x${string}` = "0x";
export const GENESIS_ADDRESS: `0x${string}` = "0x";

export const ASSETS: {
  name: string;
  symbol: string;
  decimals: number;
  contract: {
    address: string;
    chainId: number;
  };
}[] = [
  {
    name: "MONA",
    symbol: "MONA",
    decimals: 18,
    contract: {
      address: "0x28547B5b6B405A1444A17694AC84aa2d6A03b3Bd",
      chainId: 232,
    },
  },
  {
    name: "BONSAI",
    symbol: "BONSAI",
    decimals: 18,
    contract: {
      address: "0xB0588f9A9cADe7CD5f194a5fe77AcD6A58250f82",
      chainId: 232,
    },
  },
  {
    name: "WGHO",
    symbol: "WGHO",
    decimals: 18,
    contract: {
      address: "0x6bDc36E20D267Ff0dd6097799f82e78907105e2F",
      chainId: 232,
    },
  },
];

export const numberToAutograph: { [key in number]: string } = {
  [0]: "NFT",
  [1]: "Hoodie",
  [2]: "Shirt",
  [3]: "Catalog",
};

export const autographTypeToNumber: { [key in string]: number } = {
  ["NFT"]: 0,
  ["Hoodie"]: 1,
  ["Shirt"]: 2,
  ["Catalog"]: 3,
};

export const ACCEPTED_TOKENS: string[][] = [
  [
    "QmYCDxCv7mJyjn49n84kP6d3ADgGp422ukKzRyd2ZcGEsW",
    "WGHO",
    "0x6bDc36E20D267Ff0dd6097799f82e78907105e2F",
  ],
  [
    "QmZSDyGYYy9hn8RAUC1vZeZXC5y2H3YimzajJRngCTu5Fq",
    "MONA",
    "0x28547B5b6B405A1444A17694AC84aa2d6A03b3Bd",
  ],
  [
    "QmXoAwGW51843qTUxV8pkouewRHDvkyJ3A7tsCUGgGXqVs",
    "BONSAI",
    "0xB0588f9A9cADe7CD5f194a5fe77AcD6A58250f82",
  ],
];

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

export const TOKEN_TAPAS: { [key in string]: string } = {
  ["0xAfFd1A81C63f2Aa7a0d692a4262aE81A1c170f34"]:
    "QmWZq2N7yvFRxpvD7WZZLhKNRA7CiaNno1HAveHaH3xLME",
  ["0xd50602AFf4ae1B24975052418bd47a588d75170B"]:
    "QmYiH7gPYdZ7mwBtFEZuzx61GTvrbxqywSxa1RAz4sT1aM",
  ["0xe16b625521CCcdE32cdDF9897adE134B1bA89247"]:
    "QmVdLdjSq2MGiUiqBexbNJFAnBRuGKYYnkaQo8tgRnJc8U",
  ["0xA836a9c35449D74Ab9f56975C39C02aa26ea4cF8"]:
    "QmSEyyFCu8CDxzyBcU3m1LVqLZmtijWrJShk3Mg8ohuc5p",
  ["0xe16b625521CCcdE32cdDF9897adE134B1bA89287"]:
    "QmVvzoi95AgZgZjEsbPsbYnaoGF2xmquXp4ZbQ6PouCWTR",
};

export const TOKEN_TITULOS: { [key in string]: string } = {
  ["0xAfFd1A81C63f2Aa7a0d692a4262aE81A1c170f34"]: "genesis",
  ["0xd50602AFf4ae1B24975052418bd47a588d75170B"]: "fashion",
  ["0xe16b625521CCcdE32cdDF9897adE134B1bA89247"]: "mona",
  ["0xA836a9c35449D74Ab9f56975C39C02aa26ea4cF8"]: "delta",
  ["0xe16b625521CCcdE32cdDF9897adE134B1bA89287"]: "pode",
};
