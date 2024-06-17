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
    <div className="relative w-full h-full flex items-center justify-between flex flex-col gap-5">
      <div className="relative w-full h-full flex flex-row justify-center items-start gap-3">
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
        <div className="relative w-full h-fit flex items-center justify-start flex-col font-vcr text-black">
          <div className="relative w-fit h-fit flex items-center justify-center">
            {articulos?.[articuloIndice]?.titulo}
          </div>
          <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 cursor-pointer">
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
          <div className="relative w-fit h-fit flex items-center justify-center">
            {articulos?.[articuloIndice]?.descripcion}
          </div>
          <div
            className="relative cursor-pointer active:scale-95 w-3/4 h-60 flex items-center justify-center"
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
              objectFit="cover"
            />
          </div>
          <div className="relative w-fit h-fit flex flex-row items-center justify-center">
            <div className="relative w-fit h-fit flex items-center justify-center">
              {articulos?.[articuloIndice]?.tokenesMinteados?.length} /{" "}
              {articulos?.[articuloIndice]?.cantidad}
            </div>
            <div className="relative w-fit h-fit flex flex-col items-center justify-center">
              <div className="relative w-fit justify-center items-center flex flex-row gap-1">
                {ACCEPTED_TOKENS_AMOY?.filter((moneda) =>
                  (articuloSeleccionado?.[articuloIndice]?.elemento as Coleccion)?.tokenes
                    ?.map((i) => i.toLowerCase())
                    ?.includes(moneda[2]?.toLowerCase())
                )?.map((moneda: string[], indice: number) => {
                  return (
                    <div
                      className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                        articuloSeleccionado?.[articuloIndice]?.token ===
                        moneda[2]
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                      key={indice}
                      onClick={() =>
                        setArticuloSeleccionado((prev) => {
                          const arr = [...prev];

                          arr[articuloIndice] = {
                            ...arr[articuloIndice],
                            token: moneda[2],
                          };

                          return arr;
                        })
                      }
                    >
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/${moneda[0]}`}
                        className="flex rounded-full"
                        draggable={false}
                        width={30}
                        height={35}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {`${Number(
                  (
                    articulos?.[articuloIndice]?.precio /
                    Number(
                      datosOraculos?.find(
                        (oraculo) =>
                          oraculo.currency?.toLowerCase() ===
                          articuloSeleccionado[
                            articuloIndice
                          ]?.token?.toLowerCase()
                      )?.rate
                    )
                  )?.toFixed(3)
                )} ${
                  ACCEPTED_TOKENS_AMOY?.find(
                    (moneda) =>
                      moneda[2]?.toLowerCase() ===
                      articuloSeleccionado?.[
                        articuloIndice
                      ]?.token?.toLowerCase()
                  )?.[1]
                }`}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-fit h-full items-start justify-start overflow-y-scroll flex min-w-fit">
          <div className="relative w-fit h-fit items-start justify-start flex flex-col gap-2">
            {articulos?.map((el, indice) => {
              return (
                <div
                  key={indice}
                  className={`relative w-20 h-20 rounded-sm border border-white cursor-pointer ${
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Botones
        dict={dict}
        indice={articuloIndice}
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
      />
    </div>
  );
};

export default Ropas;
