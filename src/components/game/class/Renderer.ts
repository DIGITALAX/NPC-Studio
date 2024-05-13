import RandomWalkerNPC from "./RandomWalkNPC";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import Phaser from "phaser";
import { Articulo, Escena, Estado, Seat } from "../types/game.types";

export default class NPCEnginePhaser extends Phaser.Scene {
  private frameCount!: number;
  private npcs!: { [textureKey: string]: RandomWalkerNPC };
  private socket!: WebSocket;
  private escena: Escena | null;
  private sceneKey!: string;
  private seatsTaken: Seat[];
  private npcCamara!: string;
  private esperandoRespuesta: boolean;
  private caminosInciales: {
    [textureKey: string]: Estado[];
  } = {};

  constructor() {
    super({ key: "NPCEnginePhaser" });
    this.seatsTaken = [];
    this.escena = null;
    this.esperandoRespuesta = false;
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
    this.npcs = {};
    this.configurarEscena();
  }

  private configurarEscena() {
    if (this.socket)
      this.socket.onmessage = (evento) => {
        const datos = JSON.parse(evento.data);
        const nombre = datos.nombre;
        const valores = datos.datos;

        if (nombre === "configurarEscena") {
          if (valores?.estados) {
            this.escena = valores.escena;
            if (valores?.estados?.length > 0)
              valores?.estados?.forEach((estado: Estado[]) => {
                this.caminosInciales[estado[0]?.npc_etiqueta] = estado;
              });

            if (
              this.escena &&
              this.escena?.clave == this.sceneKey &&
              this.escena?.fondo?.uri &&
              this.escena?.clave &&
              this.load &&
              this.load.isReady()
            ) {
              this.preload();
            }
          }
        } else if (nombre === this.sceneKey) {
          this.esperandoRespuesta = false;
          valores?.forEach((npcData: Estado[]) => {
            if (npcData?.length > 0)
              this.npcs[npcData?.[0].npc_etiqueta].camino.push(...npcData);
          });
        }
      };
  }

  preload() {
    if (
      this.escena &&
      this.escena?.clave == this.sceneKey &&
      this.escena?.fondo?.uri &&
      this.escena.clave &&
      this.load &&
      this.load.isReady() &&
      this.sys.isActive() &&
      !this.load.isLoading()
    ) {
      this.load.image(
        this.escena?.fondo.etiqueta!,
        `${INFURA_GATEWAY}/ipfs/${this.escena?.fondo.uri}`
      );
      this.escena?.objetos.forEach((obj) => {
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
            frameWidth: sprite.anchura_borde,
            frameHeight: sprite.altura_borde,
            margin: sprite.margen,
            startFrame: sprite.marco_inicio,
            endFrame: sprite.marco_final,
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
      Object.values(this.npcs).length < 1 &&
      this.escena?.clave == this.sceneKey &&
      this.escena.clave &&
      this.load
    ) {
      this.add
        .image(
          this.escena?.fondo.sitio.x!,
          this.escena?.fondo.sitio.y!,
          this.escena?.fondo.etiqueta!
        )
        .setOrigin(0, 0)
        .setSize(this.escena?.fondo.anchura!, this.escena?.fondo.altura!)
        .setDisplaySize(this.escena?.fondo.anchura!, this.escena?.fondo.altura!)
        .setDepth(0);

      let sillas: Seat[] = [];
      let profundidad: (Articulo & { image: Phaser.GameObjects.Image })[] = [];

      this.escena.objetos.forEach((obj) => {
        this.add
          .image(obj.sitio.x, obj.sitio.y, obj.etiqueta)
          .setOrigin(0.5, 0.5)
          .setSize(obj.talla.x, obj.talla.y)
          .setScale(obj.escala.x, obj.escala.y)
          .setDisplaySize(obj.talla.x, obj.talla.y)

          .setDepth(
            obj?.profundidad !== undefined && profundidad !== null
              ? obj.profundidad
              : obj.sitio.y
          );
      });

      this.escena.profundidad.forEach((obj) => {
        const item = this.add
          .image(obj.sitio.x, obj.sitio.y, obj.etiqueta)
          .setOrigin(0.5, 0.5)
          .setSize(obj.talla.x, obj.talla.y)
          .setScale(obj.escala.x, obj.escala.y)
          .setDisplaySize(obj.talla.x, obj.talla.y)
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
          .setSize(silla.talla.x, silla.talla.y)
          .setScale(silla.escala.x, silla.escala.y)
          .setDisplaySize(silla.talla.x, silla.talla.y)
          .setDepth(
            silla.depth !== undefined && silla.depth !== null
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
        this.escena?.mundo?.anchura,
        this.escena?.mundo?.altura
      );

      this.escena.sprites.forEach((sprite) => {
        this.npcs[sprite.etiqueta] = new RandomWalkerNPC(
          this,
          sprite,
          sillas,
          this.seatsTaken,
          this.caminosInciales[sprite.etiqueta],
          sprite.etiqueta === this.npcCamara
        );

        if (sprite.etiqueta === this.npcCamara) {
          this.npcs[sprite.etiqueta].makeCameraFollow();
        }
      });

      this.game.events.on("hidden", () => {
        this.scene.pause();
      });

      this.game.events.on("visible", () => {
        this.scene.resume();
      });

      this.load.reset();
    }
  }

  update(time: number) {
    if (
      Object.values(this.npcs).length > 0 &&
      this.escena?.clave == this.sceneKey &&
      this.escena?.clave &&
      this.socket.readyState == WebSocket.OPEN
    ) {
      Object.values(this.npcs).forEach((npc) => npc.update());

      if (
        Object.values(this.npcs).every((npc) => npc.camino.length < 15) &&
        !this.esperandoRespuesta
      ) {
        this.esperandoRespuesta = true;
        this.socket.send(
          JSON.stringify({ tipo: "datosDeEscena", clave: this.sceneKey })
        );
      }

      if (this.frameCount % 10 === 0) {
        this.game.renderer.snapshot(
          (snapshot: HTMLImageElement | Phaser.Display.Color) => {
            const mapaDiv = document.getElementById("mapa");
            if (mapaDiv) {
              let snapshotImage = mapaDiv.querySelector("img");
              if (!snapshotImage) {
                snapshotImage = document.createElement("img");
                mapaDiv.appendChild(snapshotImage);
              }

              snapshotImage.src = (snapshot as HTMLImageElement).currentSrc;
              snapshotImage.id = (snapshot as HTMLImageElement).currentSrc;
              (snapshot as HTMLImageElement).draggable = false;
              mapaDiv.style.overflow = "hidden";
              mapaDiv.style.width = "100%";
              mapaDiv.style.height = "100%";
            }
          }
        );
      }
      this.frameCount++;
    }
  }

  setCameraTarget(chosenNpc: string) {
    Object.values(this.npcs).forEach((npc) => {
      if (chosenNpc === npc.texture.key) {
        npc.makeCameraFollow();
      }
    });
  }

  destruir() {
    Object.values(this.npcs).forEach((npc) => {
      npc.stop();
      npc.destroy();
    });
    this.npcs = {};
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
