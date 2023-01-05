var Sprites = /** @class */ (function () {
    function Sprites(context, dimension, position, imgSrc, offset) {
        if (offset === void 0) { offset = { top: 0, bottom: 0, left: 0, right: 0 }; }
        var _this = this;
        this.image = new Image();
        this.image.src = imgSrc;
        this.image.onload = function () {
            _this._dimension = dimension;
        };
        this._context = context;
        this._position = position;
        this._offset = offset;
    }
    // TODO: tentar ou juntar as sprites em um unico new Image() e seguir com tutorial ou tentar 
    // add um for com frame counter e torcer para dar certo
    Sprites.prototype.draw = function () {
        this._context.drawImage(this.image, (this._position.x - this._offset.left), (this._position.y - this._offset.top), this._dimension.w, this._dimension.h);
        //         // this.context.drawImage(this.image, 
        //         //     (this.position.x - this.offset.l), 
        //         //     (this.position.y - this.offset.t), 
        //         //     this.dimension.w, 
        //         //     this.dimension.h)
        //         // this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        //         const walkImages = this.sprites.walk
        //         // console.log(walkImages)
        //         for (let index = 0; index < walkImages.length; index++) {
        //             // const element = array[index];
        //         // }
        //         //         walkImages.forEach(element => {
        //                     walkImages[index].img = new Image()
        //                     walkImages[index].img.src = walkImages[index].imgSrc
        //                     // let i = window.setInterval(() => {
        //                         // },20);
        //                         // this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        //                         walkImages[index].img.onload = () => {
        //                         }
        // let callback = (image) => {
        // if (!image) image = this
        // if(image instanceof Image){
        //     this.context.drawImage(image,
        //         (this.position.x - this.offset.l), 
        //         (this.position.y - this.offset.t), 
        //         this.dimension.w, 
        //         this.dimension.h)
        //         // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        //     console.log(image.src)
        //     }
        // }
        // if (walkImages[index].img.complete) {
        //     callback(walkImages[index].img)
        // } else{
        //     walkImages[index].img.onload = callback
        // }
        // console.log(walkImages[index])
        //     this.a += 50
        // }//);
        // this.context.fillStyle = 'red'
        // this.context.fillRect(this.position.x, this.position.y, this.dimension.w, this.dimension.h)
    };
    Sprites.prototype.update = function () {
        this.draw();
    };
    return Sprites;
}());
export { Sprites };
//# sourceMappingURL=sprites.js.map