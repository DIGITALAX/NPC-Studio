import { PublicClient } from "viem";
import { TOKEN_TAPAS, TOKEN_TITULOS } from "../constants";
import { getTokenBalance } from "../../../../graphql/queries/getTokenBalance";

export const comprobarTokens = async (
  address: `0x${string}`,
  publicClient: PublicClient
): Promise<{
  suficiente: boolean;
  tokens: {
    titulo: string;
    enlace: string;
    tapa: string;
    cantidad: number;
    umbral: number;
  }[];
} | void> => {
  try {
    const datos = await getTokenBalance();

    let allTokens: {
      titulo: string;
      enlace: string;
      tapa: string;
      cantidad: number;
      umbral: number;
    }[] = [];
    let suficiente: boolean = false;

    if (datos?.data?.eRC20Addeds) {
      await Promise.all(
        datos?.data?.eRC20Addeds?.map(
          async (token: {
            token: `0x${string}`;
            threshold: string;
          }) => {
            const saldo = await publicClient.readContract({
              address: token?.token,
              abi: [
                {
                  type: "function",
                  name: "balanceOf",
                  inputs: [
                    {
                      name: "account",
                      type: "address",
                      internalType: "address",
                    },
                  ],
                  outputs: [
                    { name: "", type: "uint256", internalType: "uint256" },
                  ],
                  stateMutability: "view",
                },
              ],
              args: [address],
              account: address,
              functionName: "balanceOf",
            });

            if (Number(saldo) >= Number(token?.threshold)) {
              suficiente = true;
            }

            allTokens?.push({
              cantidad: Number(saldo),
              titulo: TOKEN_TITULOS[token?.token],
              umbral: Number(token?.threshold),
              tapa: TOKEN_TAPAS[token?.token],
              enlace: `https://polygonscan.com/address/${token?.token}`,
            });
          }
        )
      );
    }

    if (datos?.data?.eRC721Addeds) {
      await Promise.all(
        datos?.data?.eRC721Addeds?.map(
          async (token: {
            token: `0x${string}`;
            threshold: string;
          }) => {
            const saldo = await publicClient.readContract({
              address: token?.token,
              abi: [
                {
                  type: "function",
                  name: "balanceOf",
                  inputs: [
                    {
                      name: "account",
                      type: "address",
                      internalType: "address",
                    },
                  ],
                  outputs: [
                    { name: "", type: "uint256", internalType: "uint256" },
                  ],
                  stateMutability: "view",
                },
              ],
              args: [address],
              account: address,
              functionName: "balanceOf",
            });

            if (Number(saldo) >= Number(token?.threshold)) {
              suficiente = true;
            }

            allTokens?.push({
              cantidad: Number(saldo),
              titulo: TOKEN_TITULOS[token?.token],
              umbral: Number(token?.threshold),
              tapa: TOKEN_TAPAS[token?.token],
              enlace: `https://polygonscan.com/address/${token?.token}`,
            });
          }
        )
      );
    }

    return {
      suficiente,
      tokens: allTokens,
    };
  } catch (err: any) {
    console.error(err.message);
  }
};
