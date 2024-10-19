import * as pc from "playcanvas";

// assets
const assets = {
  charModelAsset: new pc.Asset("Fuel", "model", {url: "./Assets/Fuel.glb"}),
};

export function generatorFuel(app) {
  if (app == null) {
    return;
  }
  const collisionType = "box";
  const scale = 0.7;
  const fuel = new pc.Entity();
  app.root.addChild(fuel);
  fuel.name = "fuel";

  fuel.setPosition(0, 2, -10);
  fuel.setLocalScale(scale, scale, scale);

  const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
  assetListLoader.load(() => {
    fuel.addComponent("model", {
      type: "asset",
      asset: assets.charModelAsset,
    });
  });

  fuel.addComponent("rigidbody", {type: "kinematic", mass: 0, restitution: 0, friction: 0});
  fuel.addComponent("collision", {type: collisionType, halfExtentsnew: new pc.Vec3(scale / 3, scale / 3, scale / 2)});

  if (fuel.rigidbody) {
    fuel.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    fuel.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  Movement(app, fuel);

  return fuel;
}

function Movement(app, mainObject) {
  if (app == null || mainObject == null) {
    return;
  }

  var charRotY = 0;
  const charRot = 1;

  app.on("update", (dt) => {
    charRotY -= charRot * dt;
    mainObject.setEulerAngles(0, charRotY * pc.math.RAD_TO_DEG, 0);
  });
}
