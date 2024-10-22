import * as pc from "playcanvas";
import {AssetKey} from "../Enum/AssetKey";

export class AssetManager {
  private static instance: AssetManager;
  private holderAsset: Map<string, pc.Asset> = new Map<string, pc.Asset>();
  private eventHandler: pc.EventHandler;

  private constructor() {
    this.eventHandler = new pc.EventHandler();
  }

  public static getInstance() {
    if (AssetManager.instance == null) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public getAsset(keyAsset: string): pc.Asset | undefined {
    return this.holderAsset.get(keyAsset);
  }

  public LoadAsset(app: pc.Application): void {
    const listAsset = {
      [AssetKey.ModelItemsFuel]: new pc.Asset("ModelItemsFuel", "model", {url: "../../Assets/Fuel.glb"}),
      [AssetKey.ModelItemsWrech]: new pc.Asset("ModelItemsWrech", "model", {url: "../../Assets/Wrench.glb"}),
      [AssetKey.ModelObstacleRock]: new pc.Asset("ModelObstacleRock", "model", {url: "../../Assets/Rock_1.glb"}),
      [AssetKey.ModelPlayerRocket]: new pc.Asset("ModelPlayerRocket", "model", {url: "../../Assets/Rocketship.glb"}),
      [AssetKey.ModelLoadingScreenCloudy]: new pc.Asset("ModelLoadingScreenCloudy", "model", {url: "../../Assets/Cloud.glb"}),
      [AssetKey.TextureGround]: new pc.Asset("TextureGround", "model", {url: "../../Assets/Skybox/200071726/MilkywayCubemap.dds"}),
      [AssetKey.TextureSkybox]: new pc.Asset("TextureSkybox", "model", {url: "../../Assets/Textures/MoonTexture.png"}),
    };

    const AssetLoader = new pc.AssetListLoader(Object.values(listAsset), app.assets);

    AssetLoader.load(() => {
      for (const [key, value] of Object.entries(listAsset)) {
        this.holderAsset.set(key, value);
      }
      this.eventHandler.fire("assetsLoaded");
    });
  }

  public on(eventName: string, callback: (...args: any[]) => void, scope?: any) {
    this.eventHandler.on(eventName, callback, scope);
  }
}
