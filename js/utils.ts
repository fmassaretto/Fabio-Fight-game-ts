export class Util {
  private static _frameCounter: number = 0;
  private static _frameCounterMax: number = 10;
  private static _tileSize: Position = { x: 24, y: 24 };
  private static _isDebugActive: boolean = false;
  private static _debugLevels: string[] = ["player", "hitbox", "collisionBlocks"]; // types of level to debug: "background", "player", "hitbox", "collisionBlocks"

  public static get tileSize(): Position {
    return Util._tileSize;
  }

  public static getDebug(level: string): boolean {
    if (this._isDebugActive) {
      for (let index = 0; index < this._debugLevels.length; index++) {
        const debugLevel = this._debugLevels[index];
        if (level === debugLevel) {
          return true;
        }
      }
    }

    return false;
  }

  public static get frameCounter(): number {
    if (this._frameCounter < this._frameCounterMax) return Util._frameCounter++;
    return (Util._frameCounter = 0);
  }
}
