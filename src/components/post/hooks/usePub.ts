import { SetStateAction, useEffect, useState } from "react";
import {
  Profile,
  Quote,
  Comment,
  Post,
  Mirror,
} from "../../../../graphql/generated";
import { Escena, Sprite } from "@/components/game/types/game.types";
import getPublication from "../../../../graphql/lens/queries/publication";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Atributos } from "../types/post.types";
import { manejarJSON } from "@/lib/helpers/manejarJSON";

const usePub = (
  id: string,
  lensConectado: Profile | undefined,
  setEscenas: (e: SetStateAction<Escena[]>) => void,
  escenas: Escena[],
  setEscena: (e: SetStateAction<string | undefined>) => void
) => {
  const [pubCargando, setPubCargando] = useState<boolean>(true);
  const [npc, setNPC] = useState<Sprite | undefined>();
  const [pub, setPub] = useState<(Post | Mirror | Quote | Comment)[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [atributos, setAtributos] = useState<Atributos | undefined>();
  const [pantalla, setPantalla] = useState(window.innerWidth > 1280);

  const llamaPub = async () => {
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

      const atro = (
        datos?.data?.publication as Post
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

      setNPC({ ...sprite });
    } catch (err: any) {
      console.error(err.message);
    }
    setPubCargando(false);
  };

  useEffect(() => {
    if (!socket && id) {
      const newSocket = new WebSocket(
             // `ws://127.0.0.1:8080?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`

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
      llamaPub();
    }
  }, [escenas?.length]);

  useEffect(() => {
    const handleResize = () => {
      setPantalla(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    pubCargando,
    pub,
    npc,
    setPub,
    atributos,
    pantalla,
  };
};

export default usePub;
