import { FunctionComponent, JSX } from "react";
import { useModal } from "connectkit";
import { http, useAccount } from "wagmi";
import Image from "next/legacy/image";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import useLens from "../../Common/hooks/useLens";
import { ConnectProps } from "../types/modals.types";
import { createPublicClient } from "viem";
import { chains } from "@lens-chain/sdk/viem";

const Connect: FunctionComponent<ConnectProps> = ({
  setConnect,
  dict,
  lensConectado,
}): JSX.Element => {
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const { openProfile, openSwitchNetworks, openOnboarding } = useModal();
  const { isConnected, address, chainId } = useAccount();
  const { lensCargando, salir, handleConectarse } = useLens(
    isConnected,
    address,
    dict,
    publicClient
  );
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setConnect(false);
      }}
    >
      <div
        className="bg-black rounded-md text-white border border-white w-96 h-fit text-sm flex items-center justify-start p-3 cursor-default flex-col gap-6 font-bit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-fit pb-3 h-fit flex items-center justify-center">
          {dict?.Home?.connect}
        </div>
        {lensConectado?.profile?.username?.localName ? (
          <div className="relative w-full h-fit flex items-center justify-center text-left">
            {lensConectado?.profile?.username?.localName?.slice(0, 20) + " ..."}
          </div>
        ) : (
          lensConectado?.address && (
            <div className="relative w-full h-fit flex items-center justify-center text-left">
              {lensConectado?.address?.slice(0, 20) + "..."}
            </div>
          )
        )}
        <div className="relative w-full h-fit flex flex-col gap-2 font-jack">
          <div
            className="relative flex w-full h-10 rounded-md bg-black active:scale-95 items-center justify-center text-center text-sm text-white hover:opacity-80 cursor-pointer border border-brillo"
            onClick={() =>
              isConnected
                ? openProfile?.()
                : chainId !== 232
                ? openSwitchNetworks?.()
                : openOnboarding?.()
            }
          >
            {isConnected ? dict.Home.disconnect : dict.Home.connect}
          </div>
          <div
            className={`relative flex w-full h-10  border border-brillo rounded-md items-center justify-center text-center text-sm hover:opacity-80 ${
              !isConnected ? "opacity-60" : "active:scale-95 cursor-pointer"
            }`}
            onClick={() => {
              if (!lensConectado?.profile) {
                handleConectarse();
              } else {
                salir();
              }
            }}
          >
            {lensCargando ? (
              <div className="relative w-fit h-fit flex">
                <div className="relative w-5 h-5 animate-spin flex">
                  <Image
                    src={`${INFURA_GATEWAY_INTERNAL}QmNcoHPaFjhDciiHjiMNpfTbzwnJwKEZHhNfziFeQrqTkX`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    draggable={false}
                  />
                </div>
              </div>
            ) : lensConectado?.profile && address ? (
              dict.Home.lensOut
            ) : (
              dict.Home.lensSign
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
