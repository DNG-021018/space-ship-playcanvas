import * as pc from "playcanvas";

var health = 1;

// assets
const assets = {
  charModelAsset: new pc.Asset("Wrench", "model", {url: "./Assets/Wrench.glb"}),
};

export function getHealth() {
  return health;
}

export function generatorWrech(app) {
  if (app == null) {
    return;
  }
  const collisionType = "capsule";
  const scale = 5;
  const wrech = new pc.Entity();
  app.root.addChild(wrech);
  wrech.name = "wrech";

  wrech.setPosition(5, 2, -10);
  wrech.setLocalScale(scale * 2, scale * 2, scale);

  const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
  assetListLoader.load(() => {
    wrech.addComponent("model", {
      type: "asset",
      asset: assets.charModelAsset,
    });
  });

  wrech.addComponent("rigidbody", {type: "kinematic", mass: 0, restitution: 0, friction: 0});
  wrech.addComponent("collision", {type: collisionType, radius: scale / 4, height: scale});

  if (wrech.rigidbody) {
    wrech.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    wrech.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  Movement(app, wrech);

  return wrech;
}

function Movement(app, mainObject) {
  if (app == null || mainObject == null) {
    return;
  }

  var charRotY = 0;
  const charRot = 1;

  app.on("update", (dt) => {
    charRotY -= charRot * dt;
    mainObject.setEulerAngles(90, charRotY * pc.math.RAD_TO_DEG, 0);
  });
}
