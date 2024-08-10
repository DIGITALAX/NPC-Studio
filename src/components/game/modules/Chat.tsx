import { FunctionComponent, useRef } from "react";
import { ChatProps } from "../types/game.types";
import { Comment, Mirror, Post, Quote } from "../../../../graphql/generated";
import InfiniteScroll from "react-infinite-scroll-component";
import Publicacion from "@/components/common/modules/Publicacion";
import Comentario from "@/components/common/modules/Comentario";
import useInteracciones from "@/components/common/hooks/useInteracciones";
import useDialog from "../hooks/useDialog";
import useFeed from "@/components/common/hooks/useFeed";

const Chat: FunctionComponent<ChatProps> = ({
  open,
  lensConectado,
  dict,
  address,
  publicClient,
  setMostrarInteracciones,
  setIndexar,
  setErrorInteraccion,
  escena,
  setAbrirCita,
  setSeguirColeccionar,
  setVerImagen,
  setOpcionAbierta,
  comentarPublicar,
  setComentarPublicar,
  setCarrito,
  setMostrarNotificacion,
  npcIds,
  conectado,
  openConnectModal,
  manejarLens,
}): JSX.Element => {
  const {
    feedCargando,
    feedActual,
    setFeedActual,
    tieneMasFeed,
    masFeedCargando,
    llamarMasFeed,
  } = useFeed(lensConectado, escena, npcIds);

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
    feedActual,
    setFeedActual,
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
  const elementoTexto = useRef(null);
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-between font-at text-base leading-4 max-w-full text-white break-all gap-6 ${
        open ? "h-96 overflow-y-scroll" : "h-[33rem] xl:h-80 max-h-full"
      }`}
      ref={contenedorMensajesRef}
    >
      <div
        className={`relative h-full flex items-center justify-start overflow-y-scroll max-w-full flex-col w-full`}
      >
        <InfiniteScroll
          dataLength={feedActual?.length}
          loader={<></>}
          hasMore={tieneMasFeed}
          next={llamarMasFeed}
          className="w-full h-fit items-start justify-start flex flex-col gap-4"
        >
          {feedCargando
            ? Array.from({ length: 10 }).map((_, indice: number) => {
                return (
                  <div
                    key={indice}
                    className={`relative rounded-sm h-32 px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 publicacions-center justify-between border-white w-full animate-pulse bg-black/70`}
                  ></div>
                );
              })
            : feedActual?.map(
                (elemento: Post | Quote | Mirror | Comment, indice: number) => {
                  return (
                    <Publicacion
                      menos
                      setMostrarInteracciones={setMostrarInteracciones}
                      setOpcionAbierta={setOpcionAbierta}
                      key={indice}
                      setCaretCoord={setCaretCoord}
                      caretCoord={caretCoord}
                      indice={indice + 1}
                      dict={dict}
                      manejarAccionAbierta={manejarAccionAbierta}
                      publicacion={elemento}
                      comentariosAbiertos={comentariosAbiertos}
                      setComentariosAbiertos={setComentariosAbiertos}
                      abrirMirrorEleccion={abrirMirrorEleccion}
                      setAbrirMirrorEleccion={setAbrirMirrorEleccion}
                      cargandoInteracciones={cargandoInteracciones[indice]}
                      setAbrirCita={setAbrirCita}
                      manejarMeGusta={manejarMeGusta}
                      manejarMirror={manejarMirror}
                      manejarColeccionar={manejarColeccionar}
                      setSeguirColeccionar={setSeguirColeccionar}
                      setComentarPublicar={setComentarPublicar}
                      setMencionarPerfiles={setMencionarPerfiles}
                      setPerfilesAbiertos={setPerfilesAbiertos}
                      comentarPublicar={comentarPublicar}
                      perfilesAbiertos={perfilesAbiertos}
                      publicacionCargando={publicacionCargando[indice + 1]}
                      manejarPublicar={manejarPublicar}
                      mencionarPerfiles={mencionarPerfiles}
                      lensConectado={lensConectado}
                      setVerImagen={setVerImagen}
                      manejarArchivo={manejarArchivo}
                    />
                  );
                }
              )}
        </InfiniteScroll>
      </div>
      <Comentario
        setOpcionAbierta={setOpcionAbierta}
        elementoTexto={elementoTexto}
        caretCoord={caretCoord}
        setCaretCoord={setCaretCoord}
        setPerfilesAbiertos={setPerfilesAbiertos}
        setMencionarPerfiles={setMencionarPerfiles}
        indice={0}
        lensConectado={lensConectado}
        publicacionCargando={publicacionCargando[0]}
        manejarPublicar={manejarPublicar}
        dict={dict}
        manejarArchivo={manejarArchivo}
        mencionarPerfiles={mencionarPerfiles}
        perfilesAbiertos={perfilesAbiertos}
        comentarPublicar={comentarPublicar}
        setComentarPublicar={setComentarPublicar}
      />
    </div>
  );
};

export default Chat;
