import { SetStateAction, useEffect, useState } from "react";
import { Info, Pantalla } from "../types/agentes.types";
import { Atributos } from "@/components/post/types/post.types";
import getPublications from "../../../../graphql/lens/queries/publications";
import {
  LimitType,
  Post,
  Profile,
  PublicationType,
} from "../../../../graphql/generated";
import { INFURA_GATEWAY } from "@/lib/constants";
import { manejarJSON } from "@/lib/helpers/manejarJSON";
import { Escena, Sprite } from "@/components/game/types/game.types";
import getProfiles from "../../../../graphql/lens/queries/profiles";

const useAgentes = (
  lensConectado: Profile | undefined,
  setEscenas: (e: SetStateAction<Escena[]>) => void,
  escenas: Escena[]
) => {
  const [pantallaCambio, setPantallaCambio] = useState<Pantalla>(
    Pantalla.Puntaje
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pantalla, setPantalla] = useState(window.innerWidth > 1280);
  const [atributos, setAtributos] = useState<Atributos>();
  const [todosLosNPCs, setTodosLosNPCs] = useState<Sprite[]>([]);
  const [npcsCargando, setNPCsCargando] = useState<boolean>(false);
  const [mostrarMas, setMostrarMas] = useState<boolean>(false);
  const [informacion, setInformacion] = useState<Info[]>([]);

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
          },
        },
        lensConectado?.id
      );

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

  const llamaNPC = async () => {
    setNPCsCargando(true);
    try {
      const sprites = escenas?.flatMap((e) => e.sprites);

      const datos = await getProfiles(
        {
          where: {
            profileIds: sprites?.flatMap(
              (a) => "0x0" + a?.perfil_id?.toString(16)?.split("0x")?.[1]
            ),
          },
        },
        lensConectado?.id
      );

      setTodosLosNPCs(sprites);
      setInformacion(
        sprites?.map((sprite) => ({
          perfil: datos?.data?.profiles?.items?.find(
            (per) =>
              per.id ==
              "0x0" + sprite?.perfil_id?.toString(16)?.split("0x")?.[1]
          ) as Profile,
          auEarned: 0,
          activeJobs: 0,
          currentScore: 0,
          rentPaid: 0,
        }))
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setNPCsCargando(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setPantalla(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!atributos) {
      llamarAtributos();
    }
  }, []);

  useEffect(() => {
    if (!socket) {
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
  }, []);

  useEffect(() => {
    if (escenas?.length > 0) {
      llamaNPC();
    }
  }, [escenas?.length]);

  return {
    pantallaCambio,
    setPantallaCambio,
    atributos,
    pantalla,
    npcsCargando,
    todosLosNPCs,
    mostrarMas,
    setMostrarMas,
    informacion,
  };
};

export default useAgentes;
