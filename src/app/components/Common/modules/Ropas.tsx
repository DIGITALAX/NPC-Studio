import { FunctionComponent, JSX, useContext } from "react";
import Image from "next/legacy/image";
import Cumplimiento from "./Cumplimiento";
import { AutographType, Coleccion, RopasProps } from "../types/common.types";
import { ModalContext } from "@/app/providers";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import Botones from "./Botones";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import usePublicacion from "../hooks/usePublicacion";

const Ropas: FunctionComponent<RopasProps> = ({
  articuloSeleccionado,
  articulos,
  dict,
  articuloIndice,
  setArticuloIndice,
  setArticuloSeleccionado,
  setManejarMostrarArticulo,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
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

  const tokenes = articulos?.[articuloIndice]
    ? contexto?.carrito?.compras?.filter((car) => {
        if (car.tipo !== AutographType.Catalog) {
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
                        el?.imagenes?.[0]?.split("ipfs://")?.[1]
                      }`}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Cumplimiento
            cumplimiento={cumplimiento}
            setCumplimiento={setCumplimiento}
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
                  contexto?.setVerImagen({
                    abierto: true,
                    tipo: "png",
                    url: `${INFURA_GATEWAY}/ipfs/${
                      articulos?.[articuloIndice]?.imagenes?.[0]?.split(
                        "ipfs://"
                      )?.[1]
                    }`,
                  });
                }}
                layout="fill"
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/${
                  articulos?.[articuloIndice]?.imagenes?.[0]?.split(
                    "ipfs://"
                  )?.[1]
                }`}
                className="rounded-md cursor-pointer active:scale-95"
                objectFit="cover"
              />
              <div
                className="absolute bottom-2 left-2 w-full h-fit flex items-start justify-start flex-row gap-3 cursor-pointer active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  contexto?.setMostrarPerfil(
                    (
                      articuloSeleccionado?.[articuloIndice]
                        ?.elemento as Coleccion
                    )?.profile?.address
                  );
                }}
              >
                <div className="relative w-fit h-fit flex items-center justify-center">
                  <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 bg-black border border-rosa">
                    {(
                      articuloSeleccionado?.[articuloIndice]
                        ?.elemento as Coleccion
                    )?.profile?.metadata?.picture && (
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={handleProfilePicture(
                          (
                            articuloSeleccionado?.[articuloIndice]
                              ?.elemento as Coleccion
                          )?.profile?.metadata?.picture
                        )}
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
                    )?.profile?.username?.localName
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
      </div>
    </div>
  );
};

export default Ropas;
