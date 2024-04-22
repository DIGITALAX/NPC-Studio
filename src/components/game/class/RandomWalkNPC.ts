import { Direccion, Seat, Sprite } from "./../types/game.types";
import Phaser from "phaser";
import { Socket } from "socket.io-client";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  private readonly sceneKey: string;
  private npc!: Phaser.Physics.Arcade.Sprite;
  private prof: Phaser.GameObjects.Image[];
  private seats: Phaser.GameObjects.Image[];
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
    seats: Phaser.GameObjects.Image[],
    prof: Phaser.GameObjects.Image[],
    cam: boolean,
    sceneKey: string
  ) {
    super(scene, sprite.x, sprite.y, sprite.etiqueta);
    this.scene.physics.world.enable(this);
    this.socket = socket;
    this.seats = seats;
    this.prof = prof;
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
        .setOrigin(ops.origen.x, ops.origen.y);
      this.npc.body?.setSize(ops.displayWidth, ops.displayHeight, ops.centro);
      this.configurarAnimaciones();
      this.actualizarAnimacion();

      cam && this.makeCameraFollow();
    }
  }

  private actualizarAnimacion() {
    this.socket.on(
      this.sceneKey,
      (data: {
        direccion: Direccion;
        velocidadX: number;
        velocidadY: number;
        npcX: number;
        npcY: number;
        randomSeat: Seat | null;
      }) => {
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
    this.prof
      .filter((ob) =>
        this.seatTaken?.depth
          ? ob.texture.key !== this.seatTaken?.obj.texture.key
            ? true
            : false
          : true
      )
      .forEach((obj) => {
        if (this.npc.y - this.height / 4 > obj.y) {
          this.npc.setDepth(Math.max(this.npc.depth, obj.depth + 0.01));
        } else {
          this.npc.setDepth(Math.min(this.npc.depth, obj.depth - 0.01));
        }
      });
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
