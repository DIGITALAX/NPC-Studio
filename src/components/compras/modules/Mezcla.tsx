import { FunctionComponent } from "react";
import { Mezcla as MezclaTipo, MezclaProps } from "../types/compras.types";
import Botones from "./Botones";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";

const Mezcla: FunctionComponent<MezclaProps> = ({
  setCarrito,
  carritoCargando,
  articuloSeleccionado,
  articulos,
  dict,
  setVerImagen,
  setArticuloSeleccionado,
}): JSX.Element => {
  console.log({ articuloSeleccionado });
  return (
    <div className="relative w-full h-fit flex items-start justify-center gap-4 flex-col gap-3 font-vcr text-white text-xs">
      <div className="relative w-full h-fit flex items-start justify-start overflow-x-scroll">
        <div className="relative w-fit h-fit flex items-start justify-start flex-row gap-2">
          {articulos
            ?.filter((art) =>
              art?.tokenes
                ?.map((i) => i.toLowerCase())
                ?.includes(articuloSeleccionado[0].token)
            )
            ?.map((art, indice: number) => {
              return (
                <div
                  key={indice}
                  className="relative w-fit h-fit flex items-center justify-start flex-col gap-2"
                >
                  <div
                    onClick={() =>
                      setVerImagen({
                        abierto: true,
                        tipo: "image/png",
                        url: art?.imagen?.split("ipfs://")?.[1],
                      })
                    }
                    className="relative w-60 h-60 flex items-center justify-center cursor-pointer active:scale-95 border border-white rounded-sm"
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        art?.imagen?.split("ipfs://")?.[1]
                      }`}
                      draggable={false}
                      objectFit="cover"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="relative w-full h-fit flex items-center justify-center flex-col gap-3">
        <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
          {articulos?.length > 0 ? dict.Home.random : dict.Home.agotado}
        </div>
        <div className="relative w-fit justify-center items-center flex flex-row gap-1">
          {ACCEPTED_TOKENS_AMOY?.map((moneda: string[], indice: number) => {
            return (
              <div
                className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                  articuloSeleccionado?.[0]?.token === moneda[2]
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                key={indice}
                onClick={() =>
                  setArticuloSeleccionado((prev) => {
                    const arr = [...(prev || [])];

                    arr[0] = {
                      ...arr[0],
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
        {articulos?.length > 0 && (
          <div className="relative w-full h-fit flex items-center justify-center">
            <input
              type="range"
              min={
                articulos
                  ?.filter((art) =>
                    art?.tokenes
                      ?.map((i) => i.toLowerCase())
                      ?.includes(articuloSeleccionado[0].token)
                  )
                  .map((art) => Number(art.precio) / 10 ** 18)
                  .sort((a, b) => a - b)
                  .slice(0, 3)
                  .reduce((acc, val) => acc + val, 0)!
              }
              max={
                articulos
                  ?.filter((art) =>
                    art?.tokenes
                      ?.map((i) => i.toLowerCase())
                      ?.includes(articuloSeleccionado[0].token)
                  )
                  .map((art) => Number(art.precio) / 10 ** 18)
                  .reduce((acc, val) => acc + val, 0)!
              }
              onChange={(e) =>
                setArticuloSeleccionado((prev) => {
                  const arr = [...(prev || [])];

                  arr[0] = {
                    ...arr[0],
                    elemento: {
                      maximo: Number(e.target.value),
                    },
                  };

                  return arr;
                })
              }
              step="1"
              // value={
              //   (articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo
              // }
            />
          </div>
        )}
        <span className="relative w-fit h-fit flex items-center justify-center">
          {(articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo}
        </span>
      </div>
      {articulos?.length > 0 && (
        <Botones
          articulo={articuloSeleccionado?.[0]}
          setCarrito={setCarrito}
          carritoCargando={carritoCargando}
          dict={dict}
          indice={0}
        />
      )}
    </div>
  );
};

export default Mezcla;
