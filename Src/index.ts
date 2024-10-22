import * as pc from "playcanvas";
import {SceneGameManager} from "./Core/SceneGameManager";

pc.WasmModule.setConfig("Ammo", {
  glueUrl: "../Physics/ammo.wasm.js",
  wasmUrl: "../Physics/ammo.wasm.wasm",
  fallbackUrl: "../Physics/ammo.js",
});

async function main() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  let app = new pc.Application(canvas, {
    mouse: new pc.Mouse(document.body),
    keyboard: new pc.Keyboard(window),
    elementInput: new pc.ElementInput(canvas),
  });

  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  window.addEventListener("resize", () => app.resizeCanvas());

  await new Promise((resolve) => {
    pc.WasmModule.getInstance("Ammo", resolve);
  });

  new SceneGameManager(app);
}

main().catch(console.error);
