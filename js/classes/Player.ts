import { Controller } from "./Controller.js";

import { Sprites } from "./Sprites.js";
import { Physics } from "./Physics.js";
import { CollisionBlock } from "../types/collisionBlock.js";
import { Util } from "../utils.js";
import { SpritesAnimation } from "../types/spritesAnimation.js";

export class Player extends Sprites {
  private _physics: Physics;
  private _controller: Controller;
  private _hitbox!: Hitbox;
  private _velocity!: Velocity;
  private _collisionBlocks: CollisionBlock[];

  constructor({
    context,
    position,
    collisionBlocks,
    scale = 1,
    offset = { top: 0, bottom: 0, left: 0, right: 0 },
    velocity = { x: 0, y: 0 },
    spritesAnimation,
  }: {
    context: CanvasRenderingContext2D;
    position: Position;
    collisionBlocks: CollisionBlock[];
    scale?: number;
    offset?: Offset;
    velocity?: Velocity;
    spritesAnimation: SpritesAnimation;
  }) {
    super({ context, scale, position, offset, spritesAnimation });

    this.velocity = velocity;
    this.position = position;
    this.offset = offset;
    this._collisionBlocks = collisionBlocks;
    this._physics = new Physics({ player: this });
    this._controller = new Controller(this);
  }

  update(): void {
    super.update();
    if (!this.image.complete) return;

    this.position.x += this.velocity.x;

    this.updateHitBox();
    this._physics.checkForHorizontalCollision();

    this._controller.moveWhenKeyPressed();
    // console.log(this.velocity.y);

    this._physics.applyGravity();

    this.updateHitBox();
    this._physics.checkForVerticalCollision();

    if (this.velocity.y > 0.4) {
      this.switchSprite("fall");
    }

    if (Util.getDebug("hitbox")) {
      this.context.fillStyle = "rgba(0, 255, 0, 0.4)";
      this.context.fillRect(
        this.hitbox.position.x,
        this.hitbox.position.y,
        this.hitbox.dimension.w,
        this.hitbox.dimension.h
      );
    }
  }

  updateHitBox() {
    this.hitbox = {
      position: {
        x: this.position.x + 110,
        y: this.position.y + 105,
      },
      dimension: {
        w: 65,
        h: 78,
      },
    };
  }

  attack() {
    this.switchSprite("attack1");
  }

  public set velocity(value: Velocity) {
    this._velocity = value;
  }

  public get velocity(): Velocity {
    return this._velocity;
  }

  public get collisionBlocks(): CollisionBlock[] {
    return this._collisionBlocks;
  }

  public get hitbox(): Hitbox {
    return this._hitbox;
  }
  public set hitbox(value: Hitbox) {
    this._hitbox = value;
  }
}
