import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  LimitType,
  Post,
  Profile,
  PublicationType,
} from "../../../../graphql/generated";
import subirContenido from "@/lib/helpers/subirContenido";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import publicarLens from "@/lib/helpers/publicarLens";
import { Indexar } from "@/components/common/types/common.types";
import { Atributos } from "@/components/post/types/post.types";
import getPublications from "../../../../graphql/lens/queries/publications";
import { manejarJSON } from "@/lib/helpers/manejarJSON";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Info } from "@/components/agentes/types/agentes.types";
import { NPCVote } from "../types/npc.types";

const useConversacion = (
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  address: `0x${string}` | undefined,
  lensConectado: Profile | undefined,
  npc: string
) => {
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [pantalla, setPantalla] = useState(window.innerWidth > 1280);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [cargandoConexion, setCargandoConexion] = useState<boolean>(false);
  const [atributos, setAtributos] = useState<Atributos | undefined>();
  const [informacion, setInformacion] = useState<Info>();
  const [votarCargando, setVotarCargando] = useState<boolean>(false);
  const [npcVotar, setNPCVotar] = useState<NPCVote>({
    comment: "",
    model: 50,
    chatContext: 50,
    personality: 50,
    appearance: 50,
    scene: 50,
    spriteSheet: 50,
    style: 50,
    tokenizer: 50,
    training: 50,
    lora: 50,
    completedJobs: 50,
    global: 50,
  });

  const manejarVotar = async () => {
    setVotarCargando(true);
    try {
      // como una cita :)
    } catch (err: any) {
      console.error(err.message);
    }
    setVotarCargando(false);
  };
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

  const llamarAtributos = async (): Promise<void> => {
    try {
      const datos = await getPublications(
        {
          limit: LimitType.Ten,
          where: {
            publicationTypes: [PublicationType.Post],
            metadata: {
              publishedOn: ["npcStudio"],
            },
            from: [npc],
          },
        },
        lensConectado?.id
      );

      setInformacion({
        perfil: undefined,
        auEarned: 0,
        activeJobs: 0,
        currentScore: 0,
        rentPaid: 0,
      });

      const atro = (
        datos?.data?.publications?.items?.[0] as Post
      )?.metadata?.attributes?.find(
        (at) => at.key?.toLowerCase() == "llm_info"
      )!?.value;

      if (atro) {
        const cadena = await fetch(
          `${INFURA_GATEWAY}/ipfs/${atro.split("ipfs://")?.[1]}`
        );

        const json = await cadena.json();

        if (json.version) {
          setAtributos({
            ...json,
            token_means_respuesta: await manejarJSON(
              json?.mensaje?.token_means_respuesta
            ),
            k_means_respuesta: await manejarJSON(
              json?.mensaje?.k_means_respuesta
            ),
            v_means_respuesta: await manejarJSON(
              json?.mensaje?.v_means_respuesta
            ),
            value_std_devs_respuesta: await manejarJSON(
              json?.mensaje?.value_std_devs_respuesta
            ),
            value_maxs_respuesta: await manejarJSON(
              json?.mensaje?.value_maxs_respuesta
            ),
            value_mins_respuesta: await manejarJSON(
              json?.mensaje?.value_mins_respuesta
            ),
            key_std_devs_respuesta: await manejarJSON(
              json?.mensaje?.key_std_devs_respuesta
            ),
            key_maxs_respuesta: await manejarJSON(
              json?.mensaje?.key_maxs_respuesta
            ),
            key_mins_respuesta: await manejarJSON(
              json?.mensaje?.key_mins_respuesta
            ),
            ffn_out_std_devs: await manejarJSON(
              json?.mensaje?.ffn_out_std_devs
            ),
            ffn_out_maxs: await manejarJSON(json?.mensaje?.ffn_out_maxs),
            ffn_out_mins: await manejarJSON(json?.mensaje?.ffn_out_mins),
            ffn_out_means: await manejarJSON(json?.mensaje?.ffn_out_means),
            ffn_inp_std_devs: await manejarJSON(
              json?.mensaje?.ffn_inp_std_devs
            ),
            ffn_inp_maxs: await manejarJSON(json?.mensaje?.ffn_inp_maxs),
            ffn_inp_mins: await manejarJSON(json?.mensaje?.ffn_inp_mins),
            ffn_inp_means: await manejarJSON(json?.mensaje?.ffn_inp_means),
          });
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPantalla(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!atributos && npc) {
      llamarAtributos();
    }
  }, [npc]);

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
    pantalla,
    atributos,
    informacion,
    manejarVotar,
    npcVotar,
    setNPCVotar,
    votarCargando,
  };
};

export default useConversacion;
