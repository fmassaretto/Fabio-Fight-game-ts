var Physics = /** @class */ (function () {
    function Physics() {
    }
    Physics.prototype.applyGravity = function (player, context) {
        player.position.y += player.velocity.y;
        console.log(this.isVerticalCollide(player, context));
        if (this.isVerticalCollide(player, context)) {
            player.velocity.y = 0;
        }
        else {
            player.velocity.y += Physics._gravity;
        }
    };
    Physics.prototype.isVerticalCollide = function (player, context) {
        console.log(player.position.y, player.dimension.h, player.velocity.y, player.offset.bottom);
        return (player.position.y + player.dimension.h + player.velocity.y - player.offset.bottom) >=
            context.canvas.height || player.position.y < 0;
    };
    Physics.prototype.isStartOfScreen = function (player, context) {
        return (player.position.x < 0);
    };
    Physics.prototype.isEndOfScreen = function (player, context) {
        return ((player.position.x + player.dimension.w) - player.offset.right) >= context.canvas.width;
    };
    Physics.prototype.detectHorizontalCollision = function (player, context) {
        if (this.isStartOfScreen(player, context)) {
            player.position.x = 0;
        }
        else if (this.isEndOfScreen(player, context)) {
            player.position.x = context.canvas.width - player.dimension.w + player.offset.right;
        }
    };
    Physics._gravity = 0.4;
    return Physics;
}());
export { Physics };
//# sourceMappingURL=physics.js.map