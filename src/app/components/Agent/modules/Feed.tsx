import { FunctionComponent, JSX, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Publicacion from "../../Chat/modules/Publicacion";
import Comentario from "../../Chat/modules/Comentario";
import useFeed from "../../Chat/hooks/useFeed";
import { ModalContext } from "@/app/providers";
import { Post } from "@lens-protocol/client";
import { FeedProps } from "../types/agent.types";

const Feed: FunctionComponent<FeedProps> = ({
  dict,
  router,
  perfil,
}): JSX.Element => {
  const {
    feedCargando,
    feedActual,
    hasMore,
    llamarMasFeed,
    comentariosAbiertos,
    setComentariosAbiertos,
    llamarFeed,
  } = useFeed(perfil);
  const contexto = useContext(ModalContext);

  return (
    <div
      className={`relative w-full flex flex-col items-start justify-between font-at text-base leading-4 max-w-full text-white break-all gap-6 overflow-y-scroll h-[40rem]`}
      id="scrollTarget"
    >
      <div
        className={`relative h-full flex items-center justify-start overflow-y-scroll max-w-full flex-col w-full`}
      >
        <InfiniteScroll
          dataLength={feedActual?.length}
          loader={<></>}
          hasMore={hasMore?.hasMore}
          next={llamarMasFeed}
          className="w-full h-fit items-start justify-start flex flex-col gap-4"
        >
          {feedCargando || Number(feedActual?.length) < 1
            ? Array.from({ length: 10 }).map((_, indice: number) => {
                return (
                  <div
                    key={indice}
                    className={`relative rounded-sm h-32 px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 items-center justify-between border-white w-full animate-pulse bg-black/70`}
                  ></div>
                );
              })
            : feedActual?.map((elemento: Post, indice: number) => {
                return (
                  <Publicacion
                    router={router}
                    dict={dict}
                    indice={indice + 1}
                    key={indice}
                    elemento={elemento}
                    setMostrarPerfil={contexto?.setMostrarPerfil!}
                    comentariosAbiertos={comentariosAbiertos}
                    setComentariosAbiertos={setComentariosAbiertos}
                    llamarFeed={llamarFeed}
                  />
                );
              })}
        </InfiniteScroll>
      </div>
      <Comentario llamarFeed={llamarFeed} cita={false} indice={0} dict={dict} />
    </div>
  );
};

export default Feed;
