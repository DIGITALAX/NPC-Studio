import { useContext, useEffect, useState } from "react";
import { EspectadorInfo, TokensGuardados } from "../types/index.type";
import { ModalContext } from "@/app/providers";
import { createWalletClient, custom, PublicClient } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { getInfoSpectator } from "../../../../../graphql/queries/getInfoSpectator";
import {
  ACCEPTED_TOKENS,
  AU_ADDRESS,
  TRIPLEA_ADDRESS,
} from "@/app/lib/constants";
import AUAbi from "./../../../../../abis/AU.json";

const useEspectador = (
  dict: any,
  publicClient: PublicClient,
  address: `0x${string}` | undefined
) => {
  const contexto = useContext(ModalContext);
  const [tokenesGuardados, setTokenesGuardados] = useState<TokensGuardados>();
  const [espectadorInfo, setEspectadorInfo] = useState<EspectadorInfo>();
  const [espectadorInfoLoading, setEspectadorInfoLoading] =
    useState<boolean>(false);
  const [cogerCargando, setCogerCargando] = useState<boolean>(false);

  const manejarCoger = async (): Promise<void> => {
    setCogerCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AU_ADDRESS,
        abi: AUAbi,
        functionName: "mintSpectator",
        chain: chains.mainnet,
        args: [],
        account: address,
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      contexto?.setError(dict.Home.auClaimed);
    } catch (err: any) {
      console.error(err.message);
    }
    setCogerCargando(false);
  };

  const cogerInfoEspectador = async () => {
    setEspectadorInfoLoading(true);
    try {
      const datos = await getInfoSpectator(address!);
      setEspectadorInfo({
        auClaimed:
          Number(datos?.data?.spectatorInfos?.[0]?.auClaimed) / 10 ** 18,
        auEarned: Number(datos?.data?.spectatorInfos?.[0]?.auEarned) / 10 ** 18,
        auToClaim:
          Number(datos?.data?.spectatorInfos?.[0]?.auToClaim) / 10 ** 18,
        initialization: Number(
          datos?.data?.spectatorInfos?.[0]?.initialization
        ),
      });

      setTokenesGuardados({
        mona: await publicClient.readContract({
          address: ACCEPTED_TOKENS[1][2] as `0x${string}`,
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address!],
          account: address,
          functionName: "balanceOf",
        }),
        au: await publicClient.readContract({
          address: AU_ADDRESS,
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address!],
          account: address,
          functionName: "balanceOf",
        }),
        tripleA: await publicClient.readContract({
          address: TRIPLEA_ADDRESS,
          abi: [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
          ],
          args: [address!],
          account: address,
          functionName: "balanceOf",
        }),
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setEspectadorInfoLoading(false);
  };

  useEffect(() => {
    if (address && !espectadorInfo) {
      cogerInfoEspectador();
    }
  }, [address]);

  return {
    tokenesGuardados,
    espectadorInfo,
    espectadorInfoLoading,
    cogerCargando,
    manejarCoger,
  };
};

export default useEspectador;
