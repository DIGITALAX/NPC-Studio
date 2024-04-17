import io, { Socket } from "socket.io-client";
import { Direccion, Seat } from "../types/game.types";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  npc!: Phaser.Physics.Arcade.Sprite;
  prof: Phaser.GameObjects.Image[];
  obs: Phaser.GameObjects.Image[];
  seatTaken: Seat | null = null;
  socket: Socket | null = null;

  constructor(
    scene: Phaser.Scene,
    socket: Socket | null,
    sprite: {
      texture: string;
      x: number;
      y: number;
    },
    obs: Phaser.GameObjects.Image[],
    prof: Phaser.GameObjects.Image[],
    cam: boolean
  ) {
    super(scene, sprite.x, sprite.y, sprite.texture);
    this.scene.physics.world.enable(this);
    this.prof = prof;
    this.obs = obs;
    this.socket = socket;
    this.configureSprite({
      ...sprite,
      cam,
    });
  }

  private configureSprite(ops: {
    texture: string;
    x: number;
    y: number;
    cam: boolean;
  }) {
    this.npc = this.scene.physics.add
      .sprite(ops.x, ops.y, ops.texture)
      .setScale(0.5);
    this.npc.body
      ?.setSize(this.npc.width / 2, this.npc.height, true)
      .setOffset(this.npc.width / 4, 0);

    this.configurarAnimaciones();
    this.gestionarObstaculos();
    this.actualizarAnimacion();
    this.goIdle();
    this.goSit();
    ops.cam && this.makeCameraFollow();
  }
  update() {
    this.comprobarBordesDelMundo();
    this.manejarProfundidad();
  }
  private comprobarBordesDelMundo() {
    const blocked = this.npc.body?.blocked;
    this.socket?.emit("blocked", {
      blockedRight: blocked?.right,
      blockedLeft: blocked?.left,
      blockedUp: blocked?.up,
      blockedDown: blocked?.down,
    });
  }
  private actualizarAnimacion() {
    this.socket?.on(
      "direccionCambio",
      (data: { direccionX: number; direccionY: number; textura: string }) => {
        this.npc.setVelocity(data.direccionX, data.direccionY);
        const dx = data.direccionX;
        const dy = data.direccionY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (Math.abs(absX - absY) <= Math.max(absX, absY) * 0.3) {
          if (dx > 0 && dy > 0) {
            this.npc.anims.play(Direccion.DerechaAbajo, true);
          } else if (dx > 0 && dy < 0) {
            this.npc.anims.play(Direccion.DerechaArriba, true);
          } else if (dx < 0 && dy > 0) {
            this.npc.anims.play(Direccion.IzquierdaAbajo, true);
          } else if (dx < 0 && dy < 0) {
            this.npc.anims.play(Direccion.IzquierdaArriba, true);
          }
        } else if (absX > absY) {
          this.npc.anims.play(
            dx > 0 ? Direccion.Derecha : Direccion.Izquierda,
            true
          );
        } else {
          this.npc.anims.play(
            dy > 0 ? Direccion.Abajo : Direccion.Arriba,
            true
          );
        }
      }
    );
  }
  private gestionarObstaculos() {
    this.npc.setCollideWorldBounds(true);
    this.obs.forEach((ob) => {
      this.scene.physics.add.collider(
        this.npc,
        ob,
        this.callRandomDireccion,
        undefined,
        this
      );
    });
  }
  private callRandomDireccion() {
    this.socket?.emit("recibirDireccion");
  }
  private goIdle() {
    this.socket?.on(
      "goIdle",
      (
        data: {
          between: number;
          texture: string;
        },
        callback
      ) => {
        this.npc.setVelocity(0, 0);
        this.npc.anims.play(Direccion.Inactivo, true);
        this.scene.time.delayedCall(
          data.between,
          () => {
            callback();
            this.callRandomDireccion();
          },
          [],
          this
        );
      }
    );
  }

  private goSit() {
    this.socket?.on(
      "goSit",
      (
        data: {
          randomSeat: Seat;
          duration: number;
          numeroBetween: number;
          originalDepth: number;
          texture: string;
          direccionX: number;
          direccionY: number;
          speed: number;
        },
        callback
      ) => {
        this.scene.tweens.add({
          targets: this.npc,
          x: data?.randomSeat.adjustedX,
          y: data?.randomSeat.adjustedY,
          duration: data?.duration,
          ease: "Linear",
          onStart: () => {
            this.npc.setVelocity(
              data.direccionX * data.speed,
              data.direccionY * data.speed
            );

            this.actualizarAnimacion();
          },
          onUpdate: this.actualizarAnimacion.bind(this),
          onComplete: () => {
            this.seatTaken = data?.randomSeat;
            this.npc.setVelocity(0, 0);

            if (data?.randomSeat?.depth) {
              data?.randomSeat?.obj.setDepth(this.npc.depth + 0.1);
            }

            this.npc.anims.play(data?.randomSeat?.anim, true);
            this.scene.time.delayedCall(
              data.numeroBetween,
              () => {
                data?.randomSeat.obj.setDepth(data?.originalDepth);
                this.callRandomDireccion();
                this.seatTaken = null;
                callback();
              },
              [],
              this
            );
          },
        });
      }
    );
  }
  private manejarProfundidad() {
    this.npc.depth = this.npc!.y + this.npc!.height / 4;

    this.prof
      .filter((ob) =>
        this.seatTaken?.depth
          ? ob.texture.key !== this.seatTaken?.obj.texture.key
          : true
      )
      .forEach((item) => {
        if (item) {
          item.depth = item.y;
        }
      });

    if (this.seatTaken?.depth) {
      this.seatTaken?.obj.setDepth(this.npc.depth + 0.1);
    }
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
