import { Direccion, Seat, Sprite } from "./../types/game.types";
import Phaser from "phaser";
import { Socket } from "socket.io-client";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  private readonly sceneKey: string;
  private npc!: Phaser.Physics.Arcade.Sprite;
  private seats: Seat[];
  private seatTaken: Seat | null = null;
  private socket: Socket;
  private direccionActual: {
    x: number;
    y: number;
    anim: Direccion;
    vx: number;
    vy: number;
  } | null = null;

  constructor(
    scene: Phaser.Scene,
    socket: Socket,
    sprite: Sprite,
    location: { x: number; y: number },
    seats: Seat[],
    cam: boolean,
    sceneKey: string
  ) {
    super(scene, sprite.x, sprite.y, sprite.etiqueta);
    this.scene.physics.world.enable(this);
    this.socket = socket;
    this.seats = seats;
    this.sceneKey = sceneKey;

    this.configureSprite(sprite, cam, location);
  }

  update() {
    if (this.direccionActual && this.npc) {
      this.npc.anims.play(this.direccionActual.anim, true);
      this.npc.setVelocity(
        this.direccionActual.vx * 60,
        this.direccionActual.vy * 60
      );

      this.manejarProfundidad();
    }
  }

  private configureSprite(
    ops: Sprite,
    cam: boolean,
    location: { x: number; y: number }
  ) {
    if (!this.npc) {
      this.npc = this.scene.physics.add
        .sprite(location.x, location.y, ops.etiqueta)
        .setScale(ops.escala.x, ops.escala.y)
        .setOrigin(0.5, 0.5)
        .setDepth(location.y);
      this.npc.body?.setSize(ops.displayWidth, ops.displayHeight, true);
      this.configurarAnimaciones();
      this.actualizarAnimacion();

      cam && this.makeCameraFollow();
    }
  }

  private actualizarAnimacion() {
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
        const filtered = data?.find(
          (item) => item.texture == this.npc.texture.key
        );
        if (filtered) {
          this.direccionActual = {
            x: filtered.npcX,
            y: filtered.npcY,
            anim: filtered.direccion,
            vx: filtered.velocidadX,
            vy: filtered.velocidadY,
          };

          this.anims.play(filtered.direccion, true);
          this.npc.setPosition(filtered.npcX, filtered.npcY);
          this.npc.setVelocity(filtered.velocidadX, filtered.velocidadY);

          if (
            filtered.direccion == Direccion.Silla ||
            filtered.direccion == Direccion.Sofa
          ) {
            this.goSit(filtered.randomSeat!);
          } else if (this.seatTaken) {
            const found = this.seats.find(
              (seat) =>
                seat.image.texture?.key == filtered?.randomSeat?.etiqueta
            );
            found?.image.setDepth(found?.par?.y!);
            this.seatTaken = null;
          }
        }
      }
    );
  }

  private goSit(randomSeat: Seat) {
    const foundSeat = this.seats.find(
      (seat) => seat.image.texture?.key == randomSeat.etiqueta
    );
    if (foundSeat) {
      this.seatTaken = foundSeat;

      if (randomSeat?.profundidad && randomSeat?.par) {
        this.npc.setDepth(foundSeat?.par?.depth! + 10);
        foundSeat?.image?.setDepth(this.npc.depth + 10);
      }
    }
  }

  private manejarProfundidad() {
    if (!this.seatTaken) this.npc.setDepth(this.npc!.y);
  }
  private async configurarAnimaciones() {
    this.scene.anims.create({
      key: Direccion.Inactivo,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 132,
        end: 143,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Arriba,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 0,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Izquierda,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 24,
        end: 35,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Abajo,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 12,
        end: 23,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Derecha,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 36,
        end: 47,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.IzquierdaAbajo,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 72,
        end: 83,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.IzquierdaArriba,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 48,
        end: 59,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.DerechaArriba,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 60,
        end: 71,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.DerechaAbajo,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 84,
        end: 95,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Sofa,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 97,
        end: 108,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: Direccion.Silla,
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 108,
        end: 119,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
  }
  makeCameraFollow() {
    this.scene.cameras.main.startFollow(this.npc, true, 0.05, 0.05);
  }
}
