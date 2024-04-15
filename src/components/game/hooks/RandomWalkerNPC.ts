import Phaser from "phaser";
import { Direccion } from "../types/game.types";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  direction!: Phaser.Math.Vector2;
  speed: number = 60;
  npc!: Phaser.Physics.Arcade.Sprite;
  lastPositionCheckTime: number;
  previousPosition: Phaser.Math.Vector2;

  constructor(
    scene: Phaser.Scene,
    sprite: {
      texture: string;
      x: number;
      y: number;
    },
    obs: Phaser.GameObjects.Image[],
    cam: boolean
  ) {
    super(scene, sprite.x, sprite.y, sprite.texture);
    this.scene.physics.world.enable(this);
    this.lastPositionCheckTime = 0;
    this.previousPosition = new Phaser.Math.Vector2(sprite.x, sprite.y);
    this.setExistingSprite(cam, sprite);
    this.gestionarObstaculos(obs);
  }

  private setExistingSprite(
    cam: boolean,
    sprite: {
      texture: string;
      x: number;
      y: number;
    }
  ) {
    this.npc = this.scene.physics.add
      .sprite(sprite.x, sprite.y, sprite.texture)
      .setScale(0.5);
    this.setRandomDirection();
    if (cam) {
      this.scene.cameras.main.startFollow(this.npc, true, 0.05, 0.05);
    }

    this.configurarAnimaciones();
  }

  private setRandomDirection() {
    const angle = Phaser.Math.Between(0, 360);
    this.direction = new Phaser.Math.Vector2(
      Math.cos(angle),
      Math.sin(angle)
    ).scale(this.speed);
    this.npc.setVelocity(this.direction.x, this.direction.y);
    this.updateAnimation();
  }

  update() {
    this.npc.setVelocity(this.direction.x, this.direction.y);
    this.updateAnimation();
    this.comprobarBordesDelMundo();
    this.comprobarUbicacion();
  }

  private updateAnimation() {
    const dx = this.direction.x;
    const dy = this.direction.y;
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
      this.npc.anims.play(dy > 0 ? Direccion.Abajo : Direccion.Arriba, true);
    }
  }

  private gestionarObstaculos(obs: Phaser.GameObjects.Image[]) {
    this.npc.setCollideWorldBounds(true);
    obs.forEach((ob) => {
      this.scene.physics.add.collider(
        this.npc,
        ob,
        this.gestionarColision,
        undefined,
        this
      );
    });
  }

  private gestionarColision() {
    if (Phaser.Math.Between(0, 1)) {
      this.npc.setVelocity(0, 0);
      this.npc.anims.play(Direccion.Inactivo, true);
      let pauseDuration = Phaser.Math.Between(5000, 20000);
      this.scene.time.delayedCall(
        pauseDuration,
        this.setRandomDirection,
        [],
        this
      );
    } else {
      this.setRandomDirection();
    }
  }

  private comprobarUbicacion() {
    if (this.scene.time.now > this.lastPositionCheckTime + 15000) {
      const distance = Phaser.Math.Distance.Between(
        this.npc.x,
        this.npc.y,
        this.previousPosition.x,
        this.previousPosition.y
      );
      if (distance < 50) {
        this.setRandomDirection();
      }
      this.previousPosition.set(this.npc.x, this.npc.y);
      this.lastPositionCheckTime = this.scene.time.now;
    }
  }

  private comprobarBordesDelMundo() {
    const blocked = this.npc.body?.blocked;
    if (blocked?.right || blocked?.left || blocked?.up || blocked?.down) {
      this.setDirectionAwayFromWalls(blocked);
    }
  }

  private setDirectionAwayFromWalls(
    blocked: Phaser.Types.Physics.Arcade.ArcadeBodyCollision
  ) {
    let newAngle = 0;
    if (blocked.right) newAngle = Phaser.Math.Between(90, 270);
    else if (blocked.left) newAngle = Phaser.Math.Between(-90, 90);
    if (blocked.down) newAngle = Phaser.Math.Between(180, 360);
    else if (blocked.up) newAngle = Phaser.Math.Between(0, 180);
    this.direction = new Phaser.Math.Vector2(
      Math.cos(Phaser.Math.DegToRad(newAngle)),
      Math.sin(Phaser.Math.DegToRad(newAngle))
    ).scale(this.speed);
    this.npc.setVelocity(this.direction.x, this.direction.y);
    this.updateAnimation();
  }

  private configurarAnimaciones() {
    this.scene.anims.create({
      key: "inactivo",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 132,
        end: 143,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "arriba",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 0,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "izquierda",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 24,
        end: 35,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "abajo",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 12,
        end: 23,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "derecha",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 36,
        end: 47,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "izquierdaAbajo",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 72,
        end: 83,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "izquierdaArriba",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 48,
        end: 59,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: "derechaArriba",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 60,
        end: 71,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "derechaAbajo",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 84,
        end: 95,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "sentadoSofa",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 97,
        end: 108,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "sentadoEscritorio",
      frames: this.anims.generateFrameNumbers(this.npc.texture.key, {
        start: 108,
        end: 119,
      }),
      frameRate: 0.3,
      repeat: -1,
    });
  }
}
