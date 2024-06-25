import { FunctionComponent } from "react";
import { Mezcla as MezclaTipo, MezclaProps } from "../types/compras.types";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { AutographType } from "@/components/game/types/game.types";

const Mezcla: FunctionComponent<MezclaProps> = ({
  setCarrito,
  articuloSeleccionado,
  articulos,
  dict,
  setVerImagen,
  setArticuloSeleccionado,
  carrito,
}): JSX.Element => {
  const articulosTokenes = articulos?.filter((art) => {
    const tokenesArticulo = art?.tokenes?.map((i) => i.toLowerCase());
    const tokenSeleccionado = articuloSeleccionado?.[0]?.token.toLowerCase();
    const tokenValido = tokenesArticulo?.includes(tokenSeleccionado);
    return tokenValido;
  });

  const articulosFiltrados = articulosTokenes?.filter((filt) => {
    const tokenes = carrito?.compras?.filter((car) => {
      if (car.tipo == AutographType.Mix) {
        const mezclaSimulada = articulos?.filter((art) => {
          const tokenesArticulo = art?.tokenes?.map((i) => i.toLowerCase());
          const tokenSeleccionado = car.token.toLowerCase();
          const tokenValido = tokenesArticulo?.includes(tokenSeleccionado);

          const cantidadDisponible =
            Number(art.cantidad) -
            Number(art.tokenesMinteados?.length) -
            carrito?.compras
              ?.filter((el) => {
                const { profile: _, ...elSinProfile } = el.elemento as any;
                const { profile: __, ...artSinProfile } = art;

                return (
                  JSON.stringify(elSinProfile) === JSON.stringify(artSinProfile)
                );
              })
              ?.reduce((acc, val) => acc + Number(val.cantidad), 0);

          return tokenValido && cantidadDisponible > 0;
        });

        const contenidos = mezclaSimulada?.filter((mezcla) => {
          const { profile: _, ...elSinProfile } = filt;
          const { profile: __, ...artSinProfile } = mezcla;

          return JSON.stringify(elSinProfile) === JSON.stringify(artSinProfile);
        });

        return contenidos?.length > 0;
      } else if (car.tipo !== AutographType.Catalog) {
        const { profile: _, ...elSinProfile } = car.elemento as any;
        const { profile: __, ...artSinProfile } = filt;

        return JSON.stringify(elSinProfile) === JSON.stringify(artSinProfile);
      }
    });

    return (
      Number(filt.cantidad) -
      Number(filt.tokenesMinteados?.length) -
      tokenes?.reduce((acc, val) => acc + Number(val.cantidad), 0)
    );
  });


  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio}
      </div>
      <div className="relative w-full h-fit flex items-start justify-start overflow-x-scroll">
        <div className="relative w-fit h-fit flex items-start justify-start flex-row gap-2">
          {articulosFiltrados?.slice(0, 5)?.filter(() => {
            const preciosSeleccionados = articulosFiltrados
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
          })?.length < 3 ? (
            <div className="relative w-full h-fit flex gap-2 items-center justify-center text-center gap-2">
              {dict.Home.noMix}
            </div>
          ) : (
            articulosFiltrados
              ?.slice(0, 5)
              ?.filter(() => {
                const preciosSeleccionados = articulosFiltrados
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
                const pfp = createProfilePicture(
                  art?.profile?.metadata?.picture
                );
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
                      className="relative h-20 w-20 sm:w-36 sm:h-36 tab:w-60 tab:h-60 flex items-center justify-center cursor-pointer active:scale-95 border border-white rounded-md"
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
              })
          )}
        </div>
      </div>
      {articulosFiltrados?.slice(0, 5)?.filter(() => {
        const preciosSeleccionados = articulosFiltrados
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
      })?.length > 2 && (
        <div className="relative w-full h-fit flex items-center justify-center text-sm sm:text-lg break-words sm:text-left text-center">
          {dict.Home.random}
        </div>
      )}
      <div className="relative w-full h-fit flex flex-row items-center justify-center sm:justify-between flex-wrap gap-6">
        <div className="relative items-center sm:items-start justify-center flex flex-col gap-2 w-48 h-fit">
          <div className="relative w-fit h-fit flex flex-row gap-2 items-center sm:items-start justify-center sm:justify-start text-xs sm:text-base">
            <div className="relative w-fit h-fit flex items-center sm:items-start justify-center sm:justify-start">
              {dict.Home.precioMax}
            </div>
            {articulos?.length > 2 && (
              <div className="relative w-fit h-fit flex items-center sm:items-start justify-center sm:justify-start">
                {(articuloSeleccionado?.[0]?.elemento as MezclaTipo)?.maximo}
              </div>
            )}
          </div>
          {articulos?.length > 2 && (
            <div className="relative w-full h-fit flex items-center justify-center">
              <input
                type="range"
                key={articuloSeleccionado?.[0]?.token}
                min={
                  (articulosFiltrados?.map(
                    (art) => Number(art.precio) / 10 ** 18
                  ).length <= 3
                    ? articulosFiltrados?.map(
                        (art) => Number(art.precio) / 10 ** 18
                      ) || []
                    : (
                        articulosFiltrados?.map(
                          (art) => Number(art.precio) / 10 ** 18
                        ) || []
                      )
                        .sort((a, b) => a - b)
                        .slice(0, 5)
                  )?.reduce((acc, val) => acc + val, 0) + 100 || 0
                }
                max={
                  (articulosFiltrados?.map(
                    (art) => Number(art.precio) / 10 ** 18
                  ).length <= 3
                    ? articulosFiltrados?.map(
                        (art) => Number(art.precio) / 10 ** 18
                      ) || []
                    : (
                        articulosFiltrados?.map(
                          (art) => Number(art.precio) / 10 ** 18
                        ) || []
                      )
                        .sort((a, b) => a - b)
                        .slice(-5)
                  ).reduce((acc, val) => acc + val, 0) + 100
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

        <div className="relative w-fit h-fit items-center sm:justify-start justify-center sm:items-start flex flex-row gap-1">
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
                            (
                              articulosFiltrados?.map(
                                (art) => Number(art.precio) / 10 ** 18
                              ) || []
                            ).length <= 3
                              ? (
                                  articulosFiltrados?.map(
                                    (art) => Number(art.precio) / 10 ** 18
                                  ) || []
                                ).reduce((acc, val) => acc + val, 0) + 100
                              : (
                                  articulosFiltrados?.map(
                                    (art) => Number(art.precio) / 10 ** 18
                                  ) || []
                                )
                                  .sort((a, b) => a - b)
                                  .slice(-5)
                                  .reduce((acc, val) => acc + val, 0) + 100
                          ).toFixed()
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
      <div className="relative w-full h-fit flex items-center justify-center lg:pt-0 pt-6">
        <div className="relative w-fit h-full flex items-center justify-center">
          <div
            className={`relative bg-black rounded-full h-fit w-fit  border border-white flex items-center justify-center  ${
              articulosFiltrados?.length > 2 &&
              "hover:opacity-70 cursor-pointer active:scale-95"
            }`}
            title={dict.Home.addCart}
            onClick={() =>
              articulosFiltrados?.length > 2 &&
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
