import { FunctionComponent } from "react";
import { RopasProps } from "../types/compras.types";
import Botones from "./Botones";
import Image from "next/legacy/image";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";
import Cumplimiento from "./Cumplimiento";
import { Coleccion } from "@/components/game/types/game.types";

const Ropas: FunctionComponent<RopasProps> = ({
  setCarrito,
  comprarPublicacion,
  carritoCargando,
  articuloSeleccionado,
  articulos,
  dict,
  articuloIndice,
  setArticuloIndice,
  setVerImagen,
  setArticuloSeleccionado,
  aprobarCargando,
  aprobarGastos,
  gastosAprobados,
  datosOraculos,
  carrito,
  setCumplimiento,
  cumplimiento,
}): JSX.Element => {
  const pfp = createProfilePicture(
    articulos?.[articuloIndice]?.profile?.metadata?.picture
  );
  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-center justify-between font-con text-sm flex-row">
        <div className="relative w-full h-fit text-left flex items-center justify-start text-white font-bit text-sm">
          {dict.Home.npcStudio}
        </div>
        <div className="relative w-full h-fit text-right flex items-center justify-end font-bit text-xs">
          {dict.Home.carrito}
        </div>
      </div>
      <div className="relative w-full h-[30rem] flex flex-row justify-between items-start gap-5">
        <div className="relative w-full h-full flex flex-col justify-between items-start gap-6">
          <div className="relative w-full h-full items-start justify-start overflow-y-scroll flex min-w-fit">
            <div className="relative w-full h-fit items-start justify-start flex grid grid-cols-3 gap-2">
              {articulos?.map((el, indice) => {
                return (
                  <div
                    key={indice}
                    className={`relative w-full h-40 rounded-md border border-rosa cursor-pointer ${
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
          <Cumplimiento
            setCumplimiento={setCumplimiento}
            cumplimiento={cumplimiento}
            dict={dict}
            color={articuloSeleccionado?.[articuloIndice]?.color || ""}
            setColor={(color) =>
              setArticuloSeleccionado((prev) => {
                const arr = [...prev];

                arr[articuloIndice] = {
                  ...arr[articuloIndice],
                  color,
                };

                return arr;
              })
            }
            tamano={articuloSeleccionado?.[articuloIndice]?.tamano || ""}
            setTamano={(tamano) =>
              setArticuloSeleccionado((prev) => {
                const arr = [...prev];

                arr[articuloIndice] = {
                  ...arr[articuloIndice],
                  tamano,
                };

                return arr;
              })
            }
          />
        </div>
        <div className="relative w-full h-full flex flex-col justify-between items-start gap-3 grow">
          <div className="relative w-full h-fit flex items-center justify-center">
            <div
              className="relative cursor-pointer active:scale-95 w-full h-80 flex items-center justify-center rounded-md border border-rosa"
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
          </div>
          <div className="relative w-fit h-full flex items-start justify-between flex-col gap-3">
            <div className="relative w-fit h-fit flex items-start justify-start text-lg">
              {articulos?.[articuloIndice]?.titulo}
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
      </div>
    </div>
  );
};

export default Ropas;
