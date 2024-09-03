import { SetStateAction, useRef, useState } from "react";
import { Profile } from "../../../../graphql/generated";
import subirContenido from "@/lib/helpers/subirContenido";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import publicarLens from "@/lib/helpers/publicarLens";
import { Indexar } from "@/components/common/types/common.types";

const useConversacion = (
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  address: `0x${string}` | undefined
) => {
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [cargandoConexion, setCargandoConexion] = useState<boolean>(false);

  const hacerPublicacion = async (): Promise<void> => {
    setCargandoConexion(true);

    try {
      const contentURI = await subirContenido(descripcion, [], [], []);

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        [
          {
            collectOpenAction: {
              simpleCollectOpenAction: {
                followerOnly: false,
              },
            },
          },
        ],
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        () => setCargandoConexion(false),
        undefined,
        true
      );

      setDescripcion("");
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoConexion(false);
  };
  return {
    descripcion,
    caretCoord,
    setCaretCoord,
    setMencionarPerfiles,
    setDescripcion,
    elementoTexto,
    mencionarPerfiles,
    perfilesAbiertos,
    setPerfilesAbiertos,
    hacerPublicacion,
    cargandoConexion,
  };
};

export default useConversacion;
