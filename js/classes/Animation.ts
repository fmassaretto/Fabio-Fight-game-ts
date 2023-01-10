export class Animation {
    gravity = 0.8

    // constructor({ context, position, dimension, offset, velocity, sprites }){
    //     this.context = context
    //     this.position = position
    //     this.dimension = dimension
    //     this.offset = offset
    //     this.velocity = velocity
    //     this.sprites = sprites
    // }

    // animate(){
    //     this.position.x += this.velocity.x
    //     this.position.y += this.velocity.y

    //     // if hit the bottom of the screen stop falling
    //     if((this.position.y + this.dimension.h + this.velocity.y - this.offset.b) >= this.context.canvas.height ) {
    //         this.velocity.y = 0
    //     } else {
    //         this.velocity.y += this.gravity
    //     }

    //     // this.switchSprite()
    // }


    // switchSprite(sprite){
    //     switch (sprite) {
    //         case 'idle':
    //             const idleImages = this.sprites.idle
    //             idleImages.forEach(element => {
    //                 this.image = new Image()
    //                 this.image.src = element
    //                 this.context.drawImage(this.image,
    //                     (this.position.x - this.offset.l), 
    //                     (this.position.y - this.offset.t), 
    //                     this.dimension.w, 
    //                     this.dimension.h)
    //                 console.log(element)
    //             });
    //             break;
        
    //         default:
    //             const defaultImages = this.sprites.idle
    //             defaultImages.forEach(element => {
    //                 this.image = new Image()
    //                 this.image.src = element
    //                 this.context.drawImage(this.image,
    //                     (this.position.x - this.offset.l), 
    //                     (this.position.y - this.offset.t), 
    //                     this.dimension.w, 
    //                     this.dimension.h)
    //                 console.log(element)
    //             });
    //             break;
    //     }
    // }
}