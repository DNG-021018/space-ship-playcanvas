import * as pc from "playcanvas";

export function setupSkybox(app) {
  app.assets.loadFromUrl("./Assets/skybox/200071726/MilkywayCubemap.dds", "texture", (error, asset: pc.Asset) => {
    const texture = asset.resource;
    (<any>texture).rgbm = true;

    app.setSkybox(asset);

    texture.magFilter = pc.FILTER_LINEAR;
    texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
    texture.anisotropy = 16;
    console.log(error);
    return null;
  });
}
