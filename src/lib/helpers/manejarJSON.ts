import { INFURA_GATEWAY } from "../constants";

export const manejarJSON = async (ipfsHash: string): Promise<number> => {
  try {
    if (ipfsHash) {
      const cadena = await fetch(
        `${INFURA_GATEWAY}/ipfs/${ipfsHash.split("ipfs://")?.[1]}`
      );

      const json = await cadena.json();
      return Number(json?.join(", ")?.[0]);
    }
    return 0.0;
  } catch (err: any) {
    console.error(err.message);
    return 0.0;
  }
};
