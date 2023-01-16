import { SpriteProperties } from "./spriteProperties";

export interface SpritesAnimation {
  main?: SpriteProperties;
  idle?: SpriteProperties;
  run?: SpriteProperties;
}
