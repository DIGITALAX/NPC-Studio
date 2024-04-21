"use client";

import { useEffect, useRef, useState } from "react";
import NPCEnginePhaser from "../class/Renderer";
import { PhaserGameElement } from "../types/game.types";
import io, { Socket } from "socket.io-client";

const useConfig = (chosenNpc: number) => {
  const gameRef = useRef<PhaserGameElement | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  useEffect(() => {
    if (!socket) {
      const newSocket = io("ws://localhost:3000", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        autoConnect: true,
        upgrade: false,
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "header-value",
        },
      });
      newSocket.connect();

      setSocket(newSocket);

      newSocket.on("connect", () => {
        newSocket.emit("enviarSceneIndex", sceneIndex);

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
                debug: true,
                debugShowBody: true,
                debugShowStaticBody: true,
                debugShowVelocity: true,
              },
            },
            scene: [new NPCEnginePhaser(newSocket)],
            parent: gameRef?.current,
          };

          const game = new Phaser.Game(config);

          return () => {
            game.destroy(true);
          };
        }
      });

      return () => {
        newSocket.close();
      };
    }
  }, []);

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
    if (gameRef.current && gameRef.current.game && gameRef.current.game.scene) {
      const scenes = gameRef.current.game.scene.getScenes(true);
      const customScene = scenes.find(
        (scene) => scene.scene.key === "NPCEnginePhaser"
      );
      if (customScene) {
        (customScene as any).setCameraTarget(chosenNpc);
      }
    }
  }, [chosenNpc]);

  return {
    gameRef,
  };
};

export default useConfig;
