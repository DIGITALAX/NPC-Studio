import RandomWalkerNPC from "./RandomWalkNPC";
import {
  FIXED_HEIGHT,
  FIXED_WIDTH,
  INFURA_GATEWAY,
  NPC_LIST,
} from "../../../../lib/constants";
import Phaser from "phaser";
import { Socket } from "socket.io-client";
const parentWidth = FIXED_WIDTH;
const parentHeight = FIXED_HEIGHT;

export default class NPCEnginePhaser extends Phaser.Scene {
  frameCount: number;
  prof: Phaser.GameObjects.Image[];
  npcs: RandomWalkerNPC[] = [];
  socket: Socket;

  constructor(socket: Socket) {
    super({ key: "NPCEnginePhaser" });
    this.frameCount = 0;
    this.prof = [];
    this.socket = socket;
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
      .staticImage(fondo.width - 170, 110, "pared")
      .setOrigin(0.5, 0.5)
      .setScale(1.3, 1.1);
    pared.body.setSize(fondo.displayWidth, pared.height / 5, false);
    const nevera = this.physics.add
      .staticImage(165, 205, "nevera")
      .setOrigin(0.5, 0.5)
      .setScale(1.4, 1.1);
    nevera.body.setSize(nevera.width, nevera.height / 4, false);
    const maquina = this.physics.add
      .staticImage(nevera.width * 2, 200, "maquina")
      .setOrigin(0.5, 0.5)
      .setScale(1.6, 1.1);
    maquina.body
      .setSize(maquina.width, maquina.height / 3, false)
      .setOffset(0, -60);

    const alfombra = this.add
      .image(fondo.width / 4, fondo.height / 2, "alfombra")
      .setOrigin(0, 0)
      .setScale(1.5, 1.2);
    this.add
      .image(fondo.width / 1.5, pared.height / 1.4, "sofaUno")
      .setOrigin(0, 0)
      .setScale(1.2);
    this.add
      .image(fondo.width / 0.9, pared.height / 1.4, "sofaDos")
      .setOrigin(0, 0)
      .setScale(1.2);

    const escritorio1 = this.physics.add
      .staticImage(Number(parentWidth) - 170, 300, "escritorio1")
      .setOrigin(0.5, 0.5);
    escritorio1.body.setSize(escritorio1.width, escritorio1.height, false);

    const silla1 = this.add
      .image(
        Number(escritorio1.x) + 20,
        escritorio1.y + escritorio1.height / 2,
        "silla1"
      )
      .setOrigin(1, 1);
    const escritorio2 = this.physics.add
      .staticImage(
        Number(parentWidth) - 170,
        escritorio1.y + 130,
        "escritorio2"
      )
      .setOrigin(0.5, 0.5);
    escritorio2.body.setSize(escritorio2.width, escritorio2.height, true);

    const silla2 = this.add
      .image(
        Number(escritorio2.x) + 20,
        escritorio2.y + escritorio2.height / 2,
        "silla2"
      )
      .setOrigin(1, 1);

    const escritorio3 = this.physics.add
      .staticImage(
        escritorio1.x - escritorio1.width / 2 - 170,
        escritorio1.y,
        "escritorio3"
      )
      .setOrigin(0.5, 0.5);
    escritorio3.body.setSize(escritorio3.width, escritorio3.height, true);

    const silla3 = this.add
      .image(
        Number(escritorio3.x) + 20,
        escritorio3.y + escritorio3.height / 2,
        "silla3"
      )
      .setOrigin(1, 1);

    const escritorio4 = this.physics.add
      .staticImage(
        escritorio2.x - escritorio2.width / 2 - 170,
        escritorio2.y,
        "escritorio4"
      )
      .setOrigin(0.5, 0.5);
    escritorio4.body.setSize(escritorio4.width, escritorio4.height, true);

    const silla4 = this.add
      .image(
        Number(escritorio4.x) + 20,
        escritorio4.y + escritorio4.height / 2,
        "silla4"
      )
      .setOrigin(1, 1);
    const panelDeControl = this.physics.add
      .staticImage(
        Number(parentWidth) - 210,
        Number(parentHeight) - 200,
        "panelDeControl"
      )
      .setOrigin(0.5, 0.5);
    panelDeControl.body.setSize(
      panelDeControl.width,
      panelDeControl.height,
      true
    );

    this.physics.add
      .staticImage(
        Number(parentWidth) - 90,
        Number(parentHeight) - 130,
        "arcade"
      )
      .setOrigin(0.5, 0.5)
      .setDepth(10000);
    const telefono = this.physics.add
      .staticImage(50, Number(parentHeight) - 120, "telefono")
      .setOrigin(0.5, 0.5)
      .setDepth(10000);
    telefono.body.setSize(telefono.width, telefono.height, false);
    const capsula = this.physics.add
      .staticImage(50, Number(parentHeight) - telefono.height - 120, "capsula")
      .setOrigin(0.5, 0.5)
      .setDepth(9900);
    capsula.body.setSize(capsula.width, capsula.height, false);

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
    this.cameras.main.setBounds(0, 0, parentWidth, parentHeight);

    this.npcs.push(
      new RandomWalkerNPC(
        this,
        this.socket,
        {
          texture: "muchacho",
          x: alfombra.x + alfombra.x / 2,
          y: alfombra.y + alfombra.y / 2,
        },
        [silla1, silla2, silla3, silla4],
        [
          escritorio1,
          silla1,
          escritorio2,
          silla2,
          escritorio3,
          silla3,
          escritorio4,
          silla4,
          panelDeControl,
        ],
        true
      )
    );
  }

  update() {
    if (this.npcs.length > 0) {
      this.npcs.forEach((npc) => npc.update());
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

  setCameraTarget(chosenNpc: number) {
    this.npcs.forEach((npc) => {
      if (NPC_LIST[chosenNpc].texture === npc.texture.key) {
        npc.makeCameraFollow();
      }
    });
  }
}
