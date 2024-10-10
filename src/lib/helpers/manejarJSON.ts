import { INFURA_GATEWAY } from "../constants";

export const manejarJSON = async (ipfsHash: string): Promise<number> => {
  try {
    if (ipfsHash) {
      const cadena = await fetch(
        `${INFURA_GATEWAY}/ipfs/${ipfsHash.split("ipfs://")?.[1]}`
      );

      const json = await cadena.json();

      return Array.isArray(json) && json.every((item) => Array.isArray(item))
        ? Number(json?.[0]?.[0]?.toFixed(2))
        : Number(json?.[0]?.toFixed(2));
    }
    return 0.0;
  } catch (err: any) {
    console.error(err.message);
    return 0.0;
  }
};
