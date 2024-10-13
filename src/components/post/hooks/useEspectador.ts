import { SetStateAction, useEffect, useState } from "react";
import { HistoriaPub, PubVote } from "../types/post.types";
import { getPubVotes } from "../../../../graphql/npc/queries/getPubVotes";
import { Post, Profile } from "../../../../graphql/generated";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygonAmoy } from "viem/chains";
import { INFURA_GATEWAY, NPC_SPECTATE } from "@/lib/constants";
import NPCSpectate from "./../../../../abis/NPCSpectate.json";
import { Dictionary } from "@/components/game/types/game.types";
import getDefaultProfile from "../../../../graphql/lens/queries/default";

const useEspectador = (
  pub: Post,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  setVoto: (e: SetStateAction<string | undefined>) => void,
  dict: Dictionary,
  lensConectado: Profile | undefined
) => {
  const [votarCargando, setVotarCargando] = useState<boolean>(false);
  const [votosCargando, setVotosCargando] = useState<boolean>(false);
  const [historia, setHistoria] = useState<HistoriaPub[]>([]);
  const [pubVotar, setPubVotar] = useState<PubVote>({
    comment: "",
    model: 50,
    chatContext: 50,
    prompt: 50,
    personality: 50,
    style: 50,
    media: 50,
    tokenizer: 50,
    global: 50,
  });

  const cogerTodosLosVotos = async () => {
    setVotosCargando(true);
    try {
      const datos = await getPubVotes(
        Number(pub?.id?.split("-")?.[0]),
        Number(pub?.id?.split("-")?.[1])
      );

      const cachePerfiles: { [spectator: string]: any } = {};

      const historiaNueva = datos?.data?.pubVotes?.map((data: any) =>
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
            cachePerfiles[data?.spectator?.[i]] = perfil?.data?.defaultProfile;
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
            profileId: data?.profileId,
            pubId: data?.pubId,
            blockNumber: data?.blockNumber?.[i],
            blockTimestamp: data?.blockTimestamp?.[i],
            transactionHash: data?.transactionHash?.[i],
            comment,
            model: data?.model?.[i],
            chatContext: data?.chatContext?.[i],
            style: data?.style?.[i],
            personality: data?.personality?.[i],
            tokenizer: data?.tokenizer?.[i],
            media: data?.media?.[i],
            global: data?.global?.[i],
          };
        })
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

      let comment: string = pubVotar?.comment;

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
        functionName: "voteForPub",
        chain: polygonAmoy,
        args: [
          {
            comment,
            npc: pub?.by?.ownedBy?.address,
            spectator: address,
            profileId: Number(pub?.id?.split("-")?.[0]),
            pubId: Number(pub?.id?.split("-")?.[1]),
            model: pubVotar?.model,
            chatContext: pubVotar?.chatContext,
            prompt: pubVotar?.prompt,
            personality: pubVotar?.personality,
            style: pubVotar?.style,
            media: pubVotar?.media,
            tokenizer: pubVotar?.tokenizer,
            global: pubVotar?.global,
          },
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setVoto(dict.Home.votarPub);
    } catch (err: any) {
      console.error(err.message);
    }
    setVotarCargando(false);
  };

  useEffect(() => {
    if (historia?.length < 1 && pub?.id) {
      cogerTodosLosVotos();
    }
  }, [pub?.id]);

  return {
    votarCargando,
    manejarVotar,
    pubVotar,
    setPubVotar,
    historia,
    votosCargando,
  };
};

export default useEspectador;
