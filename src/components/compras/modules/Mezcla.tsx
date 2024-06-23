import { FunctionComponent } from "react";
import { Mezcla as MezclaTipo, MezclaProps } from "../types/compras.types";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";
import createProfilePicture from "@/lib/helpers/createProfilePicture";

const Mezcla: FunctionComponent<MezclaProps> = ({
  setCarrito,
  articuloSeleccionado,
  articulos,
  dict,
  setVerImagen,
  setArticuloSeleccionado,
}): JSX.Element => {
  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio}
      </div>
      <div className="relative w-full h-fit flex items-start justify-start overflow-x-scroll">
        <div className="relative w-fit h-fit flex items-start justify-start flex-row gap-2">
          {articulos
            ?.filter((a) =>
              a?.tokenes
                ?.map((i) => i.toLowerCase())
                ?.includes(articuloSeleccionado?.[0]?.token.toLowerCase())
            )
            ?.slice(0, 5) 
            ?.filter(() => {
              const preciosSeleccionados = articulos
                ?.filter((art) =>
                  art?.tokenes
                    ?.map((i) => i.toLowerCase())
                    ?.includes(articuloSeleccionado?.[0]?.token.toLowerCase())
                )
                ?.map((art) => Number(art.precio) / 10 ** 18)
                ?.sort((a, b) => a - b)
                ?.slice(0, 5); 

              const sumaPrecios = preciosSeleccionados?.reduce(
                (acc, val) => acc + val,
                0
              );
              return (
                sumaPrecios <=
                (articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo
              );
            })
            ?.map((art, indice: number) => {
              const pfp = createProfilePicture(art?.profile?.metadata?.picture);
              return (
                <div
                  key={indice}
                  className="relative w-fit h-fit flex flex-col gap-2 items-center justify-start flex-col gap-2"
                >
                  <div
                    onClick={() =>
                      setVerImagen({
                        abierto: true,
                        tipo: "png",
                        url: `${INFURA_GATEWAY}/ipfs/${
                          art?.imagen?.split("ipfs://")?.[1]
                        }`,
                      })
                    }
                    className="relative w-60 h-60 flex items-center justify-center cursor-pointer active:scale-95 border border-white rounded-md"
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        art?.imagen?.split("ipfs://")?.[1]
                      }`}
                      draggable={false}
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 w-fit h-fit flex items-center justify-center">
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
                </div>
              );
            })}
        </div>
      </div>
      <div className="relative w-full h-fit flex items-center justify-center text-lg break-words">
        {articulos?.length > 0 ? dict.Home.random : dict.Home.agotado}
      </div>
      <div className="relative w-full h-fit flex flex-row items-center justify-between">
        <div className="relative items-start justify-center flex flex-col gap-2 w-48 h-fit">
          <div className="relative w-fit h-fit flex flex-row gap-2 items-start justify-start text-base">
            <div className="relative w-fit h-fit flex items-start justify-start">
              {dict.Home.precioMax}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start">
              {(articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo}
            </div>
          </div>
          {articulos?.length > 0 && (
            <div className="relative w-full h-fit flex items-center justify-center">
              <input
                type="range"
                key={articuloSeleccionado?.[0]?.token}
                min={
                  articulos
                    ?.filter((art) =>
                      art?.tokenes
                        ?.map((i) => i.toLowerCase())
                        ?.includes(
                          articuloSeleccionado?.[0]?.token.toLowerCase()
                        )
                    )
                    ?.map((art) => Number(art.precio) / 10 ** 18)
                    ?.slice(0, 5)
                    ?.reduce((acc, val) => acc + val, 0) || 0
                }
                max={
                  articulos
                    ?.filter((art) =>
                      art?.tokenes
                        ?.map((i) => i.toLowerCase())
                        ?.includes(
                          articuloSeleccionado?.[0]?.token.toLowerCase()
                        )
                    )
                    ?.map((art) => Number(art.precio) / 10 ** 18)
                    ?.sort((a, b) => a - b)
                    ?.slice(-5)
                    ?.reduce((acc, val) => acc + val, 0) || 0
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
                value={
                  (articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo
                }
              />
            </div>
          )}
        </div>

        <div className="relative w-fit h-fit justify-start items-start flex flex-row gap-1">
          {ACCEPTED_TOKENS_AMOY?.map((moneda: string[], indiceTwo: number) => {
            return (
              <div
                className={`relative w-7 h-7 rounded-full flex items-center cursor-pointer active:scale-95 ${
                  articuloSeleccionado?.[0]?.token === moneda[2]
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                key={indiceTwo}
                onClick={() =>
                  setArticuloSeleccionado((prev) => {
                    const arr = [...(prev || [])];

                    arr[0] = {
                      ...arr[0],
                      token: moneda[2],
                      elemento: {
                        maximo: Number(
                          Number(
                            articulos
                              ?.filter((art) =>
                                art?.tokenes
                                  ?.map((i) => i.toLowerCase())
                                  ?.includes(moneda[2].toLowerCase())
                              )
                              ?.map((art) => Number(art.precio) / 10 ** 18)
                              ?.sort((a, b) => a - b)
                              ?.slice(-5)
                              ?.reduce((acc, val) => acc + val, 0)
                          ).toFixed(0)
                        ),
                      },
                    };

                    return arr;
                  })
                }
              >
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/${moneda[0]}`}
                  className="flex rounded-full"
                  draggable={false}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative w-full h-fit flex items-center justify-center">
        <div className="relative w-fit h-full flex items-center justify-center">
          <div
            className="relative bg-black rounded-full h-fit w-fit cursor-pointer active:scale-95 border border-white flex items-center justify-center hover:opacity-70"
            title={dict.Home.addCart}
            onClick={() =>
              setCarrito((prev) => {
                let compras = prev.compras;

                const el = prev.compras.find(
                  (el) =>
                    el.elemento == articuloSeleccionado?.[0]?.elemento &&
                    el.token == articuloSeleccionado?.[0]?.token &&
                    el.tamano == articuloSeleccionado?.[0]?.tamano &&
                    el.color == articuloSeleccionado?.[0]?.color
                );

                if (el) {
                  compras = prev.compras.map((el) =>
                    el.elemento == articuloSeleccionado?.[0]?.elemento
                      ? {
                          ...el,
                          cantidad: el.cantidad + 1,
                        }
                      : el
                  );
                } else {
                  compras = [...prev.compras, articuloSeleccionado?.[0]];
                }

                return {
                  ...prev,
                  compras,
                };
              })
            }
          >
            <div className="relative rounded-full p-2 h-10 w-10  flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmeUvktErG1LkwLYRZjU7FqWj9nCXkHcMoy7kpfwTe3WSM`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mezcla;
