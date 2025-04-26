import { INFURA_GATEWAY } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAccount } from "wagmi";
import useEspectador from "../hooks/useEspectador";
import { useModal } from "connectkit";
import useLens from "../../Common/hooks/useLens";
import { createPublicClient, http } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Espectador: FunctionComponent<{ lang: string; dict: any }> = ({
  lang,
  dict,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const { openProfile, openSwitchNetworks, openOnboarding } = useModal();
  const { isConnected, address, chainId } = useAccount();
  const {
    tokenesGuardados,
    espectadorInfo,
    espectadorInfoLoading,
    cogerCargando,
    manejarCoger,
  } = useEspectador(dict, publicClient, address);
  const { lensCargando, handleConectarse } = useLens(
    isConnected,
    address,
    dict,
    publicClient
  );
  return (
    <>
      <div
        className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
          lang == "en" ? "text-[10vw]" : "text-[8vw]"
        }`}
      >
        {dict.Home.espectar}
      </div>
      <div className="relative w-full h-fit py-20 flex items-center justify-center sm:pr-4">
        <div className="relative w-full h-fit flex flex-col xl:flex-row gap-10 items-center justify-center">
          <div className="relative w-full h-[48rem] flex flex-col items-center justify-center gap-6">
            <div className="relative w-full h-fit flex items-start justify-between flex-col gap-2">
              <div className="relative w-full h-fit flex items-start justify-start font-at text-sm text-white">
                {dict.Home.tokensH}
              </div>
              <div className="relative w-full flex flex-wrap gap-6 justify-between h-fit">
                {[
                  {
                    titulo: "MONA",
                    valor: tokenesGuardados?.mona,
                  },
                  {
                    titulo: "AU",
                    valor: tokenesGuardados?.au,
                  },
                  {
                    titulo: "DLTA",
                    valor: tokenesGuardados?.delta,
                  },
                  {
                    titulo: "Genesis",
                    valor: tokenesGuardados?.genesis,
                  },
                  {
                    titulo: "Fashion",
                    valor: tokenesGuardados?.fashion,
                  },
                  {
                    titulo: "PODE",
                    valor: tokenesGuardados?.pode,
                  },
                ]?.map(
                  (
                    elem: {
                      titulo: string;
                      valor: bigint | undefined;
                    },
                    indice: number
                  ) => {
                    return (
                      <div
                        key={indice}
                        className="relative w-28 px-1 py-px border-2 border-azulito rounded-sm h-fit flex flex-row gap-2 items-center justify-between bg-offNegro"
                      >
                        <div className="relative w-fit h-fit flex items-center justify-start text-sol">
                          {elem?.titulo}
                          {": "}
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-end text-white">
                          {indice < 3
                            ? Number(elem?.valor || 0) / 10 ** 18
                            : elem?.valor || 0}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/Qmab2a5syZ5rVB6oHQV12Lrruzyzx5A1oyC1RWdQsK8Mt6`}
                layout="fill"
                objectFit="fill"
                draggable={false}
              />
            </div>
          </div>
          <div className="relative w-full h-[48rem] flex flex-col items-center justify-center gap-6">
            <div className="relative w-full flex font-at text-sm text-white h-fit items-end justify-end">
              <div
                className={`relative border-azulito border rounded-md bg-viol w-20 h-10 flex items-center justify-center ${
                  !lensCargando &&
                  "cursor-pointer active:scale-90 hover:scale-95 hover:opacity-80"
                }`}
                onClick={() =>
                  !isConnected
                    ? chainId !== 232
                      ? openSwitchNetworks?.()
                      : openOnboarding?.()
                    : !contexto?.lensConectado?.profile && isConnected
                    ? handleConectarse()
                    : openProfile()
                }
              >
                {lensCargando && (
                  <div className="absolute w-fit h-fit flex items-center justify-center animate-spin">
                    <AiOutlineLoading color={"white"} size={15} />
                  </div>
                )}
                <div
                  className={`relative w-fit h-fit flex items-center justify-center ${
                    contexto?.lensConectado?.profile && "opacity-40"
                  }`}
                >
                  {!contexto?.lensConectado?.profile && !isConnected
                    ? dict.Home.connect
                    : isConnected && !contexto?.lensConectado?.profile
                    ? "Lens"
                    : dict.Home.exit}
                </div>
              </div>
            </div>
            <div className="relative w-full h-full flex items-center justify-end flex-row gap-3">
              <div className="relative w-3/5 h-full flex items-center justify-center border-4 rounded-md border-azulito bg-viol flex-col justify-between gap-4 items-stretch p-2">
                <div className="relative w-full h-full flex flex-row gap-4 justify-between items-start">
                  <div className="relative w-fit h-fit items-center justify-start font-at text-white text-2xl break-all">
                    {contexto?.lensConectado?.profile?.username?.localName}
                  </div>
                  <div className="relative w-fit h-fit items-center justify-start">
                    <div className="rounded-full w-28 h-28 border border-azulito bg-azulito">
                      {contexto?.lensConectado?.profile?.metadata?.picture && (
                        <Image
                          src={handleProfilePicture(
                            contexto?.lensConectado?.profile?.metadata?.picture
                          )}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                          draggable={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-full flex flex-row gap-4 justify-between items-end font-vcr text-3xl">
                  <div className="relative w-fit h-fit items-center justify-start">
                    {(espectadorInfo?.auEarned || 0)?.toFixed(2)}
                  </div>
                  <div className="relative w-fit h-fit items-center justify-start text-white">
                    $AU
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full flex items-center justify-center border-4 p-3 flex-col gap-3 rounded-md border-sol">
              <div className="relative w-full h-20 flex border bg-[#00FFFF]/60 border-[#6FFA95] flex-row items-center justify-between p-1 gap-3 text-[#F6FC8D] font-super text-lg">
                <div className="relative w-fit h-fit items-center justify-start">
                  $AU
                </div>
                <div className="relative w-fit h-fit items-center justify-start">
                  {(espectadorInfo?.auClaimed || 0)?.toFixed(2)}
                </div>
              </div>
              <div className="h-px w-full bg-[#CC04FD]"></div>
              <div className="relative w-full h-full flex items-start justify-start flex-row gap-3">
                <div className="relative w-full h-full items-start justify-between flex-col flex gap-3 text-white">
                  <div className="font-vcr text-2xl text-left w-fit h-fit flex">
                    {dict.Home.claimedAU}
                  </div>
                  <div className="font-super text-lg text-left w-fit h-fit flex">
                    {(espectadorInfo?.auToClaim || 0)?.toFixed(2)} $AU
                  </div>
                </div>
                <div
                  className={`relative w-fit h-full flex items-end justify-end`}
                >
                  <div
                    className={`relative w-28 h-8 flex items-center justify-center text-xs font-bit text-viol text-center ${
                      Number(espectadorInfo?.auToClaim) <= 0 ||
                      !contexto?.lensConectado?.profile
                        ? "opacity-70"
                        : "cursor-pointer hover:opacity-70"
                    }`}
                    onClick={() =>
                      Number(espectadorInfo?.auToClaim) > 0 &&
                      !cogerCargando &&
                      contexto?.lensConectado?.profile &&
                      manejarCoger()
                    }
                  >
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                      layout="fill"
                      objectFit="fill"
                      draggable={false}
                    />
                    <div
                      className={`absolute w-full h-full flex items-center justify-center whitespace-nowrap ${
                        cogerCargando && "animate-spin"
                      }`}
                    >
                      {cogerCargando ? (
                        <AiOutlineLoading color="white" size={15} />
                      ) : (
                        dict.Home.reclamar
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`relative mb-0 w-full h-fit flex items-center justify-end`}
      >
        <div className="relativew-full h-60 flex items-center justify-end">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmdRLJ8bWfTgJ92TiXTQU4wU46xtYURebNNRC4qyBMkCN8`}
            layout="fill"
            objectFit="cover"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};

export default Espectador;
