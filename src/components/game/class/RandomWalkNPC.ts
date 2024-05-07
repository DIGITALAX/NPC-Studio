import { configurarDireccion } from "../../../../lib/utils";
import {
  Direccion,
  Estado,
  Movimiento,
  Seat,
  Sprite,
} from "./../types/game.types";
import Phaser from "phaser";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  private npc!: Phaser.Physics.Arcade.Sprite;
  private seats: Seat[];
  private seatTaken: Seat | null;
  private seatsTaken: Seat[];
  private caminoIndice: number;
  private sitting: boolean;
  private idle: boolean;
  private currentPath: { x: number; y: number }[];
  private currentPathIndex: number;
  private velocidad: { x: number; y: number };
  camino: Estado[] = [];

  constructor(
    scene: Phaser.Scene,
    sprite: Sprite,
    seats: Seat[],
    seatsTaken: Seat[],
    caminoInicial: Estado[],
    cam: boolean
  ) {
    super(scene, sprite.x, sprite.y, sprite.etiqueta);
    this.scene.physics.world.enable(this);
    this.seats = seats;
    this.seatsTaken = seatsTaken;
    this.currentPathIndex = 0;
    this.caminoIndice = -1;
    this.velocidad = { x: 0, y: 0 };
    this.currentPath = [];
    this.seatTaken = null;
    this.sitting = false;
    this.idle = false;
    this.camino = caminoInicial;
    this.configureSprite(sprite, cam);
  }

  update() {
    if (this.npc && this.camino?.length > 0) {
      if (
        this.currentPath.length > 0 &&
        !this.sitting &&
        this.camino[this.caminoIndice]?.estado !== Movimiento.Idle &&
        this.currentPath.length !== 1
      ) {
        this.seguirCamino();
      } else if (
        this.caminoIndice < this.camino.length - 1 &&
        this.currentPath?.length < 1 &&
        !this.sitting
      ) {
        this.empezarProximoCamino();
      }

      this.encontrarDireccion();
      this.manejarProfundidad();
    }
  }

  private configureSprite(ops: Sprite, cam: boolean) {
    if (!this.npc) {
      this.npc = this.scene.physics.add
        .sprite(
          this.camino?.[0]?.puntosDeCamino?.[0]?.x,
          this.camino?.[0]?.puntosDeCamino?.[0]?.y,
          ops.etiqueta
        )
        .setScale(ops.escala.x, ops.escala.y)
        .setOrigin(0.5, 0.5)
        .setDepth(this.camino?.[0]?.puntosDeCamino?.[0]?.y);
      this.npc.body?.setSize(ops.displayWidth, ops.displayHeight, true);
      this.configurarAnimaciones();

      cam && this.makeCameraFollow();
    }
  }

  private empezarProximoCamino() {
    if (this.sitting) return;
    this.caminoIndice++;
    const estado = this.camino[this.caminoIndice];
    this.currentPath = estado?.puntosDeCamino;
    this.currentPathIndex = 0;

    if (this.caminoIndice > 0) {
      this.camino.splice(0, this.caminoIndice);
      this.caminoIndice = 0;
    }

    switch (estado?.estado) {
      case Movimiento.Idle:
        this.goIdle();
        break;
      case Movimiento.Sit:
      case Movimiento.Move:
        const found = this.seats?.find(
          (seat) => seat.image.texture?.key == estado?.randomSeat
        );
        if (found) {
          found?.image.setDepth(found?.par?.y!);
          this.seatTaken = null;
        }
        break;
    }
  }

  private goSit(randomSeat: string) {
    this.velocidad = { x: 0, y: 0 };
    const foundSeat = this.seats.find(
      (seat) => seat.image.texture?.key == randomSeat
    );

    if (foundSeat) {
      this.seatTaken = foundSeat;
      this.seatsTaken.push(foundSeat);
      if (foundSeat?.profundidad && foundSeat?.par) {
        this.npc.setDepth(foundSeat?.par?.depth! + 10);
        foundSeat?.image?.setDepth(this.npc.depth + 10);
      }

      this.npc.x = foundSeat?.adjustedX;
      this.npc.y = foundSeat?.adjustedY;
    }
  }

  private goIdle() {
    this.idle = true;
    this.velocidad = { x: 0, y: 0 };

    this.npc.anims.play(
      configurarDireccion(this.npc.texture.key, Direccion.Inactivo),
      true
    );
    this.scene.time.delayedCall(
      this.camino[this.caminoIndice]?.duracion!,
      () => {
        this.idle = false;
        this.empezarProximoCamino();
      },
      [],
      this
    );
  }

  private encontrarDireccion() {
    if (
      this.idle ||
      this.camino[this.caminoIndice]?.estado === Movimiento.Idle ||
      this.currentPath.length === 1
    ) {
      this.npc.anims.play(
        configurarDireccion(this.npc.texture.key, Direccion.Inactivo),
        true
      );
      return;
    } else if (this.sitting) {
      this.npc.anims.play(
        configurarDireccion(this.npc.texture.key, this.seatTaken?.anim!),
        true
      );
      return;
    }

    const dx = this.velocidad.x!;
    const dy = this.velocidad.y!;
    let direccion: string | null = null;
    let angulo = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angulo < 0) angulo += 360;
    if (angulo >= 337.5 || angulo < 22.5) {
      direccion = configurarDireccion(this.npc.texture.key, Direccion.Derecha);
    } else if (angulo >= 22.5 && angulo < 67.5) {
      direccion = configurarDireccion(
        this.npc.texture.key,
        Direccion.DerechaAbajo
      );
    } else if (angulo >= 67.5 && angulo < 112.5) {
      direccion = configurarDireccion(this.npc.texture.key, Direccion.Abajo);
    } else if (angulo >= 112.5 && angulo < 157.5) {
      direccion = configurarDireccion(
        this.npc.texture.key,
        Direccion.IzquierdaAbajo
      );
    } else if (angulo >= 157.5 && angulo < 202.5) {
      direccion = configurarDireccion(
        this.npc.texture.key,
        Direccion.Izquierda
      );
    } else if (angulo >= 202.5 && angulo < 247.5) {
      direccion = configurarDireccion(
        this.npc.texture.key,
        Direccion.IzquierdaArriba
      );
    } else if (angulo >= 247.5 && angulo < 292.5) {
      direccion = configurarDireccion(this.npc.texture.key, Direccion.Arriba);
    } else if (angulo >= 292.5 && angulo < 337.5) {
      direccion = configurarDireccion(
        this.npc.texture.key,
        Direccion.DerechaArriba
      );
    }

    if (direccion) this.npc.anims.play(direccion, true);
  }

  private seguirCamino() {
    if (this.caminoIndice >= this.camino.length || this.sitting) return;

    if (
      this.currentPath.length > 0 &&
      this.currentPathIndex < this.currentPath.length &&
      !this.sitting
    ) {
      const point = this.currentPath[this.currentPathIndex];
      this.currentPathIndex++;

      const dx = point.x - this.npc.x;
      const dy = point.y - this.npc.y;
      const angulo = Math.atan2(dy, dx);
      this.velocidad = {
        x: Math.cos(angulo) * 60,
        y: Math.sin(angulo) * 60,
      };
      this.npc.x = point.x;
      this.npc.y = point.y;
      this.encontrarDireccion();
    } else if (
      this.currentPath.length > 0 &&
      this.currentPathIndex == this.currentPath.length
    ) {
      if (
        !this.sitting &&
        this.camino[this.caminoIndice]?.estado === Movimiento.Sit
      ) {
        if (
          this.seatsTaken.find(
            (item) =>
              item.etiqueta !== this.camino[this.caminoIndice]?.randomSeat
          ) == undefined
        ) {
          this.sitting = true;
          this.goSit(this.camino[this.caminoIndice]?.randomSeat!);

          this.npc.anims.play(
            configurarDireccion(this.npc.texture.key, this.seatTaken?.anim!),
            true
          );
          this.scene.time.delayedCall(
            this.camino[this.caminoIndice]?.duracion!,
            () => {
              this.seatsTaken = this.seatsTaken.filter(
                (item) => item.etiqueta !== this.seatTaken?.etiqueta
              );
              this.seatTaken = null;
              this.npc.x =
                this.camino[this.caminoIndice]?.puntosDeCamino[
                  this.camino[this.caminoIndice]?.puntosDeCamino.length - 1
                ]?.x;
              this.npc.y =
                this.camino[this.caminoIndice]?.puntosDeCamino[
                  this.camino[this.caminoIndice]?.puntosDeCamino.length - 1
                ]?.y;
              this.sitting = false;

              this.empezarProximoCamino();
            },
            [],
            this
          );
        }
      }
      this.currentPathIndex = 0;
      this.currentPath = [];
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
        start: 96,
        end: 107,
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
