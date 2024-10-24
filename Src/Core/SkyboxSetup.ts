import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class SkyboxManager {
  private app: pc.Application;

  constructor(app) {
    this.app = app;
    this.init();
  }

  private init() {
    this.app.assets.loadFromUrl("../../Assets/skybox/200071726/MilkywayCubemap.dds", "texture", (error, asset) => {
      if (asset == null) return;
      const texture = asset.resource;
      (<any>texture).rgbm = true;

      this.app.setSkybox(asset);

      texture.magFilter = pc.FILTER_LINEAR;
      texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
      texture.anisotropy = 16;
      return null;
    });
  }
}
