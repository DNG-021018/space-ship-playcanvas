import * as pc from "playcanvas";

export class Light extends pc.Entity {
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.name = "DirectionalLight";
    this.addComponent("light", {
      type: pc.LIGHTTYPE_DIRECTIONAL,
      color: new pc.Color(1, 1, 1),
      intensity: 1,
      shadowDistance: 50,
      castShadows: true,
      shadowBias: 0.1,
      normalOffsetBias: 0.2,
    });
    this.setEulerAngles(-45, 30, 0);
  }
}
