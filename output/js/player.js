var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Controller } from "./controller.js";
import { Physics } from "./physics.js";
import { Sprites } from "./sprites.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(context, dimension, position, imgSrc, offset, velocity) {
        if (offset === void 0) { offset = { top: 0, bottom: 0, left: 0, right: 0 }; }
        if (velocity === void 0) { velocity = { x: 0, y: 0 }; }
        var _this = _super.call(this, context, dimension, position, imgSrc, offset) || this;
        _this._dimension = dimension;
        _this._position = position;
        _this._velocity = velocity;
        _this._offset = offset;
        _this._physics = new Physics;
        _this._controller = new Controller;
        window.addEventListener('keydown', function (event) {
            _this._controller.controlKeyDown(event);
        });
        window.addEventListener('keyup', function (event) {
            _this._controller.controlKeyUp(event);
        });
        return _this;
    }
    Object.defineProperty(Player.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "dimension", {
        get: function () {
            return this._dimension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // this.velocity.y = 10
        this._physics.applyGravity(this, this._context);
        this._physics.detectHorizontalCollision(this, this._context);
        this._controller.moveWhenKeyPressed(this);
        _super.prototype.draw.call(this);
    };
    return Player;
}(Sprites));
export { Player };
//# sourceMappingURL=player.js.map