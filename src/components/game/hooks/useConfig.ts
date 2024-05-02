"use client";

import { useEffect, useRef, useState } from "react";
import NPCEnginePhaser from "../class/Renderer";
import { PhaserGameElement } from "../types/game.types";
import io, { Socket } from "socket.io-client";
import jwt from "jsonwebtoken";

const useConfig = (chosenNpc: number, sceneKey: string) => {
  const gameRef = useRef<PhaserGameElement | null>(null);
  const [juego, setJuego] = useState<Phaser.Game | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const crearEscena = (newSocket: Socket) => {
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

        const game = new Phaser.Game(config);
        game.registry.set("socket", newSocket);
        game.registry.set("sceneKey", sceneKey);
        game.registry.set("chosenNpc", chosenNpc);

        game.events.once("ready", () => {
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
      const newSocket = io("https://npc-server.onrender.com:10000", {
        transports: ["websocket"],
        port: 10000,
        reconnection: true,
        query: { key: process.env.NEXT_PUBLIC_RENDER_KEY },
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        autoConnect: true,
        upgrade: false,
        withCredentials: true,
        // extraHeaders: {
        //   "my-custom-header": "header-value",
        // },
      });
      newSocket.connect();

      setSocket(newSocket);

      newSocket.on("connect", () => {
        crearEscena(newSocket);
      });

      return () => {
        newSocket.close();
      };
    }
  }, []);

  useEffect(() => {
    if (gameRef.current && juego?.scene) {
      const customScene = juego?.scene?.scenes.find(
        (scene) => scene.scene.key === "NPCEnginePhaser"
      );

      if (customScene) {
        (customScene as any).setCameraTarget(chosenNpc);
      }
    }
  }, [chosenNpc]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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
