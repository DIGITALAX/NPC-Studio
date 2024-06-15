import { SetStateAction, useRef, useState } from "react";
import { ComentarPublicar } from "../types/game.types";
import { Profile } from "../../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import { polygonAmoy } from "viem/chains";
import publicarLens from "@/lib/helpers/publicarLens";
import { Indexar } from "@/components/common/types/common.types";
import subirContenido from "@/lib/helpers/subirContenido";

const useDialog = (
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  sceneKey: string
) => {
  const contenedorMensajesRef = useRef<HTMLDivElement | null>(null);
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const [comentarPublicar, setComentarPublicar] = useState<ComentarPublicar[]>(
    []
  );
  const [publicacionCargando, setPublicacionCargando] = useState<boolean[]>([]);

  const manejarPublicar = async (indice: number, comentarioId?: string) => {
    if (
      !comentarPublicar[0]?.contenido &&
      !comentarPublicar[0]?.imagenes &&
      !comentarPublicar[0]?.videos
    )
      return;
    setPublicacionCargando((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = true;
      return updatedArray;
    });
    try {
      const contentURI = await subirContenido(
        comentarPublicar[0]?.contenido?.trim() == ""
          ? " "
          : comentarPublicar[0]?.contenido,
        comentarPublicar[0]?.imagenes || [],
        comentarPublicar[0]?.videos || [],
        comentarPublicar[0].gifs || [],
        sceneKey
      );

      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        comentarPublicar[0].coleccionar
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction: comentarPublicar[0].coleccionar,
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        comentarioId
      );
      setComentarPublicar([
        {
          contenido: "",
          imagenes: [],
          videos: [],
          gifs: [],
        },
      ]);
    } catch (err: any) {
      if (
        !err?.messages?.includes("Block at number") &&
        !err?.message?.includes("could not be found")
      ) {
        setErrorInteraccion(true);
        console.error(err.message);
      } else {
        setIndexar(Indexar.Exito);

        setTimeout(() => {
          setIndexar(Indexar.Inactivo);
        }, 3000);
      }
    }
    setPublicacionCargando((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = false;
      return updatedArray;
    });
  };

  return {
    contenedorMensajesRef,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    setComentarPublicar,
    perfilesAbiertos,
    caretCoord,
    comentarPublicar,
    mencionarPerfiles,
    publicacionCargando,
    manejarPublicar,
  };
};

export default useDialog;
