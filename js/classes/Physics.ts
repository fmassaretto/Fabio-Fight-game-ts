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
          this._player.velocity.x = 0;
          const offset = this._player.hitbox.position.x - this._player.position.x;
          this._player.position.x = block.position.x + Util.tileSize.x - offset + 0.01;
          break;
        }

        if (this._player.velocity.x > 0) {
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
}
