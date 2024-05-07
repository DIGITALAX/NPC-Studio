"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import NPCEnginePhaser from "../class/Renderer";
import { PhaserGameElement } from "../types/game.types";
import io, { Socket } from "socket.io-client";
import { SCENE_LIST } from "../../../../lib/constants";

const useConfig = (
  chosenNpc: string,
  sceneKey: string,
  setNpc: (npc: SetStateAction<string>) => void,
  setCargando: (e: SetStateAction<boolean>) => void
) => {
  const gameRef = useRef<PhaserGameElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [juego, setJuego] = useState<Phaser.Game | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const crearEscena = (newSocket: Socket) => {
    setCargando(true);
    try {
      newSocket.emit("enviarSceneIndex", sceneKey);

      if (
        typeof window !== "undefined" &&
        gameRef.current &&
        newSocket?.connected
      ) {
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
          SCENE_LIST.find((clave) => clave.key == sceneKey)?.sprites[0]?.key!
        );
        const game = new Phaser.Game(config);
        game.registry.set("socket", newSocket);
        game.registry.set("sceneKey", sceneKey);
        game.registry.set(
          "chosenNpc",
          SCENE_LIST.find((clave) => clave.key == sceneKey)?.sprites[0]?.key!
        );

        game.events.once("ready", () => {
          game.scene.scenes.forEach((scene) => {
            if (scene instanceof NPCEnginePhaser) {
              scene.events.once("render", () =>
                setTimeout(() => setCargando(false), 2000)
              );
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
      const newSocket = io(
        "https://npc-server.onrender.com",
        // "http://localhost:3000",
        {
          transports: ["websocket"],
          port: 10000,
          // port: 3000,
          reconnection: true,
          query: { key: process.env.NEXT_PUBLIC_RENDER_KEY },
          reconnectionAttempts: 5,
          reconnectionDelay: 3000,
          autoConnect: true,
          withCredentials: true,
        }
      );
      newSocket.connect();

      setSocket(newSocket);

      newSocket.on("connect", () => {
        crearEscena(newSocket);
      });

      return () => {
        if (newSocket !== null && newSocket.active && newSocket.connected) {
          newSocket.close();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (gameRef.current && juego?.scene?.scenes) {
      const customScene = juego?.scene?.scenes.find(
        (scene) =>
          scene.scene.key === "NPCEnginePhaser" || scene.scene.key === "default"
      );
      if (customScene) {
        (customScene as any).setCameraTarget(chosenNpc);
      }
    }
  }, [chosenNpc, juego?.scene?.scenes, gameRef.current, socket]);

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
    if (socket?.active && juego?.scene) {
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
