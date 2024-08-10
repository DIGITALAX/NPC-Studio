import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import moment from "moment";
import { PublicacionProps } from "../types/common.types";
import {
  Comment,
  Mirror,
  Quote,
  TextOnlyMetadataV3,
} from "../../../../graphql/generated";
import TiposPublicaciones from "./TiposPublicaciones";
import Cita from "./Cita";
import Bar from "./Bar";
import Comentario from "./Comentario";
import { useRef } from "react";

function Publicacion({
  setCaretCoord,
  caretCoord,
  indice,
  publicacion,
  dict,
  comentariosAbiertos,
  manejarArchivo,
  setComentariosAbiertos,
  abrirMirrorEleccion,
  setAbrirMirrorEleccion,
  cargandoInteracciones,
  setAbrirCita,
  setOpcionAbierta,
  manejarMeGusta,
  manejarMirror,
  manejarColeccionar,
  setSeguirColeccionar,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  lensConectado,
  publicacionCargando,
  manejarPublicar,
  mencionarPerfiles,
  perfilesAbiertos,
  comentarPublicar,
  setComentarPublicar,
  setVerImagen,
  setMostrarInteracciones,
  manejarAccionAbierta,
  menos,
  setMostrarPerfil,
}: PublicacionProps) {
  const elementoTexto = useRef(null);

  return (
    <div
      className={`relative rounded-sm h-fit px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 publicacions-center justify-between border-morado w-full bg-offNegro`}
    >
      <div className="relative w-full h-fit flex publicacions-center justify-between flex-row">
        <div
          className={`relative w-fit h-fit flex publicacions-center justify-start font-bit text-xxs text-white`}
        >
          <div className={`relative w-fit h-fit flex`}>
            {publicacion?.createdAt &&
              moment(`${publicacion?.createdAt}`).fromNow()}
          </div>
        </div>
        {(publicacion?.__typename === "Comment" ||
          publicacion?.__typename === "Quote" ||
          publicacion?.__typename === "Mirror") && (
          <div
            className={`relative w-fit h-fit row-start-1 publicacions-center justify-end flex flex-row gap-2 font-bit text-xxs`}
          >
            <div
              className={`relative w-fit h-fit col-start-1 place-self-center break-words font-dosis text-offWhite ${
                publicacion?.__typename === "Mirror" && "cursor-pointer"
              }`}
            >
              {publicacion?.__typename === "Comment"
                ? `${dict.Home.comment} ${
                    (
                      (publicacion as Comment)?.commentOn
                        ?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`
                : publicacion?.__typename === "Mirror"
                ? `${dict.Home.mirror} ${
                    (
                      (publicacion as Mirror)?.mirrorOn
                        ?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`
                : `${dict.Home.quote} ${
                    (
                      (publicacion as Quote)?.quoteOn
                        ?.metadata as TextOnlyMetadataV3
                    )?.content?.slice(0, 10) + "..."
                  }`}
            </div>
            <div className="relative w-3.5 h-3.5 col-start-2 place-self-center">
              <Image
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/${
                  publicacion?.__typename === "Comment"
                    ? "QmXD3LnHiiLSqG2TzaNd1Pmhk2nVqDHDqn8k7RtwVspE6n"
                    : publicacion?.__typename === "Mirror"
                    ? "QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3"
                    : "QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM"
                }`}
                draggable={false}
              />
            </div>
          </div>
        )}
      </div>
      <TiposPublicaciones elemento={publicacion} setVerImagen={setVerImagen} />
      {publicacion?.__typename === "Quote" && (
        <Cita
          setMostrarPerfil={setMostrarPerfil}
          cita={publicacion?.quoteOn as Quote}
        />
      )}
      <Bar
        setMostrarPerfil={setMostrarPerfil}
        indice={menos ? indice - 1 : indice}
        setMostrarInteracciones={setMostrarInteracciones}
        elemento={publicacion}
        manejarAccionAbierta={manejarAccionAbierta}
        abrirMirrorEleccion={abrirMirrorEleccion}
        setAbrirMirrorEleccion={setAbrirMirrorEleccion}
        cargandoInteracciones={cargandoInteracciones}
        setComentariosAbiertos={setComentariosAbiertos}
        setAbrirCita={setAbrirCita}
        manejarMeGusta={manejarMeGusta}
        manejarMirror={manejarMirror}
        manejarColeccionar={manejarColeccionar}
        setSeguirColeccionar={setSeguirColeccionar}
      />
      {comentariosAbiertos?.[menos ? indice - 1 : indice] && (
        <Comentario
          setMostrarPerfil={setMostrarPerfil}
          setOpcionAbierta={setOpcionAbierta}
          manejarArchivo={manejarArchivo}
          caretCoord={caretCoord}
          setCaretCoord={setCaretCoord}
          setPerfilesAbiertos={setPerfilesAbiertos}
          setMencionarPerfiles={setMencionarPerfiles}
          indice={indice}
          elementoTexto={elementoTexto}
          lensConectado={lensConectado}
          publicacionCargando={publicacionCargando}
          manejarPublicar={manejarPublicar}
          dict={dict}
          comentarioId={publicacion.id}
          mencionarPerfiles={mencionarPerfiles}
          perfilesAbiertos={perfilesAbiertos}
          comentarPublicar={comentarPublicar}
          setComentarPublicar={setComentarPublicar}
        />
      )}
    </div>
  );
}

export default Publicacion;
