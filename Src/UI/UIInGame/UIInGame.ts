import * as pc from "playcanvas";
import {BtnPauseGame} from "./PauseButton";

export class UIInGame extends pc.Entity {
  private app: pc.Application;
  private btnPause: BtnPauseGame;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.enabled = false;
    this.setElement();
    this.setUpBegin();
  }

  private setElement() {
    this.addComponent("element", {
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: this.app.graphicsDevice.width,
      height: this.app.graphicsDevice.height,
      type: pc.ELEMENTTYPE_GROUP,
    });
  }

  private setUpBegin() {
    this.btnPause = new BtnPauseGame(this.app);
    this.addChild(this.btnPause);
  }
}
