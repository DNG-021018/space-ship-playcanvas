import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class SoundManager extends pc.Entity {
  private volumeSoundBG: number = 1;
  private volumeSFX: number = 1;

  private readonly SOUND_SFX = {
    Engine: "engine",
    Explosion: "explosion",
    ItemPickUp: "itemsPickUp",
  };
  private readonly SOUND_BACKGROUND = {
    BACKGROUND: "theme",
  };

  constructor() {
    super();
    this.initialize();
  }

  private initialize(): void {
    this.setupSoundComponent();
    this.setupAudioSlots();
  }

  private setupSoundComponent(): void {
    this.addComponent("sound", {
      positional: true,
      volume: 1,
      pitch: 1,
      refDistance: 1,
      maxDistance: 20,
      distanceModel: pc.DISTANCE_LINEAR,
      rollOffFactor: 1,
    });
  }

  private setupAudioSlots(): void {
    if (!this.sound) return;

    // Sound Background
    this.sound.addSlot(this.SOUND_BACKGROUND.BACKGROUND, {
      asset: AssetManager.getInstance().getAsset(AssetKey.AudioThemeBackground)?.id,
      startTime: 0,
      loop: true,
      autoPlay: true,
      volume: this.volumeSoundBG,
      pitch: 1,
    });

    //Engine Thrust
    this.sound.addSlot(this.SOUND_SFX.Engine, {
      asset: AssetManager.getInstance().getAsset(AssetKey.AudioEngineThrust)?.id,
      startTime: 0,
      overlap: true,
      volume: this.volumeSFX,
      pitch: 1,
    });

    // Explosion
    this.sound.addSlot(this.SOUND_SFX.Explosion, {
      asset: AssetManager.getInstance().getAsset(AssetKey.AudioDeathExplode)?.id,
      startTime: 0,
      overlap: true,
      volume: this.volumeSFX / 2,
      pitch: 1,
    });

    // ItemPickUp
    this.sound.addSlot(this.SOUND_SFX.ItemPickUp, {
      asset: AssetManager.getInstance().getAsset(AssetKey.AudioItemsPickUp)?.id,
      startTime: 0,
      overlap: true,
      volume: this.volumeSFX,
      pitch: 1,
    });
  }

  // Play
  playSFXEngine() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.Engine) == null) return;
    this.sound.slot(this.SOUND_SFX.Engine)?.play();
  }

  playSFXExplosion() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.Explosion) == null) return;
    this.sound.slot(this.SOUND_SFX.Explosion)?.play();
  }

  playSFXItemPickUp() {
    console.log("play cut item");
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.ItemPickUp) == null) return;
    this.sound.slot(this.SOUND_SFX.ItemPickUp)?.play();
  }

  playBackgroundTheme() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_BACKGROUND.BACKGROUND) == null) return;
    this.sound.slot(this.SOUND_BACKGROUND.BACKGROUND)?.play();
  }

  // Stop
  stopSFXEngine() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.Engine) == null) return;
    this.sound.slot(this.SOUND_SFX.Engine)?.stop();
  }

  stopSFXExplosion() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.Explosion) == null) return;
    this.sound.slot(this.SOUND_SFX.Explosion)?.stop();
  }

  stopSFXItemPickUp() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_SFX.ItemPickUp) == null) return;
    this.sound.slot(this.SOUND_SFX.ItemPickUp)?.stop();
  }

  stopBackgroundTheme() {
    if (this.sound == null) return;
    if (this.sound.slot(this.SOUND_BACKGROUND.BACKGROUND) == null) return;
    this.sound.slot(this.SOUND_BACKGROUND.BACKGROUND)?.stop();
  }
}
