import { configurarDireccion } from "../../../../lib/utils";
import { Direccion, Seat, Sprite } from "./../types/game.types";
import Phaser from "phaser";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  private npc!: Phaser.Physics.Arcade.Sprite;
  private seats: Seat[];
  private seatTaken: Seat | null;
  private direccionActual: {
    x: number;
    y: number;
    anim: Direccion;
    vx: number;
    vy: number;
  } | null;

  constructor(
    scene: Phaser.Scene,
    sprite: Sprite,
    location: { x: number; y: number },
    seats: Seat[],
    cam: boolean
  ) {
    super(scene, sprite.x, sprite.y, sprite.etiqueta);
    this.scene.physics.world.enable(this);
    this.seats = seats;
    this.seatTaken = null;
    this.direccionActual = null;
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

      cam && this.makeCameraFollow();
    }
  }

  actualizarAnimacion(data: {
    direccion: Direccion;
    velocidadX: number;
    velocidadY: number;
    npcX: number;
    npcY: number;
    randomSeat: Seat | null;
    texture: string;
  }) {
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
      data.direccion ==
        configurarDireccion(this.npc.texture.key, Direccion.Silla) ||
      data.direccion ==
        configurarDireccion(this.npc.texture.key, Direccion.Sofa)
    ) {
      this.goSit(data.randomSeat!);
    } else if (this.seatTaken) {
      const found = this.seats.find(
        (seat) => seat.image.texture?.key == data?.randomSeat?.etiqueta
      );
      found?.image.setDepth(found?.par?.y!);
      this.seatTaken = null;
    }
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
    if (!this.seatTaken || !this.seatTaken.profundidad)
      this.npc.setDepth(this.npc!.y);
  }
  private async configurarAnimaciones() {
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Inactivo),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 132,
        end: 143,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Arriba),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 0,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Izquierda),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 24,
        end: 35,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Abajo),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 12,
        end: 23,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Derecha),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 36,
        end: 47,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.IzquierdaAbajo),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 72,
        end: 83,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.IzquierdaArriba),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 48,
        end: 59,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.DerechaArriba),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 60,
        end: 71,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.DerechaAbajo),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 84,
        end: 95,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Sofa),
      frames: this.scene.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 97,
        end: 108,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: configurarDireccion(this.npc.texture.key, Direccion.Silla),
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
