export class Util {
  private static _frameCounter: number = 0;
  private static _frameCounterMax: number = 10;
  private static _debug: boolean = false;

  public static get debug(): boolean {
    return Util._debug;
  }

  public static get frameCounter(): number {
    if (this._frameCounter < this._frameCounterMax) return Util._frameCounter++;
    return (Util._frameCounter = 0);
  }
}
