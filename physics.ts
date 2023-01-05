import { Player } from "./player.js";

export class Physics {
    static _gravity = 0.4;
    
    applyGravity(player: Player, context: CanvasRenderingContext2D): any {
        player.position.y += player.velocity.y;
    
        console.log(this.isVerticalCollide(player, context))
        if (this.isVerticalCollide(player, context)) {
            player.velocity.y = 0;
        } else {
            player.velocity.y += Physics._gravity
        }
      }
    
      private isVerticalCollide(player: Player, context: CanvasRenderingContext2D): boolean {
        console.log(player.position.y, player.dimension.h, player.velocity.y, player.offset.bottom)
        return (player.position.y + player.dimension.h + player.velocity.y - player.offset.bottom) >=
          context.canvas.height || player.position.y < 0;
      }

      private isStartOfScreen(player: Player, context: CanvasRenderingContext2D): boolean {       
        return (player.position.x < 0)
      }
      private isEndOfScreen(player: Player, context: CanvasRenderingContext2D): boolean {       
        return ((player.position.x + player.dimension.w) - player.offset.right) >= context.canvas.width;
      }

      detectHorizontalCollision(player: Player, context: CanvasRenderingContext2D) {
        if (this.isStartOfScreen(player, context)) {
            player.position.x = 0
        } else if (this.isEndOfScreen(player, context)) {
            player.position.x = context.canvas.width - player.dimension.w + player.offset.right
        }
      }

    // checkCollision(ctx: CanvasRenderingContext2D, player: Player): boolean{
    //     if((player. + player.dimension.h + player.velocity.y - player.offset.b) >= this.context.canvas.height ) {
    //         return true
    //     }
    //     // // if hit the top of the screen don't let go off screen
    //     // if(player.position.y < 0) {
    //     //     player.position.y = 0
    //     // }
        
    //     // // if hit left or right of the screen stop moving
    //     // if (player.position.x < 0 ) {
    //     //     player.position.x = 0
    //     // } else if(((player.position.x + player.dimension.w) - player.offset.r) >= ctx.canvas.width){
    //     //     player.position.x = ctx.canvas.width - player.dimension.w + player.offset.r
    //     // }
















    //     // if((this.position.y + this.dimension.h + this.velocity.y - this.offset.b) >= this.context.canvas.height ) {
    //     //     this.velocity.y = 0
    //     // }
    //     // // if hit the top of the screen don't let go off screen
    //     // if(player.position.y < 0) {
    //     //     player.position.y = 0
    //     // }
        
    //     // // if hit left or right of the screen stop moving
    //     // if (player.position.x < 0 ) {
    //     //     player.position.x = 0
    //     // } else if(((player.position.x + player.dimension.w) - player.offset.r) >= ctx.canvas.width){
    //     //     player.position.x = ctx.canvas.width - player.dimension.w + player.offset.r
    //     // }
    // }

}