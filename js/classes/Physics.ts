// import { Player } from "./player.js";

export class Physics {
  static _gravity = 0.4;

  applyGravity(player: any, context: CanvasRenderingContext2D): any {
    player._position.y += player.velocity.y;

    if (this.isVerticalCollide(player, context)) {
      player.velocity.y = 0;
    } else {
      player.velocity.y += Physics._gravity;
    }
  }

  private isVerticalCollide(
    player: any,
    context: CanvasRenderingContext2D
  ): boolean {
    // console.log("player.position.y, player.height, player.velocity.y")
    // console.log(player.position.y, player.height, player.velocity.y)
    // console.log("(player.hitbox.position.y, player.hitbox.height, context.canvas.height")
    // console.log(player.hitbox.position.y, player.hitbox.height, context.canvas.height)
    // console.log(player.hitbox.position.y + player.hitbox.height + player.velocity.y >=
    //     context.canvas.height)
    return (
      player.hitbox.position.y +
        player.hitbox.dimension.h +
        player.velocity.y +
        30 >=
        context.canvas.height || player.hitbox.position.y < 0
    );
  }

  private isStartOfScreen(player: any): boolean {
    return player.hitbox.position.x < 0;
  }
  private isEndOfScreen(
    player: any,
    context: CanvasRenderingContext2D
  ): boolean {
    return (
      player.hitbox.position.x + player.hitbox.dimension.w >=
      context.canvas.width
    );
  }

  detectHorizontalCollision(player: any, context: CanvasRenderingContext2D) {
    console.log("player.position.x");
    console.log(player.position.x);
    // console.log("player.hitbox.position.x, player.hitbox.dimension.w, context.canvas.height")
    // console.log(player.hitbox.position.x, player.hitbox.dimension.w, context.canvas.height)
    // console.log(this.isStartOfScreen(player))

    if (this.isStartOfScreen(player)) {
      player.velocity.x = 0;
      player.position.x = player.position.x - player.hitbox.position.x + 0.01;
    } else if (this.isEndOfScreen(player, context)) {
      player.velocity.x = 0;
      console.log(
        "context.canvas.width, player.position.x, (player.width / player._frameTotal), player.hitbox.position.x, player.hitbox.dimension.w"
      );
      console.log(
        context.canvas.width,
        player.position.x,
        (player.width / player._frameTotal) * player._scale,
        player.hitbox.position.x,
        player.hitbox.dimension.w
      );
      console.log(
        context.canvas.width -
          (player.hitbox.position.x + player.hitbox.dimension.w) -
          (player.position.x +
            (player.width / player._frameTotal) * player._scale) +
          0.01
      );
      player.position.x =
        context.canvas.width -
        (player.hitbox.position.x +
          player.hitbox.dimension.w -
          (player.position.x +
            (player.width / player._frameTotal) * player._scale) +
          player.hitbox.dimension.w -
          0.01);
    }
  }
}
