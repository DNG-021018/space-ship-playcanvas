import * as pc from "playcanvas";

export class Light extends pc.Entity {
  private color: pc.Vec3 = new pc.Vec3(1, 1, 1);
  private intensity: number = 1;
  private shadowDistance: number = 50;
  private castShadows: boolean = true;
  private shadowBias: number = 0.1;
  private normalOffsetBias: number = 0.2;
  private angle: pc.Vec3 = new pc.Vec3(-45, 30, 0);

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.name = "DirectionalLight";
    this.addComponent("light", {
      type: pc.LIGHTTYPE_DIRECTIONAL,
      color: this.color,
      intensity: this.intensity,
      shadowDistance: this.shadowDistance,
      castShadows: this.castShadows,
      shadowBias: this.shadowBias,
      normalOffsetBias: this.normalOffsetBias,
    });

    this.setEulerAngles(this.angle);
  }
}
