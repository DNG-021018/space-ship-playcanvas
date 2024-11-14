import * as pc from "playcanvas";

export class BackGround extends pc.Entity {
  private app: pc.Application;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.Init();
  }

  private Init() {
    this.enabled = true;
    this.BackGround();
    this.SetUp();
  }

  private SetUp() {}

  private BackGround() {
    this.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [1, 1, 1, 1],
      pivot: [1, 1],
      width: this.app.graphicsDevice.width,
      height: this.app.graphicsDevice.height,
      color: new pc.Color(49 / 255, 45 / 255, 46 / 255),
      opacity: 1,
    });
  }
}
