import { useContext, useState } from "react";
import { ModalContext } from "@/app/providers";
import { createWalletClient, custom, PublicClient } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { SPECTATOR_REWARDS } from "@/app/lib/constants";
import { NPCVote } from "../types/agent.types";
import SpectatorRewards from "./../../../../../abis/SpectatorRewards.json";
import { comprobarTokens } from "@/app/lib/helpers/comprobarTokens";

const useVotar = (
  address: `0x${string}` | undefined,
  dict: any,
  publicClient: PublicClient,
  agente: string
) => {
  const contexto = useContext(ModalContext);
  const [votarCargando, setVotarCargando] = useState<boolean>(false);
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
    collections: 50,
    global: 50,
  });

  const manejarVotar = async () => {
    if (!address || npcVotar?.comment?.trim() == "") return;
    setVotarCargando(true);
    const datos = await comprobarTokens(address, publicClient);

    if (!datos?.suficiente) {
      contexto?.setVoto({
        mensaje: dict.Home.tokensInvalidos,
        tokens: datos?.tokens,
      });
      setVotarCargando(false);
      return;
    }

    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });
      let comment: string = "";

      const imagen = await fetch(`/api/ipfs`, {
        method: "POST",
        body: JSON.stringify({
          comment,
          model: npcVotar.model,
          scene: npcVotar.scene,
          chatContext: npcVotar.chatContext,
          appearance: npcVotar.appearance,
          collections: npcVotar.collections,
          personality: npcVotar.personality,
          training: npcVotar.training,
          tokenizer: npcVotar.tokenizer,
          lora: npcVotar.lora,
          spriteSheet: npcVotar.spriteSheet,
          global: npcVotar.global,
        }),
      });
      const ipfs = await imagen.json();

      const { request } = await publicClient.simulateContract({
        address: SPECTATOR_REWARDS,
        abi: SpectatorRewards,
        functionName: "spectate",
        chain: chains.mainnet,
        args: ["ipfs://" + ipfs?.cid, agente],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      setNPCVotar({
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
        collections: 50,
        global: 50,
      });
      await publicClient.waitForTransactionReceipt({ hash: res });
      contexto?.setVoto({
        mensaje: dict.Home.votarNPC,
      });
    } catch (err: any) {
      console.error(err.message);
      if (err.message?.toLowerCase()?.includes("insufficienttokenbalance")) {
        contexto?.setVoto({
          mensaje: dict.Home.tokensInvalidos,
        });
      } else if (
        err.message
          ?.toLowerCase()
          ?.includes("Timed out while waiting for transaction with hash")
      ) {
        contexto?.setVoto({
          mensaje: dict.Home.votarNPC,
        });
      } else {
        contexto?.setVoto({
          mensaje: dict.Home.error2,
        });
      }
    }
    setVotarCargando(false);
  };

  return {
    manejarVotar,
    npcVotar,
    setNPCVotar,
    votarCargando,
  };
};

export default useVotar;
