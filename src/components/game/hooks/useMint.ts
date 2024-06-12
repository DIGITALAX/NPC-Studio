import { ChangeEvent, SetStateAction, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { AutographType, Coleccion } from "../types/game.types";
import { polygonAmoy } from "viem/chains";
import { AUTOGRAPH_COLLECTION, autographTypeToNumber } from "@/lib/constants";
import AutographCollection from "./../../../../abis/AutographCollection.json";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient,
  address: `0x${string}` | undefined
) => {
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
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
  });

  const manejarMintear = async () => {
    setMintCargando(true);
    try {
      if (
        colecciones?.map((el) => el.titulo.trim() == "").length > 0 ||
        colecciones?.map((el) => el.descripcion.trim() == "").length > 0 ||
        colecciones?.map((el) => el.imagen.trim() == "").length > 0 ||
        colecciones?.map((el) => el.tokenes.length < 1).length > 0 ||
        colecciones?.map((el) => el.precio < 1).length > 0 ||
        colecciones?.map((el) => el.tipo.toString().trim() == "").length > 0
      )
        return;

      const uris: string[] = [];

      await Promise.all(
        colecciones.map(async (col: Coleccion) => {
          const imagen = await fetch("/api/ipfs", {
            method: "POST",
            body: col.imagen,
          });
          const res = await imagen.json();
          const image = "ipfs://" + res?.cid;

          const response = await fetch("/api/ipfs", {
            method: "POST",
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
        id: 0
      });
      setDropDown({
        npcsAbiertos: false,
        idiomasAbiertos: false,
        tiposAbiertos: false,
        npcsTexto: "",
        idiomasTexto: "",
      });
      setColecciones([]);

      setMint(4);
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const anadirCollecion = async () => {
    setMintCargando(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarCollecion = async () => {
    setMintCargando(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
  };

  const borrarGalleria = async () => {
    setMintCargando(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setMintCargando(false);
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
    } catch (err: any) {
      console.error(err.message);
    }
  };

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
  };
};

export default useMint;
