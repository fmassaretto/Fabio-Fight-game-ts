import { SpritesAnimation } from "../types/spritesAnimation.js";
import { Sprites } from "./Sprites.js";

export class Background extends Sprites {
  constructor({
    context,
    dimension,
    position,

    scale = 1,

    offset = { top: 0, bottom: 0, left: 0, right: 0 },
    spritesAnimation,
  }: {
    context: CanvasRenderingContext2D;
    dimension: Dimension;
    position: Position;
    scale?: number;
    offset?: Offset;
    spritesAnimation: SpritesAnimation;
  }) {
    super({
      context,
      dimension,
      position,
      scale,
      offset,
      spritesAnimation,
    });
  }

  draw(): void {
    super.update();
  }
}
