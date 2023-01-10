import { Sprites } from "./Sprites.js";

export class Background extends Sprites {
  constructor({
    context,
    dimension,
    position,
    imgSrc,
    scale = 1,
    frameTotal,
    offset = { top: 0, bottom: 0, left: 0, right: 0 },
    sprites,
  }: {
    context: CanvasRenderingContext2D;
    dimension: Dimension;
    position: Position;
    imgSrc: string;
    scale?: number;
    frameTotal: number;
    offset?: Offset;
    sprites: any;
  }) {
    super({
      context,
      dimension,
      position,
      scale,
      imgSrc,
      offset,
      frameTotal,
      sprites,
    });
  }

  draw(): void {
    super.update();
  }
}
