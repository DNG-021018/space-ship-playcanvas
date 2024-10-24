import * as pc from "playcanvas";
import {Player} from "./Player/Player";

export class Camera extends pc.Entity {
  private colorBackground: pc.Color = new pc.Color(66 / 255, 135 / 255, 245 / 255);
  private offset: pc.Vec3 = new pc.Vec3(0, -2, -35);
  private angles: pc.Vec3 = new pc.Vec3(10, 180, 0);

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.name = "camera";
    this.addComponent("camera", {
      clearColor: this.colorBackground,
    });
    this.setPosition(this.offset);
    this.setEulerAngles(this.angles);
    return this;
  }
}
