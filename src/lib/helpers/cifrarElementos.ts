import { Details } from "@/components/compras/types/compras.types";
import { AutographType } from "@/components/game/types/game.types";
import { LitNodeClient, encryptString } from "@lit-protocol/lit-node-client";
import { DIGITALAX_ADDRESS } from "../constants";

export const cifrarElementos = async (
  client: LitNodeClient,
  elementos: {
    id: number;
    color: string;
    tamano: string;
    cantidad: number;
    tipo: AutographType;
  }[],
  cumplimiento: Details,
  address: `0x${string}`
): Promise<string | undefined> => {
  try {
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
          value: DIGITALAX_ADDRESS?.toLowerCase(),
        },
      },
    ];

    const { ciphertext, dataToEncryptHash } = await encryptString(
      {
        accessControlConditions,
        dataToEncrypt: JSON.stringify({
          elementos,
          ...cumplimiento,
        }),
      },
      client! as any
    );

    return JSON.stringify({
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    });
  } catch (err: any) {
    console.error(err.message);
  }
};
