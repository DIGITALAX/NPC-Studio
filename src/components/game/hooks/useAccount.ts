import { AUTOGRAPH_ACCESS_CONTROLS } from "@/lib/constants";
import { SetStateAction, useEffect, useState } from "react";
import { PublicClient } from "viem";

const useAccount = (
  isConnected: boolean,
  setEsArtista: (e: SetStateAction<boolean>) => void,
  setLensConectado: (e: SetStateAction<boolean>) => void,
  openAccountModal: (() => void) | undefined,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
) => {
  const [lensCargando, setLensCargando] = useState<boolean>(false);

  const manejarSalir = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    setLensConectado(false);
  };

  const manejarLens = async () => {
    setLensCargando(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setLensCargando(false);
  };

  const comprobrarArtista = async () => {
    try {
      const data = await publicClient.readContract({
        address: AUTOGRAPH_ACCESS_CONTROLS,
        abi: [
          {
            type: "function",
            name: "isDesigner",
            inputs: [
              { name: "_address", type: "address", internalType: "address" },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
          },
        ],
        functionName: "isDesigner",
        args: [address!],
      });
      setEsArtista(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      comprobrarArtista();
    } else {
      setEsArtista(false);
    }
  }, [isConnected, address]);

  return {
    manejarSalir,
    manejarLens,
    lensCargando,
  };
};

export default useAccount;
