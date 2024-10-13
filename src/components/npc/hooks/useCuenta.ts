import lensSeguir from "@/lib/helpers/lensSeguir";
import { SetStateAction, useEffect, useState } from "react";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import { Profile } from "../../../../graphql/generated";
import { Indexar } from "@/components/common/types/common.types";
import { Escena, Sprite } from "@/components/game/types/game.types";
import getProfile from "../../../../graphql/lens/queries/profile";

const useCuenta = (
  handle: string,
  lensConectado: Profile | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  setEscenas: (e: SetStateAction<Escena[]>) => void,
  escenas: Escena[]
) => {
  const [cuentaCargando, setCuentaCargando] = useState<boolean>(true);
  const [seguirCargando, setSeguirCargando] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<Profile | undefined>();
  const [npc, setNPC] = useState<Sprite | undefined>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const seguirNpc = async () => {
    setSeguirCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensSeguir(
        true,
        "0x0" + (npc as Sprite)?.perfil_id.toString(16)?.split("0x")?.[1],
        lensConectado?.ownedBy?.address,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setSeguirCargando(false);
  };

  const dejarNpc = async () => {
    setSeguirCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });
      await lensSeguir(
        false,
        "0x0" + (npc as Sprite)?.perfil_id.toString(16)?.split("0x")?.[1],
        lensConectado?.ownedBy?.address,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setSeguirCargando(false);
  };

  const llamaNPC = async () => {
    setCuentaCargando(true);
    try {
      const datos = await getProfile(
        {
          forHandle: "lens/" + handle,
        },
        lensConectado?.id
      );

      setPerfil(datos?.data?.profile as Profile);

      const sprite = escenas
        ?.find((e) =>
          e.sprites?.find(
            (s) =>
              "0x0" + s.perfil_id?.toString(16)?.split("0x")?.[1] ==
              datos?.data?.profile?.id
          )
        )
        ?.sprites?.find(
          (n) =>
            "0x0" + n.perfil_id?.toString(16)?.split("0x")?.[1] ==
            datos?.data?.profile?.id
        )!;

      //   const perfiles = await getProfiles(
      //     {
      //       where: {
      //         profileIds: sprite.prompt.amigos?.flatMap(
      //           (a) => "0x0" + a?.toString(16)?.split("0x")?.[1]
      //         ),
      //       },
      //     },
      //     lensConectado?.id
      //   );

      //   const amigos = sprite.prompt.amigos
      //     .map(
      //       (amigo) =>
      //         escenas.flatMap((s) => s.sprites).find((s) => s.perfil_id == amigo)!
      //     )
      //     ?.map((a, i) => ({
      //       ...a,
      //       handle:
      //         perfiles?.data?.profiles?.items?.[i]?.handle?.suggestedFormatted
      //           ?.localName!,
      //     }));

      setNPC({ ...sprite });
      //   setNPC({ ...sprite, amigos });
    } catch (err: any) {
      console.error(err.message);
    }
    setCuentaCargando(false);
  };

  useEffect(() => {
    if (!socket && handle) {
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
  }, [handle]);

  useEffect(() => {
    if (escenas?.length > 0) {
      llamaNPC();
    }
  }, [escenas?.length]);

  return {
    cuentaCargando,
    perfil,
    npc,
    dejarNpc,
    seguirCargando,
    seguirNpc,
  };
};

export default useCuenta;
