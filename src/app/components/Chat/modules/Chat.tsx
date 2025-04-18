import { FunctionComponent, JSX, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFeed from "../hooks/useFeed";
import Publicacion from "./Publicacion";
import { Post } from "@lens-protocol/client";
import { ChatProps } from "../types/chat.types";
import Comentario from "./Comentario";
import { ModalContext } from "@/app/providers";

const Chat: FunctionComponent<ChatProps> = ({
  dict,
  abierto,
  router,
}): JSX.Element => {
  const {
    feedCargando,
    feedActual,
    hasMore,
    llamarMasFeed,
    comentariosAbiertos,
    setComentariosAbiertos,
    llamarFeed,
  } = useFeed();
  const contexto = useContext(ModalContext);
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-between font-at text-base leading-4 max-w-full text-white break-all gap-6 ${
        abierto ? "h-96 overflow-y-scroll" : "h-[33rem] xl:h-80 max-h-full"
      }`}
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
          {feedCargando
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
                    indice={indice + 2}
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

export default Chat;
