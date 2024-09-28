"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { InteraccionesProps } from "../types/common.types";
import { AiOutlineLoading } from "react-icons/ai";
import Quien from "./Quien";
import useMostrar from "../hooks/useMostrar";

function Interacciones({
  setMostrarInteracciones,
  mostrarInteracciones,
  dict,
  lensConectado,
  address,
  publicClient,
  conectado,
  openConnectModal,
  manejarLens,
  setErrorInteraccion,
  setIndexar,
  setMostrarNotificacion,
  setCarrito,
  escena,
  comentarPublicar,
  setComentarPublicar,
  setOpcionAbierta,
  setVerImagen,
  router,
  setAbrirCita,
  setMostrarPerfil,
  setSeguirColeccionar,
}: InteraccionesProps) {
  const {
    mirrorQuote,
    datosCargando,
    setMirrorQuote,
    tieneMas,
    tieneMasCita,
    muestraMas,
    reactors,
    quoters,
    setReactors,
    setQuoters,
  } = useMostrar(
    mostrarInteracciones?.id!,
    lensConectado,
    mostrarInteracciones?.tipo!,
    dict
  );

  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => {
        setMostrarInteracciones({ tipo: "", abierto: false });
        setMirrorQuote(false);
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white rounded-md cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            draggable={false}
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
          />

          <div
            className={`flex flex-col items-center py-2 sm:py-10 px-2 sm:px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] items-start justify-center flex overflow-y-scroll`}
          >
            {mostrarInteracciones?.tipo === dict.Home.Mirrors &&
              (reactors?.length > 0 || quoters?.length > 0) && (
                <div className="relative w-full h-fit flex items-center justify-center flex-row gap-2">
                  <div
                    className={`relative w-5 h-5 flex items-center justify-center hover:opacity-70 cursor-pointer ${
                      !mirrorQuote && "opacity-50"
                    }`}
                    onClick={() => setMirrorQuote(true)}
                    title={dict.Home.quo}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM`}
                      draggable={false}
                    />
                  </div>
                  <div
                    className={`relative w-5 h-5 flex items-center justify-center hover:opacity-70 cursor-pointer ${
                      mirrorQuote && "opacity-50"
                    }`}
                    onClick={() => setMirrorQuote(false)}
                    title={dict.Home.mir}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3`}
                      draggable={false}
                    />
                  </div>
                </div>
              )}

            {!datosCargando ? (
              <Quien
                dict={dict}
                router={router}
                setMostrarPerfil={setMostrarPerfil}
                lensConectado={lensConectado}
                tipo={mostrarInteracciones?.tipo}
                reactors={reactors}
                quoters={quoters}
                tieneMas={tieneMas}
                tieneMasCita={tieneMasCita}
                muestraMas={muestraMas}
                mirrorQuote={mirrorQuote}
                setMostrarInteracciones={setMostrarInteracciones}
                setCarrito={setCarrito}
                setAbrirCita={setAbrirCita}
                setComentarPublicar={setComentarPublicar}
                setErrorInteraccion={setErrorInteraccion}
                setIndexar={setIndexar}
                setMostrarNotificacion={setMostrarNotificacion}
                setOpcionAbierta={setOpcionAbierta}
                setSeguirColeccionar={setSeguirColeccionar}
                setVerImagen={setVerImagen}
                publicClient={publicClient}
                address={address}
                manejarLens={manejarLens}
                escena={escena}
                comentarPublicar={comentarPublicar}
                conectado={conectado}
                openConnectModal={openConnectModal}
                setReactors={setReactors}
                setQuoters={setQuoters}
              />
            ) : (
              <div className="relative w-fit h-fit col-start-1 place-self-center animate-spin">
                <AiOutlineLoading color="white" size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interacciones;
