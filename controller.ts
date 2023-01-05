import { Player } from "./player";

export class Controller {

    private _keys

    constructor(){
        this._keys = {
            a: {pressed: false},
            d: {pressed: false},
            w: {pressed: false},
            lastKey: ''
        }
    }

    controlKeyUp(event: KeyboardEvent) {
        switch (event.key) {
            case 'a':
                this._keys.a.pressed = false
                break;
            case 'd':
                this._keys.d.pressed = false
                break;
            case 'w':
                this._keys.w.pressed = false
                break;
            default:
                break;
        }
    }

    controlKeyDown(event: KeyboardEvent){
        switch (event.key) {
            case 'a':
                this._keys.a.pressed = true
                this._keys.lastKey = 'a'
                break;
            case 'd':
                this._keys.d.pressed = true
                this._keys.lastKey = 'd'
                break;
            case 'w':
                this._keys.w.pressed = true
                this._keys.lastKey = 'w'
                break;
            default:
                break;
        }
    }
    
    moveWhenKeyPressed(player: Player) {
        
        if (this._keys.a.pressed && this._keys.lastKey === 'a') {
            player.velocity.x = -4;
        } else if (this._keys.d.pressed && this._keys.lastKey === 'd') {
            player.velocity.x = 4;
        } else if(this._keys.w.pressed && this._keys.lastKey === 'w') {
            console.log("player.position.y")
            console.log(player.position.y)

            if (player.velocity.y === 0) {
                player.velocity.y = -7
            }
        } else {
            player.velocity.x = 0;
        }
    }
}