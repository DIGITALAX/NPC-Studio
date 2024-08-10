import { FunctionComponent } from "react";
import { Comment, Quote } from "../../../../graphql/generated";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/legacy/image";
import Publicacion from "./Publicacion";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { QuienProps } from "../types/common.types";
import useDialog from "@/components/game/hooks/useDialog";
import useInteracciones from "../hooks/useInteracciones";

const Quien: FunctionComponent<QuienProps> = ({
  tipo,
  reactors,
  quoters,
  tieneMas,
  tieneMasCita,
  muestraMas,
  mirrorQuote,
  dict,
  lensConectado,
  setMostrarInteracciones,
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
  setAbrirCita,
  setSeguirColeccionar,
  setQuoters,
  setReactors,
  setMostrarPerfil,
}): JSX.Element => {
  const {
    comentariosAbiertos,
    setComentariosAbiertos,
    abrirMirrorEleccion,
    setAbrirMirrorEleccion,
    cargandoInteracciones,
    manejarMeGusta,
    manejarMirror,
    manejarColeccionar,
    manejarAccionAbierta,
  } = useInteracciones(
    lensConectado,
    setErrorInteraccion,
    mirrorQuote ? quoters : reactors,
    (mirrorQuote ? setQuoters : setReactors) as any,
    address,
    publicClient,
    setIndexar,
    setCarrito,
    setMostrarNotificacion,
    conectado,
    openConnectModal,
    manejarLens
  );
  const {
    contenedorMensajesRef,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    perfilesAbiertos,
    caretCoord,
    mencionarPerfiles,
    publicacionCargando,
    manejarPublicar,
    manejarArchivo,
  } = useDialog(
    address,
    publicClient,
    setIndexar,
    setErrorInteraccion,
    escena,
    comentarPublicar,
    setComentarPublicar,
    conectado,
    openConnectModal,
    manejarLens,
    lensConectado
  );

  if (
    (mirrorQuote && quoters?.length > 0) ||
    (tipo == "Comments" && reactors?.length > 0)
  ) {
    return (
      <div className="relative w-full h-full items-start justify-start flex flex-col overflow-y-scroll">
        <InfiniteScroll
          dataLength={tipo == "Comments" ? reactors?.length : quoters?.length}
          loader={<></>}
          hasMore={tipo == "Comments" ? tieneMas : tieneMasCita}
          next={muestraMas}
          className="w-fit h-fit items-start justify-start flex flex-col gap-10"
        >
          {(tipo == "Comments" ? reactors : quoters)?.map(
            (publicacion: Quote | Comment, indice: number) => {
              return (
                <Publicacion
                  dict={dict}
                  lensConectado={lensConectado}
                  indice={indice}
                  setMostrarPerfil={setMostrarPerfil}
                  publicacion={publicacion}
                  data-post-id={publicacion?.id}
                  key={indice}
                  setAbrirCita={setAbrirCita}
                  setAbrirMirrorEleccion={setAbrirMirrorEleccion}
                  manejarAccionAbierta={manejarAccionAbierta}
                  manejarArchivo={manejarArchivo}
                  manejarColeccionar={manejarColeccionar}
                  manejarMeGusta={manejarMeGusta}
                  manejarMirror={manejarMirror}
                  manejarPublicar={manejarPublicar}
                  mencionarPerfiles={mencionarPerfiles}
                  setCaretCoord={setCaretCoord}
                  setComentarPublicar={setComentarPublicar}
                  setComentariosAbiertos={setComentariosAbiertos}
                  setMencionarPerfiles={setMencionarPerfiles}
                  setMostrarInteracciones={setMostrarInteracciones}
                  setOpcionAbierta={setOpcionAbierta}
                  setPerfilesAbiertos={setPerfilesAbiertos}
                  setSeguirColeccionar={setSeguirColeccionar}
                  setVerImagen={setVerImagen}
                  caretCoord={caretCoord}
                  publicacionCargando={publicacionCargando?.[indice]}
                  abrirMirrorEleccion={abrirMirrorEleccion}
                  perfilesAbiertos={perfilesAbiertos}
                  cargandoInteracciones={cargandoInteracciones?.[indice]}
                  comentarPublicar={comentarPublicar}
                  comentariosAbiertos={comentariosAbiertos}
                />
              );
            }
          )}
        </InfiniteScroll>
      </div>
    );
  } else {
    return reactors?.length > 0 && !mirrorQuote ? (
      <div className="relative w-full h-full items-start justify-start flex overflow-y-scroll">
        <InfiniteScroll
          hasMore={!mirrorQuote ? tieneMas : tieneMasCita}
          dataLength={!mirrorQuote ? reactors?.length : quoters?.length}
          next={muestraMas}
          loader={""}
          height={"10rem"}
          className="relative w-full h-fit flex flex-wrap px-4 gap-2 overflow-y-scroll"
        >
          {reactors?.map((reactor: any, index: number) => {
            const account =
              tipo === "Likes"
                ? reactor?.profile
                : tipo === "Mirrors"
                ? reactor?.by
                : reactor;

            const profileImage = createProfilePicture(
              account?.metadata?.picture
            );

            return (
              <div
                key={index}
                className="relative w-fit h-14 p-2 flex flex-row items-center justify-start font-bit text-white cursor-pointer"
                onClick={() => {
                  setMostrarInteracciones({
                    tipo: "",
                    abierto: false,
                  });
                }}
              >
                <div
                  className="relative w-fit h-fit flex flex-row gap-3 items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => setMostrarPerfil(account?.id)}
                >
                  <div className="relative w-8 h-8 rounded-full border border-white bg-black items-center justify-center">
                    {profileImage && (
                      <Image
                        src={profileImage}
                        objectFit="cover"
                        layout="fill"
                        alt="pfp"
                        className="relative w-fit h-fit rounded-full self-center flex"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="relative w-fit h-fit justify-center items-center flex top-px text-sm break-all">
                    {account?.handle?.suggestedFormatted?.localName}
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    ) : (
      <></>
    );
  }
};

export default Quien;
