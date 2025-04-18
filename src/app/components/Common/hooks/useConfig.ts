"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { AutographType, Escena, PhaserGameElement} from "../types/common.types";
import NPCEnginePhaser from "../class/Renderer";

const useConfig = (
  chosenNpc: string | undefined,
  sceneKey: string,
  setNpc: (npc: SetStateAction<string | undefined>) => void,
  setCargando: (e: SetStateAction<boolean>) => void,
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          disenadores: string[];
          tipo: AutographType;
        }
      | undefined
    >
  ) => void,
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenadores: string[];
        tipo: AutographType;
      }
    | undefined,
  abierto: boolean,
  setEscenas: (e: SetStateAction<Escena[]>) => void,
  escenas: Escena[]
) => {
  const gameRef = useRef<PhaserGameElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [juego, setJuego] = useState<Phaser.Game | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const crearEscena = (newSocket: WebSocket) => {
    setCargando(true);
    try {
      newSocket.send(
        JSON.stringify({ tipo: "indiceDeEscena", clave: sceneKey })
      );

      if (typeof window !== "undefined" && gameRef.current && newSocket?.OPEN) {
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: gameRef.current?.clientWidth,
          height: gameRef.current?.clientHeight,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { y: 0, x: 0 },
            },
          },

          scene: NPCEnginePhaser,
          parent: gameRef?.current,
        };
        setNpc(
          escenas.find((clave) => clave.clave == sceneKey)?.sprites[0]
            ?.account_address!
        );
        const game = new Phaser.Game(config);
        game.registry.set("socket", newSocket);
        game.registry.set("sceneKey", sceneKey);
        game.registry.set(
          "chosenNpc",
          escenas.find((clave) => clave.clave == sceneKey)?.sprites[0]
            ?.etiqueta!
        );
        game.registry.set(
          "setManejarMostrarArticulo",
          setManejarMostrarArticulo
        );

        game.events.once("ready", () => {
          game.scene.scenes.forEach((scene) => {
            if (scene instanceof NPCEnginePhaser) {
              scene.events.once("render", () =>
                setTimeout(() => setCargando(false), 3000)
              );

              scene.events.once("npcs", (todoInfo: Escena[]) => {
                setEscenas(todoInfo);
              });

              scene.events.on("grab", () => {
                chosenNpc && setNpc(undefined);
              });
            }
          });
          game.scene.start("NPCEnginePhaser");
        });

        setJuego(game);

        return () => {
          game.destroy(true);
        };
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
        `ws://127.0.0.1:8080?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`

        // `wss://npc-rust-engine.onrender.com?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`
      );

      setSocket(newSocket);

      newSocket.onopen = () => {
        crearEscena(newSocket);
      };

      newSocket.onerror = (error) => {
        console.error(error);
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
    if (gameRef.current && juego?.scene?.scenes && chosenNpc) {
      const customScene = juego?.scene?.scenes.find(
        (scene) =>
          scene.scene.key === "NPCEnginePhaser" || scene.scene.key === "default"
      );
      if (customScene) {
        (customScene as any).setCameraTarget(escenas?.flatMap((es) => es.sprites.find((spr) => spr.account_address == chosenNpc)?.etiqueta)?.[0]);
      }
    }
  }, [chosenNpc, juego?.scene?.scenes, gameRef.current, socket]);

  useEffect(() => {
    const customScene = juego?.scene?.scenes.find(
      (scene) =>
        scene.scene.key === "NPCEnginePhaser" || scene.scene.key === "default"
    );
    if (customScene) {
      (customScene as any).setEstadoDePantalla(
        manejarMostrarArticulo || abierto ? true : false
      );
    }
  }, [manejarMostrarArticulo, abierto]);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.src = "//cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.js";
      script.async = true;
      scriptRef.current = script;
      document.body.appendChild(script);
    }

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (socket?.OPEN && juego?.scene) {
      juego.scene.scenes.forEach((scene) => {
        if (scene instanceof NPCEnginePhaser) {
          scene.destruir();
        }
      });
      juego.events.removeAllListeners();
      juego.destroy(true);
      setJuego(null);
      crearEscena(socket);
    }
  }, [sceneKey]);

  return {
    gameRef,
  };
};

export default useConfig;
