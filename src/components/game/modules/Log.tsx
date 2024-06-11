import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { LogProps } from "../types/game.types";
import Chat from "./Chat";
import { PiArrowSquareInBold } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";

function Log({
  connected,
  openConnectModal,
  setDragDialog,
  indiceMensajeActual,
  handleCompletarTyping,
  indiceConversacionActual,
  contenedorMensajesRef,
  cargando,
  setMint,
  dict,
  manejarSalir,
  manejarLens,
  lensCargando,
  setPantalla,
  lensConectado,
}: LogProps) {
  return (
    <div className="relative w-full sm:w-3/4 md:w-1/2 xl:w-96 h-fit xl:h-full flex items-between justify-start flex-col gap-5 xl:order-1 order-2 sm:px-0 px-1">
      <div className="relative flex flex-col gap-5 h-full w-full items-center justify-start">
        <div className="relative text-white font-leco items-center justify-center flex w-fit h-fit text-4xl text-center">
          {dict.Home.title}
        </div>
        <div className="relative w-full h-fit flex items-center justify-center px-4 mb-0">
          <div className="relative w-full h-8 flex items-center justify-between flex flex-row gap-2">
            {[
              {
                titulo: dict.Home.connect,
                imagen: "QmRfPstaxusA9j4DYtwSsvrNn1F3zmvFekNbSeGChvrCHB",
                llama: !connected ? openConnectModal : () => manejarSalir(),
                cargando: false,
              },
              {
                titulo: "Lens",
                imagen: "QmcAH8o2iNCrfTMDFRJbd1f9hAgYbbCwkygB9bdbrR9uFx",
                llama: () =>
                  !lensConectado ? manejarLens() : () => manejarSalir(),
                cargando: lensCargando,
              },
              {
                titulo: dict.Home.orders,
                imagen: "QmSFwCzJKRA6eg93yiAPyYKyWuAJfLLVTf38VSsgVDu3k1",
                llama: () => setPantalla(2),
                cargando: false,
              },
              {
                titulo: dict.Home.studio,
                imagen: "QmbQwhWaCimcLHuD8BdBhbgv1aWU3s2E2DBgkqqEAtPkvi",
                llama: () => setPantalla(0),
                cargando: false,
              },
              {
                titulo: dict.Home.create,
                imagen: "QmPhp6oB7zLL5nXvCK1LRgqFKmbHGtzP6z8GZZB1wj1R9Z",
                llama: () => setPantalla(1),
                cargando: false,
              },
            ].map(
              (
                elemento: {
                  titulo: string;
                  imagen: string;
                  llama: (() => void) | undefined;
                  cargando: boolean;
                },
                indice: number
              ) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-8 h-full flex items-center justify-center ${
                      elemento?.cargando
                        ? "bg-white"
                        : "cursor-pointer active:scale-90 hover:scale-95 hover:opacity-80"
                    }`}
                    title={elemento.titulo}
                    onClick={() =>
                      !elemento?.cargando &&
                      elemento?.llama &&
                      elemento?.llama()
                    }
                  >
                    {elemento?.cargando ? (
                      <div className="relative w-fit h-fit flex items-center justify-center animate-spin">
                        <AiOutlineLoading color={"black"} size={15} />
                      </div>
                    ) : (
                      <Image
                        layout="fill"
                        draggable={false}
                        src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="relative w-full h-96 flex items-center justify-center border-4 border-white rounded-md bg-ballena flex-row p-2 gap-4">
          <div className="relative w-fit h-full flex flex-col items-center justify-between">
            <div className="absolute font-at text-4xl text-white items-center justify-center w-fit h-fit flex whitespace-preline text-center leading-5 top-1">
              {dict.Home.chat}
            </div>
            <div className="relative font-at text-4xl text-viola items-center justify-center w-fit h-fit flex whitespace-preline text-center leading-5">
              {dict.Home.chat}
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center border-black border-2">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmbNktia71Ec2wKsDxL5BeJrDWTrQX9xpMSQs5AUZCaryi`}
                draggable={false}
                objectFit="cover"
                layout="fill"
                priority
              />
            </div>
          </div>
          <div className="relative w-full h-full flex items-center justify-center gap-1.5 flex-col py-2 px-1">
            <div className="relative w-full h-fit flex items-end justify-end">
              <div
                className="relative w-fit cursor-pointer h-fit flex items-center justify-center active:scale-95 mr-0"
                onClick={() => setDragDialog((prev) => !prev)}
              >
                <PiArrowSquareInBold size={15} color="white" />
              </div>
            </div>
            <div className="relative w-full h-full flex items-center justify-center p-2 bg-black/80 border-lime rounded-md border-2">
              <Chat
                indiceMensajeActual={indiceMensajeActual}
                handleCompletarTyping={handleCompletarTyping}
                indiceConversacionActual={indiceConversacionActual}
                contenedorMensajesRef={contenedorMensajesRef}
              />
            </div>
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
                src={`${INFURA_GATEWAY}/ipfs/QmT5jkuAxfjuV8p4v7vRDGm6FsZt1WCWHdj4TEvGJZMcYr`}
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
}

export default Log;
