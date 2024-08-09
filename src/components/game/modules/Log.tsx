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
  cargando,
  dict,
  manejarSalir,
  manejarLens,
  lensCargando,
  setPantalla,
  lensConectado,
  address,
  publicClient,
  setIndexar,
  setErrorInteraccion,
  escena,
  setAbrirCita,
  setSeguirColeccionar,
  setVerImagen,
  setOpcionAbierta,
  setComentarPublicar,
  comentarPublicar,
  npcIds,
  setCarrito,
  setMostrarNotificacion,
  setMostrarInteracciones
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
                imagen: "QmfVM4Fg28tCYELteZJNjBoyjPQEENYnWPy4gRJatBFzd1",
                llama: !connected ? openConnectModal : () => manejarSalir(),
                cargando: false,
              },
              {
                titulo: "Lens",
                imagen: "QmYpZgGFF4m6kNPsjYYEp7EkwoiE75YvjT3M5rSX18we62",
                llama: () =>
                  !connected
                    ? {}
                    : !lensConectado && connected
                    ? manejarLens()
                    : () => manejarSalir(),
                cargando: lensCargando,
              },
              {
                titulo: dict.Home.orders,
                imagen: "QmP6sjSUGJHj4g15dNWjtWonemCHscPWeZrBFURvSrLjjD",
                llama: () => setPantalla(2),
                cargando: false,
              },
              {
                titulo: dict.Home.studio,
                imagen: "QmYAEjcDCXGSkBMkfxkBgaw7euY4hEguzkf5ea5ZG89km1",
                llama: () => setPantalla(0),
                cargando: false,
              },
              {
                titulo: dict.Home.create,
                imagen: "QmSpR9h16z1wLLtqHqamWgddoZU6NUoCArykPNmNPzSnoz",
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
                        src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
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
            <div className="absolute font-at text-3xl text-white items-center justify-center w-fit h-fit flex whitespace-preline text-center leading-5 top-1">
              {dict.Home.chat}
            </div>
            <div className="relative font-at text-3xl text-viola items-center justify-center w-fit h-fit flex whitespace-preline text-center leading-5">
              {dict.Home.chat}
            </div>
            <div
              className="relative w-fit cursor-pointer h-fit flex items-center justify-center active:scale-95 mr-0"
              onClick={() => setDragDialog((prev) => !prev)}
            >
              <PiArrowSquareInBold size={15} color="white" />
            </div>
            {/* <div className="relative w-20 h-20 flex items-center justify-center border-black border-2">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmbNktia71Ec2wKsDxL5BeJrDWTrQX9xpMSQs5AUZCaryi`}
                draggable={false}
                objectFit="cover"
                layout="fill"
                priority
              />
            </div> */}
          </div>
          <div className="relative w-full h-full flex items-center justify-center p-1">
            <Chat
              setOpcionAbierta={setOpcionAbierta}
              setVerImagen={setVerImagen}
              conectado={connected}
              manejarLens={manejarLens}
              openConnectModal={openConnectModal}
              setMostrarInteracciones={setMostrarInteracciones}
              setCarrito={setCarrito}
              setMostrarNotificacion={setMostrarNotificacion}
              npcIds={npcIds}
              setSeguirColeccionar={setSeguirColeccionar}
              dict={dict}
              lensConectado={lensConectado}
              address={address}
              publicClient={publicClient}
              setIndexar={setIndexar}
              setErrorInteraccion={setErrorInteraccion}
              escena={escena}
              setAbrirCita={setAbrirCita}
              comentarPublicar={comentarPublicar}
              setComentarPublicar={setComentarPublicar}
            />
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
