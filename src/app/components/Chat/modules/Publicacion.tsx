import Image from "next/legacy/image";
import moment from "moment";
import { FunctionComponent, JSX, useContext } from "react";
import { PiArrowSquareInBold } from "react-icons/pi";
import { PublicacionProps } from "../types/chat.types";
import { Post, TextOnlyMetadata } from "@lens-protocol/client";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import TiposPublicaciones from "./TiposPublicaciones";
import Cita from "./Cita";
import Comentario from "./Comentario";
import Bar from "./Bar";
import { usePathname } from "next/navigation";
import { AnimationContext } from "@/app/providers";

const Publicacion: FunctionComponent<PublicacionProps> = ({
  elemento,
  dict,
  setMostrarPerfil,
  router,
  indice,
  comentariosAbiertos,
  setComentariosAbiertos,
  llamarFeed,
}): JSX.Element => {
  const path = usePathname();
  const animContexto = useContext(AnimationContext);
  return (
    <div
      className={`relative rounded-sm h-fit px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 items-center justify-between border-morado w-full bg-offNegro`}
    >
      <div className="relative w-full h-fit flex items-center justify-end">
        {(elemento?.commentOn || elemento?.quoteOf) && (
          <div
            className={`relative w-full h-fit row-start-1 items-center justify-between flex flex-row gap-2 font-bit text-xxs`}
          >
            <div
              className={`relative w-fit h-fit col-start-1 place-self-center break-all font-dos text-offWhite ${
                (elemento as Post)?.quoteOf && "cursor-pointer"
              }`}
            >
              {(elemento as Post)?.commentOn
                ? `${dict.Home.comment} ${
                    (
                      (elemento as Post)?.commentOn
                        ?.metadata as TextOnlyMetadata
                    )?.content?.slice(0, 10) + "..."
                  }`
                : `${dict.Home.quote} ${
                    (
                      (elemento as Post)?.quoteOf?.metadata as TextOnlyMetadata
                    )?.content?.slice(0, 10) + "..."
                  }`}
            </div>
            <div className="relative w-3.5 h-3.5 col-start-2 place-self-center">
              <Image
                layout="fill"
                src={`${INFURA_GATEWAY_INTERNAL}${
                  elemento?.__typename === "Post" && elemento?.commentOn
                    ? "QmXD3LnHiiLSqG2TzaNd1Pmhk2nVqDHDqn8k7RtwVspE6n"
                    : "QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM"
                }`}
                draggable={false}
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative w-full h-fit flex items-center justify-between flex-row">
        <div
          className={`relative w-fit h-fit flex items-center justify-start font-bit text-xxs text-white`}
        >
          <div className={`relative w-fit h-fit flex`}>
            {elemento?.timestamp && moment(`${elemento?.timestamp}`).fromNow()}
          </div>
        </div>
        {path.includes("/post/") && (
          <div
            className="relative cursor-pointer active:scale-95 items-center justify-end w-fit h-fit flex items-center justify-center"
            onClick={() => {
              animContexto?.setPageChange(false);
              router.push(`/post/${elemento?.id}`);
            }}
            title={dict.Home.espectar}
          >
            <PiArrowSquareInBold size={15} color="white" />
          </div>
        )}
      </div>
      <TiposPublicaciones elemento={elemento} />
      {elemento?.quoteOf && (
        <Cita
          setMostrarPerfil={setMostrarPerfil}
          cita={elemento?.quoteOf as Post}
        />
      )}
      <Bar
        indice={indice}
        dict={dict}
        elemento={elemento}
        setComentariosAbiertos={setComentariosAbiertos}
      />
      {comentariosAbiertos?.[indice] && (
        <Comentario
          cita={false}
          indice={indice}
          dict={dict}
          llamarFeed={llamarFeed}
          comentarioId={elemento?.id}
        />
      )}
    </div>
  );
};

export default Publicacion;
