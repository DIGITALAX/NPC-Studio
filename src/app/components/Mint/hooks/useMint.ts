import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { AutographType, Coleccion } from "../../Common/types/common.types";
import { Galeria } from "../types/mint.types";
import {
  AUTOGRAPH_COLLECTION,
  autographTypeToNumber,
  INFURA_GATEWAY,
  numberToAutograph,
} from "@/app/lib/constants";
import { Notificacion } from "../../Modals/types/modals.types";
import { ModalContext } from "@/app/providers";
import convertirArchivo from "@/app/lib/helpers/convertirArchivo";
import { useAccount } from "wagmi";
import AutographCollection from "./../../../../../abis/AutographCollection.json";
import { getGalleries } from "../../../../../graphql/queries/getGalleries";
import { chains } from "@lens-chain/sdk/viem";
import { number } from "zod";

const useMint = (publicClient: PublicClient) => {
  const contexto = useContext(ModalContext);
  const { address } = useAccount();
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [cargandoGalerias, setCargandoGalerias] = useState<boolean>(false);
  const [cargandoBorrar, setCargandoBorrar] = useState<boolean[]>([]);
  const [indiceImagen, setIndiceImagen] = useState<number>(0);
  const [todasLasGalerias, setTodasLasGalerias] = useState<Galeria[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [mostrarGalerias, setMostrarGalerias] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<{
    npcsAbiertos: boolean;
    tiposAbiertos: boolean;
    npcsTexto: string;
  }>({
    npcsAbiertos: false,
    tiposAbiertos: false,
    npcsTexto: "",
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
              if (!col.metadata) {
                const cadena = await fetch(
                  `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
                );
                col.metadata = await cadena.json();
              }

           
              colecciones[indice] = {
                cantidad: col.amount,
                tokenes: col.acceptedTokens,
                tokenesMinteados: col.mintedTokenIds,
                coleccionId: Number(col.collectionId),
                galeriaId: gal.galleryId,
                precio: Number(col.price),
                tipo: numberToAutograph[Number(col.type)] as AutographType,
                titulo: col.metadata?.title,
                descripcion: col.metadata?.description,
                etiquetas: col.metadata?.tags,
                npcInstrucciones: col.metadata?.instructions,
                npcs: col?.npcs?.map(
                  (npc: string) =>
                    contexto?.escenas
                      ?.flatMap((es) => es?.sprites)
                      ?.find(
                        (sp) =>
                          sp?.billetera?.toLowerCase() == npc?.toLowerCase()
                      )?.etiqueta
                )?.join(","),
                profile: undefined,
                imagenes: col.metadata?.images,
                postIds: [],
                colors: col.metadata?.colors,
              };
            })
          );

          return {
            galleryId: gal.galleryId,
            collectionIds: gal.collectionIds,
            colecciones,
            metadata: gal?.metadata,
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
        colecciones?.filter((el) => el.tokenes.length < 1).length > 0 ||
        colecciones?.filter((el) => el.precio < 1).length > 0 ||
        colecciones?.filter((el) => el.tipo.toString().trim() == "").length >
          0 ||
        !contexto?.galeriaActual?.image ||
        !contexto?.galeriaActual?.title
      ) {
        contexto?.setMostrarNotificacion(Notificacion.Campos);
        return;
      }

      setMintCargando(true);

      let metadata = "";

      if (contexto?.galeriaActual && !colecciones?.[0]?.galeriaId) {
        const imagen = await fetch(`/api/ipfs`, {
          method: "POST",
          body: convertirArchivo(contexto?.galeriaActual?.image, "image/png"),
        });
        const resImagen = await imagen.json();
        const body = await fetch(`/api/ipfs`, {
          method: "POST",
          body: JSON.stringify({
            title: contexto?.galeriaActual.title,
            image: "ipfs://" + resImagen?.cid,
          }),
        });
        const res = await body.json();
        metadata = "ipfs://" + res?.cid;
      }
      const colls = await Promise.all(
        (colecciones.filter((col) => col.galeriaId).length > 0
          ? colecciones.filter((col) => !col.galeriaId)
          : colecciones
        ).map(async (col: Coleccion) => {
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
              images,
              type: col.tipo,
              instructions: col.npcInstrucciones,
            }),
          });

          let responseJSON = await response.json();
          return {
            npcs: col.npcs
              ?.split(",")
              .filter(Boolean)
              ?.map(
                (npc) =>
                  contexto?.escenas
                    ?.flatMap((es) => es.sprites)
                    .find((sp) => sp.etiqueta == npc)?.billetera
              ),
            acceptedTokens: col?.tokenes,
            uri: "ipfs://" + responseJSON?.cid,
            price: Number(col?.precio) * 10 ** 18,
            amount: col?.cantidad,
            collectionType: autographTypeToNumber[col?.tipo],
          };
        })
      );

      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      if (colecciones.filter((col) => col.galeriaId).length > 0) {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "addCollections",
          chain: chains.mainnet,
          args: [colls, colecciones?.[0]?.galeriaId],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        contexto?.setMostrarNotificacion(Notificacion.Añadido);
      } else {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "createGallery",
          chain: chains.mainnet,
          args: [colls, metadata],
          account: address,
        });

        const res = await clientWallet.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: res });

        contexto?.setMostrarNotificacion(Notificacion.Creado);
      }

      contexto?.setColeccionActual({
        cantidad: 1,
        tokenes: [],
        precio: 0,
        tipo: "NFT" as any,
        titulo: "",
        descripcion: "",
        etiquetas: "",
        npcInstrucciones: "",
        npcs: "",
        id: colecciones?.length,
        colors: ["black", "white"],
        tokenesMinteados: [],
        profile: contexto?.lensConectado?.profile,
        postIds: [],
        imagenes: Array.from({ length: 3 }, () => ""),
      });
      contexto?.setGaleriaActual(undefined);
      setDropDown({
        npcsAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
      });
      const numChunks = localStorage.getItem("coleccionesGaleria_chunks");
      if (numChunks) {
        for (let i = 0; i < Number(numChunks); i++) {
          localStorage.removeItem(`coleccionesGaleria_${i}`);
        }
        localStorage.removeItem("oleccionesGaleria_chunks");
      }

      setColecciones([]);

      contexto?.setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarColeccion = async () => {
    setCargandoBorrar([true]);
    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteCollection",
        chain: chains.mainnet,
        args: [
          contexto?.coleccionActual.coleccionId,
          contexto?.coleccionActual.galeriaId,
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      contexto?.setMostrarNotificacion(Notificacion.ColeccionEliminada);

      setColecciones((prev) =>
        prev.filter(
          (item) =>
            JSON.stringify(item) !== JSON.stringify(contexto?.coleccionActual)
        )
      );
      contexto?.setColeccionActual({
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
        npcInstrucciones: "",
        npcs: "",
        tokenesMinteados: [],
        postIds: [],
        profile: contexto?.lensConectado?.profile,
      });
      setDropDown({
        npcsAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
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
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteGallery",
        chain: chains.mainnet,
        args: [galeriaId],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

      contexto?.setMostrarNotificacion(Notificacion.GaleriaEliminada);
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
    indice: number,
    galeria?: boolean
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      let objeto: Object = {};
      reader.onload = (e) => {
        if (galeria) {
          contexto?.setGaleriaActual((prev) => ({
            title: prev?.title as string,
            image: e.target?.result as string,
          }));
        } else {
          let imagenes: string[] = contexto?.coleccionActual.imagenes || [];
          imagenes[indice] = e.target?.result as string;

          objeto = {
            imagenes,
          };
          contexto?.setColeccionActual((prev) => ({
            ...prev,
            ...objeto,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (colecciones?.length > 0) {
      contexto?.setColeccionActual({
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
        npcInstrucciones: "",
        npcs: "",
        tokenesMinteados: [],
        postIds: [],
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
    dropDown,
    setDropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
    indiceImagen,
    setIndiceImagen,
  };
};

export default useMint;
