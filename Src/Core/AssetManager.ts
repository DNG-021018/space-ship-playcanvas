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
      [AssetKey.TextureGround]: new pc.Asset("TextureGround", "texture", {url: "../../Assets/Textures/MoonTexture.png"}),
      [AssetKey.TextureSkybox]: new pc.Asset("TextureSkybox", "texture", {url: "../../Assets/Skybox/200071726/MilkywayCubemap.dds"}),
    };

    const AssetLoader = new pc.AssetListLoader(Object.values(listAsset), app.assets);

    AssetLoader.load((error) => {
      if (error) {
        console.error("Error loading assets:", error);
        return;
      }

      for (const [key, value] of Object.entries(listAsset)) {
        if (!value.resource) {
          console.error(`Failed to load asset: ${key} - URL: ${value.file.url}`);
        } else {
          console.log(`Successfully loaded asset: ${key} - URL: ${value.file.url}`);
          this.holderAsset.set(key, value);
        }
      }

      this.eventHandler.fire("assetsLoaded");
    });
  }

  public on(eventName: string, callback: (...args: any[]) => void, scope?: any) {
    this.eventHandler.on(eventName, callback, scope);
  }
}
