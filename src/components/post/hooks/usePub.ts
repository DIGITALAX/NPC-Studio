import lensSeguir from "@/lib/helpers/lensSeguir";
import { SetStateAction, useEffect, useState } from "react";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import {
  Profile,
  Quote,
  Comment,
  Post,
  Mirror,
} from "../../../../graphql/generated";
import { Indexar } from "@/components/common/types/common.types";
import { Escena, Sprite } from "@/components/game/types/game.types";
import getPublication from "../../../../graphql/lens/queries/publication";

const usePub = (
  id: string,
  lensConectado: Profile | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
) => {
  const [pubCargando, setPubCargando] = useState<boolean>(true);
  const [npc, setNPC] = useState<Sprite | undefined>();
  const [pub, setPub] = useState<(Post | Mirror | Quote | Comment)[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [escenas, setEscenas] = useState<Escena[]>([]);
  const [escena, setEscena] = useState<string>("");

  const llamaNPC = async () => {
    setPubCargando(true);
    try {
      const datos = await getPublication(
        {
          forId: id,
        },
        lensConectado?.id
      );

      setPub([datos.data?.publication as Quote | Comment | Post | Mirror]);
      const sprite = escenas
        ?.find((e) =>
          e.sprites?.find(
            (s) =>
              "0x0" + s.perfil_id?.toString(16)?.split("0x")?.[1] ==
              datos.data?.publication?.by?.id
          )
        )
        ?.sprites?.find(
          (n) =>
            "0x0" + n.perfil_id?.toString(16)?.split("0x")?.[1] ==
            datos.data?.publication?.by?.id
        )!;

      setEscena(
        (datos.data?.publication as Post)?.metadata?.tags?.find(
          (tag) => escenas?.find((es) => es.clave == tag)?.clave
        ) as string
      );

      setNPC({ ...sprite });
    } catch (err: any) {
      console.error(err.message);
    }
    setPubCargando(false);
  };

  useEffect(() => {
    if (!socket && id) {
      const newSocket = new WebSocket(
        `wss://npc-rust-engine.onrender.com?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`
      );

      setSocket(newSocket);

      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            tipo: "datosDeEscenas",
            clave: "estudio abierto de trabajo",
          })
        );
      };

      newSocket.onerror = (error) => {
        console.error(error);
      };

      newSocket.onmessage = (evento) => {
        const datos = JSON.parse(evento.data);
        const nombre = datos.nombre;
        const valores = datos.datos;
        if (nombre === "datosDeEscenas") {
          setEscenas(valores);
        }
      };

      const closeWebSocket = () => {
        newSocket.close();
      };

      window.addEventListener("beforeunload", closeWebSocket);

      return () => {
        window.removeEventListener("beforeunload", closeWebSocket);

        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    }
  }, [id]);

  useEffect(() => {
    if (escenas?.length > 0) {
      llamaNPC();
    }
  }, [escenas?.length]);

  return {
    pubCargando,
    pub,
    npc,
    escena,
    setPub,
  };
};

export default usePub;
