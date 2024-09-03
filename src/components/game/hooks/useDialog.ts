import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { ComentarPublicar } from "../types/game.types";
import { Profile } from "../../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";
import publicarLens from "@/lib/helpers/publicarLens";
import { Indexar } from "@/components/common/types/common.types";
import subirContenido from "@/lib/helpers/subirContenido";

const useDialog = (
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  sceneKey: string,
  comentarPublicar: ComentarPublicar[],
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void,
  conectado: boolean,
  openConnectModal: (() => void) | undefined,
  manejarLens: () => Promise<void>,
  lensConectado: Profile | undefined
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
  const [publicacionCargando, setPublicacionCargando] = useState<boolean[]>([]);

  const manejarPublicar = async (indice: number, comentarioId?: string) => {
    if (!lensConectado?.id) {
      if (conectado) {
        await manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

    if (
      !comentarPublicar[indice]?.contenido &&
      !comentarPublicar[indice]?.imagenes &&
      !comentarPublicar[indice]?.videos
    )
      return;
    setPublicacionCargando((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = true;
      return updatedArray;
    });
    try {
      const contentURI = await subirContenido(
        comentarPublicar[indice]?.contenido?.trim() == ""
          ? " "
          : comentarPublicar[indice]?.contenido,
        comentarPublicar[indice]?.imagenes || [],
        comentarPublicar[indice]?.videos || [],
        comentarPublicar[indice].gifs || [],
        sceneKey
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        comentarPublicar[indice]?.coleccionar
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction:
                    comentarPublicar[indice]?.coleccionar,
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        () =>
          setPublicacionCargando((prev) => {
            const updatedArray = [...prev];
            updatedArray[indice] = false;
            return updatedArray;
          }),
        comentarioId
      );
      setComentarPublicar((prev) => {
        const arr = [...prev];
        arr[indice] = {
          contenido: "",
          imagenes: [],
          videos: [],
          gifs: [],
        };
        return arr;
      });
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

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let objeto: Object = {};

        if (tipo == "video") {
          const nuevosVideos = [...(comentarPublicar?.[indice]?.videos || [])];
          nuevosVideos.push(e.target?.result as string);
          objeto = {
            videos: nuevosVideos,
          };
        } else {
          const nuevasImagenes = [
            ...(comentarPublicar?.[indice]?.imagenes || []),
          ];
          nuevasImagenes.push({
            tipo: "image/png",
            medios: e.target?.result as string,
          });
          objeto = {
            imagenes: nuevasImagenes,
          };
        }

        setComentarPublicar((prev) => {
          const arr = [...prev];
          arr[indice] = {
            ...arr[indice],
            ...objeto,
          };
          return arr;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return {
    contenedorMensajesRef,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    perfilesAbiertos,
    caretCoord,
    mencionarPerfiles,
    publicacionCargando,
    manejarPublicar,
    manejarArchivo,
  };
};

export default useDialog;
