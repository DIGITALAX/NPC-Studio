import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  LimitType,
  Post,
  Profile,
  PublicationType,
} from "../../../../graphql/generated";
import subirContenido from "@/lib/helpers/subirContenido";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import publicarLens from "@/lib/helpers/publicarLens";
import { Indexar } from "@/components/common/types/common.types";
import { Atributos } from "@/components/post/types/post.types";
import getPublications from "../../../../graphql/lens/queries/publications";
import { manejarJSON } from "@/lib/helpers/manejarJSON";
import { INFURA_GATEWAY, NPC_SPECTATE } from "@/lib/constants";
import { Info } from "@/components/agentes/types/agentes.types";
import { HistoriaNPC, NPCVote } from "../types/npc.types";
import NPCSpectate from "./../../../../abis/NPCSpectate.json";
import { Dictionary } from "@/components/game/types/game.types";
import { getNPCVotes } from "../../../../graphql/npc/queries/getNPCVotes";
import getDefaultProfile from "../../../../graphql/lens/queries/default";
import { getNPCInformacion } from "../../../../graphql/npc/queries/getNPCInformacion";

const useConversacion = (
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  address: `0x${string}` | undefined,
  lensConectado: Profile | undefined,
  npc: string,
  npcDireccion: string,
  setVoto: (e: SetStateAction<string | undefined>) => void,
  dict: Dictionary
) => {
  const [votosCargando, setVotosCargando] = useState<boolean>(false);
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
  const [historia, setHistoria] = useState<HistoriaNPC[]>([]);
  const [npcVotar, setNPCVotar] = useState<NPCVote>({
    comment: "",
    model: 50,
    chatContext: 50,
    personality: 50,
    appearance: 50,
    scene: 50,
    spriteSheet: 50,
    tokenizer: 50,
    training: 50,
    lora: 50,
    completedJobs: 50,
    global: 50,
  });

  const cogerTodosLosVotos = async () => {
    setVotosCargando(true);
    try {
      const datos = await getNPCVotes(npcDireccion);
      const cachePerfiles: { [spectator: string]: any } = {};

      const historiaNueva = await Promise.all(
        datos?.data?.npcVotes?.map((data: any) =>
          data?.spectator?.map(async (_: any, i: number) => {
            let perfil;
            if (cachePerfiles[data?.spectator?.[i]]) {
              perfil = cachePerfiles[data?.spectator?.[i]];
            } else {
              perfil = await getDefaultProfile(
                {
                  for: data?.spectator?.[i],
                },
                lensConectado?.id
              );
              cachePerfiles[data?.spectator?.[i]] =
                perfil?.data?.defaultProfile;
            }

            let comment = data?.comment?.[i];

            if (comment?.trim() !== "") {
              const cadena = await fetch(
                `${INFURA_GATEWAY}/ipfs/${comment.split("ipfs://")?.[1]}`
              );
              comment = await cadena.json();
            }

            return {
              spectator: perfil,
              npc: data?.npc,
              blockNumber: data?.blockNumber?.[i],
              blockTimestamp: data?.blockTimestamp?.[i],
              transactionHash: data?.transactionHash?.[i],
              comment,
              model: data?.model?.[i],
              chatContext: data?.chatContext?.[i],
              lora: data?.lora?.[i],
              scene: data?.scene?.[i],
              personality: data?.personality?.[i],
              tokenizer: data?.tokenizer?.[i],
              completedJobs: data?.completedJobs?.[i],
              training: data?.training?.[i],
              spriteSheet: data?.spriteSheet?.[i],
              appearance: data?.appearance?.[i],
              global: data?.global?.[i],
            };
          })
        )
      );
      setHistoria(historiaNueva);
    } catch (err: any) {
      console.error(err.message);
    }
    setVotosCargando(false);
  };

  const manejarVotar = async () => {
    setVotarCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      let comment: string = npcVotar.comment;

      if (comment?.trim() !== "") {
        const imagen = await fetch(`/api/ipfs`, {
          method: "POST",
          body: comment,
        });
        const res = await imagen.json();

        comment = "ipfs://" + res?.cid;
      }

      const { request } = await publicClient.simulateContract({
        address: NPC_SPECTATE,
        abi: NPCSpectate,
        functionName: "voteForNPC",
        chain: polygonAmoy,
        args: [
          {
            comment,
            npc: npcDireccion,
            spectator: address,
            model: npcVotar.model,
            scene: npcVotar.scene,
            chatContext: npcVotar.chatContext,
            appearance: npcVotar.appearance,
            completedJobs: npcVotar.completedJobs,
            personality: npcVotar.personality,
            training: npcVotar.training,
            tokenizer: npcVotar.tokenizer,
            lora: npcVotar.lora,
            spriteSheet: npcVotar.spriteSheet,
            global: npcVotar.global,
          },
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setVoto(dict.Home.votarNPC);
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

      const data = await getNPCInformacion(npcDireccion);

      setInformacion(data?.data?.npcInfo);

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
            options: {
              ...json?.options,
              tokenizer: json?.options?.tokenizer || "Default",
            },
            model: json?.options?.model || "Llama3.1:8b",
            mensaje: {
              ...json?.mensaje,
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
            },
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

  useEffect(() => {
    if (historia?.length < 1 && npcDireccion) {
      cogerTodosLosVotos();
    }
  }, [npcDireccion]);

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
    historia,
    votosCargando,
  };
};

export default useConversacion;
