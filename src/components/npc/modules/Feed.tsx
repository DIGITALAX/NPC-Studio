import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post, Quote, Mirror, Comment } from "../../../../graphql/generated";
import Publicacion from "@/components/common/modules/Publicacion";
import Comentario from "@/components/common/modules/Comentario";
import { FeedProps } from "../types/npc.types";
import useFeed from "../hooks/useFeed";

const Feed: FunctionComponent<FeedProps> = ({
  dict,
  lensConectado,
  perfil,
  setMostrarPerfil,
  setMostrarInteracciones,
  setSeguirColeccionar,
  setVerImagen,
  setAbrirCita,
  publicClient,
  address,
  conectado,
  setErrorInteraccion,
  setIndexar,
  openConnectModal,
  manejarLens,
  router
}): JSX.Element => {
  const {
    feedActual,
    llamarMasFeed,
    feedCargando,
    tieneMasFeed,
    setCaretCoord,
    caretCoord,
    comentariosAbiertos,
    setComentariosAbiertos,
    abrirMirrorEleccion,
    setAbrirMirrorEleccion,
    cargandoInteracciones,
    manejarMeGusta,
    manejarMirror,
    manejarArchivo,
    manejarColeccionar,
    setMencionarPerfiles,
    setPerfilesAbiertos,
    perfilesAbiertos,
    publicacionCargando,
    manejarPublicar,
    mencionarPerfiles,
    elementoTexto,
    setOpcionAbierta,
    comentarPublicar,
    setComentarPublicar,
  } = useFeed(
    perfil,
    lensConectado,
    openConnectModal,
    manejarLens,
    conectado,
    setErrorInteraccion,
    setIndexar,
    publicClient,
    address
  );
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-between font-at text-base leading-4 max-w-full text-white break-all gap-6 overflow-y-scroll h-[40rem]`}
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
                      router={router}
                      setMostrarPerfil={setMostrarPerfil}
                      setMostrarInteracciones={setMostrarInteracciones}
                      setOpcionAbierta={setOpcionAbierta}
                      key={indice}
                      setCaretCoord={setCaretCoord}
                      caretCoord={caretCoord}
                      indice={indice + 1}
                      dict={dict}
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
        setMostrarPerfil={setMostrarPerfil}
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
        mencionarPerfiles={mencionarPerfiles}
        perfilesAbiertos={perfilesAbiertos}
        comentarPublicar={comentarPublicar}
        setComentarPublicar={setComentarPublicar}
        manejarArchivo={manejarArchivo}
      />
    </div>
  );
};

export default Feed;
