import * as pc from "playcanvas";

// assets
const assets = {
  charModelAsset: new pc.Asset("Rock_1", "model", {url: "./Assets/Rock_1.glb"}),
};

var damage = 1;

export function getRockDamage() {
  return damage;
}

export function generatorRock(app) {
  if (app == null) {
    return;
  }
  const collisionType = "box";
  const scale = 1;
  const rock = new pc.Entity();
  app.root.addChild(rock);
  rock.name = "obstacle";

  rock.setPosition(-5, 2, -10);
  rock.setLocalScale(scale, scale, scale);

  const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
  assetListLoader.load(() => {
    rock.addComponent("model", {
      type: "asset",
      asset: assets.charModelAsset,
    });
  });

  rock.addComponent("rigidbody", {type: "kinematic", mass: 0, restitution: 0, friction: 0});
  rock.addComponent("collision", {type: collisionType, halfExtents: new pc.Vec3(1.5, 1.8, 1.4), linearOffset: new pc.Vec3(-0.3, 1.6, 0)});

  if (rock.rigidbody) {
    rock.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    rock.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  Movement(app, rock);

  return rock;
}

function Movement(app, mainObject) {
  if (app == null || mainObject == null) {
    return;
  }

  var charRotY = 0;
  const charRot = 0.3;

  app.on("update", (dt) => {
    charRotY -= charRot * dt;
    mainObject.setEulerAngles(0, charRotY * pc.math.RAD_TO_DEG, 0);
  });
}
