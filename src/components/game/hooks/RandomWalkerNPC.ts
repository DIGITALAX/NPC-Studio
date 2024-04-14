import Phaser from "phaser";

export default class RandomWalkerNPC extends Phaser.GameObjects.Sprite {
  direction!: Phaser.Math.Vector2;
  speed: number = 100;
  npc: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite) {
    super(scene, sprite.x, sprite.y, sprite.texture.key);
    this.scene.physics.world.enable(this);
    this.npc = sprite;
    this.setExistingSprite(sprite);
  }

  setExistingSprite(sprite: Phaser.Physics.Arcade.Sprite) {
    this.body = sprite.body;
    this.setPosition(sprite.x, sprite.y);
    this.setTexture(sprite.texture.key);
    this.setRandomDirection();

    this.scene.time.addEvent({
      delay: 10000,
      callback: this.setRandomDirection,
      callbackScope: this,
      loop: true,
    });
  }

  setRandomDirection() {
    const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
    this.direction = this.scene.physics.velocityFromAngle(
      Phaser.Math.RadToDeg(angle),
      this.speed
    );
  }

  update() {
    this.npc.setVelocity(this.direction.x, this.direction.y);
    this.updateAnimation();
  }

  updateAnimation() {
    if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
      this.anims.play(this.direction.x > 0 ? "derecha" : "izquierda", true);
    } else {
      this.anims.play(this.direction.y > 0 ? "abajo" : "arriba", true);
    }
  }
}
