import { SpritesAnimation } from "../types/spritesAnimation.js";
import { Util } from "../utils.js";

export class Sprites {
  private _position!: Position;
  private _offset!: Offset;
  private _context!: CanvasRenderingContext2D;
  protected _scale!: number;
  protected _frameTotal!: number;
  protected _sprites!: SpritesAnimation;
  protected image;

  width!: number;
  height!: number;
  currentFrame: number = 0;
  frameElepsed: number = 0;
  frameHold: number = 10;

  constructor({
    context,
    dimension,
    position,
    scale = 1,

    offset = { top: 0, bottom: 0, left: 0, right: 0 },

    spritesAnimation,
  }: {
    context: CanvasRenderingContext2D;
    dimension?: Dimension;
    position: Position;
    scale?: number;
    offset?: Offset;
    spritesAnimation: SpritesAnimation;
  }) {
    this.image = new Image();
    this._sprites = spritesAnimation;

    if (this._sprites.main !== undefined) {
      this.image.src = this._sprites.main.imgSrc;
      this._frameTotal = this._sprites.main.framesTotal;
    }

    if (this._sprites.idle !== undefined) {
      this.image.src = this._sprites.idle.imgSrc;
      this._frameTotal = this._sprites.idle.framesTotal;
    }

    this.image.onload = () => {
      if (dimension !== undefined) {
        this.width = dimension.w * this._scale;
        this.height = dimension.h * this._scale;
      } else {
        this.width = (this.image.width / this._frameTotal) * this._scale;
        this.height = this.image.height * this._scale;
      }
    };

    this._context = context;
    this._position = position;
    this._offset = offset;
    this._scale = scale;
  }

  draw() {
    const debuggerType = this.image.src.search("\bCharacters\b") ? "player" : "none";
    if (Util.getDebug(debuggerType) && debuggerType === "player") {
      this._context.fillStyle = "rgba(255, 0, 0, 0.4)";
      this._context.fillRect(this._position.x, this._position.y, this.width, this.height);
    }

    this._context.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this._frameTotal),
      0,
      this.image.width / this._frameTotal,
      this.image.height,
      this._position.x,
      this._position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.animateFrame();
  }

  animateFrame() {
    if (Util.frameCounter % this.frameHold === 0) {
      // this._context.fillRect(0, 0, this.width, this.height)
      if (this.currentFrame < this._frameTotal - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  switchSprite(spriteType: string) {
    switch (spriteType) {
      case "run":
        break;

      default:
        break;
    }
  }

  protected get context(): CanvasRenderingContext2D {
    return this._context;
  }

  protected set context(value: CanvasRenderingContext2D) {
    this._context = value;
  }

  public set position(value: Position) {
    this._position = value;
  }

  public get position(): Position {
    return this._position;
  }

  public set offset(value: Offset) {
    this._offset = value;
  }

  public get offset(): Offset {
    return this._offset;
  }
}
