import * as pc from "playcanvas";

export function setupCamera(app) {
  if (app == null) {
    return;
  }
  const cameraEntity = new pc.Entity("MainCamera");
  app.root.addChild(cameraEntity);

  cameraEntity.addComponent("camera", {
    clearColor: new pc.Color(66 / 255, 135 / 255, 245 / 255),
  });

  const cameraOffset = new pc.Vec3(0, -2, -35);
  cameraEntity.setPosition(cameraOffset);
  cameraEntity.setEulerAngles(10, 180, 0);
}
