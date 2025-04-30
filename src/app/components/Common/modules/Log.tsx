import { FunctionComponent, JSX, useContext } from "react";
import { LogProps } from "../types/common.types";
import { AnimationContext, ModalContext } from "@/app/providers";
import Image from "next/legacy/image";
import { INFURA_GATEWAY , INFURA_GATEWAY_INTERNAL} from "@/app/lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { http, useAccount } from "wagmi";
import { useModal } from "connectkit";
import { PiArrowSquareInBold } from "react-icons/pi";
import Chat from "../../Chat/modules/Chat";
import useLens from "../hooks/useLens";
import { createPublicClient } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Log: FunctionComponent<LogProps> = ({
  cargando,
  dict,
  setDragDialog,
  router,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const animContexto = useContext(AnimationContext);
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const { address, isConnected, chainId } = useAccount();
  const { openProfile, openSwitchNetworks, openOnboarding } = useModal();
  const { lensCargando, handleConectarse } = useLens(
    isConnected,
    address,
    dict,
    publicClient
  );

  return (
    <div className="relative w-full sm:w-3/4 md:w-1/2 xl:w-80 h-fit xl:h-full flex items-between justify-start flex-col gap-5 xl:order-1 order-2 sm:px-0 px-1">
      <div className="relative flex flex-col gap-5 h-full w-full items-center justify-between">
        <div className="relative text-white font-leco items-center justify-center flex w-fit h-fit text-4xl text-center">
          {dict.Home.title}
        </div>
        <div className="relative w-full h-fit flex items-center justify-center px-4 mb-0">
          <div className="relative w-full h-8 flex items-center justify-between flex flex-row gap-2">
            {[
              {
                titulo: !isConnected ? dict.Home.connect : "Lens",
                imagen:
                  !isConnected && !contexto?.lensConectado?.profile
                    ? `${INFURA_GATEWAY}/ipfs/QmfVM4Fg28tCYELteZJNjBoyjPQEENYnWPy4gRJatBFzd1`
                    : isConnected && !contexto?.lensConectado?.profile
                    ? `${INFURA_GATEWAY}/ipfs/QmYpZgGFF4m6kNPsjYYEp7EkwoiE75YvjT3M5rSX18we62`
                    : handleProfilePicture(
                        contexto?.lensConectado?.profile?.metadata?.picture
                      ),
                llama: () =>
                  !isConnected
                    ? chainId !== 232
                      ? openSwitchNetworks?.()
                      : openOnboarding?.()
                    : !contexto?.lensConectado?.profile && isConnected
                    ? handleConectarse()
                    : openProfile(),
                cargando: lensCargando,
              },
              {
                titulo: dict.Home.indice,
                imagen: !isConnected
                  ? `${INFURA_GATEWAY}/ipfs/QmRDCTnc78cuuJorxuy7KArG1KssSZH6UUwyir8S3eugRe`
                  : `${INFURA_GATEWAY}/ipfs/QmRm4pg7PeGBJ43FcvUhaaC1uDeRiGuFmAZrA9NjD6EFZD`,
                llama: () => {
                  animContexto?.setPageChange(false);
                  router.push("/agent-index");
                },
                cargando: false,
              },
              {
                titulo: dict.Home.orders,
                imagen: `${INFURA_GATEWAY}/ipfs/QmP6sjSUGJHj4g15dNWjtWonemCHscPWeZrBFURvSrLjjD`,
                llama: () => contexto?.setPantalla(2),
                cargando: false,
              },
              {
                titulo: dict.Home.studio,
                imagen: `${INFURA_GATEWAY}/ipfs/QmYAEjcDCXGSkBMkfxkBgaw7euY4hEguzkf5ea5ZG89km1`,

                llama: () => contexto?.setPantalla(0),
                cargando: false,
              },
              {
                titulo: dict.Home.create,
                imagen: `${INFURA_GATEWAY}/ipfs/QmSpR9h16z1wLLtqHqamWgddoZU6NUoCArykPNmNPzSnoz`,
                llama: () => contexto?.setPantalla(1),
                cargando: false,
              },
            ].map(
              (
                elemento: {
                  titulo: string;
                  imagen: string;
                  llama:
                    | void
                    | (() => void)
                    | (() => Promise<void>)
                    | undefined;
                  cargando: boolean;
                },
                indice: number
              ) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-8 h-full flex items-center justify-center ${
                      elemento?.cargando
                        ? "bg-black"
                        : "cursor-pointer active:scale-90 hover:scale-95 hover:opacity-80"
                    }`}
                    title={elemento.titulo}
                    onClick={() =>
                      !elemento?.cargando &&
                      elemento?.llama &&
                      elemento?.llama()
                    }
                  >
                    {elemento?.cargando && (
                      <div className="absolute w-fit h-fit flex items-center justify-center animate-spin">
                        <AiOutlineLoading color={"white"} size={15} />
                      </div>
                    )}
                    <div
                      className={`relative w-full h-full flex items-center justify-center ${
                        elemento?.cargando && "opacity-40"
                      }`}
                    >
                      <Image
                        layout="fill"
                        draggable={false}
                        objectFit="cover"
                        src={elemento.imagen}
                        className={`${
                          isConnected &&
                          contexto?.lensConectado?.profile &&
                          indice == 0 &&
                          "rounded-sm"
                        }`}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="relative w-full h-[38rem] xl:h-96 flex items-center justify-center border-4 border-white rounded-md bg-ballena flex-col py-1 px-2 gap-3">
          <div className="relative w-full h-fit flex flex-row items-center justify-between">
            <div className="absolute font-at text-3xl text-white items-center justify-center w-fit h-fit flex whitespace-nowrap text-center leading-5 top-1">
              {dict.Home.chat}
            </div>
            <div className="relative font-at text-3xl text-viola items-center justify-center w-fit h-fit flex whitespace-nowrap text-center leading-5">
              {dict.Home.chat}
            </div>
            <div
              className="relative w-fit cursor-pointer h-fit flex items-center justify-center active:scale-95 mr-0"
              onClick={() => setDragDialog((prev) => !prev)}
            >
              <PiArrowSquareInBold size={15} color="white" />
            </div>
          </div>
          <div className="relative w-full h-full flex items-center justify-center p-1">
            <Chat dict={dict} abierto={false} router={router} />
          </div>
        </div>
        <div className="relative w-full h-48 xl:h-40 flex items-center justify-center border-4 border-white rounded-md bg-white">
          <div
            className={`relative w-full h-full rounded-md flex object-cover bg-cover items-start justify-start ${
              cargando && "animate-pulse opacity-90"
            }`}
            draggable={false}
            id="mapa"
          >
            {cargando && (
              <Image
                src={`${INFURA_GATEWAY_INTERNAL}QmT5jkuAxfjuV8p4v7vRDGm6FsZt1WCWHdj4TEvGJZMcYr`}
                draggable={false}
                objectFit="cover"
                layout="fill"
                className="z-100"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
