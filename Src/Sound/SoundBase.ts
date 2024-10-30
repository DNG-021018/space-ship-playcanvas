import * as pc from "playcanvas";

export class SoundManager extends pc.Entity {
  private app: pc.Application;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.addComponent("sound");
  }

  public loadAndPlaySoundFromURL(soundURL: string, soundName: string, loop: boolean = false, volume: number = 0.5) {
    const soundAsset = new pc.Asset(soundName, "audio", {url: soundURL});

    soundAsset.ready(() => {
      this.sound?.addSlot(soundName, {
        asset: soundAsset.id,
        loop: loop,
        volume: volume,
        autoPlay: false,
      });
    });

    this.app.assets.add(soundAsset);
    this.app.assets.load(soundAsset);
  }

  public playSound(soundName: string) {
    if (this.sound) {
      this.sound.play(soundName);
    }
  }

  public stopSound(soundName: string) {
    if (this.sound) {
      this.sound.stop(soundName);
    }
  }
}
