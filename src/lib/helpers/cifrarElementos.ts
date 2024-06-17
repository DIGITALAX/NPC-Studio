import { Details } from "@/components/compras/types/compras.types";
import { LitNodeClient, encryptString } from "@lit-protocol/lit-node-client";

export const cifrarElementos = async (
  client: LitNodeClient,
  elementos: { id: number; color: string; tamano: string; cantidad: number }[],
  cumplimiento: Details,
  address: `0x${string}`
): Promise<
  | {
      coleccionId: number;
      cifrados: string;
    }[]
  | undefined
> => {
  try {
    let elementosCifrados: {
      coleccionId: number;
      cifrados: string;
    }[] = [];

    await Promise.all(
      elementos.map(async (el) => {
        const accessControlConditions = [
          {
            contractAddress: "",
            standardContractType: "",
            chain: "mumbai",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: "=",
              value: address.toLowerCase(),
            },
          },
          { operator: "or" },
          {
            contractAddress: "",
            standardContractType: "",
            chain: "mumbai",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: "=",
              value: address?.toLowerCase() as string,
            },
          },
        ];

        const { ciphertext, dataToEncryptHash } = await encryptString(
          {
            accessControlConditions,
            dataToEncrypt: JSON.stringify({
              cantidad: el.cantidad,
              tamano: el.tamano,
              color: el.color,
              ...cumplimiento,
            }),
          },
          client! as any
        );

        elementosCifrados.push({
          coleccionId: el.id,
          cifrados: JSON.stringify({
            ciphertext,
            dataToEncryptHash,
            accessControlConditions,
          }),
        });
      })
    );
    return elementosCifrados;
  } catch (err: any) {
    console.error(err.message);
  }
};
