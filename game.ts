import { Player } from "./player.js";
import { Sprites } from "./sprites.js";

let canvas = document.querySelector("canvas");
let contextDefinition = (): CanvasRenderingContext2D => {
  const canvasWidth = 860;
  const canvasHeight = 480;

  if (canvas === null) throw new Error("Canvas is null");

  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("Canvas is null");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  return ctx;
};

const ctx = contextDefinition();
let background: Sprites;
let player1: Player;

function setup() {
  backgroundSetup();
  playersSetup();
}

function backgroundSetup() {
  background = new Sprites(
    ctx,
    { w: ctx.canvas.width, h: ctx.canvas.height },
    { x: 0, y: 0 },
    "./img/Background/layer_1.png",
    { top: 0, bottom: 0, left: 0, right: 0 }
  );
}

function playersSetup() {
  player1 = new Player(
    ctx,
    { w: 64, h: 64 },
    { x: 0, y: 0 },
    "./img/Characters/knight/idle/idle_knight_1.png",
    { top: 14, bottom: 10, left: 14, right: 30 },
    { x: 0, y: 0 },
     {
            idle: [
                { imgSrc: './img/Characters/knight/idle/idle_knight_1.png'},
                { imgSrc: './img/Characters/knight/idle/idle_knight_2.png'},
                { imgSrc: './img/Characters/knight/idle/idle_knight_3.png'},
                { imgSrc: './img/Characters/knight/idle/idle_knight_4.png'},
                { imgSrc: './img/Characters/knight/idle/idle_knight_5.png'},
                { imgSrc: './img/Characters/knight/idle/idle_knight_6.png'}
            ]
        }
  );
  // this.player1 = new Player({
  //     context: ctx,
  //     dimension: {w: 64, h: 64},
  //     offset: {top: 14, bottom: 10, left: 14, right: 30},
  //     sprites: {
  //         idle: [
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_1.png'},
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_2.png'},
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_3.png'},
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_4.png'},
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_5.png'},
  //             { imgSrc: './img/Characters/knight/idle/idle_knight_6.png'}
  //         ],
  //         walk: [
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_1.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_2.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_3.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_4.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_5.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_6.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_7.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_8.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_8.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_10.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_11.png'},
  //             { imgSrc: './img/Characters/knight/walk/walk_knight_12.png'}
  //         ]
  //     }
  // })
}

// ctx.getImageData

// ctx.getContextAttributes

//ctx.fillRect(0,0,canvasWidth,canvasHeight)

function gameRun() {
  window.requestAnimationFrame(gameRun);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // checkColision(player1, ctx)
  background.update();
  player1.update();
}

setup();
gameRun();
