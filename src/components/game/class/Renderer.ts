import RandomWalkerNPC from "./RandomWalkNPC";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import { Articulo, Direccion, Escena, Seat } from "../types/game.types";

export default class NPCEnginePhaser extends Phaser.Scene {
  frameCount!: number;
  prof!: Phaser.GameObjects.Image[];
  npcs!: RandomWalkerNPC[];
  socket!: Socket;
  escena: Escena | null = null;
  locations: { x: number; y: number; texture: string }[] = [];
  sceneKey!: string;
  npcCamara!: number;

  constructor() {
    super({ key: "NPCEnginePhaser" });
  }

  init() {
    this.socket = this.game.registry.get("socket");
    this.sceneKey = this.game.registry.get("sceneKey");
    this.npcCamara = this.game.registry.get("chosenNpc");

    if (this.load && this.load.isLoading()) {
      this.load.reset();
      this.load.removeAllListeners();
    }
    this.frameCount = 0;
    this.prof = [];
    this.npcs = [];
    this.configurarEscena();
  }

  private configurarEscena() {
    if (this.socket)
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

          if (
            this.escena &&
            this.escena?.key == this.sceneKey &&
            this.escena?.fondo?.uri &&
            this.escena.key &&
            this.load &&
            this.load.isReady()
          ) {
            this.preload();
          }
        }
      );
  }

  preload() {
    if (
      this.escena &&
      this.escena?.key == this.sceneKey &&
      this.escena?.fondo?.uri &&
      this.escena.key &&
      this.load &&
      this.load.isReady() && this.sys.isActive() && !this.load.isLoading()
    ) {
      this.load.image(
        this.escena?.fondo.etiqueta!,
        `${INFURA_GATEWAY}/ipfs/${this.escena?.fondo.uri}`
      );
      this.escena?.objects.forEach((obj) => {
        this.load.image(obj.etiqueta, `${INFURA_GATEWAY}/ipfs/${obj.uri}`);
      });
      this.escena?.sillas.forEach((obj) => {
        this.load.image(obj.etiqueta, `${INFURA_GATEWAY}/ipfs/${obj.uri}`);
      });
      this.escena?.profundidad.forEach((obj) => {
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

      this.load.once("complete", this.cargarRecursos, this);
      this.load.start();
    }
  }

  cargarRecursos() {
    if (this.scene.isActive()) {
      this.create();
    }
    this.load.reset();
  }

  create() {
    if (
      this.escena &&
      this.npcs.length < 1 &&
      this.escena?.key == this.sceneKey &&
      this.escena.key &&
      this.load
    ) {
      const fondo = this.add
        .image(
          this.escena?.fondo.sitio.x!,
          this.escena?.fondo.sitio.y!,
          this.escena?.fondo.etiqueta!
        )
        .setOrigin(0, 0)
        .setDepth(0);
      fondo.displayWidth = this.escena?.fondo.displayWidth!;
      fondo.displayHeight = this.escena?.fondo.displayHeight!;

      let sillas: Seat[] = [];
      let profundidad: (Articulo & { image: Phaser.GameObjects.Image })[] = [];

      this.escena.objects.forEach((obj) => {
        this.add
          .image(obj.sitio.x, obj.sitio.y, obj.etiqueta)
          .setOrigin(0.5, 0.5)
          .setScale(obj.escala.x, obj.escala.y)
          .setDepth(
            obj?.profundidad !== undefined ? obj.profundidad : obj.sitio.y
          );
      });

      this.escena.profundidad.forEach((obj) => {
        const item = this.add
          .image(obj.sitio.x, obj.sitio.y, obj.etiqueta)
          .setOrigin(0.5, 0.5)
          .setScale(obj.escala.x, obj.escala.y)
          .setDepth(obj.sitio.y);

        profundidad.push({
          ...obj,
          image: item,
        });
      });

      this.escena.sillas.forEach((silla) => {
        const item = this.add
          .image(silla.sitio.x, silla.sitio.y, silla.etiqueta)
          .setOrigin(0.5, 0.5)
          .setScale(silla.escala.x, silla.escala.y)
          .setDepth(
            silla.depth !== undefined
              ? silla.depth
              : silla.par
              ? this.escena?.profundidad?.find(
                  (item) => item.etiqueta == (silla.par as any)
                )?.sitio.y!
              : silla.sitio.y!
          );

        let par = undefined;
        if (silla?.par) {
          par = profundidad?.find(
            (item) => item?.etiqueta == (silla?.par as any)
          )?.image;
        }

        sillas.push({
          ...silla,
          image: item,
          par,
        });
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
            sprite,
            this.locations.find((item) => item.texture == sprite.etiqueta)!,
            sillas,
            sprite.etiqueta === this.escena?.sprites?.[this.npcCamara]?.etiqueta
          )
        )
      );

      this.socket.on(
        this.sceneKey,
        (
          data: {
            direccion: Direccion;
            velocidadX: number;
            velocidadY: number;
            npcX: number;
            npcY: number;
            randomSeat: Seat | null;
            texture: string;
          }[]
        ) => {
          this.npcs.forEach((npc, index) => {
            const filtered = data?.find(
              (item) => item.texture == npc.texture.key
            );
            npc.actualizarAnimacion(filtered!);
          });
        }
      );

      this.load.reset();
    }
  }

  update() {
    if (
      this.npcs.length > 0 &&
      this.escena?.key == this.sceneKey &&
      this.escena?.key
    ) {
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
      if (this.escena?.sprites?.[chosenNpc].etiqueta === npc.texture.key) {
        npc.makeCameraFollow();
      }
    });
  }

  destruir() {
    this.npcs.forEach((npc) => {
      npc.stop();
      npc.destroy();
    });
    this.npcs = [];
    this.load.off("complete", this.cargarRecursos, this);
    this.sys.events.removeAllListeners();
    this.sys.events.destroy();
    if (this.load.isLoading()) {
      this.load.reset();
      this.load.removeAllListeners();
    }
    this.scene.stop("NPCEnginePhaser");
    this.scene.remove("NPCEnginePhaser");
  }
}
