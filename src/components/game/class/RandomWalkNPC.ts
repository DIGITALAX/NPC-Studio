import { Direccion, Seat } from "../types/game.types";
import Phaser from "phaser";
import { Socket } from "socket.io-client";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  npc!: Phaser.Physics.Arcade.Sprite;
  prof: Phaser.GameObjects.Image[];
  seats: Phaser.GameObjects.Image[];
  seatTaken: Seat | null = null;
  socket: Socket;
  direccionActual: {
    x: number;
    y: number;
    anim: Direccion;
    vx: number;
    vy: number;
  } | null = null;

  constructor(
    scene: Phaser.Scene,
    socket: Socket,
    sprite: {
      texture: string;
      x: number;
      y: number;
    },
    seats: Phaser.GameObjects.Image[],
    prof: Phaser.GameObjects.Image[],
    cam: boolean
  ) {
    super(scene, sprite.x, sprite.y, sprite.texture);
    this.scene.physics.world.enable(this);
    this.socket = socket;
    this.seats = seats;
    this.prof = prof;
    this.configureSprite({
      ...sprite,
      cam,
    });
  }

  update() {
    if (this.direccionActual && this.npc) {
      this.npc.anims.play(this.direccionActual.anim, true);
      this.npc.setVelocity(this.direccionActual.vx * 60, this.direccionActual.vy * 60);

      this.manejarProfundidad();
    }
  }

  private configureSprite(ops: {
    texture: string;
    x: number;
    y: number;
    cam: boolean;
  }) {
    if (!this.npc) {
      this.npc = this.scene.physics.add
        .sprite(this.direccionActual?.x!, this.direccionActual?.y!, ops.texture)
        .setScale(0.5);
      this.npc.body
        ?.setSize(this.npc.width / 2, this.npc.height, true)
        .setOffset(this.npc.width / 4, 0);
      this.configurarAnimaciones();
      this.actualizarAnimacion();
      ops.cam && this.makeCameraFollow();
    }
  }

  private actualizarAnimacion() {
    this.socket.on(
      "direccionCambio",
      (data: {
        direccion: Direccion;
        velocidadX: number;
        velocidadY: number;
        npcX: number;
        npcY: number;
        randomSeat: Seat | null;
      }) => {
        console.log({ data });
        this.direccionActual = {
          x: data.npcX,
          y: data.npcY,
          anim: data.direccion,
          vx: data.velocidadX,
          vy: data.velocidadY,
        };
        this.anims.play(data.direccion, true);
        this.npc.setPosition(data.npcX, data.npcY);
        this.npc.setVelocity(data.velocidadX, data.velocidadY);

        if (
          data.direccion == Direccion.Silla ||
          data.direccion == Direccion.Sofa
        ) {
          this.goSit(data.randomSeat!);
        } else {
          if (this.seatTaken) {
            this.seatTaken?.obj.setDepth(this.seatTaken.depthCount!);
            this.seatTaken = null;
          }
        }
      }
    );
  }

  private goSit(randomSeat: Seat) {
    const foundSeat = this.seats.find(
      (seat) => seat.texture.key == randomSeat.texture
    );
    if (foundSeat) {
      this.seatTaken = {
        ...randomSeat,
        obj: foundSeat,
      };

      if (randomSeat?.depth) {
        foundSeat?.setDepth(this.npc.depth + 0.1);
      }
    }
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
