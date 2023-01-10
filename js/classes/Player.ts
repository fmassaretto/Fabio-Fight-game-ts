import { Controller } from "./Controller.js";

import { Sprites } from "./Sprites.js";
import { Physics } from "./Physics.js";
import { CollisionBlock } from "../types/collisionBlock.js";

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
    imgSrc,
    scale = 1,
    offset = { top: 0, bottom: 0, left: 0, right: 0 },
    velocity = { x: 0, y: 0 },
    frameTotal,
    sprites,
  }: {
    context: CanvasRenderingContext2D;
    position: Position;
    collisionBlocks: CollisionBlock[];
    imgSrc: string;
    scale?: number;
    frameTotal: number;
    offset?: Offset;
    velocity?: Velocity;
    sprites: any;
  }) {
    super({ context, scale, position, imgSrc, offset, frameTotal, sprites });

    this.velocity = velocity;
    this.position = position;
    this.offset = offset;

    this._collisionBlocks = collisionBlocks;
    this._physics = new Physics({
      player: this,
      collisionBlocks: this.collisionBlocks,
    });
    this._controller = new Controller();
  }

  update(): void {
    if (!this.image.complete) return;
    super.update();

    this.position.x += this.velocity.x;
    this.updateHitBox();
    // this.position.y += this.velocity.y;

    this._physics.checkForHorizontalCollision();
    this._physics.applyGravity();
    this._controller.moveWhenKeyPressed(this);

    // this.updateHitBox();
    // this._physics.checkForVerticalCollision();

    this.context.fillStyle = "rgba(0, 255, 0, 0.4)";
    this.context.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.dimension.w,
      this.hitbox.dimension.h
    );
  }

  updateHitBox() {
    let hitboxObj = {
      position: {
        x: this.position.x + 110,
        y: this.position.y + 105,
      },
      dimension: {
        w: 65,
        h: 78,
      },
    };

    this.hitbox = hitboxObj;
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
