import { ChangeEvent, SetStateAction, useState } from "react";
import { PublicClient } from "viem";
import { AutographType, Coleccion } from "../types/game.types";

const useMint = (
  setMint: (e: SetStateAction<number>) => void,
  publicClient: PublicClient
) => {
  const [mintCargando, setMintCargando] = useState<boolean>(false);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [coleccionActual, setColeccionActual] = useState<Coleccion>({
    imagen: "",
    cantidad: 1,
    tokenes: [],
    precio: 0,
    tipo: AutographType.NFT,
    titulo: "",
    descripcion: "",
    etiquetas: "",
    npcIdiomas: "",
    npcInstrucciones: "",
    npcs: "",
  });

  const manejarMintear = async () => {
    setMintCargando(true);
    try {
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

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
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
  };
};

export default useMint;
