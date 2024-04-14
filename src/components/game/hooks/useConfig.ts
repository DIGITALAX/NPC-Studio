"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import RandomWalkerNPC from "./RandomWalkerNPC";

const useConfig = () => {
  const gameRef = useRef<HTMLElement | undefined>(null);
  const parentWidth = 1512;
  const parentHeight = 830;

  useEffect(() => {
    if (typeof window !== "undefined" && gameRef.current) {
      class CustomPhaserScene extends Phaser.Scene {
        muchacho!: Phaser.Physics.Arcade.Sprite;
        escritorio1!: Phaser.GameObjects.Image;
        escritorio2!: Phaser.GameObjects.Image;
        escritorio3!: Phaser.GameObjects.Image;
        escritorio4!: Phaser.GameObjects.Image;
        silla1!: Phaser.GameObjects.Image;
        silla2!: Phaser.GameObjects.Image;
        silla3!: Phaser.GameObjects.Image;
        silla4!: Phaser.GameObjects.Image;
        sofaUno!: Phaser.GameObjects.Image;
        sofaDos!: Phaser.GameObjects.Image;
        panelDeControl!: Phaser.GameObjects.Image;
        frameCount: number;
        npc!: RandomWalkerNPC;

        constructor() {
          super();
          this.frameCount = 0;
        }

        preload() {
          this.load.image(
            "fondo",
            `${INFURA_GATEWAY}/ipfs/QmQho15EawdPjxhZ6QcnFoGHiEV8r2dTS1u7TczQv9cd44`
          );
          this.load.image(
            "pared",
            `${INFURA_GATEWAY}/ipfs/QmcR8PpyDhRaUzJJW5UoxhnyzqNk88imgXS2MGuhgfYsYK`
          );
          this.load.image(
            "nevera",
            `${INFURA_GATEWAY}/ipfs/QmaGoMNwYt7aEgG6AoKGmDdmWUQgshQ8KtASkgoHKgmcS2`
          );
          this.load.image(
            "maquina",
            `${INFURA_GATEWAY}/ipfs/QmVubKFGVcdfZS2pSEhmK8DtpFWbiC8H2BX11VPTd9xnNp`
          );
          this.load.image(
            "sofaUno",
            `${INFURA_GATEWAY}/ipfs/QmQfqKAD2Hepe9kQ9VxBSNmwZrywCvuPrnAr5AiF4bMvwB`
          );
          this.load.image(
            "sofaDos",
            `${INFURA_GATEWAY}/ipfs/QmUFsXQpp1ZZWKWCnHAED4pgZgeLSBnp4ofMz9ae1BkhAR`
          );
          this.load.image(
            "alfombra",
            `${INFURA_GATEWAY}/ipfs/QmQaZhrMnuwkKbP2UbYtnMxRiUcpZfNGyuEhGuqd7xcFAj`
          );
          this.load.image(
            "escritorio1",
            `${INFURA_GATEWAY}/ipfs/QmWtr9iRZ4HiPe1PBxrJfiB9hEQNa3GWxtipt7hqFvBPvs`
          );
          this.load.image(
            "silla1",
            `${INFURA_GATEWAY}/ipfs/QmariT81Kgxw4mNHCt8wGHmgH5avzrZt2r6vNiik4qeSwK`
          );
          this.load.image(
            "escritorio2",
            `${INFURA_GATEWAY}/ipfs/QmTwbtXhizeCxBbZk9Nbd3yrt67kcB7Ytm6sKAzx5rFtCd`
          );
          this.load.image(
            "silla2",
            `${INFURA_GATEWAY}/ipfs/Qmc8VyBMDALMJJknadELsL9SBQuYSuTHpa3e1SqfX61Egn`
          );
          this.load.image(
            "escritorio3",
            `${INFURA_GATEWAY}/ipfs/Qmcy6nTw4YaGj8AEtba2WVm8gYy1vj9LbyMNk9qGptz4ny`
          );
          this.load.image(
            "silla3",
            `${INFURA_GATEWAY}/ipfs/QmUuHUnrMHhusH1JrgG6WonoCUxG1t7LQe348gru2d4uHM`
          );
          this.load.image(
            "escritorio4",
            `${INFURA_GATEWAY}/ipfs/Qmd8VH1yPkPGtxoRM1bdAvLJnjyTG21pgswddCVnECxDHh`
          );
          this.load.image(
            "silla4",
            `${INFURA_GATEWAY}/ipfs/QmfZPky9neYWSuQcZ7wtyajqMCRPBaq7WiPjaab4ZxC8PZ`
          );
          this.load.image(
            "panelDeControl",
            `${INFURA_GATEWAY}/ipfs/QmWMPF4YYvRLGW4F76kufDSxg2LnYojDNZK7cfdkwQxdXw`
          );
          this.load.image(
            "arcade",
            `${INFURA_GATEWAY}/ipfs/QmaNMrJo7TqEpvsveTFJk7zwBbS4SukM3gnuVwhiY5sCoa`
          );
          this.load.image(
            "audio1",
            `${INFURA_GATEWAY}/ipfs/QmYrGLoU35kwH9HyVLi283hG2GzX1fbxuszHT3j1qfAs8G`
          );
          this.load.image(
            "audio2",
            `${INFURA_GATEWAY}/ipfs/QmQA2cgeuAMvLSqj75CWrhmNhKoQV2GKapy94Co6WmWQVi`
          );
          this.load.image(
            "planta1",
            `${INFURA_GATEWAY}/ipfs/QmXYg1FC5zTHXHP1czJmsusC9DT33JCwHnLacYAui1HH84`
          );
          this.load.image(
            "planta2",
            `${INFURA_GATEWAY}/ipfs/QmdcSwsasjt18R7Hey77X6idnW9qz25Q1XkVsHT7inqbm7`
          );
          this.load.image(
            "telefono",
            `${INFURA_GATEWAY}/ipfs/QmSz2dcSRdX9vtxpXH91dS4pe8PAkAakbwfb4mGZNwunkk`
          );
          this.load.image(
            "capsula",
            `${INFURA_GATEWAY}/ipfs/QmYjXKxmyRQHf6fDdqEaNPEdc3W7gcFuNxogsVL38kR3M9`
          );
          this.load.spritesheet(
            "muchacho",
            `${INFURA_GATEWAY}/ipfs/QmUHDrL3JTUMwztqyzr8cUdCjYLpjET9pRXrLTRPtfgSBx`,
            {
              frameWidth: 600,
              frameHeight: 600,
              margin: 0,
              startFrame: 0,
              endFrame: 143,
            }
          );
        }

        create() {
          const fondo = this.add.image(0, 0, "fondo").setOrigin(0, 0);
          fondo.displayWidth = parentWidth;
          fondo.displayHeight = parentHeight;
          const pared = this.physics.add
            .staticImage(fondo.width, 0, "pared")
            .setOrigin(0.62, 0)
            .setScale(1.1);
          pared.scaleX = 1.3;
          pared.body
            .setSize(pared.width, pared.height / 1.5, false)
            .setOffset(-0.5, 0);
          const nevera = this.physics.add
            .staticImage(0, 0, "nevera")
            .setOrigin(0, 0)
            .setScale(1.1);
          nevera.scaleX = 1.4;
          nevera.body
            .setSize(nevera.width * 2, nevera.height * 0.8, false)
            .setOffset(0, 0);
          const maquina = this.physics.add
            .staticImage(
              nevera.width + nevera.width / 2,
              nevera.height / 7,
              "maquina"
            )
            .setOrigin(0, 0)
            .setScale(1.1);
          maquina.scaleX = 1.6;
          maquina.body
            .setSize(maquina.width, maquina.height / 3, false)
            .setOffset(maquina.width, maquina.height / 5);
          const alfombra = this.add
            .image(fondo.width / 4, fondo.height / 2, "alfombra")
            .setOrigin(0, 0)
            .setScale(1.2);
          alfombra.scaleX = 1.5;
          this.sofaUno = this.add
            .image(fondo.width / 1.5, pared.height / 1.4, "sofaUno")
            .setOrigin(0, 0)
            .setScale(1.2);
          this.sofaDos = this.add
            .image(fondo.width / 0.9, pared.height / 1.4, "sofaDos")
            .setOrigin(0, 0)
            .setScale(1.2);

          this.panelDeControl = this.add
            .image(
              Number(parentWidth),
              Number(parentHeight) / 1.1,
              "panelDeControl"
            )
            .setOrigin(1, 1);

          this.escritorio1 = this.add
            .image(
              Number(parentWidth) - 20,
              Number(parentHeight) / 2.2,
              "escritorio1"
            )
            .setOrigin(1, 1);
          this.silla1 = this.add
            .image(
              Number(this.escritorio1.x) - Number(this.escritorio1.width / 2.5),
              this.escritorio1.y,
              "silla1"
            )
            .setOrigin(1, 1);
          this.escritorio2 = this.add
            .image(
              Number(parentWidth) - 20,
              Number(parentHeight) / 1.6,
              "escritorio2"
            )
            .setOrigin(1, 1);
          this.silla2 = this.add
            .image(
              Number(this.escritorio2.x) - Number(this.escritorio2.width / 2.5),
              this.escritorio2.y,
              "silla2"
            )
            .setOrigin(1, 1);

          this.escritorio3 = this.add
            .image(
              Number(parentWidth) - (this.escritorio1.width + 20),
              Number(parentHeight) / 2.2,
              "escritorio3"
            )
            .setOrigin(1, 1);
          this.silla3 = this.add
            .image(
              Number(this.escritorio3.x) - Number(this.escritorio3.width / 2.5),
              this.escritorio3.y,
              "silla3"
            )
            .setOrigin(1, 1);

          this.escritorio4 = this.add
            .image(
              Number(parentWidth) - (this.escritorio2.width + 20),
              Number(parentHeight) / 1.6,
              "escritorio4"
            )
            .setOrigin(1, 1);
          this.silla4 = this.add
            .image(
              Number(this.escritorio4.x) - Number(this.escritorio4.width / 2.5),
              this.escritorio4.y,
              "silla4"
            )
            .setOrigin(1, 1);

          const arcade = this.physics.add
            .staticImage(Number(parentWidth), Number(parentHeight), "arcade")
            .setOrigin(1, 1)
            .setDepth(10000);
          const telefono = this.physics.add
            .staticImage(0, Number(parentHeight), "telefono")
            .setOrigin(0, 1)
            .setDepth(10000);
          telefono.body
            .setSize(telefono.width, telefono.height, false)
            .setOffset(0, -telefono.height / 2);
          const capsula = this.physics.add
            .staticImage(0, Number(parentHeight) - telefono.height, "capsula")
            .setOrigin(0, 1)
            .setDepth(10000);
          capsula.body
            .setSize(capsula.width, capsula.height, false)
            .setOffset(0, -capsula.height / 2);

          this.muchacho = this.physics.add
            .sprite(
              alfombra.x + alfombra.x / 2,
              alfombra.y + alfombra.y / 2,
              "muchacho"
            )
            .setScale(0.5);
          this.cameras.main.startFollow(this.muchacho, true, 0.05, 0.05);

          const audio1 = this.add
            .image(Number(parentWidth) / 2, Number(parentHeight), "audio1")
            .setOrigin(1, 1)
            .setDepth(10000);
          this.add
            .image(
              Number(parentWidth) / 2 + audio1.width,
              Number(parentHeight),
              "audio2"
            )
            .setOrigin(1, 1)
            .setDepth(10000);
          const planta1 = this.add
            .image(Number(parentWidth) / 2.5, Number(parentHeight), "planta1")
            .setOrigin(1, 1)
            .setDepth(10000);
          this.add
            .image(
              Number(parentWidth) / 2.5 - planta1.width,
              Number(parentHeight),
              "planta2"
            )
            .setOrigin(1, 1)
            .setDepth(10000);
          this.physics.world.bounds.width = parentWidth;
          this.physics.world.bounds.height = parentHeight;
          this.cameras.main.setBounds(0, 0, parentWidth, parentHeight);

          this.physics.add.collider(
            this.muchacho,
            capsula,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            telefono,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            arcade,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            pared,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            nevera,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            maquina,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            this.sofaUno,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.physics.add.collider(
            this.muchacho,
            this.sofaDos,
            () => {
              // this.stopCharacterAndPlanNextMove();
            },
            undefined,
            this
          );
          this.muchacho.setCollideWorldBounds(true);

          this.anims.create({
            key: "inactivo",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 132,
              end: 143,
            }),
            frameRate: 0.3,
            repeat: -1,
          });
          this.anims.create({
            key: "arriba",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 0,
              end: 11,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "izquierda",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 24,
              end: 35,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "abajo",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 12,
              end: 23,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "derecha",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 36,
              end: 47,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "izquierdaAbajo",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 72,
              end: 83,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "izquierdaArriba",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 48,
              end: 59,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "derechaArriba",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 60,
              end: 71,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "derechaAbajo",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 84,
              end: 95,
            }),
            frameRate: 3,
            repeat: -1,
          });
          this.anims.create({
            key: "sentadoSofa",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 97,
              end: 108,
            }),
            frameRate: 0.3,
            repeat: -1,
          });
          this.anims.create({
            key: "sentadoEscritorio",
            frames: this.anims.generateFrameNumbers("muchacho", {
              start: 108,
              end: 119,
            }),
            frameRate: 0.3,
            repeat: -1,
          });

          this.npc = new RandomWalkerNPC(this, this.muchacho);
        }
        update() {
          if (this.npc) {
            this.npc.update();
          }

          if (this.frameCount % 10 === 0) {
            this.game.renderer.snapshot((snapshot: any) => {
              const mapaDiv = document.getElementById("mapa");

              if (mapaDiv?.firstChild) {
                mapaDiv.replaceChild(snapshot, mapaDiv.firstChild);
              } else {
                mapaDiv?.appendChild(snapshot);
              }
              snapshot.draggable = false;
              mapaDiv!.style.overflow = "hidden";
              mapaDiv!.style.width = "100%";
              mapaDiv!.style.height = "100%";
            });
          }
          this.frameCount++;
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: gameRef.current.clientWidth,
        height: gameRef.current.clientHeight,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0, x: 0 },
            debug: false,
          },
        },
        scene: [CustomPhaserScene],
        parent: gameRef.current as HTMLElement,
      };

      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
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

  return {
    gameRef,
  };
};

export default useConfig;
