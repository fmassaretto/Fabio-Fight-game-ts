import { Util } from "../utils.js";

export class Sprites {
  private _position!: Position;
  private _offset!: Offset;
  private _context!: CanvasRenderingContext2D;
  protected _scale!: number;
  protected _frameTotal!: number;
  protected _sprites!: any;
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
    imgSrc,
    offset = { top: 0, bottom: 0, left: 0, right: 0 },
    frameTotal = 1,
    sprites,
  }: {
    context: CanvasRenderingContext2D;
    dimension?: Dimension;
    position: Position;
    scale?: number;
    imgSrc: string;
    frameTotal: number;
    offset?: Offset;
    sprites: any;
  }) {
    this.image = new Image();
    this.image.src = imgSrc;

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
    this._frameTotal = frameTotal;
    this._position = position;
    this._offset = offset;
    this._scale = scale;
    this._sprites = sprites;
  }

  draw() {
    if (Util.debug) {
      this._context.fillStyle = "rgba(255, 0, 0, 0.4)";
      this._context.fillRect(
        this._position.x,
        this._position.y,
        this.width,
        this.height
      );
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
