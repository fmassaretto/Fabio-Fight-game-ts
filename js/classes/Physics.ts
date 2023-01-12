import { CollisionBlock } from "../types/collisionBlock.js";
import { Util } from "../utils.js";
import { Player } from "./Player.js";

export class Physics {
  static _gravity = 0.4;
  private _player: Player;
  private _collisionBlocks: CollisionBlock[];

  constructor({ player }: { player: Player }) {
    this._player = player;
    this._collisionBlocks = this._player.collisionBlocks;
  }

  applyGravity(): any {
    this._player.velocity.y += Physics._gravity;
    this._player.position.y += this._player.velocity.y;
  }

  private checkForCollisions(collisionBlock: CollisionBlock): boolean {
    return (
      this._player.hitbox.position.x + this._player.hitbox.dimension.w >=
        collisionBlock.position.x &&
      this._player.hitbox.position.x <= collisionBlock.position.x + Util.tileSize.x &&
      this._player.hitbox.position.y + this._player.hitbox.dimension.h >=
        collisionBlock.position.y &&
      this._player.hitbox.position.y <= collisionBlock.position.y + Util.tileSize.y
    );
  }

  checkForHorizontalCollision(): void {
    for (let index = 0; index < this._collisionBlocks.length; index++) {
      const block = this._collisionBlocks[index];
      if (this.checkForCollisions(block)) {
        if (this._player.velocity.x < 0) {
          console.log("left");
          this._player.velocity.x = 0;
          const offset = this._player.hitbox.position.x - this._player.position.x;
          this._player.position.x = block.position.x + Util.tileSize.x - offset + 0.01;
          break;
        }

        if (this._player.velocity.x > 0) {
          console.log("right");
          this._player.velocity.x = 0;
          const offset =
            this._player.hitbox.position.x -
            this._player.position.x +
            this._player.hitbox.dimension.w;
          this._player.position.x = block.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollision(): void {
    for (let index = 0; index < this._collisionBlocks.length; index++) {
      const block = this._collisionBlocks[index];
      if (this.checkForCollisions(block)) {
        if (this._player.velocity.y < 0) {
          console.log("up");
          this._player.velocity.y = 0;
          const offset = this._player.hitbox.position.y - this._player.position.y;
          this._player.position.y = block.position.y + Util.tileSize.y - offset + 0.01;
          break;
        }

        if (this._player.velocity.y > 0) {
          this._player.velocity.y = 0;
          const offset =
            this._player.hitbox.position.y -
            this._player.position.y +
            this._player.hitbox.dimension.h;
          this._player.position.y = block.position.y - offset - 1.01;
          break;
        }
      }
    }
  }

  // private isStartOfScreen(player: any): boolean {
  //   return player.hitbox.position.x < 0;
  // }
  // private isEndOfScreen(player: any, context: CanvasRenderingContext2D): boolean {
  //   return player.hitbox.position.x + player.hitbox.dimension.w >= context.canvas.width;
  // }

  // detectHorizontalCollision(player: any, context: CanvasRenderingContext2D) {
  //   // console.log("player.position.x");
  //   // console.log(player.position.x);
  //   // console.log("player.hitbox.position.x, player.hitbox.dimension.w, context.canvas.height")
  //   // console.log(player.hitbox.position.x, player.hitbox.dimension.w, context.canvas.height)
  //   // console.log(this.isStartOfScreen(player))

  //   if (this.isStartOfScreen(player)) {
  //     player.velocity.x = 0;
  //     player.position.x = player.position.x - player.hitbox.position.x + 0.01;
  //   } else if (this.isEndOfScreen(player, context)) {
  //     // player.velocity.x = 0;
  //     // console.log(
  //     //   "context.canvas.width, player.position.x, (player.width / player._frameTotal), player.hitbox.position.x, player.hitbox.dimension.w"
  //     // );
  //     // console.log(
  //     //   context.canvas.width,
  //     //   player.position.x,
  //     //   (player.width / player._frameTotal) * player._scale,
  //     //   player.hitbox.position.x,
  //     //   player.hitbox.dimension.w
  //     // );
  //     // console.log(
  //     //   context.canvas.width -
  //     //     (player.hitbox.position.x + player.hitbox.dimension.w) -
  //     //     (player.position.x +
  //     //       (player.width / player._frameTotal) * player._scale) +
  //     //     0.01
  //     // );
  //     player.position.x =
  //       context.canvas.width -
  //       (player.hitbox.position.x +
  //         player.hitbox.dimension.w -
  //         (player.position.x + (player.width / player._frameTotal) * player._scale) +
  //         player.hitbox.dimension.w -
  //         0.01);
  //   }
  // }
}
