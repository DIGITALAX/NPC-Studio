import { FunctionComponent, JSX, useContext } from "react";
import Botones from "./Botones";
import Image from "next/legacy/image";
import {
  AutografoProps,
  AutographType,
  Coleccion,
} from "../types/common.types";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";
import usePublicacion from "../hooks/usePublicacion";

const Autografo: FunctionComponent<AutografoProps> = ({
  dict,
  articuloSeleccionado,
  articulos,
  articuloIndice,
  setArticuloIndice,
  setArticuloSeleccionado,
  setManejarMostrarArticulo,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const tokenes = articulos?.[articuloIndice]
    ? contexto?.carrito?.compras?.filter((car) => {
        if (car.tipo !== AutographType.Catalog) {
          const { profile: _, ...elSinProfile } = car.elemento as any;
          const { profile: __, ...artSinProfile } = articulos?.[articuloIndice];
          return JSON.stringify(elSinProfile) === JSON.stringify(artSinProfile);
        }
      })
    : [];

  const {
    depositFunds,
    depositLoading,
    deposited,
    comprarPublicacion,
    publicacionCargando,
    cumplimiento,
    setCumplimiento,
  } = usePublicacion(
    dict,
    setManejarMostrarArticulo,
    articuloSeleccionado,
    articuloIndice
  );

  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio} {dict.Home.onChain}
      </div>
      <div className="relative w-full h-full flex flex-row justify-between items-start gap-10 md:gap-5 lg:flex-nowrap flex-wrap">
        <div className="relative w-full h-fit md:h-80 flex flex-row justify-between items-start gap-3 md:flex-nowrap flex-wrap">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="relative cursor-pointer active:scale-95 w-full md:w-60 h-80 md:h-full flex items-center justify-center rounded-md border border-rosa"
              onClick={() =>
                contexto?.setVerImagen({
                  abierto: true,
                  tipo: "png",
                  url: `${INFURA_GATEWAY}/ipfs/${
                    articulos?.[articuloIndice]?.imagenes?.[0]?.split(
                      "ipfs://"
                    )?.[1]
                  }`,
                })
              }
            >
              <Image
                layout="fill"
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/${
                  articulos?.[articuloIndice]?.imagenes?.[0]?.split(
                    "ipfs://"
                  )?.[1]
                }`}
                className="rounded-md"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="relative w-fit h-full flex items-start justify-between flex-col gap-3">
            <div className="relative w-fit h-fit flex items-start justify-start text-lg">
              {articulos?.[articuloIndice]?.titulo}
            </div>
            <div className="relative w-fit h-full grow flex items-start justify-start overflow-y-scroll">
              <div className="relative w-fit h-fit flex items-start justify-start md:text-base text-xs  text-left">
                {articulos?.[articuloIndice]?.descripcion}
              </div>
            </div>
            <Botones
              dict={dict}
              minteado={
                articulos?.[articuloIndice]?.tokenesMinteados?.length || 0
              }
              precio={articulos?.[articuloIndice]?.precio}
              setArticuloSeleccionado={setArticuloSeleccionado}
              cantidad={articulos?.[articuloIndice]?.cantidad}
              agotado={
                Number(articulos?.[articuloIndice]?.cantidad) -
                  Number(
                    articulos?.[articuloIndice]?.tokenesMinteados?.length
                  ) -
                  Number(
                    tokenes?.reduce((acc, val) => acc + Number(val.cantidad), 0)
                  ) <=
                0
              }
              comprarPublicacion={comprarPublicacion}
              carritoCargando={publicacionCargando}
              articulo={articuloSeleccionado?.[articuloIndice]}
              indice={articuloIndice}
              depositFunds={depositFunds}
              depositLoading={depositLoading}
              deposited={deposited}
            />
          </div>
        </div>
        <div className="relative w-full h-full flex flex-col justify-start items-start gap-3">
          <div
            className="relative w-full h-fit flex items-start justify-start flex-row gap-3 cursor-pointer active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              contexto?.setMostrarPerfil(
                (articuloSeleccionado?.[articuloIndice]?.elemento as Coleccion)
                  ?.profile?.address
              );
            }}
          >
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 bg-black border border-rosa">
                {(articuloSeleccionado?.[articuloIndice]?.elemento as Coleccion)
                  ?.profile?.metadata?.picture && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={`${INFURA_GATEWAY}/ipfs/${
                      (
                        articuloSeleccionado?.[articuloIndice]
                          ?.elemento as Coleccion
                      )?.profile?.metadata?.picture
                    }`}
                    draggable={false}
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center text-base break-all">
              {
                (articuloSeleccionado?.[articuloIndice]?.elemento as Coleccion)
                  ?.profile?.username?.localName
              }
            </div>
          </div>
          <div className="relative w-full h-full items-start justify-start overflow-y-scroll flex">
            <div className="relative w-full h-fit items-start justify-start grid grid-cols-2 gap-6">
              {articulos?.map((el, indice) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-full h-28 md:h-20 rounded-md cursor-pointer border border-rosa ${
                      indice == articuloIndice && "opacity-70"
                    }`}
                    onClick={() => setArticuloIndice(indice)}
                  >
                    <Image
                      draggable={false}
                      objectFit="cover"
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        el?.imagenes?.[0]?.split("ipfs://")?.[1]
                      }`}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autografo;
