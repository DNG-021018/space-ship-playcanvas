import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class SkyboxManager {
  private app: pc.Application;
  private cubemapAsset: pc.Asset = new pc.Asset(
    "TextureSkybox",
    "cubemap",
    {
      url: "../../Assets/Skybox/200071726/MilkywayCubemap.dds",
    },
    {
      textures: [
        "../../Assets/Skybox/200071729/Milkyway_posx.png",
        "../../Assets/Skybox/200071732/Milkyway_negx.png",
        "../../Assets/Skybox/200071728/Milkyway_posy.png",
        "../../Assets/Skybox/200071731/Milkyway_negy.png",
        "../../Assets/Skybox/200071727/Milkyway_posz.png",
        "../../Assets/Skybox/200071730/Milkyway_negz.png",
      ],
      name: "New Cubemap",
      minFilter: 5,
      magFilter: 1,
      anisotropy: 1,
      rgbm: true,
      prefiltered: "MilkywayCubemap.dds",
    }
  );

  constructor(app) {
    this.app = app;
    this.init();
  }

  private init() {
    this.app.setSkybox(this.cubemapAsset);
  }
}
