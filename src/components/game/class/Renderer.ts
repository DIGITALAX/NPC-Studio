import RandomWalkerNPC from "./RandomWalkNPC";
import { INFURA_GATEWAY, NPC_LIST } from "../../../../lib/constants";
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import { Direccion, Escena, Seat } from "../types/game.types";

export default class NPCEnginePhaser extends Phaser.Scene {
  frameCount: number;
  prof: Phaser.GameObjects.Image[];
  npcs: RandomWalkerNPC[] = [];
  socket: Socket;
  escena: Escena | null = null;
  locations: { x: number; y: number; texture: string }[] = [];
  readonly sceneKey: string;

  constructor(socket: Socket, sceneKey: string) {
    super({ key: "NPCEnginePhaser" });
    this.frameCount = 0;
    this.prof = [];
    this.socket = socket;
    this.sceneKey = sceneKey;
    this.configurarEscena();
  }

  private configurarEscena() {
    this.socket.on(
      "configurarEscena",
      (data: {
        scene: Escena;
        state: {
          direccion: Direccion;
          velocidadX: number;
          velocidadY: number;
          npcX: number;
          npcY: number;
          texture: string;
          randomSeat: Seat | null;
        }[];
      }) => {
        this.escena = data.scene;
        this.locations = data.state.map((item) => ({
          x: item.npcX,
          y: item.npcY,
          texture: item.texture,
        }));

        if (this.escena) {
          this.preload();
        }
      }
    );
  }

  preload() {
    if (this.escena) {
      this.load.image(
        this.escena?.fondo.etiqueta!,
        `${INFURA_GATEWAY}/ipfs/${this.escena?.fondo.uri}`
      );
      this.escena?.objects.forEach((obj) => {
        this.load.image(obj.etiqueta, `${INFURA_GATEWAY}/ipfs/${obj.uri}`);
      });
      this.escena?.sprites.forEach((sprite) => {
        this.load.spritesheet(
          sprite.etiqueta,
          `${INFURA_GATEWAY}/ipfs/${sprite.uri}`,
          {
            frameWidth: sprite.frameWidth,
            frameHeight: sprite.frameHeight,
            margin: sprite.margin,
            startFrame: sprite.startFrame,
            endFrame: sprite.endFrame,
          }
        );
      });
    }

    this.load.on("complete", () => {
      this.create();
    });

    this.load.start();
  }

  create() {
    if (this.escena) {
      const fondo = this.add
        .image(
          this.escena?.fondo.sitio.x!,
          this.escena?.fondo.sitio.y!,
          this.escena?.fondo.etiqueta!
        )
        .setOrigin(this.escena?.fondo.origen.x!, this.escena?.fondo.origen.y!);
      fondo.displayWidth = this.escena?.fondo.displayWidth!;
      fondo.displayHeight = this.escena?.fondo.displayHeight!;

      let seats: Phaser.GameObjects.Image[] = [];
      let profound: Phaser.GameObjects.Image[] = [];
      this.escena?.objects.forEach((obj) => {
        const item = this.add
          .image(obj.sitio.x, obj.sitio.y, obj.etiqueta)
          .setOrigin(obj.origen.x, obj.origen.y)
          .setScale(obj.escala.x, obj.escala.y)
          .setDepth(obj.depth);

        if (obj?.seatInfo) {
          seats.push(item);
        }

        if (obj?.profound) {
          profound.push(item);
        }
      });

      this.cameras.main.setBounds(
        0,
        0,
        this.escena?.world?.width,
        this.escena?.world?.height
      );

      this.escena.sprites.forEach((sprite) =>
        this.npcs.push(
          new RandomWalkerNPC(
            this,
            this.socket,
            sprite,
            this.locations.find((item) => item.texture == sprite.etiqueta)!,
            seats,
            profound,
            true,
            this.sceneKey
          )
        )
      );

      this.escena.evitar.forEach((obstacle, index) => {
        let color = Phaser.Display.Color.RandomRGB();
        let hexColor = Phaser.Display.Color.GetColor(
          color.red,
          color.green,
          color.blue
        );

        let topLeftX = obstacle.x - obstacle.displayWidth / 2;
        let topLeftY = obstacle.y - obstacle.displayHeight / 2;

        let graphics = this.add.graphics({ fillStyle: { color: hexColor } });
        graphics.fillRect(
          topLeftX,
          topLeftY,
          obstacle.displayWidth,
          obstacle.displayHeight
        );
        graphics.lineStyle(2, 0x000000);
        graphics.strokeRect(
          topLeftX,
          topLeftY,
          obstacle.displayWidth,
          obstacle.displayHeight
        );
      });
    }
  }

  update() {
    if (this.npcs.length > 0) {
      this.npcs.forEach((npc) => npc.update());

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

  setCameraTarget(chosenNpc: number) {
    this.npcs.forEach((npc) => {
      if (NPC_LIST[chosenNpc].texture === npc.texture.key) {
        npc.makeCameraFollow();
      }
    });
  }
}
