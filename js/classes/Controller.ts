import { Player } from "./Player.js";

export class Controller {
  private static _keys: {
    a: { pressed: boolean };
    lastKey: string;
    d: { pressed: boolean };
    w: { pressed: boolean };
  } = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    lastKey: "",
  };

  constructor() {}

  static controlKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case "a":
        this._keys.a.pressed = false;
        break;
      case "d":
        this._keys.d.pressed = false;
        break;
      case "w":
        this._keys.w.pressed = false;
        break;
      default:
        break;
    }
  }

  static controlKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "a":
        this._keys.a.pressed = true;
        this._keys.lastKey = "a";
        break;
      case "d":
        this._keys.d.pressed = true;
        this._keys.lastKey = "d";
        break;
      case "w":
        this._keys.w.pressed = true;
        this._keys.lastKey = "w";
        break;
      default:
        break;
    }
  }

  moveWhenKeyPressed(player: Player) {
    if (Controller._keys.a.pressed && Controller._keys.lastKey === "a") {
      player.switchSprite("run");
      player.velocity.x = -4;
    } else if (Controller._keys.d.pressed && Controller._keys.lastKey === "d") {
      player.velocity.x = 4;
    } else if (Controller._keys.w.pressed && Controller._keys.lastKey === "w") {
      if (player.velocity.y === 0) {
        player.velocity.y = -7;
      }
    } else {
      player.velocity.x = 0;
    }
  }
}
