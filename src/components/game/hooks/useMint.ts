import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { AutographType, Coleccion, Escena, Galeria } from "../types/game.types";
import { polygon } from "viem/chains";
import {
  AUTOGRAPH_COLLECTION,
  IDIOMAS,
  INFURA_GATEWAY,
  autographTypeToNumber,
  numberToAutograph,
} from "@/lib/constants";
import AutographCollection from "./../../../../abis/AutographCollection.json";
import convertirArchivo from "@/lib/helpers/convertirArchivo";
import { getGalleries } from "../../../../graphql/autograph/queries/getGalleries";
import { Notificacion } from "@/components/common/types/common.types";
import { Profile } from "../../../../graphql/generated";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient,
  address: `0x${string}` | undefined,
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void,
  lensConectado: Profile | undefined,
  escenas: Escena[],
  coleccionActual: Coleccion,
  setColeccionActual: (e: SetStateAction<Coleccion>) => void
) => {
  const [ahorrarCargando, setAhorrarCargando] = useState<boolean>(false);
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [cargandoGalerias, setCargandoGalerias] = useState<boolean>(false);
  const [cargandoBorrar, setCargandoBorrar] = useState<boolean[]>([]);
  const [indiceImagen, setIndiceImagen] = useState<number>(0);
  const [todasLasGalerias, setTodasLasGalerias] = useState<Galeria[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [mostrarGalerias, setMostrarGalerias] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<{
    npcsAbiertos: boolean;
    idiomasAbiertos: boolean;
    tiposAbiertos: boolean;
    npcsTexto: string;
    idiomasTexto: string;
  }>({
    npcsAbiertos: false,
    idiomasAbiertos: false,
    tiposAbiertos: false,
    npcsTexto: "",
    idiomasTexto: "",
  });

  const llamarTodasLasGalerias = async () => {
    setCargandoGalerias(true);
    try {
      const datos = await getGalleries(address!);

      const gals = await Promise.all(
        datos?.data?.galleryCreateds.map(async (gal: any) => {
          let colecciones: Coleccion[] = new Array(
            gal.collectionIds.length
          ).fill("");

          await Promise.all(
            gal.collections.map(async (col: any, indice: number) => {
              if (!col.collectionMetadata) {
                const cadena = await fetch(
                  `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
                );
                col.collectionMetadata = await cadena.json();
              }

              colecciones[indice] = {
                galeria: col.collectionMetadata?.gallery,
                imagen: col.collectionMetadata?.image,
                id: col.collectionId,
                cantidad: col.amount,
                tokenes: col.acceptedTokens,
                tokenesMinteados: col.mintedTokens,
                coleccionId: Number(col.collectionId),
                galeriaId: gal.galleryId,
                precio: col.price,
                tipo: numberToAutograph[Number(col.type)] as AutographType,
                titulo: col.collectionMetadata?.title,
                descripcion: col.collectionMetadata?.description,
                etiquetas: col.collectionMetadata?.tags,
                npcIdiomas: col.collectionMetadata?.locales,
                npcInstrucciones: col.collectionMetadata?.instructions,
                npcs: col.collectionMetadata?.npcs,
                profile: undefined,
                imagenes: col.collectionMetadata?.images,
                profileIds: [],
                pubIds: [],
                colors: col.collectionMetadata?.colors,
              };
            })
          );

          return {
            galleryId: gal.galleryId,
            collectionIds: gal.collectionIds,
            colecciones,
          };
        })
      );

      setTodasLasGalerias(gals);
      setCargandoBorrar(
        Array.from({ length: todasLasGalerias.length }, () => false)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoGalerias(false);
  };

  const manejarMintear = async () => {
    try {
      if (
        colecciones?.filter((el) => el.titulo.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.descripcion.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.imagen.trim() == "").length > 0 ||
        colecciones?.filter((el) => el.tokenes.length < 1).length > 0 ||
        colecciones?.filter((el) => el.precio < 1).length > 0 ||
        colecciones?.filter((el) => el.tipo.toString().trim() == "").length >
          0 ||
        colecciones?.filter((el) => el.galeria?.trim() == "").length > 0
      ) {
        setMostrarNotificacion(Notificacion.Campos);
        return;
      }

      setMintCargando(true);

      const uris = new Array(colecciones.length).fill("");

      await Promise.all(
        (colecciones.filter((col) => col.galeriaId).length > 0
          ? colecciones.filter((col) => !col.galeriaId)
          : colecciones
        ).map(async (col: Coleccion, indice: number) => {
          let image = col.imagen;
          if (!image.includes("ipfs://") && image.trim() !== "") {
            const imagen = await fetch(`/api/ipfs`, {
              method: "POST",
              body: convertirArchivo(col.imagen, "image/png"),
            });
            const res = await imagen.json();
            image = "ipfs://" + res?.cid;
          }
          let images: string[] = [];

          if (col.imagenes?.filter((c) => c.trim() !== "")?.length > 0) {
            await Promise.all(
              col.imagenes?.map(async (im) => {
                if (!im.includes("ipfs://") && im.trim() !== "") {
                  const imagen = await fetch(`/api/ipfs`, {
                    method: "POST",
                    body: convertirArchivo(im, "image/png"),
                  });
                  const res = await imagen.json();

                  images.push("ipfs://" + res?.cid);
                } else if (im.trim() !== "") {
                  images.push(im);
                }
              })
            );
          }

          const response = await fetch("/api/ipfs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              title: col.titulo,
              description: col.descripcion,
              tags: col.etiquetas,
              npcs: col.npcs,
              image,
              images,
              tipo: col.tipo,
              locales: col.npcIdiomas,
              instructions: col.npcInstrucciones,
              gallery: col.galeria,
            }),
          });

          let responseJSON = await response.json();
          uris[indice] = "ipfs://" + responseJSON?.cid;
        })
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      if (colecciones.filter((col) => col.galeriaId).length > 0) {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "addCollections",
          chain: polygon,
          args: [
            {
              languages: colecciones
                .filter((col) => !col.galeriaId)
                .map(
                  (col) => col.npcIdiomas?.split(",").filter(Boolean) || [""]
                )
                ?.map((id) =>
                  id.map(
                    (n) =>
                      IDIOMAS?.flatMap((s) => ({
                        key: s.key,
                        title: s.title,
                      })).find((s) => s.key == n)?.title
                  )
                ),
              npcs: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.npcs?.split(",").filter(Boolean) || [""])
                ?.map((npc) =>
                  npc.map(
                    (n) =>
                      escenas
                        ?.flatMap((s) => s.sprites)
                        .find((s) => s.etiqueta == n)?.billetera
                  )
                ),
              uris,
              amounts: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.cantidad),
              prices: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.precio * 10 ** 18),
              acceptedTokens: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => col.tokenes),
              collectionTypes: colecciones
                .filter((col) => !col.galeriaId)
                .map((col) => autographTypeToNumber[col.tipo]),
            },
            colecciones.map((col) => col.galeriaId)[0],
          ],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        setMostrarNotificacion(Notificacion.Añadido);
      } else {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "createGallery",
          chain: polygon,
          args: [
            {
              languages: colecciones
                .map(
                  (col) => col.npcIdiomas?.split(",").filter(Boolean) || [""]
                )
                ?.map((id) =>
                  id.map(
                    (n) =>
                      IDIOMAS?.flatMap((s) => ({
                        key: s.key,
                        title: s.title,
                      })).find((s) => s.key == n)?.title
                  )
                ),
              npcs: colecciones
                .map((col) => col.npcs?.split(",").filter(Boolean) || [""])
                ?.map((npc) =>
                  npc.map(
                    (n) =>
                      escenas
                        ?.flatMap((s) => s.sprites)
                        .find((s) => s.etiqueta == n)?.billetera
                  )
                ),
              uris,
              amounts: colecciones.map((col) => col.cantidad),
              prices: colecciones.map((col) => col.precio * 10 ** 18),
              acceptedTokens: colecciones.map((col) => col.tokenes),
              collectionTypes: colecciones.map(
                (col) => autographTypeToNumber[col.tipo]
              ),
            },
          ],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        setMostrarNotificacion(Notificacion.Creado);
      }

      setColeccionActual({
        imagen: "",
        cantidad: 1,
        tokenes: [],
        precio: 0,
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcIdiomas: "",
        npcInstrucciones: "",
        npcs: "",
        galeria: "",
        id: colecciones?.length,
        colors: ["black", "white"],
        tokenesMinteados: [],
        profile: lensConectado,
        profileIds: [],
        pubIds: [],
        imagenes: Array.from({ length: 3 }, () => ""),
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      const numChunks = localStorage.getItem("coleccionesGaleria_chunks");
      if (numChunks) {
        for (let i = 0; i < Number(numChunks); i++) {
          localStorage.removeItem(`coleccionesGaleria_${i}`);
        }
        localStorage.removeItem("oleccionesGaleria_chunks");
      }

      setColecciones([]);

      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarColeccion = async () => {
    setCargandoBorrar([true]);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteCollection",
        chain: polygon,
        args: [coleccionActual.coleccionId, coleccionActual.galeriaId],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setMostrarNotificacion(Notificacion.ColeccionEliminada);

      setColecciones((prev) =>
        prev.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(coleccionActual)
        )
      );
      setColeccionActual({
        imagen: "",
        imagenes: Array.from({ length: 3 }, () => ""),
        cantidad: 1,
        tokenes: [],
        precio: 0,
        id: colecciones?.length,
        colors: ["black", "white"],
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcIdiomas: "",
        npcInstrucciones: "",
        npcs: "",
        galeria: "",
        tokenesMinteados: [],
        profileIds: [],
        pubIds: [],
        profile: lensConectado,
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      setIndiceImagen(0);
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar([false]);
  };

  const borrarGaleria = async (galeriaId: number, indice: number) => {
    setCargandoBorrar((prev) => {
      const arr = [...prev];
      arr[indice] = true;
      return arr;
    });
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteGallery",
        chain: polygon,
        args: [galeriaId],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      setMostrarNotificacion(Notificacion.GaleriaEliminada);
      setTodasLasGalerias((prev) =>
        prev.filter((item) => Number(item.galleryId) !== galeriaId)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar((prev) => {
      const arr = [...prev];
      arr[indice] = false;
      return arr;
    });
  };

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>,
    indice?: number
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let objeto: Object = {};
        if (indice || indice == 0) {
          let imagenes: string[] = coleccionActual.imagenes;

          imagenes[indice] = e.target?.result as string;

          objeto = {
            imagenes,
          };
        } else {
          objeto = {
            imagen: e.target?.result as string,
          };
        }
        setColeccionActual((prev) => ({
          ...prev,
          ...objeto,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const manejarAhorrar = async () => {
    setAhorrarCargando(true);

    const num = localStorage.getItem("coleccionesGaleria_chunks");
    if (num) {
      for (let i = 0; i < Number(num); i++) {
        localStorage.removeItem(`coleccionesGaleria_${i}`);
      }
      localStorage.removeItem("oleccionesGaleria_chunks");
    }

    let newColecciones: Coleccion[] = new Array(colecciones.length).fill("");

    await Promise.all(
      colecciones?.map(async (col, indice) => {
        let imagen = col.imagen;

        if (!imagen.includes("ipfs://")) {
          const resI = await fetch(`/api/ipfs`, {
            method: "POST",
            body: convertirArchivo(col.imagen, "image/png"),
          });
          const res = await resI.json();
          imagen = "ipfs://" + res?.cid;
        }

        newColecciones[indice] = {
          ...col,
          imagen,
        };
      })
    );

    const dataString = JSON.stringify(newColecciones);
    const chunkSize = 1000;
    const numChunks = Math.ceil(dataString.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      const chunk = dataString.slice(i * chunkSize, (i + 1) * chunkSize);
      localStorage.setItem(`coleccionesGaleria_${i}`, chunk);
    }
    localStorage.setItem("coleccionesGaleria_chunks", String(numChunks));

    setAhorrarCargando(false);
  };

  useEffect(() => {
    if (colecciones?.length < 1) {
      const numChunks = localStorage.getItem("coleccionesGaleria_chunks");
      if (numChunks) {
        let dataString = "";
        for (let i = 0; i < Number(numChunks); i++) {
          const chunk = localStorage.getItem(`coleccionesGaleria_${i}`);
          if (chunk) {
            dataString += chunk;
          }
        }

        if (dataString !== "") {
          const coleccionesGuardadas = JSON.parse(dataString);
          if (coleccionesGuardadas) {
            setColecciones(coleccionesGuardadas);
            setColeccionActual({
              imagen: "",
              cantidad: 1,
              tokenes: [],
              precio: 0,
              id: coleccionesGuardadas.length,
              tipo: "NFT" as any,
              titulo: "",
              descripcion: "",
              colors: ["black", "white"],
              etiquetas: "",
              npcIdiomas: "",
              npcInstrucciones: "",
              npcs: "",
              galeria: coleccionesGuardadas?.[0]?.galeria,
              tokenesMinteados: [],
              profileIds: [],
              pubIds: [],
              profile: lensConectado,
              imagenes: Array.from({ length: 3 }, () => ""),
            });
          }
        }
      }
    } else {
      setColeccionActual({
        imagen: "",
        cantidad: 1,
        imagenes: Array.from({ length: 3 }, () => ""),
        tokenes: [],
        precio: 0,
        colors: ["black", "white"],
        id: 0,
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcIdiomas: "",
        npcInstrucciones: "",
        npcs: "",
        galeria: "",
        tokenesMinteados: [],
        profileIds: [],
        pubIds: [],
        profile: undefined,
      });
    }
  }, []);

  useEffect(() => {
    if (mostrarGalerias && address) {
      llamarTodasLasGalerias();
    }
  }, [mostrarGalerias, address]);

  return {
    manejarMintear,
    mintCargando,
    manejarArchivo,
    colecciones,
    setColecciones,
    manejarAhorrar,
    dropDown,
    setDropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
    ahorrarCargando,
    indiceImagen,
    setIndiceImagen,
  };
};

export default useMint;
