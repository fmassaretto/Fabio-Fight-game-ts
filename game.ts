import { Background } from "./js/classes/Background.js";
import { CollisionBlockData } from "./js/classes/CollisionBlocksData.js";
import { Controller } from "./js/classes/Controller.js";
import { Player } from "./js/classes/Player.js";
import { Sprites } from "./js/classes/Sprites.js";
import { CollisionBlock } from "./js/types/collisionBlock.js";
import { Util } from "./js/utils.js";

let canvas = document.querySelector("canvas");
let contextDefinition = (): CanvasRenderingContext2D => {
  const canvasWidth = 864;
  const canvasHeight = 480;

  if (canvas === null) throw new Error("Canvas is null");

  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("Canvas is null");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  return ctx;
};

const ctx = contextDefinition();
let background: Background;
let ground: Background;
let shop: Sprites;
let player1: Player;
let collisionBlocks: any[] = [];
let collisionBlocksPosition: CollisionBlock[] = [];

function setup() {
  backgroundSetup();
  decorationsSetup();
  playersSetup();
  collision();
}

function collision() {
  for (let index = 0; index < CollisionBlockData.groundCollionBlockData.length; index += 36) {
    const element = CollisionBlockData.groundCollionBlockData.slice(index, index + 36);
    collisionBlocks.push(element);
  }

  collisionBlocks.forEach((element, y) => {
    element.forEach((_value: any, x: number) => {
      if (element[x] === 316) {
        let blockPosition: CollisionBlock = {
          position: { x: x * Util.tileSize.x, y: y * Util.tileSize.y },
        };
        collisionBlocksPosition.push(blockPosition);
        // console.log(blockPosition);
      }
    });
  });
}

function backgroundSetup() {
  background = new Sprites({
    dimension: { w: ctx.canvas.width, h: ctx.canvas.height },
    context: ctx,
    // scale: 3,
    position: { x: 0, y: 0 },
    imgSrc: "./img/Background/layer_1.png",
    frameTotal: 1,
    sprites: {
      standard: [{ imgSrc: "./img/Background/layer_1.png" }],
    },
  });

  ground = new Sprites({
    dimension: { w: ctx.canvas.width, h: ctx.canvas.height },
    context: ctx,
    // scale: 3,
    position: { x: 0, y: 0 },
    imgSrc: "./img/Background/ground.png",
    frameTotal: 1,
    sprites: {
      standard: [{ imgSrc: "./img/Background/ground.png" }],
    },
  });
}

function decorationsSetup() {
  shop = new Sprites({
    context: ctx,
    position: { x: 600, y: 104 },
    scale: 2,
    imgSrc: "./img/Decorations/Animated Decorations/shop.png",
    frameTotal: 6,
    sprites: {
      standard: [{ imgSrc: "./img/Decorations/Animated Decorations/shop.png" }],
    },
  });
}

function playersSetup() {
  player1 = new Player({
    context: ctx,
    position: { x: 50, y: 50 },
    collisionBlocks: collisionBlocksPosition,
    scale: 1.5,
    imgSrc: "./img/Characters/Martial Hero/Sprites/Idle.png",
    frameTotal: 8,
    offset: { top: 94, bottom: 20, left: 75, right: 90 },
    velocity: { x: 0, y: 0 },
    sprites: {
      idle: { imgSrc: "./img/Characters/Martial Hero/Sprites/Idle.png", framesTotal: 8 },
      run: { imgSrc: "./img/Characters/Martial Hero/Sprites/Run.png", framesTotal: 8 },
    },
  });
}

function gameRun() {
  window.requestAnimationFrame(gameRun);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  background.draw();
  ground.draw();

  if (Util.getDebug("collisionBlocks")) {
    ctx.save;
    collisionBlocksPosition.forEach((collisionBlock) => {
      // console.log(a);
      ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
      ctx.fillRect(
        collisionBlock.position.x,
        collisionBlock.position.y,
        Util.tileSize.x,
        Util.tileSize.y
      );
    });
    ctx.restore;
  }
  shop.update();
  player1.update();
}

window.addEventListener("keydown", (event) => {
  Controller.controlKeyDown(event);
});

window.addEventListener("keyup", (event) => {
  Controller.controlKeyUp(event);
});

setup();
gameRun();
