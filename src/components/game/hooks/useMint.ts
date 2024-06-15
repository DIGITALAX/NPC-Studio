import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { Coleccion, Galeria } from "../types/game.types";
import { polygonAmoy } from "viem/chains";
import {
  AUTOGRAPH_COLLECTION,
  INFURA_GATEWAY,
  autographTypeToNumber,
  numberToAutograph,
} from "@/lib/constants";
import AutographCollection from "./../../../../abis/AutographCollection.json";
import convertirArchivo from "@/lib/helpers/convertirArchivo";
import { getGalleries } from "../../../../graphql/autograph/queries/getGalleries";
import { Notificacion } from "@/components/common/types/common.types";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient,
  address: `0x${string}` | undefined,
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void
) => {
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [cargandoGalerias, setCargandoGalerias] = useState<boolean>(false);
  const [cargandoBorrar, setCargandoBorrar] = useState<boolean>(false);
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
  const [coleccionActual, setColeccionActual] = useState<Coleccion>({
    imagen: "",
    cantidad: 1,
    tokenes: [],
    precio: 0,
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
  });

  const llamarTodasLasGalerias = async () => {
    setCargandoGalerias(true);
    try {
      const data = await getGalleries(address!);

      const gals = await Promise.all(
        data?.data?.galleryCreateds.map(async (gal: any) => {
          return {
            galleryId: gal.galleryId,
            collectionIds: gal.collectionIds,
            colecciones: await Promise.all(
              gal.collections.map(async (col: any) => {
                if (!col.collectionMetadata) {
                  const cadena = await fetch(
                    `${INFURA_GATEWAY}/ipfs/${col.uri.split("ipfs://")?.[1]}`
                  );
                  col.collectionMetadata = await cadena.json();
                }

                return {
                  galeria: col.collectionMetadata.gallery,
                  imagen: col.collectionMetadata.image,
                  id: col.collectionId,
                  cantidad: col.amount,
                  tokenes: col.acceptedTokens,
                  tokenesMinteados: col.mintedTokens,
                  precio: col.price,
                  tipo: numberToAutograph[Number(col.type)],
                  titulo: col.collectionMetadata.title,
                  descripcion: col.collectionMetadata.description,
                  etiquetas: col.collectionMetadata.tags,
                  npcIdiomas: col.collectionMetadata.locales,
                  npcInstrucciones: col.collectionMetadata.instructions,
                  npcs: col.collectionMetadata.npcs,
                };
              })
            ),
          };
        })
      );

      setTodasLasGalerias(gals);
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
        colecciones?.filter((el) => el.tipo.toString().trim() == "").length > 0
      )
        return;

      setMintCargando(true);

      const uris: string[] = [];

      await Promise.all(
        (colecciones.filter((col) => col.galeriaId).length > 0
          ? colecciones.filter((col) => !col.galeriaId)
          : colecciones
        ).map(async (col: Coleccion) => {
          let image = col.imagen;
          if (!image.includes("ipfs://")) {
            const imagen = await fetch(`/api/ipfs`, {
              method: "POST",
              body: convertirArchivo(col.imagen, "image/png"),
            });
            const res = await imagen.json();
            image = "ipfs://" + res?.cid;
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
              tipo: col.tipo,
              locales: col.npcIdiomas,
              instructions: col.npcInstrucciones,
              gallery: col.galeria,
            }),
          });

          let responseJSON = await response.json();
          uris.push("ipfs://" + responseJSON?.cid);
        })
      );

      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      if (colecciones.filter((col) => col.galeriaId).length > 0) {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "addCollections",
          chain: polygonAmoy,
          args: [
            {
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

        await clientWallet.writeContract(request);

        setMostrarNotificacion(Notificacion.Añadido);
      } else {
        const { request } = await publicClient.simulateContract({
          address: AUTOGRAPH_COLLECTION,
          abi: AutographCollection,
          functionName: "createGallery",
          chain: polygonAmoy,
          args: [
            {
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

        await clientWallet.writeContract(request);

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
        id: 0,
        tokenesMinteados: [],
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      localStorage.removeItem("coleccionesGaleria");
      setColecciones([]);

      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarColeccion = async () => {
    setCargandoBorrar(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteCollection",
        chain: polygonAmoy,
        args: [coleccionActual.coleccionId, coleccionActual.galeriaId],
        account: address,
      });

      await clientWallet.writeContract(request);

      setMostrarNotificacion(Notificacion.ColeccionEliminada);

      setColecciones((prev) =>
        prev.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(coleccionActual)
        )
      );
      setColeccionActual({
        imagen: "",
        cantidad: 1,
        tokenes: [],
        precio: 0,
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
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar(false);
  };

  const borrarGaleria = async (galeriaId: number) => {
    setCargandoBorrar(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: AUTOGRAPH_COLLECTION,
        abi: AutographCollection,
        functionName: "deleteGallery",
        chain: polygonAmoy,
        args: [galeriaId],
        account: address,
      });

      await clientWallet.writeContract(request);

      setMostrarNotificacion(Notificacion.GaleriaEliminada);
      setTodasLasGalerias((prev) =>
        prev.filter((item) => Number(item.galleryId) !== galeriaId)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoBorrar(false);
  };

  const manejarArchivo = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setColeccionActual((prev) => ({
          ...prev,
          imagen: e.target?.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const manejarAhorar = async (): Promise<void> => {
    try {
      localStorage.setItem("coleccionesGaleria", JSON.stringify(colecciones));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (colecciones?.length < 1) {
      const coleccionesGuardadas = localStorage.getItem("coleccionesGaleria");
      if (coleccionesGuardadas) {
        setColecciones(JSON.parse(coleccionesGuardadas));
      }
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
    coleccionActual,
    setColeccionActual,
    manejarAhorar,
    dropDown,
    setDropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
  };
};

export default useMint;
