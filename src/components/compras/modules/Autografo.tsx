import { FunctionComponent } from "react";
import { AutografoProps } from "../types/compras.types";
import Botones from "./Botones";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { Coleccion } from "@/components/game/types/game.types";

const Autografo: FunctionComponent<AutografoProps> = ({
  dict,
  comprarPublicacion,
  setCarrito,
  carritoCargando,
  articuloSeleccionado,
  articulos,
  articuloIndice,
  setArticuloIndice,
  setVerImagen,
  setArticuloSeleccionado,
  aprobarCargando,
  aprobarGastos,
  gastosAprobados,
  datosOraculos,
  carrito,
}): JSX.Element => {
  const pfp = createProfilePicture(
    articulos?.[articuloIndice]?.profile?.metadata?.picture
  );

  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio} {dict.Home.onChain}
      </div>
      <div className="relative w-full h-full flex flex-row justify-between items-start gap-5">
        <div className="relative w-full h-80 flex flex-row justify-between items-start gap-3">
          <div
            className="relative cursor-pointer active:scale-95 w-60 h-full flex items-center justify-center rounded-md border border-rosa"
            onClick={() =>
              setVerImagen({
                abierto: true,
                tipo: "png",
                url: `${INFURA_GATEWAY}/ipfs/${
                  articulos?.[articuloIndice]?.imagen?.split("ipfs://")?.[1]
                }`,
              })
            }
          >
            <Image
              layout="fill"
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/${
                articulos?.[articuloIndice]?.imagen?.split("ipfs://")?.[1]
              }`}
              className="rounded-md"
              objectFit="cover"
            />
          </div>
          <div className="relative w-fit h-full flex items-start justify-between flex-col gap-3">
            <div className="relative w-fit h-fit flex items-start justify-start text-lg">
              {articulos?.[articuloIndice]?.titulo}
            </div>
            <div className="relative w-fit h-full grow flex items-start justify-start overflow-y-scroll">
              <div className="relative w-fit h-fit flex items-start justify-start  text-left">
                {articulos?.[articuloIndice]?.descripcion}
              </div>
            </div>
            <Botones
              dict={dict}
              minteado={articulos?.[articuloIndice]?.tokenesMinteados?.length}
              precio={articulos?.[articuloIndice]?.precio}
              datosOraculos={datosOraculos}
              setArticuloSeleccionado={setArticuloSeleccionado}
              cantidad={articulos?.[articuloIndice]?.cantidad}
              carrito={carrito}
              agotado={
                Number(articulos?.[articuloIndice]?.tokenesMinteados?.length) +
                  Number(articuloSeleccionado?.[articuloIndice]?.cantidad) +
                  carrito?.compras
                    ?.filter(
                      (el) =>
                        JSON.stringify(el.elemento) ==
                        JSON.stringify(articulos?.[articuloIndice])
                    )
                    ?.reduce((sum, el) => sum + el.cantidad, 0) >
                articulos?.[articuloIndice]?.cantidad
              }
              comprarPublicacion={comprarPublicacion}
              setCarrito={setCarrito}
              carritoCargando={carritoCargando}
              articulo={articuloSeleccionado?.[articuloIndice]}
              aprobarCargando={aprobarCargando}
              aprobarGastos={aprobarGastos}
              gastosAprobados={gastosAprobados?.[articuloIndice]}
              indice={articuloIndice}
            />
          </div>
        </div>
        <div className="relative w-full h-full flex flex-col justify-start items-start gap-3">
          <div className="relative w-full h-fit flex items-start justify-start flex-row gap-3">
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 bg-black border border-rosa">
                {pfp && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={pfp}
                    draggable={false}
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center text-base">
              {
                (articuloSeleccionado?.[articuloIndice]?.elemento as Coleccion)
                  ?.profile?.handle?.suggestedFormatted?.localName
              }
            </div>
          </div>
          <div className="relative w-full h-full items-start justify-start overflow-y-scroll flex">
            <div className="relative w-full h-fit items-start justify-start grid grid-cols-2 gap-6">
              {articulos?.map((el, indice) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-full h-20 rounded-md cursor-pointer border border-rosa ${
                      indice == articuloIndice && "opacity-70"
                    }`}
                    onClick={() => setArticuloIndice(indice)}
                  >
                    <Image
                      draggable={false}
                      objectFit="cover"
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        el?.imagen?.split("ipfs://")?.[1]
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