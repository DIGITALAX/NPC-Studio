import {
  checkAndSignAuthMessage,
  LitNodeClient,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { DIGITALAX_ADDRESS } from "../constants";
import { Details } from "@/app/components/Orders/types/orders.types";
import { AutographType } from "@/app/components/Common/types/common.types";

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
    let nonce = await client.getLatestBlockhash();
    await checkAndSignAuthMessage({
      chain: "polygon",
      nonce: nonce!,
    });
    await client.connect();

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "polygon",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: address?.toLowerCase(),
        },
      },
      { operator: "or" },
      {
        contractAddress: "",
        standardContractType: "",
        chain: "polygon",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: DIGITALAX_ADDRESS?.toLowerCase(),
        },
      },
    ];

    const { ciphertext, dataToEncryptHash } = await client.encrypt({
      accessControlConditions,
      dataToEncrypt: uint8arrayFromString(
        JSON.stringify({
          elementos,
          ...cumplimiento,
        })
      ),
    });

    return JSON.stringify({
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
      chain: "polygon",
    });
  } catch (err: any) {
    console.error(err.message);
  }
};
