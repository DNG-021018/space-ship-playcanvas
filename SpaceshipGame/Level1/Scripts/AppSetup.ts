import * as pc from "playcanvas";

export async function setupApp() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const app = new pc.Application(canvas, {
    mouse: new pc.Mouse(document.body),
    keyboard: new pc.Keyboard(window),
    elementInput: new pc.ElementInput(canvas),
  });

  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  window.addEventListener("resize", () => app.resizeCanvas());

  pc.WasmModule.setConfig("Ammo", {
    glueUrl: "./Utils/ammo.wasm.js",
    wasmUrl: "./Utils/ammo.wasm.wasm",
    fallbackUrl: "./Utils/ammo.js",
  });

  await new Promise((resolve) => {
    pc.WasmModule.getInstance("Ammo", resolve);
  });

  app.systems.rigidbody?.gravity.set(0, -3, 0);
  app.start();

  return app;
}
