import * as pc from "playcanvas";

const assets = {
  MapTextureAssets: new pc.Asset("MoonTexture", "texture", {url: "./Assets/Textures/MoonTexture.png"}),
};

export function setupLight(app: pc.Application) {
  if (app == null) {
    return;
  }
  const dirLight = new pc.Entity("DirectionalLight");
  app.root.addChild(dirLight);

  dirLight.addComponent("light", {
    type: pc.LIGHTTYPE_DIRECTIONAL,
    color: new pc.Color(1, 1, 1),
    intensity: 1,
    shadowDistance: 50,
    castShadows: true,
    shadowBias: 0.1,
    normalOffsetBias: 0.2,
  });

  dirLight.setEulerAngles(-45, 30, 0);
}

export function generatorMap(app: pc.Application) {
  if (app == null) {
    return;
  }

  const ground = new pc.Entity();
  app.root.addChild(ground);

  const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
  assetListLoader.load(() => {
    if (ground.render && ground.render.meshInstances.length > 0) {
      const material = new pc.StandardMaterial();

      const texture = assets.MapTextureAssets.resource as pc.Texture;
      texture.magFilter = pc.FILTER_LINEAR;
      texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
      texture.anisotropy = 16;

      material.diffuseMap = assets.MapTextureAssets.resource as pc.Texture;
      material.update();

      ground.render.meshInstances[0].material = material;
    } else {
      console.error("Ground model or meshInstances not available");
    }
  });

  ground.addComponent("render", {type: "box"});
  ground.setPosition(0, -4, 0);
  ground.setLocalScale(200, 1, 300);

  ground.addComponent("rigidbody", {type: "static", restitution: 0, friction: 1});
  ground.addComponent("collision", {type: "box", halfExtents: new pc.Vec3(10, 0.5, 15)});

  ground.name = "ground";

  return ground;
}
