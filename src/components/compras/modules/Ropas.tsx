import { FunctionComponent } from "react";
import { RopasProps } from "../types/compras.types";
import Botones from "./Botones";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import Cumplimiento from "./Cumplimiento";
import { AutographType, Coleccion } from "@/components/game/types/game.types";
import createProfilePicture from "@/lib/helpers/createProfilePicture";

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
  setMostrarPerfil,
}): JSX.Element => {
  const pfp = createProfilePicture(
    articulos?.[articuloIndice]?.profile?.metadata?.picture
  );
  const tokenes = articulos?.[articuloIndice]
    ? carrito?.compras?.filter((car) => {
        if (car.tipo == AutographType.Mix) {
          if (
            articulos?.[articuloIndice]?.tokenes?.includes(car.token as any) &&
            Number(articulos?.[articuloIndice]?.cantidad) -
              Number(articulos?.[articuloIndice]?.tokenesMinteados?.length) >
              2
          ) {
            return true;
          } else {
            return false;
          }
        } else if (car.tipo !== AutographType.Catalog) {
          const { profile: _, ...elSinProfile } = car.elemento as any;
          const { profile: __, ...artSinProfile } = articulos?.[articuloIndice];
          return JSON.stringify(elSinProfile) === JSON.stringify(artSinProfile);
        }
      })
    : [];

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
      <div className="relative w-full md:h-[30rem] flex flex-row justify-between items-start gap-5 h-fit md:flex-nowrap flex-wrap">
        <div className="relative w-full h-full flex flex-col justify-between items-start gap-6">
          <div className="relative w-full h-full items-start justify-start overflow-y-scroll flex min-w-fit min-h-[12rem]">
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
            color={articuloSeleccionado?.[articuloIndice]?.color || "black"}
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
            tamano={articuloSeleccionado?.[articuloIndice]?.tamano || "m"}
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
            <div className="relative w-full h-80 flex items-center justify-center rounded-md border border-rosa">
              <Image
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setVerImagen({
                    abierto: true,
                    tipo: "png",
                    url: `${INFURA_GATEWAY}/ipfs/${
                      articulos?.[articuloIndice]?.imagen?.split("ipfs://")?.[1]
                    }`,
                  });
                }}
                layout="fill"
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/${
                  articulos?.[articuloIndice]?.imagen?.split("ipfs://")?.[1]
                }`}
                className="rounded-md cursor-pointer active:scale-95"
                objectFit="cover"
              />
              <div
                className="absolute bottom-2 left-2 w-full h-fit flex items-start justify-start flex-row gap-3 cursor-pointer active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setMostrarPerfil(
                    (
                      articuloSeleccionado?.[articuloIndice]
                        ?.elemento as Coleccion
                    )?.profile?.id
                  );
                }}
              >
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
                <div className="relative w-fit h-fit flex items-center justify-center text-base break-all">
                  {
                    (
                      articuloSeleccionado?.[articuloIndice]
                        ?.elemento as Coleccion
                    )?.profile?.handle?.suggestedFormatted?.localName
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-fit h-full flex items-start justify-between flex-col gap-3">
            <div className="relative w-fit h-fit flex items-start justify-start text-lg">
              {articulos?.[articuloIndice]?.titulo}
            </div>
            <Botones
              dict={dict}
              minteado={articulos?.[articuloIndice]?.tokenesMinteados?.length || 0}
              precio={articulos?.[articuloIndice]?.precio}
              datosOraculos={datosOraculos}
              setArticuloSeleccionado={setArticuloSeleccionado}
              cantidad={articulos?.[articuloIndice]?.cantidad}
              agotado={
                Number(articulos?.[articuloIndice]?.cantidad) -
                  Number(
                    articulos?.[articuloIndice]?.tokenesMinteados?.length
                  ) -
                  tokenes?.reduce(
                    (acc, val) => acc + Number(val.cantidad),
                    0
                  ) <=
                0
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
