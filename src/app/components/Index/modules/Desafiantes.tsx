import { INFURA_GATEWAY } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import { DesafiantesProps } from "../types/index.type";
import useDesafiantes from "../hooks/useDesafiantes";
import Desafiante from "./Desafiante";
import DesafianteInfo from "./DesafianteInfo";

const Desafiantes: FunctionComponent<DesafiantesProps> = ({
  lang,
  dict,
  agentCollectionsCargando,
  agentCollections,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { desafiantes, setDesafiantes } = useDesafiantes(agentCollections);
  return (
    <>
      <div
        className={`text-white font-lib relative w-full h-fit flex items-start justify-start overflow-x-hidden ${
          lang == "en" ? "text-[8vw]" : "text-[6vw]"
        }`}
      >
        {dict.Home.chall}
      </div>
      <div className="relative w-full h-fit flex items-center justify-center flex-col lg:flex-row gap-6 xl:gap-14">
        <Desafiante
          indice={0}
          desafiantes={desafiantes}
          setDesafiantes={setDesafiantes}
          dict={dict}
          agentCollectionsCargando={agentCollectionsCargando}
          agentCollections={agentCollections}
          setMostrarPerfil={contexto?.setMostrarPerfil!}
        />
        <div className="relative w-fit h-fit flex items-center justify-center">
          <div className="relative flex w-20 h-20 items-center justify-center">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmXLzPsvnzcEnLgBWpkVFSCbG3gKUU2Sfewi6JoNzmvrTs`}
              layout="fill"
              objectFit="contain"
              draggable={false}
            />
          </div>
        </div>
        <Desafiante
          indice={1}
          desafiantes={desafiantes}
          setDesafiantes={setDesafiantes}
          dict={dict}
          agentCollectionsCargando={agentCollectionsCargando}
          agentCollections={agentCollections}
          setMostrarPerfil={contexto?.setMostrarPerfil!}
        />
      </div>
      <div className="rounded-sm p-2 sm:p-4 md:p-10 relative w-full h-fit sm:h-[60rem] border-4 border-flor bg-gris">
        <div
          className={`relative w-full h-full flex items-start justify-start border-2 border-[#35C3E6] bg-[#35C3E6] font-lib ${
            agentCollections?.length < 1 && "animate-pulse"
          }`}
        >
          {agentCollections?.length > 0 && (
            <div className="relative w-full h-fit sm:h-full flex flex-col sm:flex-row items-stretch justify-between gap-7 border-8 border-[#0000B0] bg-black p-3">
              <DesafianteInfo
                dict={dict}
                setMostrarPerfil={contexto?.setMostrarPerfil!}
                desafiante={desafiantes?.[0]}
                colorUno="#FFAA00"
                colorDos="#3274FF"
                escenas={contexto?.escenas || []}
                text="viol2"
                colorTres="#00FFFF"
                colorCuatro="#CC04FD"
              />
              <div className="relative w-full sm:w-2 h-2 sm:h-full bg-[#0000B0] flex"></div>
              <DesafianteInfo
                dict={dict}
                setMostrarPerfil={contexto?.setMostrarPerfil!}
                desafiante={desafiantes?.[1]}
                colorUno="#4B0099"
                colorDos="#FBFF24"
                escenas={contexto?.escenas || []}
                text="flor"
                colorTres="#C993FF"
                colorCuatro="#23DBAA"
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`relative mb-0 w-full h-fit flex items-center justify-end`}
      >
        <div className="relativew-full h-60 flex items-center justify-end">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmRAcBfJGebTPihDVgryhVUa3PtmtVEb4UMvbdqmwC3RUi`}
            layout="fill"
            objectFit="cover"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};

export default Desafiantes;
