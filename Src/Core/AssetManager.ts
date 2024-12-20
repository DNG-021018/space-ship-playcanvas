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
      //Models
      [AssetKey.ModelItemsFuel]: new pc.Asset("ModelItemsFuel", "model", {url: "../Assets/Models/Fuel.glb"}),
      [AssetKey.ModelItemsWrech]: new pc.Asset("ModelItemsWrech", "model", {url: "../../Assets/Models/Wrench.glb"}),
      [AssetKey.ModelObstacleRock]: new pc.Asset("ModelObstacleRock", "model", {url: "../../Assets/Models/Rock_1.glb"}),
      [AssetKey.ModelPlayerRocket]: new pc.Asset("ModelPlayerRocket", "model", {url: "../../Assets/Models/Rocketship.glb"}),
      [AssetKey.ModelLoadingScreenCloudy]: new pc.Asset("ModelLoadingScreenCloudy", "model", {url: "../../Assets/Models/Cloud.glb"}),

      // Texture
      [AssetKey.TextureGround]: new pc.Asset("TextureGround", "texture", {url: "../../Assets/Textures/MoonTexture.png"}),
      [AssetKey.IMGIconPause]: new pc.Asset("IMGIconPause", "texture", {url: "../../Assets/UI/Icons/Pause.png"}),
      [AssetKey.IMGIconPlay]: new pc.Asset("IMGIconPlay", "texture", {url: "../../Assets/UI/Icons/Play.png"}),
      [AssetKey.IMGIconHome]: new pc.Asset("IMGIconHome", "texture", {url: "../../Assets/UI/Icons/Home.png"}),
      [AssetKey.IMGIconReplay]: new pc.Asset("IMGIconReplay", "texture", {url: "../../Assets/UI/Icons/Replay.png"}),
      [AssetKey.IMGIconSoundOn]: new pc.Asset("IMGIconSoundOn", "texture", {url: "../../Assets/UI/Icons/SoundOn.png"}),
      [AssetKey.IMGIconSoundOff]: new pc.Asset("IMGIconSoundOff", "texture", {url: "../../Assets/UI/Icons/SoundOff.png"}),
      [AssetKey.IMGIconPurusGame]: new pc.Asset("IMGIconPurusGame", "texture", {url: "../../Assets/UI/Icons/PurusIcon.png"}),
      [AssetKey.IMGButtonSquareDefault]: new pc.Asset("IMGButtonSquareDefault", "texture", {url: "../../Assets/UI/Btn/Square/Default.png"}),
      [AssetKey.IMGButtonSquareHover]: new pc.Asset("IMGButtonSquareHover", "texture", {url: "../../Assets/UI/Btn/Square/Hover.png"}),
      [AssetKey.IMGButtonRectDefault]: new pc.Asset("IMGButtonRectDefault", "texture", {url: "../../Assets/UI/Btn/Rect/Default.png"}),
      [AssetKey.IMGButtonRectHover]: new pc.Asset("IMGButtonRectHover", "texture", {url: "../../Assets/UI/Btn/Rect/Hover.png"}),
      [AssetKey.IMGButtonPlayRectDefault]: new pc.Asset("IMGButtonPlayRectDefault", "texture", {url: "../../Assets/UI/Btn/PlayRect/Default.png"}),
      [AssetKey.IMGButtonPlayRectHover]: new pc.Asset("IMGButtonPlayRectHover", "texture", {url: "../../Assets/UI/Btn/PlayRect/Hover.png"}),

      // Audio
      [AssetKey.AudioEngineThrust]: new pc.Asset("AudioEngineThrust", "audio", {url: "../../Assets/Sound/SFX-Main-engine-thrust.mp3"}),
      [AssetKey.AudioDeathExplode]: new pc.Asset("AudioDeathExplode", "audio", {url: "../../Assets/Sound/SFX-Death-Explosion.mp3"}),
      [AssetKey.AudioItemsPickUp]: new pc.Asset("AudioItemsPickUp", "audio", {url: "../../Assets/Sound/item-pick-up.mp3"}),
      [AssetKey.AudioThemeBackground]: new pc.Asset("AudioThemeBackground", "audio", {url: "../../Assets/Sound/theme.mp3"}),
    };

    const AssetLoader = new pc.AssetListLoader(Object.values(listAsset), app.assets);

    AssetLoader.load((error) => {
      if (error) {
        console.error("Error loading assets:", error);
        return;
      }

      for (const [key, value] of Object.entries(listAsset)) {
        // if (!value.resource) {
        //   console.error(`Failed to load asset: ${key} - URL: ${value.file.url}`);
        // } else {
        //   console.log(`Successfully loaded asset: ${key} - URL: ${value.file.url}`);
        this.holderAsset.set(key, value);
        // }
      }

      this.eventHandler.fire("assetsLoaded");
    });
  }

  public on(eventName: string, callback: (...args: any[]) => void, scope?: any) {
    this.eventHandler.on(eventName, callback, scope);
  }
}
