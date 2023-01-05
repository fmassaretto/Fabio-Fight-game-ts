import { Controller } from "./controller.js";
import { Physics } from "./physics.js";
import { Sprites } from "./sprites.js";

export class Player extends Sprites {
  private _velocity!: Velocity;
  private _physics: Physics;
  private _controller: Controller;

  public get velocity(): Velocity {
    return this._velocity;
  }

  public get dimension(): Dimension {
    return this._dimension;
  }

  public get position(): Position {
    return this._position;
  }

  public get offset(): Offset {
    return this._offset;
  }

  constructor(
    context: CanvasRenderingContext2D,
    dimension: Dimension,
    position: Position,
    imgSrc: string,
    offset: Offset = { top: 0, bottom: 0, left: 0, right: 0 },
    velocity: Velocity = { x: 0, y: 0 }
  ) {
    super(context, dimension, position, imgSrc, offset);

    this._dimension = dimension;
    this._position = position;
    this._velocity = velocity;
    this._offset = offset;
    this._physics = new Physics;
    this._controller = new Controller;


    window.addEventListener('keydown', event => {
        this._controller.controlKeyDown(event);
    })
    
    window.addEventListener('keyup', event => {
        this._controller.controlKeyUp(event);
    })
}
  

  update() {


    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // this.velocity.y = 10
    this._physics.applyGravity(this, this._context)
    this._physics.detectHorizontalCollision(this, this._context)
    this._controller.moveWhenKeyPressed(this);
    super.draw();

  }


}


