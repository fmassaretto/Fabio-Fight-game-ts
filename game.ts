import { Background } from "./js/classes/Background.js";
import { CollisionBlockData } from "./js/classes/CollisionBlocksData.js";
import { Controller } from "./js/classes/Controller.js";
import { Player } from "./js/classes/Player.js";
import { Sprites } from "./js/classes/Sprites.js";
import { CollisionBlock } from "./js/types/collisionBlock.js";
import { Util } from "./js/utils.js";

let codeEnableCanvas = "1288";

let SubmitCodeButton = <HTMLInputElement>document.getElementById("button");
let codeSection = <HTMLInputElement>document.getElementById("codeSection");
let textInput = <HTMLInputElement>document.getElementById("code");
let submitImageButton = <HTMLInputElement>document.getElementById("thumbnail");

SubmitCodeButton.addEventListener("click", () => {
  enableCanvas(textInput.value);
});

// submitImageButton.addEventListener("click", () => {
//   console.log("asdasdasdasdasd");
// });

submitImageButton.addEventListener("change", (event) => {
  console.log(submitImageButton.files?.item(0));
  const file = submitImageButton.files?.item(0);

  file?.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
    const reader = new FileReader();
    if (submitImageButton.files != null || submitImageButton.files != undefined) {
      reader.readAsDataURL(blob);

      reader.onload = () => {
        console.log(reader.result);
        if (reader.result != null) {
          localStorage.setItem("thumbnail", reader.result.toString());
        }
      };

      // reader.addEventListener("load", () => localStorage.setItem("thumbnail", reader.result));
    }
  });

  const thumbnail = localStorage.getItem("thumbnail");
  console.log(thumbnail);

  const previewImage = document.getElementById("preview");

  if (thumbnail) {
    previewImage!.setAttribute("src", thumbnail);
  } else {
    previewImage!.setAttribute("src", "img/default.png");
  }
  console.log(previewImage);
});

let canvas = document.querySelector("canvas");
if (canvas != undefined) {
  // canvas.style.display = "none";
}

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

function enableCanvas(code: string) {
  if (code === codeEnableCanvas) {
    if (canvas != undefined) {
      canvas.style.display = "block";
      codeSection.style.display = "none";
    }
  }
}

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
      }
    });
  });
}

function backgroundSetup() {
  background = new Sprites({
    dimension: { w: ctx.canvas.width, h: ctx.canvas.height },
    context: ctx,
    position: { x: 0, y: 0 },
    spritesAnimation: {
      main: { imgSrc: "./img/Background/layer_1.png", framesTotal: 1 },
    },
  });

  ground = new Sprites({
    dimension: { w: ctx.canvas.width, h: ctx.canvas.height },
    context: ctx,
    position: { x: 0, y: 0 },
    spritesAnimation: {
      main: { imgSrc: "./img/Background/ground.png", framesTotal: 1 },
    },
  });
}

function decorationsSetup() {
  shop = new Sprites({
    context: ctx,
    position: { x: 600, y: 104 },
    scale: 2,
    spritesAnimation: {
      main: { imgSrc: "./img/Decorations/Animated Decorations/shop.png", framesTotal: 6 },
    },
  });
}

function playersSetup() {
  player1 = new Player({
    context: ctx,
    position: { x: 50, y: 50 },
    collisionBlocks: collisionBlocksPosition,
    scale: 1.5,
    offset: { top: 94, bottom: 20, left: 75, right: 90 },
    velocity: { x: 0, y: 0 },
    spritesAnimation: {
      idle: { imgSrc: "./img/Characters/Martial Hero/Sprites/Idle.png", framesTotal: 8 },
      run: { imgSrc: "./img/Characters/Martial Hero/Sprites/Run.png", framesTotal: 8 },
      jump: { imgSrc: "./img/Characters/Martial Hero/Sprites/Jump.png", framesTotal: 2 },
      fall: { imgSrc: "./img/Characters/Martial Hero/Sprites/Fall.png", framesTotal: 2 },
      atack1: { imgSrc: "./img/Characters/Martial Hero/Sprites/Attack1.png", framesTotal: 6 },
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
